import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { UserRepository } from 'src/email/users.repository';

@Module({
    providers: [EmailService, UserRepository],
    exports: [EmailService, UserRepository],
})
export class EmailModule {}
