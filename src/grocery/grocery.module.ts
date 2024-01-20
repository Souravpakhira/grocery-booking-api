import { Module } from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { GroceryItems } from './grocery-items.model';
import { Orders } from './orders.model';
import { OrderDetails } from './order-details.model';

@Module({
  imports: [SequelizeModule.forFeature([GroceryItems, Orders, OrderDetails])],
  providers: [GroceryService],
  exports: [GroceryService],
})
export class GroceryModule { }
