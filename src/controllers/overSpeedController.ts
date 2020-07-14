import * as express from 'express';
import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';

import TYPES from '../core/types';
import { IBaseController } from './baseController';
import { IVehicleInformationService } from '../services/vehicleInformationService';
import { IVehicleInformation } from '../models/vehicleInformation';
import HttpException from '../exceptions/httpException';

@injectable()
export class OverSpeedController implements IBaseController {
    private readonly _vehicleInformationService: IVehicleInformationService;

    public constructor(@inject(TYPES.IVehicleInformationService) vehicleInformationService: IVehicleInformationService) {
        this._vehicleInformationService = vehicleInformationService;
    }

    public register(app: express.Application): void {
        app.route('/overspeed')
            .get(async (_request: Request, response: Response) => {
                const queryStringParameters = _request.apiGateway.event.queryStringParameters;
                const from = queryStringParameters && queryStringParameters.from;
                const to = queryStringParameters && queryStringParameters.to;
                if (!from || !to) {
                    throw new HttpException(400, 'From Date or To Date is not provided.');
                }
                await this._vehicleInformationService.getOverSpeed(from, to).then((overSpeed: IVehicleInformation[]) => {
                    response.json(overSpeed);
                }).catch(err => { throw new HttpException(500, err.message); });
            });
    }
}