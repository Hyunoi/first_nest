import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { EmailService } from './email/email.service';
import { UserRepository } from './email/users.repository';
import { EmailModule } from './email/email.module';

@Module({
  imports: [ UsersModule, EmailModule ]
})
export class AppModule {}
