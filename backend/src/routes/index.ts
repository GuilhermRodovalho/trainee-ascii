import { Router } from 'express';

import playlistRoutes from './playlistRoutes';
import videoRoutes from './videoRoutes';

const routes = Router();

routes.use(playlistRoutes);
routes.use(videoRoutes);

export default routes;
