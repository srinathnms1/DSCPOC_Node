import { inject, injectable } from 'inversify';

import Driver from '../models/driver';
import TYPES from '../core/types';
import { IDriverRepository } from '../repositories/driver/DriverRepository';

export interface IDriverService {
    getAllDrivers(): Promise<Driver[]>;
}

@injectable()
export class DriverService implements IDriverService {
    public readonly _driverRepository: IDriverRepository;

    public constructor(@inject(TYPES.IDriverRepository) driverRepository: IDriverRepository) {
        this._driverRepository = driverRepository;
    }

    public async getAllDrivers(): Promise<Driver[]> {
        return await this._driverRepository.findAll({ include: [Driver.associations.DriverVehicle] });
    }
}
