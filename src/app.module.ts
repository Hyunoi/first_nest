import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { EmailService } from './email/email.service';
import { UserRepository } from './users/users.repository';

@Module({
  imports: [ UsersModule ],
  controllers: [ UsersController ],
  providers: [ UsersService, UserRepository, EmailService ],
})
export class AppModule {}
