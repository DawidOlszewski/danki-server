import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user-decorator';
import { User } from '../users/user.model';

@Controller('decks')
@ApiTags('decks')
export class DecksController {
  constructor(private decksService: DecksService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  createDeck(@Body() createDeckDto: CreateDeckDto, @CurrentUser() user: User) {
    return this.decksService.createDeck(createDeckDto, user.id);
  }

  @Get(':id/generate')
  async createApkg(@Param('id', ParseUUIDPipe) id: string) {
    await this.decksService.createApkg(id);
    return 'ok';
  }

  @Get()
  async getAllDecks() {
    return this.decksService.getAllDecks();
  }
}
