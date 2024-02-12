import { Body, Controller, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dtos/create-card-dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('cards')
@ApiTags('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Post()
  async createCard(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.createCard(createCardDto);
  }
}
