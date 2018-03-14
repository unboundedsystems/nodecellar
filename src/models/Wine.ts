import { Column, DataType, Model, Table, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { sequelize } from '../db';

@Table
export class Wine extends Model<Wine> {
    @AutoIncrement
    @PrimaryKey
    @Column
    _id:                 number;

    @Column name:        string;
    @Column year:        string;
    @Column grapes:      string;
    @Column country:     string;
    @Column region:      string;
    @Column picture:     string;
    @Column({ type: DataType.TEXT })
    description:         string;
};
sequelize.addModels([Wine]);
