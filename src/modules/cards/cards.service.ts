import { Card } from './card.model';
import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dtos/create-card-dto';
import { UUID } from '../../types/uuid.type';

@Injectable()
export class CardsService {
  cards: Card[] = [];
  id = 1;

  findCardsfromDeck(deckId: UUID) {
    return this.cards.filter((card) => card.deckId == deckId);
  }

  createCard(createCardDto: CreateCardDto) {
    this.cards.push({
      id: (this.id++).toString(),
      ...createCardDto,
      updateDate: new Date(),
      cretedDate: new Date(),
    });
    return this.id;
  }
}
