import { Connection } from 'mongoose';

export abstract class BaseMigration {
  protected connection: Connection;
  protected collectionName: string;

  constructor(connection: Connection, collectionName: string) {
    this.connection = connection;
    this.collectionName = collectionName;
  }

  /**
   * Main migration method to be implemented by each schema
   */
  abstract migrate(): Promise<void>;

  /**
   * Create collection if it doesn't exist
   */
  protected async createCollection(): Promise<void> {
    try {
      if (!this.connection.db) {
        throw new Error('Database connection not available');
      }
      await this.connection.db.createCollection(this.collectionName);
      console.log(`Created collection: ${this.collectionName}`);
    } catch (error) {
      // Collection might already exist, which is fine
      console.log(`Collection ${this.collectionName} already exists`);
    }
  }

  /**
   * Create index if it doesn't exist
   */
  protected async createIndex(indexSpec: any, options: any = {}): Promise<void> {
    try {
      if (!this.connection.db) {
        throw new Error('Database connection not available');
      }
      await this.connection.db.collection(this.collectionName).createIndex(indexSpec, options);
      console.log(`Created index on ${this.collectionName}: ${JSON.stringify(indexSpec)}`);
    } catch (error) {
      // Index might already exist, which is fine
      console.log(`Index already exists on ${this.collectionName}: ${JSON.stringify(indexSpec)}`);
    }
  }

  /**
   * Get collection status
   */
  async getStatus(): Promise<any> {
    if (!this.connection.db) {
      throw new Error('Database connection not available');
    }
    
    const count = await this.connection.db.collection(this.collectionName).countDocuments();
    const indexes = await this.connection.db.collection(this.collectionName).indexes();
    
    return {
      collectionName: this.collectionName,
      documentCount: count,
      indexes: indexes.length,
      exists: true
    };
  }

  /**
   * Drop collection (for development only)
   */
  async dropCollection(): Promise<void> {
    try {
      if (!this.connection.db) {
        throw new Error('Database connection not available');
      }
      await this.connection.db.collection(this.collectionName).drop();
      console.log(`Dropped collection: ${this.collectionName}`);
    } catch (error) {
      console.log(`Collection ${this.collectionName} doesn't exist or couldn't be dropped`);
    }
  }
} 