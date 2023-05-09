import { Provider } from '../entities/provider.enum';

export class CreateUserWithSocialDto {
  email: string;
  provider: Provider;
}
