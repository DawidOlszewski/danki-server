import { Body, Controller, Post } from '@nestjs/common';
import { DecksService } from './decks.service';
import {
  FindUsersDecksDtO,
  FindUsersDecksDto,
} from './dtos/find-users-decks.dto';
import { CreateDeckDtO, CreateDeckDto } from './dtos/create-deck.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('decks')
@ApiTags('decks')
export class DecksController {
  constructor(private decksService: DecksService) {}

  @Post('get')
  findUsersDecks(@Body() findUsersDecks: FindUsersDecksDtO) {
    return this.decksService.findUsersDecks(
      (findUsersDecks as any as FindUsersDecksDto).ownerId,
    );
  }
  @Post()
  createDeck(@Body() createDeckDto: CreateDeckDtO) {
    return this.decksService.createDeck(createDeckDto as CreateDeckDto, '1');
  }
}
