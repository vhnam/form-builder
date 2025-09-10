import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  check() {
    return this.healthService.getHealth();
  }

  @Get('database')
  async checkDatabase() {
    return this.healthService.getDatabaseHealth();
  }
}
