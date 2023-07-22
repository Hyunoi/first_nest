import { Transform } from "class-transformer";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { NotIn } from "../not-in";


export class CreateUserDto {
    @Transform(params => params.value.trim())
    @IsString()     // 문자열 형식을 따르는가
    @MinLength(2)   // 글자 개수 확인
    @MaxLength(30)  
    readonly name: string;

    @IsString()
    @MaxLength(60)
    @IsEmail()      // 이메일 형식을 따르는가
    readonly email: string;

    @NotIn('password', {message: 'password는 name과 같은 문자열을 포함할 수 없습니다. '})
    @IsString()
    @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
    readonly password: string;
}
