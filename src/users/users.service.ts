import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
  constructor(private emailService: EmailService) {}
    async createUser(name: string, email: string, password: string) {
        await this.checkUserExists(email);

        const signupVerifyToken = uuid.v1();

        await this.saveUser(name, email, password, signupVerifyToken);
        await this.sendMemberJoinEmail(email, signupVerifyToken);        
    }

		private checkUserExists(email: string) { // 회원 존재 여부 확인
      return false;
    }

		private saveUser(name: string, email: string, password: string, signupVerifyToken: string){
        return;
    }

    private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
				// 회원 가입 인증 이메일을 발송
        console.log("hi");
        await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
        console.log("'bye'")
    }
}