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

  const videos = await playlistRepository.find();

  return response.json(videos);
});

routes.get('/playlist/:id', async (request, response) => {
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

routes.get('/get-time/:id', async (request, response) => {
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

routes.post('/upload', upload.single('video'), async (request, response) => {
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
    return response.json(playlist);
  } catch (error) {
    return response.json({ error: error.message });
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
    return response.json(playlist);
  } catch (error) {
    return response.json({ error: error.message });
  }
});

routes.delete('/video', async (request, response) => {
  try {
    const { id } = request.body;

    const deleteVideoService = new DeleteVideoService();

    await deleteVideoService.execute(id);

    return response.sendStatus(200);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

routes.delete('/playlist', async (request, response) => {
  const { id } = request.body;

  const deletePlaylistService = new DeletePlaylistService();

  await deletePlaylistService.execute(id);

  return response.send();
});

export default routes;
