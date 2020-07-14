import { injectable } from 'inversify';

import IGenericRepository from '../../core/genericRepository';
import DriverVehicle from '../../models/driverVehicle';
import { GenericRepository } from './genericRepository';

export interface IDriverVehicleRepository extends IGenericRepository<DriverVehicle> {
}

@injectable()
export class DriverVehicleRepository extends GenericRepository<DriverVehicle> implements IDriverVehicleRepository {
}