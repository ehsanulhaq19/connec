import { MongooseModuleOptions } from '@nestjs/mongoose';

export const databaseConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/connec',
  options: {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    bufferCommands: false,
  } as MongooseModuleOptions,
}; 