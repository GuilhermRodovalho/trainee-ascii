import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Video from '../models/Video';

export default class DeleteVideoService {
  public async execute(id: string): Promise<void> {
    const videoRepository = getRepository(Video);

    const video = await videoRepository.findOne({
      where: {
        id,
      },
    });

    if (!video) {
      throw new Error("This video doesn't exist on database");
    }

    const videoFilePath = path.resolve(
      __dirname,
      '..',
      '..',
      'videos',
      video.name,
    );

    const statusVideoFile = await fs.promises.stat(videoFilePath);

    if (statusVideoFile) {
      await fs.promises.unlink(videoFilePath);
    }

    await videoRepository.delete(video);
  }
}
