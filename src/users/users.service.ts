import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private usersModel: typeof Users,
  ) { }

  async findUser(userName: string) {
    return this.usersModel.findOne({
      where: {
        userName: userName,
      },
    });
  }
}
