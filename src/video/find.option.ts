import { FindOptionsWhere } from 'typeorm';
import { Video } from './entities/video.entity';

export interface FindOption extends FindOptionsWhere<Video> {
  id?: string;
  filename?: string;
}
