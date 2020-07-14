import { injectable } from 'inversify';

import { IModel } from '../../models/model';
import { Sequelize } from 'sequelize';
import DriverServiceInformation from '../../models/driverServiceInformation';

@injectable()
export class DriverServiceInformationContext implements IModel {
    public async initialise(sequelize: Sequelize) {
        DriverServiceInformation.initalise(sequelize);
    }

    public async associate() {
        DriverServiceInformation.associateModel();
    }
}