import { Router } from 'express';
import { getRepository } from 'typeorm';
import UploadVideoService from '../services/UploadVideoService';
import CreatePlaylistService from '../services/CreatePlaylistService';
import Video from '../models/Video';
import Playlist from '../models/Playlist';
import DeleteVideoService from '../services/DeleteVideoService';

const routes = Router();

routes.get('/videos', async (_, response) => {
  const videoRepository = getRepository(Video);

  const videos = await videoRepository.find();

  return response.json(videos);
});

routes.post('/upload', async (request, response) => {
  const { name, duration } = request.body;

  const uploadVideoService = new UploadVideoService();

  const video = await uploadVideoService.execute(name, duration);

  return response.json(video);
});

routes.post('/create-playlist', async (request, response) => {
  const { name } = request.body;

  const createPlaylistService = new CreatePlaylistService();

  const playlist = await createPlaylistService.execute(name);

  return response.json(playlist);
});

routes.get('/playlists', async (request, response) => {
  const playlistRepository = getRepository(Playlist);

  const videos = await playlistRepository.find();

  return response.json(videos);
});

routes.delete('/video', async (request, response) => {
  const { id } = request.body;

  const deleteVideoService = new DeleteVideoService();

  await deleteVideoService.execute(id);

  response.send();
});

export default routes;
