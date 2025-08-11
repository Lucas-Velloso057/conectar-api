import {
  Table,
  Column,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Client } from './client.model';

@Table({
  tableName: 'user_clients',
  timestamps: false,
})
export class UserClient extends Model<UserClient> {
  @ForeignKey(() => User)
  @Column
  declare userId: string;

  @ForeignKey(() => Client)
  @Column
  declare clientId: string;
}
