import { Model, Sequelize, DataTypes, Association } from 'sequelize';
import { Tables } from '../constants/enum';
import DriverVehicle from './driverVehicle';
import Driver from './driver';
import Vehicle from './vehicle';
import { TableConstants } from '../constants/tableConstants';

export interface IDriverServiceInformation {
    DriverServiceId: number;
    DriverVehicleId: string;
    VehicleStartTime: string;
    VehicleEndTime: string;
    RestingStartTime: string;
    RestingEndTime: string;
    RestTimeHours: string;
    DrivingTimeHours: string;
    WorkTimeHours: string;
    CreatedDate: string;
    ModifiedDate: string;
    Driver?: Driver;
    Vehicle?: Vehicle;
    DriverVehicle?: DriverVehicle;
}

class DriverServiceInformation extends Model implements IDriverServiceInformation {
    public DriverServiceId: number;
    public DriverVehicleId: string;
    public VehicleStartTime: string;
    public VehicleEndTime: string;
    public RestingStartTime: string;
    public RestingEndTime: string;
    public RestTimeHours: string;
    public DrivingTimeHours: string;
    public WorkTimeHours: string;
    public CreatedDate: string;
    public ModifiedDate: string;
    public readonly Driver?: Driver;
    public readonly Vehicle?: Vehicle;
    public readonly DriverVehicle?: DriverVehicle;

    public static associations: {
        Driver: Association<DriverServiceInformation, Driver>;
        Vehicle: Association<DriverServiceInformation, Vehicle>;
        DriverVehicle: Association<DriverServiceInformation, DriverVehicle>;
    };

    public static initalise(sequelize: Sequelize) {
        this.init({
            DriverServiceId: {
                type: DataTypes.INTEGER,
                allowNull: false,

                primaryKey: true
            },
            DriverVehicleId: {
                type: DataTypes.INTEGER
            },
            VehicleStartTime: {
                type: DataTypes.STRING
            },
            VehicleEndTime: {
                type: DataTypes.STRING
            },
            RestingStartTime: {
                type: DataTypes.STRING
            },
            RestingEndTime: {
                type: DataTypes.STRING
            },
            CreatedDate: {
                type: DataTypes.STRING,
                allowNull: false
            },
            ModifiedDate: {
                type: DataTypes.STRING
            },
            RestTimeHours:
            {
                type: DataTypes.DOUBLE
            },
            DrivingTimeHours:
            {
                type: DataTypes.DOUBLE
            },
            WorkTimeHours:
            {
                type: DataTypes.DOUBLE
            }
        }, {
            sequelize: sequelize,
            tableName: TableConstants.DCS_DriverService
        });
    }

    public static associateModel() {
        this.belongsTo(Driver, { foreignKey: TableConstants.DriverVehicleId, as: Tables.DCS_DriverMaster });
        this.belongsTo(Vehicle, { foreignKey: TableConstants.DriverVehicleId, as: Tables.DCS_VehicleMaster });
        this.belongsTo(DriverVehicle, { foreignKey: TableConstants.DriverVehicleId, as: Tables.DCS_DriverVehicle });
    }
}

export default DriverServiceInformation;