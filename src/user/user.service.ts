import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { Repository } from 'typeorm';

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(
    email: string,
    password: string,
    is_admin: boolean,
  ) {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }
    const firstPoint = 1000000;
    const hashedPassword = await hash(password, 10);
    await this.userRepository.save({
      email,
      password: hashedPassword,
      point : firstPoint,
      is_admin,
    });
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });
    if (_.isNil(user)) {
      throw new NotFoundException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new NotFoundException('비밀번호를 확인해주세요.');
    }

    const payload = { email, sub: user.id, is_admin: user.is_admin };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
