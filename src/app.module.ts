import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entity/user.entity';

@Module({
  imports: [ UsersModule,
     EmailModule,
     TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 23306,
      username: "root",
      password: "mysql1234",
      database: "test",
      entities: [UserEntity],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
