import 'reflect-metadata';

import { createConnection, Connection } from 'typeorm';
import express from 'express';
import path from 'path';
import routes from './routes';

// import './database';

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'enigma_playout',
  entities: [`${__dirname}/models/*.ts`],
  synchronize: true,
  logging: true,
})
  .then((connection: Connection) => {
    // eslint-disable-next-line no-console
    console.log('created connection', connection.isConnected);

    const app = express();

    app.use(express.json());
    app.use('/files', express.static(path.resolve(__dirname, '..', 'videos')));
    app.use(routes);

    app.listen(3333, () => {
      // eslint-disable-next-line no-console
      console.log('Server started on port 3333!');
    });
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.log('error.', err);
  });
