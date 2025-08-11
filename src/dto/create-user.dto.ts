import { UserRole } from '../models/user.model';

export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role?: UserRole;
}
