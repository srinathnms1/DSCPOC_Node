import { injectable } from 'inversify';

import { IModel } from '../../models/model';
import { Sequelize } from 'sequelize';
import Vehicle from '../../models/vehicle';

@injectable()
export class VehicleContext implements IModel {
    public async initialise(sequelize: Sequelize) {
        Vehicle.initalise(sequelize);
    }

    public async associate() {
        Vehicle.associateModel();
    }
}