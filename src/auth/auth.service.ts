import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/LoginDto.dto';
import { ADMIN_INFO } from 'src/constant';
import { makeRes } from 'src/utils/makeRes';
import { JwtService } from '@nestjs/jwt';
import { Nonstudent } from 'src/entities/Nonstudent';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Nonstudent)
    private nonstudentRepository: Repository<Nonstudent>,
  ) {}

  async login(loginDto: LoginDto) {
    // check admin credentials
    if (
      loginDto.username === ADMIN_INFO.username &&
      loginDto.password === ADMIN_INFO.password
    ) {
      const payload = {
        role: 'admin',
      };
      return makeRes(
        {
          accessToken: this.jwtService.sign(payload),
        },
        'Login success',
      );
    }

    // check nonstudent credentials
    const nonstudent = await this.nonstudentRepository.findOne({
      where: { username: loginDto.username },
    });
    // if nonstudent not found
    if (!nonstudent) {
      return makeRes('error', 'Không tìm thấy tài khoản', true);
    }
    // if nonstudent found
    const isMatch = await bcrypt.compare(
      loginDto.password,
      nonstudent.password,
    );
    if (isMatch) {
      const payload = {
        role: 'nonstudent',
        username: nonstudent.username,
      };
      return makeRes(
        {
          accessToken: this.jwtService.sign(payload),
        },
        'Login success',
      );
    }
    // if password not match
    return makeRes('error', 'Đăng nhập thất bại', true);
  }
}
