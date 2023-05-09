import { NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';

export const ERROR = {
  PASSWORD: {
    NOT_MATCH: new UnauthorizedException('비밀번호가 일치하지 않습니다.'),
  },

  EMAIL: {
    NOT_FOUND: new NotFoundException('존재하지 않는 이메일입니다.'),
    ALREADY_EXIST: new UnprocessableEntityException('이미 사용중인 이메일입니다.'),
  },

  USER: {
    NOT_FOUND: new NotFoundException('존재하지 않는 유저입니다.'),
  },

  AUTH: {
    PROVIDER_NOT_MATCH: new UnauthorizedException('로그인 제공자가 일치하지 않습니다.'),
  },
};
