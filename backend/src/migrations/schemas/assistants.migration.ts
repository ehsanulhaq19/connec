import { BaseMigration } from '../base.migration';

export class AssistantsMigration extends BaseMigration {
  constructor(connection: any) {
    super(connection, 'assistants');
  }

  async migrate(): Promise<void> {
    console.log('Starting assistants migration...');

    // Create collection
    await this.createCollection();

    // Create indexes
    await this.createIndex({ name: 1 });
    await this.createIndex({ isActive: 1 });
    await this.createIndex({ voiceType: 1 });
    await this.createIndex({ language: 1 });
    await this.createIndex({ createdAt: -1 });
    await this.createIndex({ updatedAt: -1 });

    console.log('Assistants migration completed');
  }
} 