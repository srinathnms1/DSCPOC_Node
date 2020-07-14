import { inject, injectable } from 'inversify';

import DriverVehicle from '../models/driverVehicle';
import TYPES from '../core/types';
import { IDriverVehicleRepository } from '../repositories/driverVehicle/driverVehicleRepository';
import { Identifier, FindOptions } from 'sequelize/types';

export interface IDriverVehicleService {
    getAllDriverVehicles(): Promise<DriverVehicle[]>;
    getDriverVehiclesByDriverId(identifier?: Identifier, options?: Omit<FindOptions, 'where'>): Promise<DriverVehicle>;
}

@injectable()
export class DriverVehicleService implements IDriverVehicleService {
    public readonly _driverVehicleRepository: IDriverVehicleRepository;

    public constructor(@inject(TYPES.IDriverVehicleRepository) driverVehicleRepository: IDriverVehicleRepository) {
        this._driverVehicleRepository = driverVehicleRepository;
    }

    public async getAllDriverVehicles(): Promise<DriverVehicle[]> {
        return await this._driverVehicleRepository.findAll({ include: [
            DriverVehicle.associations.Driver,
            DriverVehicle.associations.Vehicle] });
    }

    public async getDriverVehiclesByDriverId(identifier?: Identifier, options?: Omit<FindOptions, 'where'>): Promise<DriverVehicle> {
        return await this._driverVehicleRepository.findByPk(identifier, options);
    }
}
