import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { GroceryService } from 'src/grocery/grocery.service';
import { CreateOrderDto } from 'src/grocery/dto/create-order.dto';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/constants';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly groceryService: GroceryService,
  ) { }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'List all available grocery',
    description: 'List all available grocery whose quantity is greater than 0',
  })
  @Get('grocery-items')
  async getAllGroceryItems() {
    const result = await this.groceryService.listAvailableGrocery();
    return { result };
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create grocery order',
    description: 'Place order by grocery id',
  })
  @Post('order')
  async orderGroceryItems(@Req() req, @Body() orderDto: CreateOrderDto) {
    const userId = req.user.userId;
    await this.groceryService.orderGrocery(userId, orderDto);
    return { message: 'Order placed successfully' };
  }
}
