import { injectable } from 'inversify';

import { IModel } from '../../models/model';
import { Sequelize } from 'sequelize';
import DriverVehicle from '../../models/driverVehicle';

@injectable()
export class DriverVehicleContext implements IModel {
    public async initialise(sequelize: Sequelize) {
        DriverVehicle.initalise(sequelize);
    }

    public async associate() {
        DriverVehicle.associateModel();
    }
}