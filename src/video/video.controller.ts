import {
  Controller,
  UseInterceptors,
  Post,
  Get,
  Header,
  Headers,
  HttpStatus,
  Param,
  Res,
  UploadedFile,
  UseGuards,
  ClassSerializerInterceptor,
  Put,
  Body,
} from '@nestjs/common';
import * as fs from 'fs';
import { createReadStream } from 'fs';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/user/entities/roles.enum';
import { CustomResponse } from 'src/common/custom.response.ts';
import { MulterOption } from './multer.options';
import { fileBuilder } from './file.pipe.builder';
import { GetUser } from 'src/common/decorators/GetUser.decorator';
import { User } from 'src/user/entities/user.entity';
import { VideoService } from './video.service';
import { UpdateVideoDto } from './dtos/update.video.dto';

@Controller('video')
@UseInterceptors(ClassSerializerInterceptor)
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  async findAllVideos() {
    return await this.videoService.findAll();
  }

  @Get(':id')
  async findOneVideo(@Param('id') id: string) {
    return await this.videoService.findOneByOption({ id });
  }

  @Put(':id')
  async updateVideo(@Param('id') id: string, @Body() dto: UpdateVideoDto) {
    return await this.videoService.updateVideo(id, dto);
  }

  @Post()
  @UseGuards(RoleGuard(Roles.ADMIN))
  @UseInterceptors(FileInterceptor('video', MulterOption))
  async uploadFile(
    @UploadedFile(fileBuilder)
    file: Express.Multer.File,
    @GetUser() user: User,
  ): Promise<CustomResponse> {
    const [id, filename] = file.filename.split('_');

    const newVideo = await this.videoService.create({
      id,
      filename,
      user,
    });

    return new CustomResponse('업로드 성공', newVideo);
  }

  @Get('/stream/:id')
  @Header('Accept-Ranges', 'bytes')
  @Header('Content-Type', 'video/mp4')
  async getStreamVideo(@Param('id') id: string, @Headers() headers, @Res() res: Response) {
    const video = await this.videoService.findVideoForStream(id);
    const videoPath = __dirname + `/../assets/${video}`;

    const { size } = fs.statSync(videoPath);
    const videoRange = headers.range;
    if (videoRange) {
      const parts = videoRange.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
      const chunksize = end - start + 1;
      const readStreamFile = createReadStream(videoPath, {
        start,
        end,
        highWaterMark: 60,
      });

      const head = {
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Content-length': chunksize,
      };
      res.writeHead(HttpStatus.PARTIAL_CONTENT, head);
      readStreamFile.pipe(res);
    } else {
      const head = { 'Content-Length': size };

      res.writeHead(HttpStatus.OK, head);
      createReadStream(videoPath).pipe(res);
    }
  }
}
