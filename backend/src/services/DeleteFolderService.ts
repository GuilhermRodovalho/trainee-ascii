import { getRepository } from 'typeorm';
import Folder from '../models/Folder';

export default class DeleteFolderService {
  public async execute(id: string): Promise<void> {
    const folderRepository = getRepository(Folder);

    await folderRepository.delete({ id });
  }
}
