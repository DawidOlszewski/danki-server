import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dtos/create-card-dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user-decorator';
import { User } from '../users/user.model';
import { DecksService } from './decks.service';

@Controller('cards')
@ApiTags('cards')
export class CardsController {
  constructor(
    private cardsService: CardsService,
    private decksService: DecksService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async createCard(
    @Body() createCardDto: CreateCardDto,
    @CurrentUser() user: User,
  ) {
    const deck = await this.decksService.findDeck(createCardDto.deckId);
    if (deck?.ownerId === user.id) {
      return this.cardsService.createCard(createCardDto);
    }
    throw new UnauthorizedException();
  }
}
