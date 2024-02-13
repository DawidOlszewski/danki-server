import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(User) private usersModel: typeof User) {}

  findById(id: string) {
    return this.usersModel.query().findById(id);
  }

  async findUsersDecks(id: string) {
    const filledUser = await this.usersModel
      .query()
      .findById(id)
      .withGraphFetched({ decks: true });
    return filledUser?.decks;
  }

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = await this.usersModel
      .query()
      .insertAndFetch(createUserDto);
    return createdUser;
  }
}
