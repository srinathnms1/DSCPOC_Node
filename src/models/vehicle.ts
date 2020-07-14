import { Model, Sequelize, DataTypes, Association } from 'sequelize';
import { Tables } from '../constants/enum';
import VehicleInformation from './vehicleInformation';
import DriverVehicle from './driverVehicle';
import { TableConstants } from '../constants/tableConstants';

export interface IVehicle {
    VehicleId: number;
    VehicleLicenseNo: string;
    VehicleName: string;
    CreatedDate: string;
    ModifiedDate: string;
    DriverVehicle?: DriverVehicle;
    VehicleInformation?: VehicleInformation;
}

class Vehicle extends Model implements IVehicle {
    public VehicleId: number;
    public VehicleLicenseNo: string;
    public VehicleName: string;
    public CreatedDate: string;
    public ModifiedDate: string;
    public readonly DriverVehicle?: DriverVehicle;
    public readonly VehicleInformation?: VehicleInformation;

    public static associations: {
        DriverVehicle: Association<Vehicle, DriverVehicle>;
        VehicleInformation: Association<Vehicle, VehicleInformation>;
    };

    public static initalise(sequelize: Sequelize) {
        this.init({
            VehicleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            VehicleLicenseNo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            VehicleName: {
                type: DataTypes.STRING
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
            tableName: TableConstants.DCS_VehicleMaster
        });
    }

    public static associateModel() {
        this.hasOne(DriverVehicle, { foreignKey: TableConstants.DriverVehicleId, as: Tables.DCS_DriverVehicle });
        this.hasMany(VehicleInformation, { foreignKey: TableConstants.DriverVehicleId, as: Tables.DCS_VehicleRealTimeInfo });
    }
}

export default Vehicle;