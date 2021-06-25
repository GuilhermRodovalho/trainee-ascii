import { Router } from 'express';
import { getRepository } from 'typeorm';
import UploadVideoService from '../services/UploadVideoService';
import Video from '../models/Video';

const routes = Router();

routes.get('/videos', async (_, response) => {
  const videoRepository = getRepository(Video);

  // console.log(videoRepository);

  const videos = await videoRepository.find();

  return response.json(videos);
});

routes.post('/upload', async (request, response) => {
  const { name, duration } = request.body;

  const uploadVideoService = new UploadVideoService();

  const video = await uploadVideoService.execute(name, duration);

  return response.json(video);
});

export default routes;
