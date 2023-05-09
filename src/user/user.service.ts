import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create.user.dto';
import { CreateUserWithSocialDto } from './dtos/create.user.with.social.dto';
import { ERROR } from 'src/common/constants/error.message.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const { email } = dto;

    const user = await this.findOneByEmail(email);

    if (user) throw ERROR.EMAIL.ALREADY_EXIST;

    const newUser = this.userRepository.create(dto);
    await this.userRepository.save(newUser);

    return newUser;
  }

  async createUserWithSocial(dto: CreateUserWithSocialDto) {
    const newUser = this.userRepository.create(dto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async findOneById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneByIdOrFail(id: string): Promise<User> {
    const user = await this.findOneById(id);
    if (user) return user;

    throw ERROR.USER.NOT_FOUND;
  }

  async findOneByEmailOrFail(email: string): Promise<User> {
    const user = await this.findOneByEmail(email);
    if (user) return user;

    throw ERROR.USER.NOT_FOUND;
  }
}
