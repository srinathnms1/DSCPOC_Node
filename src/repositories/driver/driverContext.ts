import { injectable } from 'inversify';

import Driver from '../../models/driver';
import { IModel } from '../../models/model';
import { Sequelize } from 'sequelize';

@injectable()
export class DriverContext implements IModel {
    public async initialise(sequelize: Sequelize) {
        Driver.initalise(sequelize);
    }

    public async associate() {
        Driver.associateModel();
    }
}