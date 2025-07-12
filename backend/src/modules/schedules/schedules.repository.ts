import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule, ScheduleDocument } from './schemas/schedule.schema';

@Injectable()
export class SchedulesRepository {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>,
  ) {}

  async create(createScheduleDto: any): Promise<Schedule> {
    const createdSchedule = new this.scheduleModel(createScheduleDto);
    return createdSchedule.save();
  }

  async findAll(): Promise<Schedule[]> {
    return this.scheduleModel.find().populate('assistantId clientId').exec();
  }

  async findById(id: string): Promise<Schedule | null> {
    return this.scheduleModel.findById(id).populate('assistantId clientId').exec();
  }

  async findByStatus(status: string): Promise<Schedule[]> {
    return this.scheduleModel.find({ status }).populate('assistantId clientId').exec();
  }

  async findUpcoming(): Promise<Schedule[]> {
    const now = new Date();
    return this.scheduleModel
      .find({ scheduledDate: { $gte: now }, status: 'scheduled' })
      .populate('assistantId clientId')
      .exec();
  }

  async update(id: string, updateScheduleDto: any): Promise<Schedule | null> {
    return this.scheduleModel
      .findByIdAndUpdate(id, updateScheduleDto, { new: true })
      .populate('assistantId clientId')
      .exec();
  }

  async remove(id: string): Promise<Schedule | null> {
    return this.scheduleModel.findByIdAndDelete(id).exec();
  }
} 