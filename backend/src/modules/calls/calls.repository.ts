import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Call, CallDocument } from './schemas/call.schema';

@Injectable()
export class CallsRepository {
  constructor(
    @InjectModel(Call.name) private callModel: Model<CallDocument>,
  ) {}

  async findAll(): Promise<Call[]> {
    return this.callModel
      .find()
      .populate('assistantId clientId scheduleId')
      .sort({ startTime: -1 })
      .exec();
  }

  async findById(id: string): Promise<Call | null> {
    return this.callModel
      .findById(id)
      .populate('assistantId clientId scheduleId')
      .exec();
  }

  async findByAssistant(assistantId: string): Promise<Call[]> {
    return this.callModel
      .find({ assistantId })
      .populate('assistantId clientId scheduleId')
      .sort({ startTime: -1 })
      .exec();
  }

  async findByClient(clientId: string): Promise<Call[]> {
    return this.callModel
      .find({ clientId })
      .populate('assistantId clientId scheduleId')
      .sort({ startTime: -1 })
      .exec();
  }

  async findCompleted(): Promise<Call[]> {
    return this.callModel
      .find({ status: 'completed' })
      .populate('assistantId clientId scheduleId')
      .sort({ startTime: -1 })
      .exec();
  }

  async findRecent(limit: number = 10): Promise<Call[]> {
    return this.callModel
      .find()
      .populate('assistantId clientId scheduleId')
      .sort({ startTime: -1 })
      .limit(limit)
      .exec();
  }
} 