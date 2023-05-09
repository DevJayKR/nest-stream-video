import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomResponse } from 'src/common/custom.response.ts';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { GetUser } from 'src/common/decorators/GetUser.decorator';
import { GoogleAuthGuard } from './guards/google.auth.guard';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@GetUser() user: User): Promise<CustomResponse> {
    return new CustomResponse('로그인 성공', user);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin(): CustomResponse {
    return new CustomResponse('google login');
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleLoginCallback(@GetUser() user: User): CustomResponse {
    return new CustomResponse('로그인 성공', user);
  }
}
