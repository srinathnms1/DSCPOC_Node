import { Model, Sequelize, DataTypes, Association } from 'sequelize';
import { Tables } from '../constants/enum';
import DriverVehicle from './driverVehicle';
import DriverServiceInformation from './driverServiceInformation';
import { TableConstants } from '../constants/tableConstants';

export interface IDriver {
    DriverId: number;
    DriverName: string;
    DriverMobile: string;
    CreatedDate: string;
    ModifiedDate: string;
    DriverVehicle?: DriverVehicle;
    DriverServiceInformation?: DriverServiceInformation;
}

class Driver extends Model implements IDriver {
    public DriverId: number;
    public DriverName: string;
    public DriverMobile: string;
    public CreatedDate: string;
    public ModifiedDate: string;
    public readonly DriverVehicle?: DriverVehicle;
    public readonly DriverServiceInformation?: DriverServiceInformation;

    public static associations: {
        DriverVehicle: Association<Driver, DriverVehicle>;
        DriverServiceInformation: Association<Driver, DriverServiceInformation>;
    };

    public static initalise(sequelize: Sequelize) {
        this.init({
            DriverId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            DriverName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            DriverMobile: {
                type: DataTypes.INTEGER
            },
            CreatedDate: {
                type: DataTypes.STRING,
                allowNull: false
            },
            ModifiedDate: {
                type: DataTypes.STRING
            }
        }, {
            sequelize: sequelize,
            tableName: TableConstants.DCS_DriverMaster
        });
    }

    public static associateModel() {
        this.hasOne(DriverVehicle, { foreignKey: TableConstants.DriverVehicleId, as: Tables.DCS_DriverVehicle });
        this.hasMany(DriverServiceInformation, { foreignKey: TableConstants.DriverVehicleId, as: Tables.DCS_DriverService });
    }
}

export default Driver;