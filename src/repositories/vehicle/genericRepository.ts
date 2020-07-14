import { injectable } from 'inversify';

import IGenericRepository from '../../core/genericRepository';
import { Identifier, FindOptions } from 'sequelize/types';
import Vehicle from '../../models/vehicle';

@injectable()
export class GenericRepository<T> implements IGenericRepository<T> {
    public async findAll(options?: FindOptions): Promise<T[]> {
        return await Vehicle.findAll(options);
    }

    public async find(item: T): Promise<T> {
        return await Vehicle.findOne(item);
    }

    public async findByPk(identifier?: Identifier, options?: Omit<FindOptions, 'where'>): Promise<T> {
        return await Vehicle.findByPk(identifier, options);
    }
}