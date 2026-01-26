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
    // private readonly videoRepo = dataSource.getRepository(Video);

async create(dto: CreateVideoDto, videoUrl: string) {
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const videoRepo = queryRunner.manager.getRepository(Video);

    const video = videoRepo.create({
      ...dto,
      videoUrl,
    });

    const savedVideo = await videoRepo.save(video);

    await queryRunner.commitTransaction();
    return savedVideo;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}


    async findAll() {
      const qr = dataSource.createQueryRunner();
      await qr.connect();

      try {
        return qr.manager.find(Video, {
          order: { createdAt: 'DESC' },
        });
      } finally {
        await qr.release();
      }
    }

    async findOne(id: string) {
      const qr = dataSource.createQueryRunner();
      await qr.connect();

      try {
        return qr.manager.find(Video, {
          where: { id: id},
        });
      } finally {
        await qr.release();
      }
    }

    async update(id: string, dto: UpdateVideoDto) {
      const qr = dataSource.createQueryRunner();
      await qr.connect();
      await qr.startTransaction();

      try {
        const repo = qr.manager.getRepository(Video);
        const video = await repo.findOne({ where: { id } });

        if (!video) throw new NotFoundException('Video not found');

        Object.assign(video, dto);
        const updated = await repo.save(video);

        await qr.commitTransaction();
        return updated;
      } catch (err) {
        await qr.rollbackTransaction();
        throw err;
      } finally {
        await qr.release();
      }
    }


    async remove(id: string) {
      const qr = dataSource.createQueryRunner();
      await qr.connect();
      await qr.startTransaction();

      try {
        const repo = qr.manager.getRepository(Video);
        const video = await repo.findOne({ where: { id } });

        if (!video) throw new NotFoundException('Video not found');

        await repo.remove(video);
        await qr.commitTransaction();

        return { message: 'Video deleted successfully' };
      } catch (err) {
        await qr.rollbackTransaction();
        throw err;
      } finally {
        await qr.release();
      }
    }

}
