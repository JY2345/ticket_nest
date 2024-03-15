import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class CreateUserDto extends PickType(User, [
  'email',
  'password',
  'point',
  'is_admin',
] as const) {

  /**
   * 이메일
   * @example "user@email.com"
   */
  @IsString()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  /**
   * 비밀번호
   * @example "1234"
   */
  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;

  /**
   * 관리자 여부
   * @example false
   */
  @IsBoolean({ message: '회원 권한을 입력하세요.' })
  is_admin: boolean;
}
