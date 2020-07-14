import { Op } from 'sequelize';
import { inject, injectable } from 'inversify';

import VehicleInformation from '../models/vehicleInformation';
import TYPES from '../core/types';
import { IVehicleInformationRepository } from '../repositories/vehicleInformation/vehicleInformationRepository';
import { Identifier, FindOptions } from 'sequelize/types';
import Driver from '../models/driver';
import Vehicle from '../models/vehicle';
import DriverVehicle from '../models/driverVehicle';
import { TableConstants } from '../constants/tableConstants';

export interface IVehicleInformationService {
    getAllVehicleInformation: (fromDate: string, toDate: string) => Promise<VehicleInformation[]>;
    getOverSpeed: (fromDate: string, toDate: string) => Promise<VehicleInformation[]>;
    getHarshBrake: (fromDate: string, toDate: string) => Promise<VehicleInformation[]>;
    getHarshTurn: (fromDate: string, toDate: string) => Promise<VehicleInformation[]>;
    getVehicleInformationByDriverId(identifier?: Identifier, options?: Omit<FindOptions, 'where'>): Promise<VehicleInformation>;
}

@injectable()
export class VehicleInformationService implements IVehicleInformationService {
    public readonly _vehicleInformationRepository: IVehicleInformationRepository;

    public constructor(@inject(TYPES.IVehicleInformationRepository) vehicleInformationRepository: IVehicleInformationRepository) {
        this._vehicleInformationRepository = vehicleInformationRepository;
    }

    public async getAllVehicleInformation(fromDate: string, toDate: string): Promise<VehicleInformation[]> {
        const options = {
            where: {
                PacketTime: {
                    [Op.between]: [fromDate, toDate]
                },
            },
            include: [
                VehicleInformation.associations.Driver,
                VehicleInformation.associations.Vehicle,
                VehicleInformation.associations.DriverVehicle
            ]
        } as FindOptions;
        return await this._vehicleInformationRepository.findAll(options);
    }

    public async getVehicleInformationByDriverId(identifier?: Identifier, options?: Omit<FindOptions, 'where'>): Promise<VehicleInformation> {
        return await this._vehicleInformationRepository.findByPk(identifier, options);
    }

    public async getOverSpeed(fromDate: string, toDate: string): Promise<VehicleInformation[]> {
        const options = {
            attributes: ['VehicleRealTimeInfoId',
                'DriverVehicleId',
                'PacketTime',
                'VehicleSpeed',
                'CreatedDate',
                'ModifiedDate'],
            where: {
                PacketTime: {
                    [Op.between]: [fromDate, toDate]
                }
            },
            include: [
                {
                    model: DriverVehicle,
                    attributes: ['DriverVehicleId', 'DriverId'],
                    as: TableConstants.DCS_DriverVehicle
                },
                {
                    model: Driver,
                    attributes: ['DriverId', 'DriverName', 'DriverMobile'],
                    as: TableConstants.DCS_DriverMaster
                },
                {
                    model: Vehicle,
                    attributes: ['VehicleId', 'VehicleLicenseNo', 'VehicleName'],
                    as: TableConstants.DCS_VehicleMaster
                }
            ]
        } as FindOptions;
        return await this._vehicleInformationRepository.findAll(options);
    }

    public async getHarshBrake(fromDate: string, toDate: string): Promise<VehicleInformation[]> {
        const options = {
            attributes: ['VehicleRealTimeInfoId',
                'DriverVehicleId',
                'PacketTime',
                'HarshBreaking',
                'CreatedDate',
                'ModifiedDate'],
            where: {
                PacketTime: {
                    [Op.between]: [fromDate, toDate]
                }
            },
            include: [
                {
                    model: DriverVehicle,
                    attributes: ['DriverVehicleId', 'DriverId'],
                    as: TableConstants.DCS_DriverVehicle
                },
                {
                    model: Driver,
                    attributes: ['DriverId', 'DriverName', 'DriverMobile'],
                    as: TableConstants.DCS_DriverMaster
                },
                {
                    model: Vehicle,
                    attributes: ['VehicleId', 'VehicleLicenseNo', 'VehicleName'],
                    as: TableConstants.DCS_VehicleMaster
                }
            ]
        } as FindOptions;
        return await this._vehicleInformationRepository.findAll(options);
    }

    public async getHarshTurn(fromDate: string, toDate: string): Promise<VehicleInformation[]> {
        const options = {
            attributes: ['VehicleRealTimeInfoId',
                'DriverVehicleId',
                'PacketTime',
                'HarshTurning',
                'CreatedDate',
                'ModifiedDate'],
            where: {
                PacketTime: {
                    [Op.between]: [fromDate, toDate]
                }
            },
            include: [
                {
                    model: DriverVehicle,
                    attributes: ['DriverVehicleId', 'DriverId'],
                    as: TableConstants.DCS_DriverVehicle
                },
                {
                    model: Driver,
                    attributes: ['DriverId', 'DriverName', 'DriverMobile'],
                    as: TableConstants.DCS_DriverMaster
                },
                {
                    model: Vehicle,
                    attributes: ['VehicleId', 'VehicleLicenseNo', 'VehicleName'],
                    as: TableConstants.DCS_VehicleMaster
                }
            ]
        } as FindOptions;
        return await this._vehicleInformationRepository.findAll(options);
    }
}
