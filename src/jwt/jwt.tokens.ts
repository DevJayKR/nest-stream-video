import { ApiProperty } from '@nestjs/swagger';

export class JwtTokens {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExZGMwNDcxLTZhNjgtNDc3NC1iOWIyLWQwODM2MTdiMTgwOCIsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlIiwiaWF0IjoxNjgzNTMzNDk1LCJleHAiOjE2ODM2MTk4OTV9.1Q9dNW2hGAXQrUUPc4Qh3KPJyv36qN2tLIRvIoxVlms',
  })
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExZGMwNDcxLTZhNjgtNDc3NC1iOWIyLWQwODM2MTdiMTgwOCIsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlIiwiaWF0IjoxNjgzNTMzNDk1LCJleHAiOjE2ODM2MTk4OTV9.1Q9dNW2hGAXQrUUPc4Qh3KPJyv36qN2tLIRvIoxVlms',
  })
  refreshToken: string;
}
