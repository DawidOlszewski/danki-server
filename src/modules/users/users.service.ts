import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';

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
      .withGraphFetched('decks');
    return filledUser?.decks;
  }
}
