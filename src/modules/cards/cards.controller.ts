import { Body, Controller, Post, Redirect, Req } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dtos/create-card-dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('cards')
@ApiTags('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Post()
  @Redirect('localhost:3000/users', 302)
  async createCard(@Body() createCardDto: CreateCardDto, @Req() req: Request) {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl);
    // return this.cardsService.createCard(createCardDto);
  }
}
