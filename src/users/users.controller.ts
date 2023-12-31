import { Controller, Post, Body, Param, Query, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { ValidationPipe } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post()
  async createUser(@Body(ValidationPipe) dto: CreateUserDto) : Promise<void> {
    const { name, email, password } = dto;
    await this.usersService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<void> {
      const { signupVerifyToken } = dto;

      return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<UserEntity> {
    const { email, password } = dto;

    return await this.usersService.login(email, password);
  }

  @Get('/:id')
  async getUserInfo(@Param('id', ValidationPipe) userId: number): Promise<UserEntity> {
    return await this.usersService.getUserInfo(userId);
  }
}
