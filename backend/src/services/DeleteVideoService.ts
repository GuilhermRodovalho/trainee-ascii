import { getRepository } from 'typeorm';
import Video from '../models/Video';

export default class DeleteVideoService {
  public async execute(id: string): Promise<void> {
    const videoRepository = getRepository(Video);

    await videoRepository.delete({ id });
  }
}
