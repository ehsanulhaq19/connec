import { Injectable } from '@nestjs/common';
import { ClientsRepository } from '../../repositories/clients.repository';
import { Client } from './schemas/client.schema';

@Injectable()
export class ClientsService {
  constructor(private clientsRepository: ClientsRepository) {}

  async create(createClientDto: any): Promise<Client> {
    return this.clientsRepository.create(createClientDto);
  }

  async findAll(): Promise<Client[]> {
    return this.clientsRepository.findAll();
  }

  async findOne(id: string): Promise<Client> {
    return this.clientsRepository.findById(id);
  }

  async findByEmail(email: string): Promise<Client> {
    return this.clientsRepository.findByEmail(email);
  }

  async update(id: string, updateClientDto: any): Promise<Client> {
    return this.clientsRepository.update(id, updateClientDto);
  }

  async remove(id: string): Promise<Client> {
    return this.clientsRepository.remove(id);
  }
} 