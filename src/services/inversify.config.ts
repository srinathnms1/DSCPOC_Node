import 'reflect-metadata';

import { AsyncContainerModule } from 'inversify';
import TYPES from '../core/types';
import IGenericRepository from '../core/genericRepository';

import { GenericRepository as DriverGenericRepository } from '../repositories/driver/genericRepository';
import { GenericRepository as VehicleGenericRepository } from '../repositories/vehicle/genericRepository';
import { GenericRepository as DriverVehicleGenericRepository } from '../repositories/driverVehicle/genericRepository';
import { GenericRepository as DriverServiceInformationGenericRepository } from '../repositories/driverServiceInformation/genericRepository';
import { GenericRepository as VehicleInformationGenericRepository } from '../repositories/vehicleInformation/genericRepository';

import { IDriverRepository, DriverRepository } from '../repositories/driver/driverRepository';
import { IVehicleRepository, VehicleRepository } from '../repositories/vehicle/vehicleRepository';
import { IDriverVehicleRepository, DriverVehicleRepository } from '../repositories/driverVehicle/driverVehicleRepository';
import { IVehicleInformationRepository, VehicleInformationRepository } from '../repositories/vehicleInformation/vehicleInformationRepository';
import { IDriverServiceInformationRepository, DriverServiceInformationRepository } from '../repositories/driverServiceInformation/driverServiceInformationRepository';

import { IDriverService, DriverService } from '../services/driverService';
import { IVehicleService, VehicleService } from './vehicleService';
import { IDriverVehicleService, DriverVehicleService } from './driverVehicleService';
import { IVehicleInformationService, VehicleInformationService } from './vehicleInformationService';
import { IDriverServiceInformationService, DriverServiceInformationService } from './driverServiceInformationService';

import { IBaseController } from '../controllers/baseController';
import { DashboardController } from '../controllers/dashboardController';
import { IModel } from '../models/model';
import { DriverContext } from '../repositories/driver/driverContext';
import { DriverServiceInformationContext } from '../repositories/driverServiceInformation/driverServiceInformationContext';
import { VehicleContext } from '../repositories/vehicle/vehicleContext';
import { VehicleInformationContext } from '../repositories/vehicleInformation/vehicleInformationContext';
import { DriverVehicleContext } from '../repositories/driverVehicle/driverVehicleContext';
import { OverSpeedController } from '../controllers/overSpeedController';
import { HarshTurnController } from '../controllers/harshTurnController';
import { HarshBrakeController } from '../controllers/harshBrakeController';
import { DriverServiceController } from '../controllers/driverServiceController';

export const bindings = new AsyncContainerModule(async (bind) => {
    bind<IBaseController>(TYPES.IBaseController).to(DashboardController);
    bind<IBaseController>(TYPES.IBaseController).to(OverSpeedController);
    bind<IBaseController>(TYPES.IBaseController).to(HarshTurnController);
    bind<IBaseController>(TYPES.IBaseController).to(HarshBrakeController);
    bind<IBaseController>(TYPES.IBaseController).to(DriverServiceController);

    bind<IModel>(TYPES.IModel).to(DriverContext).inSingletonScope();
    bind<IModel>(TYPES.IModel).to(VehicleContext).inSingletonScope();
    bind<IModel>(TYPES.IModel).to(DriverVehicleContext).inSingletonScope();
    bind<IModel>(TYPES.IModel).to(DriverServiceInformationContext).inSingletonScope();
    bind<IModel>(TYPES.IModel).to(VehicleInformationContext).inSingletonScope();

    bind<IGenericRepository<any>>(TYPES.IGenericRepository).to(DriverGenericRepository).inSingletonScope();
    bind<IDriverRepository>(TYPES.IDriverRepository).to(DriverRepository).inSingletonScope();
    bind<IDriverService>(TYPES.IDriverService).to(DriverService).inSingletonScope();

    bind<IGenericRepository<any>>(TYPES.IGenericRepository).to(VehicleGenericRepository);
    bind<IVehicleRepository>(TYPES.IVehicleRepository).to(VehicleRepository).inSingletonScope();
    bind<IVehicleService>(TYPES.IVehicleService).to(VehicleService).inSingletonScope();

    bind<IGenericRepository<any>>(TYPES.IGenericRepository).to(DriverVehicleGenericRepository).inSingletonScope();
    bind<IDriverVehicleRepository>(TYPES.IDriverVehicleRepository).to(DriverVehicleRepository).inSingletonScope();
    bind<IDriverVehicleService>(TYPES.IDriverVehicleService).to(DriverVehicleService).inSingletonScope();

    bind<IGenericRepository<any>>(TYPES.IGenericRepository).to(DriverServiceInformationGenericRepository).inSingletonScope();
    bind<IDriverServiceInformationRepository>(TYPES.IDriverServiceInformationRepository).to(DriverServiceInformationRepository).inSingletonScope();
    bind<IDriverServiceInformationService>(TYPES.IDriverServiceInformationService).to(DriverServiceInformationService).inSingletonScope();

    bind<IGenericRepository<any>>(TYPES.IGenericRepository).to(VehicleInformationGenericRepository).inSingletonScope();
    bind<IVehicleInformationRepository>(TYPES.IVehicleInformationRepository).to(VehicleInformationRepository).inSingletonScope();
    bind<IVehicleInformationService>(TYPES.IVehicleInformationService).to(VehicleInformationService).inSingletonScope();
});