import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService as Jwt } from '@nestjs/jwt';
import JwtConfig from 'src/config/jwt.config';
import { JwtPayload } from './jwt.payload';
import { JwtTokens } from './jwt.tokens';

@Injectable()
export class JwtService {
  constructor(
    @Inject(JwtConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof JwtConfig>,
    private jwt: Jwt,
  ) {}

  private timeUnit = 'ms';

  generateAccessToken(payload: JwtPayload): string {
    return this.jwt.sign(payload, {
      secret: this.jwtConfig.accessKey,
      expiresIn: this.jwtConfig.accessExp + this.timeUnit,
    });
  }

  generateRefreshToken(payload: JwtPayload): string {
    return this.jwt.sign(payload, {
      secret: this.jwtConfig.refreshKey,
      expiresIn: this.jwtConfig.refreshExp + this.timeUnit,
    });
  }

  generateTokens(payload: JwtPayload): JwtTokens {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  verifyAccessToken(token: string) {
    return this.jwt.verify(token, {
      secret: this.jwtConfig.accessKey,
    });
  }

  verifyRefreshToken(token: string) {
    return this.jwt.verify(token, {
      secret: this.jwtConfig.refreshKey,
    });
  }
}
