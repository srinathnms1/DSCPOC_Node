import { Model, BuildOptions } from 'sequelize';

export type ModelStatic<T> = typeof Model & (new(values?: object, options?: BuildOptions) => T);

export const TYPES = {
    IBaseController: Symbol('IBaseController'),
    IGenericRepository: Symbol('IGenericRepository'),

    IModel: Symbol('IModel'),

    IDriverRepository: Symbol('IDriverRepository'),
    IDriverService: Symbol('IDriverService'),

    IVehicleRepository: Symbol('IVehicleRepository'),
    IVehicleService: Symbol('IVehicleService'),

    IDriverVehicleRepository: Symbol('IDriverVehicleRepository'),
    IDriverVehicleService: Symbol('IDriverVehicleService'),

    IDriverServiceInformationRepository: Symbol('IDriverServiceInformationRepository'),
    IDriverServiceInformationService: Symbol('IDriverServiceInformationService'),

    IVehicleInformationRepository: Symbol('IVehicleInformationRepository'),
    IVehicleInformationService: Symbol('IVehicleInformationService'),
};

export default TYPES;
