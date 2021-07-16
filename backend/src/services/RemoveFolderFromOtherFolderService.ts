import { getRepository } from 'typeorm';
import Folder from '../models/Folder';

export default class RemoveFolderFromOtherFolderService {
  public async execute(id: String): Promise<Folder> {
    const folderRepository = getRepository(Folder);

    const folder = await folderRepository.findOne({
      where: {
        id,
      },
    });

    if (!folder) {
      throw new Error("This folder doesn't exist");
    }

    folder.parentFolder = null;

    folderRepository.save(folder);

    return folder;
  }
}
