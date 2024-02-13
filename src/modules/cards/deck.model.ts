import { UUID } from '../../types/uuid.type';
import { Model } from '../database/model';
import { Card } from './card.model';

export class Deck extends Model {
  id!: UUID;
  cards?: Card[];
  title!: string;
  ownerId!: UUID;

  static get tableName() {
    return 'decks';
  }

  static get relationMappings() {
    return {
      cards: {
        relation: Model.HasManyRelation,
        modelClass: Card,
        join: {
          from: 'decks.id',
          to: 'cards.deckId',
        },
      },
    };
  }
}
