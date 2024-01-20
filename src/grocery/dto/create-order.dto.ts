import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';

class GroceryItemDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  groceryItemId: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: [GroceryItemDto] })
  @IsArray()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type((type) => GroceryItemDto)
  items: GroceryItemDto[];
}
