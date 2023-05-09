import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomResponse } from './common/custom.response.ts';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): CustomResponse {
    return new CustomResponse('Hello, World');
  }
}
