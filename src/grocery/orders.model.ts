import { NOW } from 'sequelize';
import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { now } from 'sequelize/types/utils';
import { Users } from 'src/users/users.model';

@Table({
  tableName: 'orders',
  paranoid: true,
  timestamps: true,
})
export class Orders extends Model<Orders> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: NOW,
  })
  orderDate: Date;
}
