import { Model, Sequelize, DataTypes, Association } from 'sequelize';
import { Tables } from '../constants/enum';
import DriverVehicle from './driverVehicle';
import Driver from './driver';
import Vehicle from './vehicle';
import { TableConstants } from '../constants/tableConstants';

export interface IVehicleInformation {
    VehicleRealTimeInfoId: number;
    DriverVehicleId: string;
    PacketTime: string;
    VehicleSpeed: string;
    HarshTurning: string;
    HarshBreaking: string;
    CreatedDate: string;
    ModifiedDate: string;
    Driver?: Driver;
    Vehicle?: Vehicle;
    DriverVehicle?: DriverVehicle;
}

class VehicleInformation extends Model implements IVehicleInformation {
    public VehicleRealTimeInfoId: number;
    public DriverVehicleId: string;
    public PacketTime: string;
    public VehicleSpeed: string;
    public HarshTurning: string;
    public HarshBreaking: string;
    public CreatedDate: string;
    public ModifiedDate: string;
    public readonly Driver?: Driver;
    public readonly Vehicle?: Vehicle;
    public readonly DriverVehicle?: DriverVehicle;

    public static associations: {
        Driver: Association<VehicleInformation, Driver>;
        Vehicle: Association<VehicleInformation, Vehicle>;
        DriverVehicle: Association<VehicleInformation, DriverVehicle>;
    };

    public static initalise(sequelize: Sequelize) {
        this.init({
            VehicleRealTimeInfoId: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            DriverVehicleId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            PacketTime: {
                type: DataTypes.STRING,
            },
            VehicleSpeed: {
                type: DataTypes.DOUBLE,
            },
            HarshTurning: {
                type: DataTypes.INTEGER,
            },
            HarshBreaking: {
                type: DataTypes.INTEGER,
            },
            CreatedDate: {
                type: DataTypes.STRING,
            },
            ModifiedDate: {
                type: DataTypes.STRING
            },
        }, {
            sequelize: sequelize,
            tableName: TableConstants.DCS_VehicleRealTimeInfo
        });
    }

    public static associateModel() {
        this.belongsTo(Driver, { foreignKey: TableConstants.DriverVehicleId, as: Tables.DCS_DriverMaster});
        this.belongsTo(Vehicle, { foreignKey: TableConstants.DriverVehicleId, as: Tables.DCS_VehicleMaster });
        this.belongsTo(DriverVehicle, { foreignKey: TableConstants.DriverVehicleId, as: Tables.DCS_DriverVehicle });
    }
}

export default VehicleInformation;