import { injectable } from 'inversify';

import IGenericRepository from '../../core/genericRepository';
import { Identifier, FindOptions } from 'sequelize/types';
import VehicleInformation from '../../models/vehicleInformation';

@injectable()
export class GenericRepository<T> implements IGenericRepository<T> {
    public async findAll(options?: FindOptions): Promise<T[]> {
        return await VehicleInformation.findAll(options);
    }

    public async find(item: T): Promise<T> {
        return await VehicleInformation.findOne(item);
    }

    public async findByPk(identifier?: Identifier, options?: Omit<FindOptions, 'where'>): Promise<T> {
        return await VehicleInformation.findByPk(identifier, options);
    }
}