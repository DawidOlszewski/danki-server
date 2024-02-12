import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { DecksService } from './decks.service';
import { DecksController } from './decks.controller';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Card } from './card.model';
import { Deck } from './deck.model';

@Module({
  providers: [CardsService, DecksService],
  controllers: [CardsController, DecksController],
  imports: [ObjectionModule.forFeature([Card, Deck])],
})
export class CardsModule {}
