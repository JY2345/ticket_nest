import { IsString, IsNotEmpty, IsBoolean , IsNumber} from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class CreateUserDto extends PickType(User, [
  'email',
  'password',
  'is_admin',
] as const) {
  @IsString()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;
  
  @IsNumber({}, { message: '포인트를 숫자로 입력해주세요.' })
  point : number;

  @IsBoolean({ message: '회원 권한을 입력하세요.' })
  is_admin: boolean;
}
