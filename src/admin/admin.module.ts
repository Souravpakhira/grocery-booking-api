import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { GroceryModule } from 'src/grocery/grocery.module';

@Module({
  imports: [GroceryModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule { }
