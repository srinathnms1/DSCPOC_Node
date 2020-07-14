import { inject, injectable } from 'inversify';

import Vehicle from '../models/Vehicle';
import TYPES from '../core/types';
import { IVehicleRepository } from '../repositories/Vehicle/VehicleRepository';

export interface IVehicleService {
    getAllVehicles(): Promise<Vehicle[]>;
}

@injectable()
export class VehicleService implements IVehicleService {
    public readonly _vehicleRepository: IVehicleRepository;

    public constructor(@inject(TYPES.IVehicleRepository) vehicleRepository: IVehicleRepository) {
        this._vehicleRepository = vehicleRepository;
    }

    public async getAllVehicles(): Promise<Vehicle[]> {
        return await this._vehicleRepository.findAll();
    }
}
