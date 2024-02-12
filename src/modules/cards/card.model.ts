import { Model } from '../database/model';
import { Deck } from './deck.model';

// import { UUID } from '../../types/uuid.type';
type UUID = string;
export class Card extends Model {
  id!: UUID;
  deckId!: UUID;
  front!: string; //TODO: html?
  back!: string;
  tags!: string[];
  deck?: Deck;

  static get tableName() {
    return 'cards';
  }

  static get relationMappings() {
    return {
      deck: {
        relation: Model.BelongsToOneRelation,
        modelClass: Deck,
        join: {
          from: 'cards.deckId',
          to: 'decks.id',
        },
      },
    };
  }
}
