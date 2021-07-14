import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreatePlaylistService from '../services/CreatePlaylistService';
import Playlist from '../models/Playlist';
import DeletePlaylistService from '../services/DeletePlaylistService';

import videoRoutes from './videoRoutes';

const playlistRouter = Router();

playlistRouter.use(videoRoutes);

playlistRouter.get('/playlists', async (request, response) => {
  const playlistRepository = getRepository(Playlist);

  const videos = await playlistRepository.find();

  return response.json(videos);
});

playlistRouter.get('/playlist/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const playlistRepository = getRepository(Playlist);
    const playlist = await playlistRepository.find({
      where: {
        id,
      },
      relations: ['videos'],
    });
    return response.json(playlist);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

playlistRouter.get('/get-time/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const playlistRepository = getRepository(Playlist);

    const playlist = await playlistRepository.findOne({
      where: {
        id,
      },
      relations: ['videos'],
    });

    if (!playlist) {
      return response.sendStatus(400);
    }

    let time = 0;
    playlist.videos.forEach(video => {
      time += video.duration;
    });

    return response.status(200).json({ time });
  } catch (error) {
    return response.json({ error: error.message });
  }
});

playlistRouter.post('/create-playlist', async (request, response) => {
  const { name } = request.body;

  const createPlaylistService = new CreatePlaylistService();

  const playlist = await createPlaylistService.execute(name);

  return response.json(playlist);
});

playlistRouter.delete('/playlist', async (request, response) => {
  const { id } = request.body;

  const deletePlaylistService = new DeletePlaylistService();

  await deletePlaylistService.execute(id);

  return response.send();
});

export default playlistRouter;
