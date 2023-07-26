import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    ) {}

    async createUser(name: string, email: string, password: string) {
      await this.checkUserExists(email);

      const signupVerifyToken = uuid.v1();

      await this.saveUser(name, email, password, signupVerifyToken);
      await this.sendMemberJoinEmail(email, signupVerifyToken);        
    }

		async checkUserExists(email: string) { // 회원 존재 여부 확인
      const user = await this.userRepository.findOne({
        where: {email: email}
      });
      console.log(user);
      if(user != null)
          throw Error("이미 존재하는 유저 입니다.");
      return user;
    }

		async saveUser(name: string, email: string, password: string, uniqueKey: string){
      const user = new UserEntity();
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = uniqueKey;
      user.isDone = false
      await this.userRepository.save(user);
    }

    private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
      // 회원 가입 인증 이메일을 발송
      await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
    }

    async verifyEmail(signupVerifyToken: string): Promise<void> {
      const user: any = await this.userRepository.findOne({
        where: {signupVerifyToken: signupVerifyToken}
      });
      if(user == null)
          throw new Error("해당 토큰을 가진 유저는 없습니다.");
      
      user.isDone = true; // 유저 정보 중 메일 인증이 완료됨으로 변경!
      await this.userRepository.save(user);
    }

    async login(email: string, password: string) {
      const user = await this.userRepository.findOne({
        where: {email: email}
      });

      if(user == null)
          throw new Error("로그인 실패 - 잘못된 이메일");

      if(user.isDone == false)
          throw new Error("로그인 실패 - 이메일 미인증");
          
      if(user.password != password)
          throw new Error("로그인 실패 - 잘못된 비밀번호");

      return user;
    }

    async getUserInfo(userId: number) {
      const user = await this.userRepository.findOne({
        where: {id: userId}
      });
      return user;
  }
}