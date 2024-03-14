import { UserInfo } from 'src/utils/userInfo.decorator';

import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('회원 정보')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 가입
   * @param createUserDto 
   * @returns 
   */
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.userService.signup(
      createUserDto.email,
      createUserDto.password,
      createUserDto.point,
      createUserDto.is_admin,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get('email')
  getEmail(@UserInfo() user: User) {
    return { email: user.email, point: user.point };
  }
}
