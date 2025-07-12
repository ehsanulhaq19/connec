import { MongooseModuleOptions } from '@nestjs/mongoose';

export const databaseConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/connec',
  options: {
    useNewUrlParser: true,
  } as MongooseModuleOptions,
}; 