import { Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';
import { ERROR } from 'src/common/constants/error.message.constant';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.userService.findOneByEmail(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const tokens = this.jwtService.generateTokens({ id: user.id, email: user.email });
        return tokens;
      }

      throw ERROR.PASSWORD.NOT_MATCH;
    }

    throw ERROR.EMAIL.NOT_FOUND;
  }
}
