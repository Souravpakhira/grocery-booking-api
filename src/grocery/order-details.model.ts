import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Orders } from './orders.model';
import { GroceryItems } from './grocery-items.model';

@Table({
  tableName: 'order_details',
  paranoid: true,
  timestamps: true,
})
export class OrderDetails extends Model<OrderDetails> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Orders)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderId: number;

  @ForeignKey(() => GroceryItems)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  groceryItemId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;
}
