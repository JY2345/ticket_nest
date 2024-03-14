import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  /**
   * 이메일
   * @example "user@email.com"
   */
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  /**
   * 비밀번호
   * @example "1234"
   */
  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;
}
