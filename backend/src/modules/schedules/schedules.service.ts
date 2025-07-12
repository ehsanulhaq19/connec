import { Injectable } from '@nestjs/common';
import { SchedulesRepository } from '../../repositories/schedules.repository';
import { Schedule } from './schemas/schedule.schema';

@Injectable()
export class SchedulesService {
  constructor(private schedulesRepository: SchedulesRepository) {}

  async create(createScheduleDto: any): Promise<Schedule> {
    return this.schedulesRepository.create(createScheduleDto);
  }

  async findAll(): Promise<Schedule[]> {
    return this.schedulesRepository.findAll();
  }

  async findOne(id: string): Promise<Schedule> {
    return this.schedulesRepository.findById(id);
  }

  async findByStatus(status: string): Promise<Schedule[]> {
    return this.schedulesRepository.findByStatus(status);
  }

  async findUpcoming(): Promise<Schedule[]> {
    return this.schedulesRepository.findUpcoming();
  }

  async update(id: string, updateScheduleDto: any): Promise<Schedule> {
    return this.schedulesRepository.update(id, updateScheduleDto);
  }

  async remove(id: string): Promise<Schedule> {
    return this.schedulesRepository.remove(id);
  }

  async cancelSchedule(id: string): Promise<Schedule> {
    return this.schedulesRepository.update(id, { status: 'cancelled' });
  }
} 