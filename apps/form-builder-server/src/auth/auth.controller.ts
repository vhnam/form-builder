import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LogoutDto } from './dto/logout.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return { data: result };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: RequestWithUser) {
    const profile = await this.authService.getProfile(req.user.id);
    return { data: profile };
  }

  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const result = await this.authService.refreshToken(
      refreshTokenDto.refreshToken,
    );
    return { data: result };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req: RequestWithUser, @Body() logoutDto?: LogoutDto) {
    const result = await this.authService.logout(req.user.id, logoutDto);
    return { data: result };
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Request() req: RequestWithUser,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const result = await this.authService.changePassword(
      req.user.id,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
    return { data: result };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const result = await this.authService.forgotPassword(forgotPasswordDto);
    return { data: result };
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const result = await this.authService.resetPassword(resetPasswordDto);
    return { data: result };
  }
}
