import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { dataSource } from 'src/main';

@Injectable()
export class VideoService {
    private readonly videoRepo = dataSource.getRepository(Video);

  async create(dto: CreateVideoDto, videoUrl: string) {
    const video = this.videoRepo.create({
      ...dto,
      videoUrl,
    });
    return this.videoRepo.save(video);
  }

 async findAll() {
    return this.videoRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const video = await this.videoRepo.findOne({ where: { id } });
    if (!video) throw new NotFoundException('Video not found');
    return video;
  }

  async update(id: string, dto: UpdateVideoDto) {
    const video = await this.findOne(id);
    Object.assign(video, dto);
    return this.videoRepo.save(video);
  }

  async remove(id: string) {
    const video = await this.findOne(id);
    await this.videoRepo.remove(video);
    return { message: 'Video deleted successfully' };
  }
}
