import { CardsService } from './cards.service';
import { Deck } from './deck.model';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { UUID } from '../../types/uuid.type';
import { Injectable } from '@nestjs/common';
const decks: Deck[] = [];
let id = 100;

@Injectable()
export class DecksService {
  constructor(private cardsService: CardsService) {}

  findDeck(id: UUID) {
    const foundDeck = decks.find((deck) => deck.id == id);
    return { foundDeck, cards: this.cardsService.findCardsfromDeck(id) };
  }

  findUsersDecks(ownerId: UUID) {
    return decks
      .filter((deck) => deck.ownerId == ownerId)
      .map((deck) => this.findDeck(deck.id));
  }

  createDeck(createDeckDto: CreateDeckDto, ownerId: UUID) {
    decks.push({ ...createDeckDto, id: (id++).toString(), ownerId });
  }
}
