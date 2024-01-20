import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { EXPIRE, JWTKEY } from 'src/common/constants';
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWTKEY,
      signOptions: { expiresIn: EXPIRE },
    }),
    UsersModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
