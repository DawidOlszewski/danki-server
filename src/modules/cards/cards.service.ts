import { Card } from './card.model';
import { Inject, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dtos/create-card-dto';
import { UUID } from '../../types/uuid.type';

@Injectable()
export class CardsService {
  constructor(@Inject(Card) private readonly cardsModel: typeof Card) {}

  async findCard(id: UUID) {
    return this.cardsModel.query().where({ id });
  }

  async createCard(createCardDto: CreateCardDto) {
    return this.cardsModel.query().insertGraph(createCardDto);
  }
}
