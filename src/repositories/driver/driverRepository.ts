import { injectable } from 'inversify';

import Driver from '../../models/driver';
import { GenericRepository } from './genericRepository';
import IGenericRepository from '../../core/genericRepository';

export interface IDriverRepository extends IGenericRepository<Driver> {
}

@injectable()
export class DriverRepository extends GenericRepository<Driver> implements IDriverRepository {
}