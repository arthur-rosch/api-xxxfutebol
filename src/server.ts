import cors from 'cors';
import express, { Application } from 'express';
import { createServer } from 'http';
import { routes } from './controllers/routes';

const app: Application = express();
app.use(cors());
const port = 3000;
const httpServer = createServer(app);

const start = async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.set('trust proxy', true);
  app.disable('etag');

  app.use(routes);

  try {
    httpServer.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error: any) {
    console.log(`Error occurred: ${error.message}`);
  }
};

void start();