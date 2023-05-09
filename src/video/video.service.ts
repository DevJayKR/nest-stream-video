import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { Repository } from 'typeorm';
import { CreateVideoDto } from './dtos/create.video.dto';
import { FindOption } from './find.option';
import { UpdateVideoDto } from './dtos/update.video.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
  ) {}

  private path = `${__dirname}/../assets/`;

  async create(dto: CreateVideoDto): Promise<Video> {
    const { filename, user, id } = dto;

    const newVideo = this.videoRepository.create({
      id,
      filename,
      user,
    });

    await this.videoRepository.save(newVideo);

    return await this.findOneByOption({ id: newVideo.id });
  }

  async updateVideo(id: string, dto: UpdateVideoDto): Promise<Video> {
    await this.videoRepository.update(id, dto);

    return await this.findOneByOption({ id });
  }

  async findOneByOption(options: FindOption) {
    return await this.videoRepository.findOneBy(options);
  }

  async findAll() {
    return await this.videoRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findVideoForStream(id: string) {
    const video = await this.videoRepository.findOneBy({ id });
    if (video) return video.id + '_' + video.filename;
  }
}
