import { injectable } from 'inversify';

import IGenericRepository from '../../core/genericRepository';
import { GenericRepository } from './genericRepository';
import DriverServiceInformation from '../../models/driverServiceInformation';

export interface IDriverServiceInformationRepository extends IGenericRepository<DriverServiceInformation> {
}

@injectable()
export class DriverServiceInformationRepository extends GenericRepository<DriverServiceInformation> implements IDriverServiceInformationRepository {
}