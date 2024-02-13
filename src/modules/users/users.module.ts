import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { User } from './user.model';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [ObjectionModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {}
