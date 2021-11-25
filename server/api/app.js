import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
  }));

routes(app);

export default app;