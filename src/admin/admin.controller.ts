import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
// import { CreateGroceryItemDto } from './dto/create-grocery-item.dto';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/constants';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { GroceryService } from 'src/grocery/grocery.service';
import { CreateGroceryItemDto } from 'src/grocery/dto/create-grocery-item.dto';
import { UpdateGroceryItemDto } from 'src/grocery/dto/update-grocery-item.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private groceryService: GroceryService,
  ) { }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create new Grocery item',
    description: 'Create new Grocery item',
  })
  @Post('grocery-items')
  async addGroceryItem(@Body() createGroceryItemDto: CreateGroceryItemDto) {
    const result =
      await this.groceryService.addGroceryItem(createGroceryItemDto);
    return { result, message: 'Successfully created' };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get all Grocery item',
    description: 'Get all Grocery item order by createdAt',
  })
  @Get('grocery-items')
  async getAllGroceryItems() {
    const result = await this.groceryService.listAllGrocery();
    return { result };
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update Grocery item',
    description: 'Update Grocery item by id',
  })
  @Patch('grocery-items/:id')
  async updateGroceryItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGroceryItemDto: UpdateGroceryItemDto,
  ) {
    const result = await this.groceryService.updateGroceryItem(
      id,
      updateGroceryItemDto,
    );
    return { result, message: 'Successfully updated' };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete Grocery item',
    description: 'Delete Grocery item by id',
  })
  @ApiProperty({
    title: 'Delete grocery item',
  })
  @Delete('grocery-items/:id')
  async deleteGroceryItem(@Param('id', ParseIntPipe) id: number) {
    await this.groceryService.deleteGroceryItem(id);
    return { message: 'Successfully deleted' };
  }
}
