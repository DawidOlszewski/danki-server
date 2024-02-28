import { Deck } from './deck.model';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { UUID } from '../../types/uuid.type';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
//@ts-expect-error
import AnkiExport from 'anki-apkg-export';

@Injectable()
export class DecksService {
  constructor(@Inject(Deck) private decksModel: typeof Deck) {}

  findDeck(id: UUID) {
    return this.decksModel
      .query()
      .findById(id)
      .withGraphFetched({ cards: true });
  }

  async createDeck(createDeckDto: CreateDeckDto, ownerId: UUID) {
    return this.decksModel.query().insert({ ...createDeckDto, ownerId });
  }

  async createApkg(deckId: string) {
    const deck = await this.decksModel
      .query()
      .findById(deckId)
      .withGraphFetched({ cards: true });
    if (!deck || !deck.cards) {
      throw new NotFoundException();
    }
    const apkg = new AnkiExport(deck?.title);
    deck.cards.map((card) => {
      apkg.addCard(card.front, card.back, { tags: card.tags });
    });

    const deckZip = (await apkg.save()) as Buffer;
    return [deckZip, deck.title];
  }

  async findAllDecks() {
    return this.decksModel.query();
  }
}
