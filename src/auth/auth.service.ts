import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async login(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await user.validPassword(pass);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      userId: user.id,
      username: user.userName,
      roles: [user.role],
    };
    delete user.dataValues.password;
    return {
      user,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
