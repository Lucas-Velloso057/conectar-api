import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientsService } from './service/clients.service';
import { ClientsController } from './controller/clients.controller';
import { Client } from '../models/client.model';
import { User } from '../models/user.model';
import { UserClient } from '../models/user-client.model';

@Module({
  imports: [SequelizeModule.forFeature([Client, User, UserClient])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
