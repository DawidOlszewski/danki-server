import { Deck } from '@cards/deck.model';
import { Model } from 'objection';
import { Email, UUID } from '../../types/uuid.type';

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
      cards: {
        relation: Model.HasManyRelation,
        modelClass: Deck,
        join: {
          from: 'users.id',
          to: 'deck.ownerId',
        },
      },
    };

    //TODO: identity
  }
}
