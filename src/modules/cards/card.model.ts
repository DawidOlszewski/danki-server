export class Card {
  id!: string;
  deckId: string; //TODO: change type to UUID
  front!: string; //TODO: html?
  back!: string;
  tags!: string[];
}
