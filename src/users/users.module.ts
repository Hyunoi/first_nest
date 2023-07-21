import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EmailService } from 'src/email/email.service';
import { UserRepository } from './users.repository';

@Module({
  imports: [ ],
  controllers: [ UsersController],
  providers: [UsersService, EmailService, UserRepository ]
})
export class UsersModule {}
