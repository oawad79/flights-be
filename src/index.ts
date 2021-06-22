import 'reflect-metadata';
//This import is required for the typedi dependency injection and should be first.
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

import config from './config';

//http request/response logger
import morganBody from 'morgan-body';
import bodyParser from 'body-parser';

//application logger
import Logger from './loaders/logger';

import {createExpressServer, getMetadataArgsStorage, useContainer} from "routing-controllers";
import PassengersController from "./controllers/passengers.controller";
import {Container} from "typedi";
import FlightsController from "./controllers/flights.controller";
import {CustomErrorHandler} from "./middlewares/CustomErrorHandler";
import {routingControllersToSpec} from "routing-controllers-openapi";
import * as swaggerUiExpress from 'swagger-ui-express';
import {defaultMetadataStorage} from "class-transformer/storage";

//allow typedi to work with the @JsonController
useContainer(Container);

const routingControllersOptions = {
    routePrefix: config.api.prefix,
    //disabling the default error handler since class-validator is causing an issue
    //https://github.com/typestack/routing-controllers/issues/266#issuecomment-373842649
    //replacing it with the CustomErrorHandler
    //defaultErrorHandler: false,
    middlewares: [CustomErrorHandler],
    controllers: [PassengersController, FlightsController], // we specify controllers we want to use
};

const app = createExpressServer(routingControllersOptions);

// Parse class-validator classes into JSON Schema:
const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/',
})

// Parse routing-controllers classes into OpenAPI spec:
const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(storage, routingControllersOptions, {
    components: {
        schemas,
        securitySchemes: {
            basicAuth: {
                scheme: 'basic',
                type: 'http',
            },
        },
    },
    info: {
        description: 'Generated with `routing-controllers-openapi`',
        title: 'A sample API',
        version: '1.0.0',
    },
})
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec))

//enable request/response logging
app.use(bodyParser.json());
morganBody(app);

app.listen(config.port, () => {
    Logger.info(`
       ################################################
       🛡️  Server listening on port: ${config.port} 🛡️
       ################################################
     `);
}).on('error', err => {
    Logger.error(err);
    process.exit(1);
});






