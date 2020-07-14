import { Op } from 'sequelize';
import { inject, injectable } from 'inversify';
import { FindOptions } from 'sequelize';

import TYPES from '../core/types';
import { IDriverServiceInformationRepository } from '../repositories/driverServiceInformation/driverServiceInformationRepository';
import DriverServiceInformation from '../models/driverServiceInformation';

export interface IDriverServiceInformationService {
    getAllDriverServiceInformation: (fromDate: string, toDate: string) => Promise<DriverServiceInformation[]>;
}

@injectable()
export class DriverServiceInformationService implements IDriverServiceInformationService {
    public readonly _driverServiceInformationRepository: IDriverServiceInformationRepository;

    public constructor(@inject(TYPES.IDriverServiceInformationRepository) driverServiceRepository: IDriverServiceInformationRepository) {
        this._driverServiceInformationRepository = driverServiceRepository;
    }

    public async getAllDriverServiceInformation(fromDate: string, toDate: string): Promise<DriverServiceInformation[]> {
        const options = {
            where: {
                CreatedDate: {
                    [Op.between]: [fromDate, toDate]
                },
            },
            include: [
                DriverServiceInformation.associations.Driver,
                DriverServiceInformation.associations.Vehicle,
                DriverServiceInformation.associations.DriverVehicle
            ]
        } as FindOptions;
        return await this._driverServiceInformationRepository.findAll(options);
    }
}
