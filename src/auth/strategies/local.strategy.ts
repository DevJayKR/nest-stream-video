import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Provider } from 'src/user/entities/provider.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, Provider.LOCAL) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string) {
    const user = await this.authService.login({ email, password });

    return user;
  }
}
