import * as express from 'express';
import * as awsServerlessExpressMiddleWare from 'aws-serverless-express/middleware';
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { Container } from 'inversify';

import { bindings } from './services/inversify.config';
import { IBaseController } from './controllers/baseController';
import { TYPES } from './core/types';
import { IModel } from './models/model';
import DbContext from './core/dbContext';
dotenv.config();

class App {
    public application: express.Application = express();
    public protectedRoutes = express.Router();

    public constructor() {
        this.config();
        this.configRoutes();
        this.configServices();
        this.application.use(awsServerlessExpressMiddleWare.eventContext());
    }

    private config(): void {
        this.application.use(bodyParser.json());
        this.application.use(bodyParser.urlencoded({ extended: false }));
    }

    private configRoutes(): void {
        this.application.use('/api', this.protectedRoutes);

        this.protectedRoutes.use(bodyParser.json());
        this.protectedRoutes.use(bodyParser.urlencoded({ extended: false }));
        this.protectedRoutes.use(this.allowCors);
        this.application.use(this.allowCors);
    }

    private async configServices() {
        const sequelize = DbContext();
        const container = new Container();
        await container.loadAsync(bindings);
        const controllers: IBaseController[] = container.getAll<IBaseController>(TYPES.IBaseController);
        // need to pass protected routes post login functionlity
        controllers.forEach(controller => controller.register(this.application));
        const models: IModel[] = container.getAll<IModel>(TYPES.IModel);
        models.forEach(model => model.initialise(sequelize));
        models.forEach(model => model.associate());
    }

    private allowCors(_request: Request, response: Response, next: NextFunction) {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        response.header('Access-Control-Allow-Headers', '*, Origin, X-Requested-With, Content-Type, Accept');
        next();
    }
}

export default new App().application;