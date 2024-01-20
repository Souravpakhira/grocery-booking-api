import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GroceryItems } from './grocery-items.model';
import { Orders } from './orders.model';
import { OrderDetails } from './order-details.model';
import { Op } from 'sequelize';
import { CreateGroceryItemDto } from './dto/create-grocery-item.dto';
import { UpdateGroceryItemDto } from './dto/update-grocery-item.dto';
import { CreateOrderDto } from './dto/create-order.dto';
@Injectable()
export class GroceryService {
  constructor(
    @InjectModel(GroceryItems)
    private groceryItemsModel: typeof GroceryItems,
    @InjectModel(Orders)
    private ordersModel: typeof Orders,
    @InjectModel(OrderDetails)
    private orderDetailsModel: typeof OrderDetails,
  ) { }

  async addGroceryItem(item: CreateGroceryItemDto) {
    try {
      const result = await this.groceryItemsModel.create({
        ...item,
      });
      return result;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async listAllGrocery() {
    const allGrocery = await this.groceryItemsModel.findAll({
      order: ['createdAt'],
    });
    return allGrocery;
  }

  async updateGroceryItem(id: number, item: UpdateGroceryItemDto) {
    try {
      const groceryExist = await this.getGroceryItemById(id);

      if (!groceryExist) {
        throw new NotFoundException('GroceryItems not Found');
      }
      const [_, result] = await this.groceryItemsModel.update(
        {
          ...item,
        },
        {
          where: {
            id: id,
          },
          returning: true,
        },
      );
      return result[0];
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteGroceryItem(id: number) {
    try {
      const groceryExist = await this.getGroceryItemById(id);

      console.log(groceryExist);
      if (!groceryExist) {
        throw new NotFoundException('GroceryItems not Found');
      }
      await this.groceryItemsModel.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getGroceryItemById(id: number) {
    return await this.groceryItemsModel.findByPk(id);
  }

  async listAvailableGrocery() {
    const allGrocery = await this.groceryItemsModel.findAll({
      where: {
        quantity: {
          [Op.gt]: 0,
        },
      },
    });
    return allGrocery;
  }

  async orderGrocery(userId: number, orderItems: CreateOrderDto) {
    const transaction = await this.orderDetailsModel.sequelize.transaction();
    try {
      //Create new order
      const order = await this.ordersModel.create(
        { userId: userId },
        { transaction: transaction },
      );
      for (const item of orderItems.items) {
        const { groceryItemId, quantity } = item;
        // Check if the grocery item exists
        const groceryItem = await this.getGroceryItemById(groceryItemId);
        if (!groceryItem) {
          throw new NotFoundException('GroceryItems not Found');
        }
        // Check if there is enough quantity in the inventory
        if (quantity > groceryItem.quantity) {
          throw new BadRequestException('Not enough quantity');
        }
        // Create order details for each item
        await this.orderDetailsModel.create(
          {
            orderId: order.id,
            groceryItemId: groceryItemId,
            quantity: quantity,
          },
          { transaction: transaction },
        );

        // Update the inventory quantity
        groceryItem.quantity -= quantity;
        await groceryItem.save({ transaction: transaction });
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
