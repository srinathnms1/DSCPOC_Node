import { Sequelize, Options, Dialect } from 'sequelize';
import * as pg from 'pg';

import HttpException from '../exceptions/httpException';

const DbContext = () => {
    const { DB_CONNECTION_HOST, DB_PORT, DB_USER_NAME, DB_PASSWORD, DB, DB_DIALECT } = process.env;

    const options = {
        dialect: DB_DIALECT as Dialect,
        dialectModule: pg,
        port: Number(DB_PORT),
        host: DB_CONNECTION_HOST,
        define: {
            freezeTableName: true,
            timestamps: false
        }
    } as Options;

    const sequelize = new Sequelize(DB, DB_USER_NAME, DB_PASSWORD, options);

    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((err: Error) => {
            return new HttpException(500, err.message);
        });

    return sequelize;
};

export default DbContext;