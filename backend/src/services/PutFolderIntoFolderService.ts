import { getRepository } from 'typeorm';
import Folder from '../models/Folder';

export default class PutFolderIntoFolderService {
  public async execute(
    parentFolderId: String,
    childFolderId: String,
  ): Promise<Folder> {
    const folderRepository = getRepository(Folder);

    const childFolder = await folderRepository.findOne({
      where: {
        id: childFolderId,
      },
    });

    if (!childFolder) throw new Error("This folder doesn't exist");

    const parentFolder = await folderRepository.findOne({
      where: {
        id: parentFolderId,
      },
    });

    if (!parentFolder) throw new Error("This folder doesn't exist");

    childFolder.parentFolder = parentFolder;
    await folderRepository.save(childFolder);

    if (!parentFolder.childFolders) {
      parentFolder.childFolders = [childFolder];
    } else {
      parentFolder.childFolders.push(childFolder);
    }

    await folderRepository.save(parentFolder);

    return parentFolder;
  }
}
