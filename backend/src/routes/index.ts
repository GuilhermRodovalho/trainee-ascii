import { Router } from 'express';
import UploadVideoService from '../services/UploadVideoService';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ message: 'Hello World' }),
);

routes.post('/upload', async (request, response) => {
  const { name, duration } = request.body;

  const uploadVideoService = new UploadVideoService();

  const video = await uploadVideoService.execute(name, duration);

  return response.json(video);
});

export default routes;
