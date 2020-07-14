import * as express from 'express';

export interface IBaseController {
    register(app: express.Application): void;
}