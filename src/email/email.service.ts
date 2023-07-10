import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';

// 메일 옵션 타입
interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

@Injectable()
export class EmailService {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'nhe0622@gmail.com', // 본인 Gmail 계장
                pass: 'rhfygxnumjejisht' // 앱 비밀번호
            }
        });
    }

    async sendMemberJoinVerification(emailAddress: string, signupVerifyToken: string) {
        const baseUrl = 'http://localhost:3000';

				// 유저가 누를 버튼이 가질 링크
				// 이 링크를 통해 서버로 이메일 인증 요청이 다시 들어오는 것임!!
        const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

        const mailOptions: EmailOptions = {
            to: emailAddress,
            subject: '가입 인증 메일',

						// 메일 본문 구성 (form 태그로 POST 요청)
            html: `가입 확인 버튼을 누르시면 가입 인증이 완료됩니다.<br/>
                <form action="${url}" method="POST">
                    <button>가입확인</button>
                </form>
            `
        }

				// 메일 전송
        return await this.transporter.sendMail(mailOptions);
    }
}