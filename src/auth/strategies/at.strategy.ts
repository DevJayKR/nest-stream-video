import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from 'src/jwt/jwt.payload';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'at') {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly config: ConfigType<typeof jwtConfig>,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.accessKey,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOneById(payload.id);

    return user;
  }
}
