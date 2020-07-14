import { Model, Sequelize, DataTypes, Association } from 'sequelize';
import { Tables } from '../constants/enum';
import Driver from './driver';
import Vehicle from './vehicle';
import DriverServiceInformation from './driverServiceInformation';
import VehicleInformation from './vehicleInformation';
import { TableConstants } from '../constants/tableConstants';

export interface IDriverVehicle {
    DriverVehicleId: number;
    VehicleId: string;
    DriverId: string;
    CreatedDate: string;
    ModifiedDate: string;
    Driver?: Driver;
    Vehicle?: Vehicle;
    VehicleInformation?: VehicleInformation;
    DriverServiceInformation?: DriverServiceInformation;
}

class DriverVehicle extends Model implements IDriverVehicle {
    public DriverVehicleId: number;
    public VehicleId: string;
    public DriverId: string;
    public CreatedDate: string;
    public ModifiedDate: string;
    public readonly Driver?: Driver;
    public readonly Vehicle?: Vehicle;
    public readonly VehicleInformation?: VehicleInformation;
    public readonly DriverServiceInformation?: DriverServiceInformation;

    public static associations: {
        Driver: Association<DriverVehicle, Driver>;
        Vehicle: Association<DriverVehicle, Vehicle>;
        VehicleInformation: Association<DriverVehicle, VehicleInformation>;
        DriverServiceInformation: Association<DriverVehicle, DriverServiceInformation>;
    };

    public static initalise(sequelize: Sequelize) {
        this.init({
            DriverVehicleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            VehicleId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            DriverId: {
                type: DataTypes.INTEGER,
                allowNull: false
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
            tableName: TableConstants.DCS_DriverVehicle,
        });
    }

    public static associateModel() {
        this.belongsTo(Driver, { foreignKey: TableConstants.DriverId, as: Tables.DCS_DriverMaster });
        this.belongsTo(Vehicle, { foreignKey: TableConstants.VehicleId, as: Tables.DCS_VehicleMaster });
        this.hasMany(VehicleInformation, { foreignKey: TableConstants.DriverVehicleId, as: Tables.DCS_VehicleRealTimeInfo });
        this.hasMany(DriverServiceInformation, { foreignKey: TableConstants.DriverVehicleId, as: Tables.DCS_DriverService });
    }
}

export default DriverVehicle;