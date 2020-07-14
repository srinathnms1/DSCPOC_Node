import { Options, Dialect } from 'sequelize';
import * as pg from 'pg';

const { DB_CONNECTION_HOST, DB_PORT, DB_DIALECT } = process.env;

export class DbContextOptions {
    public options: Options;
    public constructor() {
        this.options = {
            dialect: DB_DIALECT as Dialect,
            dialectModule: pg,
            port: Number(DB_PORT),
            host: DB_CONNECTION_HOST,
            define: {
                freezeTableName: true,
                timestamps: false
            }
        } as Options;
    }
}