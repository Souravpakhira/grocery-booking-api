import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './signIn.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const result = await this.authService.login(
      signInDto.username,
      signInDto.password,
    );
    return { result };
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Get('/test')
  // @Roles(Role.Admin)
  // @ApiBearerAuth('JWT-auth')
  // test() {
  //   return 'hi';
  // }
}
