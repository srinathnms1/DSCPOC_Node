import { Sequelize } from 'sequelize';

export interface IModel {
    initialise(sequelize: Sequelize): void;
    associate(): void;
}