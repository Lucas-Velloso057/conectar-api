import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from '../../models/client.model';
import { CreateClientDto } from '../../dto/create-client.dto';
import { UpdateClientDto } from '../../dto/update-client.dto';
import { User } from '../../models/user.model';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client)
    private readonly clientModel: typeof Client,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const { userId, ...clientDtoData } = createClientDto;

    const client = await this.clientModel.create(clientDtoData as any);

    if (userId) {
      await client.$add('user', userId);
    }

    return client.reload({ include: [User] });
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.findAll({
      include: [User],
    });
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientModel.findByPk(id, {
      include: [User],
    });
    if (!client) {
      throw new NotFoundException(`Cliente com ID "${id}" não encontrado.`);
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);
    await client.update(updateClientDto);
    return client.reload();
  }

  async remove(id: string): Promise<void> {
    const client = await this.findOne(id);
    await client.destroy();
  }

  async assignUserToClient(clientId: string, userId: string): Promise<void> {
    const client = await this.findOne(clientId);
    await client.$add('user', userId);
  }

  async removeUserFromClient(
    clientId: string,
    userId: string,
  ): Promise<void> {
    const client = await this.findOne(clientId);
    await client.$remove('user', userId);
  }
}
