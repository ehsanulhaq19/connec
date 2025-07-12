import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssistantsController } from './assistants.controller';
import { AssistantsService } from './assistants.service';
import { Assistant, AssistantSchema } from './schemas/assistant.schema';
import { AssistantsRepository } from './assistants.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Assistant.name, schema: AssistantSchema },
    ]),
  ],
  controllers: [AssistantsController],
  providers: [AssistantsService, AssistantsRepository],
  exports: [AssistantsService],
})
export class AssistantsModule {} 