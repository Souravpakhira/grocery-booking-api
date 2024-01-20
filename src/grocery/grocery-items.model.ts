import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'grocery_items',
  paranoid: true,
  timestamps: true,
})
export class GroceryItems extends Model<GroceryItems> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;
}
