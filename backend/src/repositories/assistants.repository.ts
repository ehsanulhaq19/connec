import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assistant, AssistantDocument } from '../modules/assistants/schemas/assistant.schema';

@Injectable()
export class AssistantsRepository {
  constructor(
    @InjectModel(Assistant.name) private assistantModel: Model<AssistantDocument>,
  ) {}

  async create(createAssistantDto: any): Promise<Assistant> {
    const createdAssistant = new this.assistantModel(createAssistantDto);
    return createdAssistant.save();
  }

  async findAll(): Promise<Assistant[]> {
    return this.assistantModel.find().exec();
  }

  async findById(id: string): Promise<Assistant> {
    return this.assistantModel.findById(id).exec();
  }

  async findActive(): Promise<Assistant[]> {
    return this.assistantModel.find({ isActive: true }).exec();
  }

  async update(id: string, updateAssistantDto: any): Promise<Assistant> {
    return this.assistantModel
      .findByIdAndUpdate(id, updateAssistantDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Assistant> {
    return this.assistantModel.findByIdAndDelete(id).exec();
  }
} 