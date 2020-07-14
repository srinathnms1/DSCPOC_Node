import { injectable } from 'inversify';

import { IModel } from '../../models/model';
import { Sequelize } from 'sequelize';
import VehicleInformation from '../../models/vehicleInformation';

@injectable()
export class VehicleInformationContext implements IModel {
    public async initialise(sequelize: Sequelize) {
        VehicleInformation.initalise(sequelize);
    }

    public async associate() {
        VehicleInformation.associateModel();
    }
}