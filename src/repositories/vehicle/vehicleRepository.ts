import { injectable } from 'inversify';

import { GenericRepository } from './genericRepository';
import IGenericRepository from '../../core/genericRepository';
import Vehicle from '../../models/vehicle';

export interface IVehicleRepository extends IGenericRepository<Vehicle> {
}

@injectable()
export class VehicleRepository extends GenericRepository<Vehicle> implements IVehicleRepository {
}