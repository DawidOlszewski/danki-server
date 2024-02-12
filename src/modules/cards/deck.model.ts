import { UUID } from '../../types/uuid.type';
import { Card } from './card.model';

export class Deck {
  id!: UUID;
  cards?: Card[];
  title: string;
  ownerId: string;
}
