import { PickType } from '@nestjs/swagger';
import { CreateVideoDto } from './create.video.dto';

export class UpdateVideoDto extends PickType(CreateVideoDto, ['user']) {}
