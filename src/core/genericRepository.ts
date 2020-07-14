import { Identifier, FindOptions } from 'sequelize';

export default interface IGenericRepository<T> {
    find(item: T): Promise<T>;
    findByPk(identifier?: Identifier, options?: Omit<FindOptions, 'where'>): Promise<T>;
    findAll(options?: FindOptions): Promise<T[]>;
}