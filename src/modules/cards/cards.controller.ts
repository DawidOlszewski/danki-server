import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDtO, CreateCardDto } from './dtos/create-card-dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('cards')
@ApiTags('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Post()
  createDeck(@Body() createCardDto: CreateCardDtO) {
    return this.cardsService.createCard(createCardDto as CreateCardDto);
  }

  @Get(':deckId')
  getCardsFromDeck(@Param('deckId') deckId: string) {
    return this.cardsService.findCardsfromDeck(deckId);
  }
}
