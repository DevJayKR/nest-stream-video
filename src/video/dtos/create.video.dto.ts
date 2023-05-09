import { User } from 'src/user/entities/user.entity';

export class CreateVideoDto {
  id: string;
  filename: string;
  user: User;
}
