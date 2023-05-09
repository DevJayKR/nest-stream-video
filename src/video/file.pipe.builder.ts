import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export const fileBuilder = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: 'video/mp4',
  })
  .addMaxSizeValidator({
    maxSize: 10 * 1024 * 1024,
  })
  .build({
    fileIsRequired: true,
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });
