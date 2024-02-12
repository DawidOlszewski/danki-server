import { Deck } from './deck.model';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { UUID } from '../../types/uuid.type';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DecksService {
  constructor(@Inject(Deck) private decksModel: typeof Deck) {}

  findDeck(id: UUID) {
    return this.decksModel.query().findById(id);
  }

  async createDeck(createDeckDto: CreateDeckDto, ownerId: UUID) {
    return this.decksModel.query().insert({ ...createDeckDto, ownerId });
  }
}
