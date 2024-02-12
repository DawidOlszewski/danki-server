import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id/decks')
  getUsersDecks(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findUsersDecks(id);
  }
}
