import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AssistantsModule } from './modules/assistants/assistants.module';
import { ClientsModule } from './modules/clients/clients.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { CallsModule } from './modules/calls/calls.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(databaseConfig.uri, databaseConfig),
    AuthModule,
    UsersModule,
    AssistantsModule,
    ClientsModule,
    SchedulesModule,
    CallsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
