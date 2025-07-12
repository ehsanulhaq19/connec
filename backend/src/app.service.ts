import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { MigrationService } from './migrations/migration.service';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly migrationService: MigrationService) {}

  async onModuleInit() {
    this.logger.log('Application starting up...');
    
    try {
      // Run database migrations on startup
      await this.migrationService.runMigrations();
      this.logger.log('Database migrations completed on startup');
    } catch (error) {
      this.logger.error('Startup migration failed:', error);
      // Don't throw here to allow the application to start
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
