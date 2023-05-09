import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { CustomResponse } from 'src/common/custom.response.ts';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from './entities/roles.enum';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<CustomResponse> {
    return new CustomResponse('회원가입 성공', await this.userService.createUser(dto));
  }

  @Get()
  @UseGuards(RoleGuard(Roles.ADMIN))
  async findUsers(@Query('id') id?: string, @Query('email') email?: string): Promise<CustomResponse> {
    if (id) return new CustomResponse(`${id} 조회 성공`, await this.userService.findOneByIdOrFail(id));
    if (email) return new CustomResponse(`${email} 조회 성공`, await this.userService.findOneByEmailOrFail(email));
    else return new CustomResponse('모든 유저 조회 성공', await this.userService.findAllUsers());
  }
}
