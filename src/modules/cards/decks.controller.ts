import { Body, Controller, Post } from '@nestjs/common';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('decks')
@ApiTags('decks')
export class DecksController {
  constructor(private decksService: DecksService) {}

  @Post()
  createDeck(@Body() createDeckDto: CreateDeckDto) {
    return this.decksService.createDeck(createDeckDto, '1'); //TODO: current user decorator
  }
}
