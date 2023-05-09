import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth2';
import GoogleAuthConfig from 'src/config/google.auth.config';
import { UserService } from 'src/user/user.service';
import { JwtService } from 'src/jwt/jwt.service';
import { Provider } from 'src/user/entities/provider.enum';
import { ERROR } from 'src/common/constants/error.message.constant';

const provider: Provider = Provider.GOOGLE;

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, provider) {
  constructor(
    @Inject(GoogleAuthConfig.KEY)
    private readonly googleAuthConfig: ConfigType<typeof GoogleAuthConfig>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    super({
      clientID: googleAuthConfig.clientId,
      clientSecret: googleAuthConfig.clientSecret,
      callbackURL: googleAuthConfig.callbackUrl,
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { email } = profile;

    const user = await this.userService.findOneByEmail(email);

    if (user) {
      const tokens = this.jwtService.generateTokens({
        email: user.email,
        id: user.id,
      });

      if (user.provider === provider) return tokens;
      else throw ERROR.AUTH.PROVIDER_NOT_MATCH;
    } else {
      const newUser = await this.userService.createUserWithSocial({
        email,
        provider,
      });

      const tokens = this.jwtService.generateTokens({
        email: newUser.email,
        id: newUser.id,
      });

      return tokens;
    }
  }
}
