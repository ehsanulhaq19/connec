import { BaseMigration } from '../base.migration';

export class ClientsMigration extends BaseMigration {
  constructor(connection: any) {
    super(connection, 'clients');
  }

  async migrate(): Promise<void> {
    console.log('Starting clients migration...');

    // Create collection
    await this.createCollection();

    // Create indexes
    await this.createIndex({ email: 1 }, { unique: true });
    await this.createIndex({ isActive: 1 });
    await this.createIndex({ createdAt: -1 });
    await this.createIndex({ updatedAt: -1 });

    console.log('Clients migration completed');
  }
} 