import { registerAs } from '@nestjs/config';

export default registerAs('JwtConfig', () => ({
  accessKey: process.env.JWT_ACCESS_KEY,
  accessExp: process.env.JWT_ACCESS_EXP_TIME,

  refreshKey: process.env.JWT_REFRESH_KEY,
  refreshExp: process.env.JWT_REFRESH_EXP_TIME,
}));
