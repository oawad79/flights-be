import 'reflect-metadata';
//This import is required for the typedi dependency injection and should be first.

import express from 'express';
import config from './config';

//http request/response logger
import morganBody from 'morgan-body';
import bodyParser from 'body-parser';

//application logger
import Logger from './loaders/logger';

import * as http from "http";
import routes from './routes';
import {setDataSource} from "./middlewares";

//not sure what is this for...
//require('@babel/register')({ extensions: ['.js', '.ts'] });

const app = express();

app.use(express.json());

//enable request/response logging
app.use(bodyParser.json());
morganBody(app);

app.use(config.api.prefix, setDataSource('local'), routes);

http.createServer(app).listen(config.port,  () => {
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
}).on('error', err => {
   Logger.error(err);
   process.exit(1);
});





