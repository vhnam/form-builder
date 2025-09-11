import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PasswordResetService } from '../users/password-reset.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import crypto from 'crypto';
import {
  ForgotPasswordDto,
  GetProfileDto,
  LogoutDto,
  RegisterDto,
  ResetPasswordDto,
} from './dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private passwordResetService: PasswordResetService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  private generateAccessToken(payload: any, expiresIn?: string): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn:
        expiresIn ||
        this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN') ||
        '15m',
    });
  }

  private generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn:
        this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN') || '30m',
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const payload = { email: user.email, sub: user.id, role: user.role };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
      },
    };
  }

  generateTokensForUser(
    user: {
      id: string;
      email: string;
      roleId: string;
      // role: { name: string; permissions: Permission[] };
      role: string;
    },
    expiresIn?: string,
  ): { accessToken: string; refreshToken: string } {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: this.generateAccessToken(payload, expiresIn),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const savedUser = await this.usersService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      role: 'user',
    });

    const payload = {
      sub: savedUser.id,
      email: savedUser.email,
      role: savedUser.role,
    };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    };
  }

  async getProfile(userId: string): Promise<GetProfileDto> {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET') as string,
      });

      const user = await this.usersService.findOne(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const newPayload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      const newAccessToken = this.generateAccessToken(newPayload);
      const newRefreshToken = this.generateRefreshToken(newPayload);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string, logoutDto?: LogoutDto) {
    // Log the logout event
    // Note: In a production environment, you might want to:
    // 1. Add the token to a blacklist/revocation list
    // 2. Store logout events in audit logs
    // 3. Notify other services about the logout

    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // TODO: Implement audit logging
    // await this.auditLogService.create({
    //   userId: user.id,
    //   action: 'logout',
    //   details: {
    //     reason: logoutDto?.reason || 'User requested logout',
    //     timestamp: new Date().toISOString(),
    //   },
    // });

    return {
      message: 'Logged out successfully',
      details: {
        userId: user.id,
        email: user.email,
        logoutTime: new Date().toISOString(),
        reason: logoutDto?.reason || 'User requested logout',
      },
    };
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Verify old password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      throw new UnauthorizedException('Invalid old password');
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await this.usersService.update(userId, { password: hashedNewPassword });

    return { message: 'Password changed successfully' };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);

    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15); // 15 minutes

    // Invalidate any existing tokens for this user
    await this.passwordResetService.invalidateUserTokens(user.id);

    // Create new reset token
    await this.passwordResetService.create({
      token: resetToken,
      userId: user.id,
      expiresAt,
      isUsed: false,
    });

    // TODO: Send email with reset token
    // await this.emailService.sendPasswordResetEmail(user.email, resetToken);

    return {
      message: 'Password reset email sent successfully',
      email: user.email,
      resetToken, // Remove this in production - only for testing
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = resetPasswordDto;

    // Find valid reset token
    const resetTokenRecord =
      await this.passwordResetService.findValidToken(token);

    if (!resetTokenRecord) {
      throw new NotFoundException('Invalid or expired reset token');
    }

    // Check if token is expired
    if (new Date() > resetTokenRecord.expiresAt) {
      // Mark token as used
      await this.passwordResetService.markAsUsed(resetTokenRecord.id);
      throw new NotFoundException('Reset token has expired');
    }

    // Get user
    const user = await this.usersService.findById(resetTokenRecord.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    await this.usersService.update(resetTokenRecord.userId, {
      password: hashedPassword,
    });

    // Mark token as used
    await this.passwordResetService.markAsUsed(resetTokenRecord.id);

    return {
      message: 'Password reset successfully',
      email: user.email,
    };
  }

  generateRandomPassword(length: number = 12): string {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, charset.length);
      password += charset[randomIndex];
    }

    return password;
  }
}
