// import { UUID } from '../../types/uuid.type';
type UUID = string;
export class Card {
  id: UUID;
  deckId: UUID;
  front: string; //TODO: html?
  back: string;
  tags: string[];
  updateDate: Date;
  cretedDate: Date;
}
