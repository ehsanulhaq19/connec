import { BaseMigration } from '../base.migration';

export class CallsMigration extends BaseMigration {
  constructor(connection: any) {
    super(connection, 'calls');
  }

  async migrate(): Promise<void> {
    console.log('Starting calls migration...');

    // Create collection
    await this.createCollection();

    // Create indexes
    await this.createIndex({ startTime: -1 });
    await this.createIndex({ endTime: -1 });
    await this.createIndex({ status: 1 });
    await this.createIndex({ assistantId: 1 });
    await this.createIndex({ clientId: 1 });
    await this.createIndex({ scheduleId: 1 });
    await this.createIndex({ createdAt: -1 });
    await this.createIndex({ updatedAt: -1 });

    // Compound indexes for common queries
    await this.createIndex({ assistantId: 1, startTime: -1 });
    await this.createIndex({ clientId: 1, startTime: -1 });
    await this.createIndex({ status: 1, startTime: -1 });
    await this.createIndex({ scheduleId: 1, startTime: -1 });

    console.log('Calls migration completed');
  }
} 