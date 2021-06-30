import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import UploadVideoService from '../services/UploadVideoService';
import CreatePlaylistService from '../services/CreatePlaylistService';
import Video from '../models/Video';
import Playlist from '../models/Playlist';
import DeleteVideoService from '../services/DeleteVideoService';
import ConnectVideoToPlaylistService from '../services/ConnectVideoToPlaylistService';
import DisconnectVideoFromPlaylistService from '../services/DisconnectVideoFromPlaylistService';
import DeletePlaylistService from '../services/DeletePlaylistService';

import uploadConfig from '../config/upload';

const routes = Router();

const upload = multer(uploadConfig);

routes.get('/videos', async (_, response) => {
  const videoRepository = getRepository(Video);

  const videos = await videoRepository.find();

  return response.json(videos);
});

routes.get('/playlists', async (request, response) => {
  const playlistRepository = getRepository(Playlist);

  const videos = await playlistRepository.find({
    relations: ['videos'],
  });

  return response.json(videos);
});

routes.post('/upload', upload.single('video'), async (request, response) => {
  try {
    const uploadVideoService = new UploadVideoService();

    const video = await uploadVideoService.execute(request);

    return response.json(video);
  } catch (error) {
    return response.status(400).json({ message: `${error}` });
  }
});

routes.post('/create-playlist', async (request, response) => {
  const { name } = request.body;

  const createPlaylistService = new CreatePlaylistService();

  const playlist = await createPlaylistService.execute(name);

  return response.json(playlist);
});

routes.post('/add-to-playlist', async (request, response) => {
  const { playlistId, videoId } = request.body;

  const associateVideoToPlaylistService = new ConnectVideoToPlaylistService();

  try {
    const playlist = await associateVideoToPlaylistService.execute(
      playlistId,
      videoId,
    );
    response.json(playlist);
  } catch (error) {
    response.json({ message: `${error}` });
  }
});

routes.delete('/remove-from-playlist', async (request, response) => {
  const { playlistId, videoId } = request.body;

  const disconnectVideoToPlaylistService =
    new DisconnectVideoFromPlaylistService();

  try {
    const playlist = await disconnectVideoToPlaylistService.execute(
      playlistId,
      videoId,
    );
    response.json(playlist);
  } catch (error) {
    response.json({ message: `${error}` });
  }
});

routes.delete('/video', async (request, response) => {
  const { id } = request.body;

  const deleteVideoService = new DeleteVideoService();

  await deleteVideoService.execute(id);

  response.send();
});

routes.delete('/playlist', async (request, response) => {
  const { id } = request.body;

  const deletePlaylistService = new DeletePlaylistService();

  await deletePlaylistService.execute(id);

  response.send();
});

export default routes;
