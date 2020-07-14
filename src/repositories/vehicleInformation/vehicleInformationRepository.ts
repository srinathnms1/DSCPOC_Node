import { injectable } from 'inversify';

import { GenericRepository } from './genericRepository';
import IGenericRepository from '../../core/genericRepository';
import VehicleInformation from '../../models/vehicleInformation';

export interface IVehicleInformationRepository extends IGenericRepository<VehicleInformation> {
}

@injectable()
export class VehicleInformationRepository extends GenericRepository<VehicleInformation> implements IVehicleInformationRepository {
}