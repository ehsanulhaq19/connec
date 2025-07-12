import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from '../modules/clients/schemas/client.schema';

@Injectable()
export class ClientsRepository {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  async create(createClientDto: any): Promise<Client> {
    const createdClient = new this.clientModel(createClientDto);
    return createdClient.save();
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.find().exec();
  }

  async findById(id: string): Promise<Client> {
    return this.clientModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<Client> {
    return this.clientModel.findOne({ email }).exec();
  }

  async update(id: string, updateClientDto: any): Promise<Client> {
    return this.clientModel
      .findByIdAndUpdate(id, updateClientDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Client> {
    return this.clientModel.findByIdAndDelete(id).exec();
  }
} 