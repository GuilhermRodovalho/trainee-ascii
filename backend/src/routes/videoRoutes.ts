import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import Video from '../models/Video';
import UploadVideoService from '../services/UploadVideoService';
import DeleteVideoService from '../services/DeleteVideoService';
import ConnectVideoToPlaylistService from '../services/ConnectVideoToPlaylistService';
import DisconnectVideoFromPlaylistService from '../services/DisconnectVideoFromPlaylistService';
import AddVideoToFolderService from '../services/AddVideoToFolderService';
import RemoveVideoFromFolderService from '../services/RemoveVideoFromFolderService';

import uploadConfig from '../config/upload';

const videoRouter = Router();

const upload = multer(uploadConfig);

videoRouter.get('/videos', async (_, response) => {
  const videoRepository = getRepository(Video);

  const videos = await videoRepository.find();

  return response.json(videos);
});

videoRouter.post(
  '/upload',
  upload.single('video'),
  async (request, response) => {
    try {
      const uploadVideoService = new UploadVideoService();

      if (!request.file) {
        return response
          .status(400)
          .json({ error: 'There must be file passed to this route' });
      }

      const video = await uploadVideoService.execute(request.file);

      return response.json(video);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
);

videoRouter.post('/add-to-playlist', async (request, response) => {
  const { playlistId, videoId } = request.body;

  const associateVideoToPlaylistService = new ConnectVideoToPlaylistService();

  try {
    const playlist = await associateVideoToPlaylistService.execute(
      playlistId,
      videoId,
    );
    return response.json(playlist);
  } catch (error) {
    return response.json({ error: error.message });
  }
});

videoRouter.post('/add-to-folder', async (request, response) => {
  const { folderId, videoId } = request.body;

  const addVideoToFolderService = new AddVideoToFolderService();

  try {
    const folder = await addVideoToFolderService.execute(folderId, videoId);

    return response.json(folder);
  } catch (err) {
    return response.json({ error: err.message });
  }
});

videoRouter.delete('/remove-from-folder', async (request, response) => {
  const { folderId, videoId } = request.body;

  try {
    const removeVideoFromFolderService = new RemoveVideoFromFolderService();

    const folder = await removeVideoFromFolderService.execute(
      folderId,
      videoId,
    );

    return response.json(folder);
  } catch (err) {
    return response.status(500).jsonp({ error: err.message });
  }
});

videoRouter.delete('/video', async (request, response) => {
  try {
    const { id } = request.body;

    const deleteVideoService = new DeleteVideoService();

    await deleteVideoService.execute(id);

    return response.sendStatus(200);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

videoRouter.delete('/remove-from-playlist', async (request, response) => {
  const { playlistId, videoId } = request.body;

  const disconnectVideoToPlaylistService =
    new DisconnectVideoFromPlaylistService();

  try {
    const playlist = await disconnectVideoToPlaylistService.execute(
      playlistId,
      videoId,
    );
    return response.json(playlist);
  } catch (error) {
    return response.json({ error: error.message });
  }
});

export default videoRouter;
