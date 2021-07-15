import { getRepository } from 'typeorm';
import Folder from '../models/Folder';
import Video from '../models/Video';

class AddVideoToFolderService {
  public async execute(
    folderId: string,
    videoId: string,
  ): Promise<Folder | boolean> {
    const folderRepository = getRepository(Folder);
    const videoRepository = getRepository(Video);

    const folder = await folderRepository.findOne({
      where: {
        id: folderId,
      },
      relations: ['videos'],
    });

    if (!folder) {
      throw new Error("This folder doesn't exist");
    }

    const video = await videoRepository.findOne({
      where: {
        id: videoId,
      },
    });

    if (!video) {
      throw new Error("This vídeo doesn't exist");
    }

    // Testa se o vídeo já está na pasta.

    const isvideoalreadyonfolder = folder.videos.find(
      foldervideo => foldervideo.id === video.id,
    );

    if (isvideoalreadyonfolder) {
      throw new Error('This video is already linked to this folder');
    }

    try {
      folder.videos.push(video);

      await folderRepository.save(folder);
    } catch (_) {
      throw new Error('Internal error');
    }
    return folder;
  }
}

export default AddVideoToFolderService;
