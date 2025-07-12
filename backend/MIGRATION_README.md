# Database Migration System

This project implements a clean, organized migration system with separate migration files for each schema.

## Architecture

### Migration Structure
```
src/migrations/
├── base.migration.ts              # Base class with common functionality
├── migration.service.ts           # Main migration orchestrator
├── migration.controller.ts        # API endpoints for migrations
├── migration.module.ts            # NestJS module configuration
└── schemas/                       # Individual schema migrations
    ├── users.migration.ts
    ├── assistants.migration.ts
    ├── clients.migration.ts
    ├── schedules.migration.ts
    └── calls.migration.ts
```

### Key Features

- **Separate migration files** for each schema
- **Automatic startup migrations** - runs when app starts
- **Individual schema migrations** - run specific schema migrations
- **No dummy data** - clean schema setup only
- **Proper indexing** - optimized database performance
- **API endpoints** - manage migrations via REST API
- **Status monitoring** - check migration status
- **Error handling** - graceful error management

## How It Works

### 1. Base Migration Class
The `BaseMigration` class provides common functionality:
- Collection creation
- Index creation
- Status checking
- Error handling

### 2. Schema-Specific Migrations
Each schema has its own migration class that:
- Extends `BaseMigration`
- Implements schema-specific logic
- Creates appropriate indexes
- Handles schema-specific requirements

### 3. Migration Service
The `MigrationService` orchestrates:
- Running all migrations in dependency order
- Running individual schema migrations
- Status reporting
- Error handling

### 4. Automatic Startup
Migrations run automatically when the application starts via `AppService.onModuleInit()`

## Usage

### Automatic Migration (Recommended)
Migrations run automatically when you start the application:
```bash
npm run start:dev
```

### Manual Migration via API

#### Check Migration Status
```bash
curl http://localhost:3000/migrations/status
```

#### Run All Migrations
```bash
curl -X POST http://localhost:3000/migrations/run
```

#### Run Specific Schema Migration
```bash
curl -X POST http://localhost:3000/migrations/run/users
curl -X POST http://localhost:3000/migrations/run/assistants
curl -X POST http://localhost:3000/migrations/run/clients
curl -X POST http://localhost:3000/migrations/run/schedules
curl -X POST http://localhost:3000/migrations/run/calls
```

## Migration Order

Migrations run in dependency order:
1. **Users** - Base user management
2. **Assistants** - AI assistant configurations
3. **Clients** - Client management
4. **Schedules** - Scheduling system (depends on users, assistants, clients)
5. **Calls** - Call tracking (depends on all above)

## Schema Details

### Users Collection
- **Indexes**: email (unique), role, isActive, createdAt, updatedAt
- **Purpose**: User authentication and authorization

### Assistants Collection
- **Indexes**: name, isActive, voiceType, language, createdAt, updatedAt
- **Purpose**: AI assistant configurations and management

### Clients Collection
- **Indexes**: email (unique), isActive, createdAt, updatedAt
- **Purpose**: Client information and management

### Schedules Collection
- **Indexes**: scheduledDate, status, assistantId, clientId, createdAt, updatedAt
- **Compound Indexes**: assistantId+scheduledDate, clientId+scheduledDate, status+scheduledDate
- **Purpose**: Appointment scheduling and management

### Calls Collection
- **Indexes**: startTime, endTime, status, assistantId, clientId, scheduleId, createdAt, updatedAt
- **Compound Indexes**: assistantId+startTime, clientId+startTime, status+startTime, scheduleId+startTime
- **Purpose**: Call tracking and history

## API Response Examples

### Migration Status
```json
{
  "users": {
    "collectionName": "users",
    "documentCount": 0,
    "indexes": 5,
    "exists": true
  },
  "assistants": {
    "collectionName": "assistants",
    "documentCount": 0,
    "indexes": 6,
    "exists": true
  }
  // ... other schemas
}
```

### Migration Success
```json
{
  "message": "All migrations completed successfully"
}
```

## Development Workflow

### Adding New Schema Migration

1. **Create migration file**:
   ```typescript
   // src/migrations/schemas/new-schema.migration.ts
   import { BaseMigration } from '../base.migration';

   export class NewSchemaMigration extends BaseMigration {
     constructor(connection: any) {
       super(connection, 'new-schema');
     }

     async migrate(): Promise<void> {
       console.log('Starting new-schema migration...');
       
       await this.createCollection();
       
       // Add your indexes
       await this.createIndex({ field: 1 });
       
       console.log('New-schema migration completed');
     }
   }
   ```

2. **Update MigrationService**:
   ```typescript
   // Add import
   import { NewSchemaMigration } from './schemas/new-schema.migration';

   // Add migration method
   private async runNewSchemaMigration() {
     this.logger.log('Running new-schema migration...');
     const migration = new NewSchemaMigration(this.connection);
     await migration.migrate();
   }

   // Add to runMigrations method
   await this.runNewSchemaMigration();

   // Add to getMigrationStatus method
   const newSchemaMigration = new NewSchemaMigration(this.connection);
   status.newSchema = await newSchemaMigration.getStatus();

   // Add to runSchemaMigration method
   case 'new-schema':
     await this.runNewSchemaMigration();
     break;
   ```

### Best Practices

1. **Always create indexes** for fields used in queries
2. **Use compound indexes** for common query patterns
3. **Test migrations** on development data first
4. **Check migration status** after deployment
5. **Monitor performance** of created indexes

## Error Handling

The migration system includes comprehensive error handling:
- **Collection creation errors** are logged but don't stop the process
- **Index creation errors** are logged but don't stop the process
- **Migration failures** are logged with full error details
- **Startup failures** don't prevent the application from starting

## Monitoring

### Logs
Migration activities are logged with appropriate log levels:
- `log` - General migration progress
- `debug` - Detailed index creation information
- `error` - Migration failures

### Status Endpoint
Use the `/migrations/status` endpoint to monitor:
- Collection existence
- Document counts
- Index counts
- Overall migration health

## Security Considerations

- **No sensitive data** in migrations
- **Environment-based configuration** for database connections
- **Read-only status endpoints** for monitoring
- **Protected migration endpoints** (consider adding authentication)

## Troubleshooting

### Common Issues

1. **Connection errors**: Check MongoDB connection string
2. **Permission errors**: Ensure database user has write permissions
3. **Index creation failures**: Check for existing indexes
4. **Collection creation failures**: Check for existing collections

### Debug Mode
Enable debug logging to see detailed migration information:
```typescript
// In your logger configuration
logger.setLogLevels(['log', 'debug', 'error']);
``` 