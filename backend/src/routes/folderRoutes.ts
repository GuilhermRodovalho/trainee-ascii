import { Router } from 'express';
import { getRepository } from 'typeorm';
import Folder from '../models/Folder';
import CreateFolderService from '../services/CreateFolderService';
import DeleteFolderService from '../services/DeleteFolderService';
import PutFolderIntoFolderService from '../services/PutFolderIntoFolderService';
import RemoveFolderFromOtherFolderService from '../services/RemoveFolderFromOtherFolderService';

const folderRoutes = Router();

// Retorna todas as pastas da aplicação
folderRoutes.get('/folders', async (_, response) => {
  try {
    const folderRepository = getRepository(Folder);

    const folders = await folderRepository.find({
      relations: ['videos', 'parentFolder'],
    });

    return response.json(folders);
  } catch (err) {
    return response.status(500).json({ error: err.message });
  }
});

// Cria uma pasta
folderRoutes.post('/create-folder', async (request, response) => {
  const { name } = request.body;

  try {
    const createFolderService = new CreateFolderService();

    const folder = await createFolderService.execute(name);

    return response.json(folder);
  } catch (err) {
    return response.status(500).json({ error: err.message });
  }
});

// Coloca uma pasta dentro de outra
folderRoutes.post('/put-into-folder', async (request, response) => {
  const { parentFolderId, childFolderId } = request.body;

  try {
    const putFolderIntoFolderService = new PutFolderIntoFolderService();

    await putFolderIntoFolderService.execute(parentFolderId, childFolderId);

    return response.send();
  } catch (err) {
    return response.status(500).json({ error: err.message });
  }
});

// Move uma pasta diretamente pra raiz
folderRoutes.post('/remove-from-other-folder', async (request, response) => {
  const { folderId } = request.body;

  const removeFolderFromOtherFolderService =
    new RemoveFolderFromOtherFolderService();

  const folder = await removeFolderFromOtherFolderService.execute(folderId);

  return response.json(folder);
});

// Deleta uma pasta
folderRoutes.delete('/folder', async (request, response) => {
  const { id } = request.body;

  try {
    const deleteFolderService = new DeleteFolderService();

    await deleteFolderService.execute(id);

    return response.send();
  } catch (err) {
    return response.status(500).json({ error: err.message });
  }
});

export default folderRoutes;
