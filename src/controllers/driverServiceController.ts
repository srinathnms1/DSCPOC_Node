import * as express from 'express';
import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';

import TYPES from '../core/types';
import { IBaseController } from './baseController';
import { IDriverServiceInformationService } from '../services/driverServiceInformationService';
import { IDriverServiceInformation } from '../models/driverServiceInformation';
import HttpException from '../exceptions/httpException';

@injectable()
export class DriverServiceController implements IBaseController {
  private readonly _driverServiceInformationService: IDriverServiceInformationService;

  public constructor(@inject(TYPES.IDriverServiceInformationService) driverServiceInformationService: IDriverServiceInformationService) {
    this._driverServiceInformationService = driverServiceInformationService;
  }

  public register(app: express.Application): void {
    app.route('/driverservice')
      .get(async (_request: Request, response: Response) => {
        const queryStringParameters = _request.apiGateway.event.queryStringParameters;
        const from = queryStringParameters && queryStringParameters.from;
        const to = queryStringParameters && queryStringParameters.to;
        if (!from || !to) {
          throw new HttpException(400, 'From Date or To Date is not provided.');
        }

        await this._driverServiceInformationService.getAllDriverServiceInformation(from, to).then((driverService: IDriverServiceInformation[]) => {
          response.json(driverService);
        }).catch(err => { throw new HttpException(500, err.message); });
      });
  }
}