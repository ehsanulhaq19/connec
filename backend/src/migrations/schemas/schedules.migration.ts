import { BaseMigration } from '../base.migration';

export class SchedulesMigration extends BaseMigration {
  constructor(connection: any) {
    super(connection, 'schedules');
  }

  async migrate(): Promise<void> {
    console.log('Starting schedules migration...');

    // Create collection
    await this.createCollection();

    // Create indexes
    await this.createIndex({ scheduledDate: 1 });
    await this.createIndex({ status: 1 });
    await this.createIndex({ assistantId: 1 });
    await this.createIndex({ clientId: 1 });
    await this.createIndex({ createdAt: -1 });
    await this.createIndex({ updatedAt: -1 });

    // Compound indexes for common queries
    await this.createIndex({ assistantId: 1, scheduledDate: 1 });
    await this.createIndex({ clientId: 1, scheduledDate: 1 });
    await this.createIndex({ status: 1, scheduledDate: 1 });

    console.log('Schedules migration completed');
  }
} 