import { BaseMigration } from '../base.migration';

export class UsersMigration extends BaseMigration {
  constructor(connection: any) {
    super(connection, 'users');
  }

  async migrate(): Promise<void> {
    console.log('Starting users migration...');

    // Create collection
    await this.createCollection();

    // Create indexes
    await this.createIndex({ email: 1 }, { unique: true });
    await this.createIndex({ role: 1 });
    await this.createIndex({ isActive: 1 });
    await this.createIndex({ createdAt: -1 });
    await this.createIndex({ updatedAt: -1 });

    console.log('Users migration completed');
  }
} 