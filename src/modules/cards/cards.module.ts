import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { DecksService } from './decks.service';
import { DecksController } from './decks.controller';

@Module({
  providers: [CardsService, DecksService],
  controllers: [CardsController, DecksController],
})
export class CardsModule {}
