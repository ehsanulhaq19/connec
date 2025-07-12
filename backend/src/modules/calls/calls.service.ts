import { Injectable } from '@nestjs/common';
import { CallsRepository } from '../../repositories/calls.repository';
import { Call } from './schemas/call.schema';

@Injectable()
export class CallsService {
  constructor(private callsRepository: CallsRepository) {}

  async findAll(): Promise<Call[]> {
    return this.callsRepository.findAll();
  }

  async findOne(id: string): Promise<Call> {
    return this.callsRepository.findById(id);
  }

  async findByAssistant(assistantId: string): Promise<Call[]> {
    return this.callsRepository.findByAssistant(assistantId);
  }

  async findByClient(clientId: string): Promise<Call[]> {
    return this.callsRepository.findByClient(clientId);
  }

  async findCompleted(): Promise<Call[]> {
    return this.callsRepository.findCompleted();
  }

  async findRecent(limit: number = 10): Promise<Call[]> {
    return this.callsRepository.findRecent(limit);
  }

  async getCallAnalytics(): Promise<any> {
    const completedCalls = await this.callsRepository.findCompleted();
    
    const analytics = {
      totalCalls: completedCalls.length,
      totalDuration: completedCalls.reduce((sum, call) => sum + (call.duration || 0), 0),
      averageDuration: 0,
      callsByAssistant: {},
      callsByClient: {},
    };

    if (completedCalls.length > 0) {
      analytics.averageDuration = analytics.totalDuration / completedCalls.length;
    }

    // Group calls by assistant
    completedCalls.forEach(call => {
      const assistantName = call.assistantId?.name || 'Unknown';
      analytics.callsByAssistant[assistantName] = (analytics.callsByAssistant[assistantName] || 0) + 1;
    });

    // Group calls by client
    completedCalls.forEach(call => {
      const clientName = call.clientId?.name || 'Unknown';
      analytics.callsByClient[clientName] = (analytics.callsByClient[clientName] || 0) + 1;
    });

    return analytics;
  }
} 