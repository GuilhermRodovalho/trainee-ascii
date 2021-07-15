import { getRepository } from 'typeorm';
import Folder from '../models/Folder';

class CreateFolderService {
  public async execute(name: string): Promise<Folder> {
    const folderRepository = getRepository(Folder);

    const playlist = folderRepository.create({
      name,
      videos: [],
    });

    await folderRepository.save(playlist);

    return playlist;
  }
}

export default CreateFolderService;
