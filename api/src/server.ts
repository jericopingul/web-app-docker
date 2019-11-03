import express, { Request, Response, Application, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));

// TODO implement where data is stored https://hub.docker.com/_/mongo
mongoose
  .connect('mongodb://mongo:27017/docker-node-mongo', { useNewUrlParser: true })
  // create db using "use <dbname>" or pass into env variable in compose
  // docker run --name test-mongo -v dbdata:/data/db -p 27017:27017 mongo
  // .connect('mongodb://localhost:27017/test-database', {
  //   useNewUrlParser: true
  // })
  .then(() => console.log('MongoDB Connected'))
  .catch((err: Error) => console.log(err));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello world 5');
});

const port = 3000;

app.listen(port, () => {
  console.log('Example app running on port 3000');
});
