import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Controller('videos')
export class VideoController {
  constructor(private readonly service: VideoService) {}

  // 📤 Upload Video
  @Post()
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './uploads/videos',
        filename: (_, file, cb) => {
          const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
      limits: {
        fileSize: 100 * 1024 * 1024, // 100MB
      },
    }),
  )
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateVideoDto,
  ) {
    const videoUrl = `/uploads/videos/${file.filename}`;
    return this.service.create(dto, videoUrl);
  }

  // 📃 Get all videos
  @Get()
  async  findAll() {
    return this.service.findAll();
  }

  // 🔍 Get video by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // ✏️ Update video metadata
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateVideoDto,
  ) {
    return this.service.update(id, dto);
  }

  // 🗑 Delete video
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
