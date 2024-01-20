import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { dataBaseConfig } from './database/database.config';
import { GroceryModule } from './grocery/grocery.module';

@Module({
  imports: [
    SequelizeModule.forRoot(dataBaseConfig),
    AdminModule,
    UsersModule,
    AuthModule,
    GroceryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
