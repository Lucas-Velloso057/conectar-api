import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  IsUUID,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './user.model';
import { UserClient } from './user-client.model'; 

@Table({
  tableName: 'clients',
  timestamps: true,
})
export class Client extends Model<Client> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare razaoSocial: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare cnpj: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare nomeFantasia: string;

  @Column({
    type: DataType.STRING,
    get() {
      const rawValue = this.getDataValue('tags');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value: string[]) {
      this.setDataValue('tags', JSON.stringify(value));
    },
  })
  declare tags: string[];

  @Column({
    type: DataType.ENUM('Ativo', 'Inativo'),
    allowNull: false,
  })
  declare status: 'Ativo' | 'Inativo';

  @Column({
    type: DataType.ENUM('Sim', 'Não'),
    allowNull: false,
  })
  declare conectaPlus: 'Sim' | 'Não';

  @Column(DataType.STRING)
  declare cep: string;

  @Column(DataType.STRING)
  declare rua: string;

  @Column(DataType.STRING)
  declare numero: string;

  @Column(DataType.STRING)
  declare complemento: string;

  @Column(DataType.STRING)
  declare bairro: string;

  @Column(DataType.STRING)
  declare cidade: string;

  @Column(DataType.STRING)
  declare estado: string;

  @BelongsToMany(() => User, () => UserClient)
  declare users: User[];
}
