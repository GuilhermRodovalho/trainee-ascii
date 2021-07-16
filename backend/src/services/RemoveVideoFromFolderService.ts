import { getRepository } from 'typeorm';
import Folder from '../models/Folder';

export default class RemoveVideoFromFolderService {
  public async execute(folderId: String, videoId: String): Promise<Folder> {
    const folderRepository = getRepository(Folder);

    const folder = await folderRepository.findOne({
      where: {
        id: folderId,
      },
      relations: ['videos'],
    });

    if (!folder) {
      throw new Error("This folder doesn't exist");
    }

    folder.videos = folder.videos.filter(video => {
      if (video.id === videoId) {
        return false;
      }

      return true;
    });

    await folderRepository.save(folder);

    return folder;
  }
}
