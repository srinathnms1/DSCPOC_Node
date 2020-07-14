import { injectable } from 'inversify';

import IGenericRepository from '../../core/genericRepository';
import { Identifier, FindOptions } from 'sequelize';
import DriverVehicle from '../../models/driverVehicle';

@injectable()
export class GenericRepository<T> implements IGenericRepository<T> {
    public async findAll(options?: FindOptions): Promise<T[]> {
        return await DriverVehicle.findAll(options);
    }

    public async find(item: T): Promise<T> {
        return await DriverVehicle.findOne(item);
    }

    public async findByPk(identifier?: Identifier, options?: Omit<FindOptions, 'where'>): Promise<T> {
        return await DriverVehicle.findByPk(identifier, options);
    }
}