import express, { Request, Response, Application, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import redis, { RedisClient } from 'redis';

const app: Application = express();
const redisClient: RedisClient = redis.createClient({
  host: 'redis_cache',
  port: 6379 // default redis port,
});

app.use(bodyParser.urlencoded({ extended: false }));

// TODO implement where data is stored https://hub.docker.com/_/mongo
mongoose
  // create db using "use <dbname>" or pass into env variable in compose
  // docker run --name test-mongo -v dbdata:/data/db -p 27017:27017 mongo
  .connect('mongodb://database:27017/test-database', {
    // .connect('mongodb://localhost:27017/test-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err: Error) => console.log(err));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello world 5');
});

redisClient.set('visits', '0');
app.get('/redis', (req: Request, res: Response, next: NextFunction) => {
  redisClient.get('visits', (err, visits) => {
    res.send('Number of visits is' + (parseInt(visits) + 1));
    redisClient.set('visits', String(parseInt(visits) + 1));
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Example app running on port 3000');
});
