import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user-decorator';
import { User } from './user.model';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id/decks')
  getUsersDecks(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findUsersDecks(id);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  getCurrentUser(@CurrentUser() user: User) {
    return user;
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) userId: string) {
    return this.usersService.findById(userId);
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
