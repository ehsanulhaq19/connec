import { Controller, Get, Post, Param } from '@nestjs/common';
import { MigrationService } from './migration.service';

@Controller('migrations')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) {}

  @Get('status')
  async getStatus() {
    return this.migrationService.getMigrationStatus();
  }

  @Post('run')
  async runAllMigrations() {
    await this.migrationService.runMigrations();
    return { message: 'All migrations completed successfully' };
  }

  @Post('run/:schema')
  async runSchemaMigration(@Param('schema') schema: string) {
    await this.migrationService.runSchemaMigration(schema);
    return { message: `${schema} migration completed successfully` };
  }
} 