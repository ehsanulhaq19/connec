import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UsersMigration } from './schemas/users.migration';
import { AssistantsMigration } from './schemas/assistants.migration';
import { ClientsMigration } from './schemas/clients.migration';
import { SchedulesMigration } from './schemas/schedules.migration';
import { CallsMigration } from './schemas/calls.migration';

@Injectable()
export class MigrationService {
  private readonly logger = new Logger(MigrationService.name);

  constructor(@InjectConnection() private connection: Connection) {}

  /**
   * Run all migrations
   */
  async runMigrations() {
    this.logger.log('Starting database migrations...');

    try {
      // Run migrations in order of dependencies
      await this.runUsersMigration();
      await this.runAssistantsMigration();
      await this.runClientsMigration();
      await this.runSchedulesMigration();
      await this.runCallsMigration();
      
      this.logger.log('All migrations completed successfully');
    } catch (error) {
      this.logger.error('Migration failed:', error);
      throw error;
    }
  }

  /**
   * Run users migration
   */
  private async runUsersMigration() {
    this.logger.log('Running users migration...');
    const migration = new UsersMigration(this.connection);
    await migration.migrate();
  }

  /**
   * Run assistants migration
   */
  private async runAssistantsMigration() {
    this.logger.log('Running assistants migration...');
    const migration = new AssistantsMigration(this.connection);
    await migration.migrate();
  }

  /**
   * Run clients migration
   */
  private async runClientsMigration() {
    this.logger.log('Running clients migration...');
    const migration = new ClientsMigration(this.connection);
    await migration.migrate();
  }

  /**
   * Run schedules migration
   */
  private async runSchedulesMigration() {
    this.logger.log('Running schedules migration...');
    const migration = new SchedulesMigration(this.connection);
    await migration.migrate();
  }

  /**
   * Run calls migration
   */
  private async runCallsMigration() {
    this.logger.log('Running calls migration...');
    const migration = new CallsMigration(this.connection);
    await migration.migrate();
  }

  /**
   * Get migration status for all schemas
   */
  async getMigrationStatus() {
    const status: Record<string, any> = {};

    // Check each schema migration status
    const usersMigration = new UsersMigration(this.connection);
    status.users = await usersMigration.getStatus();

    const assistantsMigration = new AssistantsMigration(this.connection);
    status.assistants = await assistantsMigration.getStatus();

    const clientsMigration = new ClientsMigration(this.connection);
    status.clients = await clientsMigration.getStatus();

    const schedulesMigration = new SchedulesMigration(this.connection);
    status.schedules = await schedulesMigration.getStatus();

    const callsMigration = new CallsMigration(this.connection);
    status.calls = await callsMigration.getStatus();

    return status;
  }

  /**
   * Run specific schema migration
   */
  async runSchemaMigration(schemaName: string) {
    this.logger.log(`Running ${schemaName} migration...`);

    switch (schemaName.toLowerCase()) {
      case 'users':
        await this.runUsersMigration();
        break;
      case 'assistants':
        await this.runAssistantsMigration();
        break;
      case 'clients':
        await this.runClientsMigration();
        break;
      case 'schedules':
        await this.runSchedulesMigration();
        break;
      case 'calls':
        await this.runCallsMigration();
        break;
      default:
        throw new Error(`Unknown schema: ${schemaName}`);
    }
  }
} 