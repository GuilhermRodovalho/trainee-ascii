import { Router } from 'express';

import playlistRoutes from './playlistRoutes';
import videoRoutes from './videoRoutes';
import folderRoutes from './folderRoutes';

const routes = Router();

routes.use(playlistRoutes);
routes.use(videoRoutes);
routes.use(folderRoutes);

export default routes;
