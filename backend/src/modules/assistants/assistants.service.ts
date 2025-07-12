import { Injectable } from '@nestjs/common';
import { AssistantsRepository } from './assistants.repository';
import { Assistant } from './schemas/assistant.schema';

@Injectable()
export class AssistantsService {
  constructor(private assistantsRepository: AssistantsRepository) {}

  async create(createAssistantDto: any): Promise<Assistant | null> {
    return this.assistantsRepository.create(createAssistantDto);
  }

  async findAll(): Promise<Assistant[]> {
    return this.assistantsRepository.findAll();
  }

  async findOne(id: string): Promise<Assistant | null> {
    return this.assistantsRepository.findById(id);
  }

  async update(id: string, updateAssistantDto: any): Promise<Assistant | null> {
    return this.assistantsRepository.update(id, updateAssistantDto);
  }

  async remove(id: string): Promise<Assistant | null> {
    return this.assistantsRepository.remove(id);
  }

  async findActive(): Promise<Assistant[]> {
    return this.assistantsRepository.findActive();
  }
} 