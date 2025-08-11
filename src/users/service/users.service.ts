import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserRole } from '../../models/user.model';
import { CreateUserDto } from '../../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { Model } from 'sequelize-typescript';
import { Client } from '../../models/client.model';
import { FindOptions, Op } from 'sequelize';
import { subDays } from 'date-fns';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password' | keyof Model>> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    try {
      const user = await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
      } as any);

      return user.toJSON();
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('O e-mail fornecido já está em uso.');
      }
      throw error;
    }
  }

  async findAll(
    role?: UserRole,
    sortBy?: string,
    order?: 'ASC' | 'DESC',
  ) {
    const options: FindOptions = { where: {}, order: [] };

    if (role) {
      options.where = { role };
    }

    if (sortBy && order) {
      options.order = [[sortBy, order]];
    }

    const users = await this.userModel.findAll(options);
    return users.map((user) => user.toJSON());
  }

  async findOne(id: string) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`Utilizador com ID "${id}" não encontrado.`);
    }
    return user.toJSON();
  }

  async findForAuth(email: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { email },
    });
  }

  async findUserClients(id: string): Promise<Client[]> {
    const userWithClients = await this.userModel.findByPk(id, {
      include: [
        {
          model: Client,
          through: { attributes: [] },
        },
      ],
    });
    if (!userWithClients) {
      throw new NotFoundException(`Utilizador com ID "${id}" não encontrado.`);
    }
    return userWithClients.clients;
  }

  async findInactiveUsers(): Promise<User[]> {
    const thirtyDaysAgo = subDays(new Date(), 30);
    return this.userModel.findAll({
      where: {
        lastLoginAt: {
          [Op.lt]: thirtyDaysAgo,
        },
      },
    });
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.userModel.update(
      { lastLoginAt: new Date() },
      { where: { id: userId } },
    );
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`Utilizador com ID "${id}" não encontrado.`);
    }

    await user.update(updateUserDto);
    return user.toJSON();
  }

  async remove(id: string): Promise<void> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`Utilizador com ID "${id}" não encontrado.`);
    }
    await user.destroy();
  }
}
