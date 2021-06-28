import { getRepository } from 'typeorm';
import Video from '../models/Video';

class UploadVideoService {
  public async execute(name: string, duration: number): Promise<Video> {
    const videoRepository = getRepository(Video);

    const video = videoRepository.create({
      name,
      duration,
    });

    await videoRepository.save(video);

    return video;
  }
}

export default UploadVideoService;
