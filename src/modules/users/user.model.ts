import { Model } from 'objection';
import { Email, UUID } from '../../types/uuid.type';
import { Deck } from '../cards/deck.model';

export class User extends Model {
  id!: UUID;
  decks?: Deck;
  email!: Email;
  username!: string;

  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      decks: {
        relation: Model.HasManyRelation,
        modelClass: Deck,
        join: {
          from: 'users.id',
          to: 'decks.ownerId',
        },
      },
    };

    //TODO: identity
  }
}
