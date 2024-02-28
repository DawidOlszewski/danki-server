import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user-decorator';
import { User } from '../users/user.model';
import { Response } from 'express';
import { Readable } from 'node:stream';

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

  @Get(':id')
  async findDeck(@Param('id', ParseUUIDPipe) id: string) {
    return this.decksService.findDeck(id);
  }

  @Get(':id/generate')
  async createApkg(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const [ankiZip, title] = await this.decksService.createApkg(id);
    res.setHeader(
      'Content-disposition',
      'attachment; filename=' + title + '.apkg',
    );
    res.setHeader('Content-type', 'application/zip');
    Readable.from(ankiZip).pipe(res);
  }

  @Get()
  async findAllDecks() {
    return this.decksService.findAllDecks();
  }
}
