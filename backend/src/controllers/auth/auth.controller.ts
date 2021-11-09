import { Body, Controller, Post } from '@nestjs/common';
import { AuthServices } from 'src/services/authServices/auth.service';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthServices) {}

  @Post()
  async login(@Body() body): Promise<void> {
    return await this.authService.verifyAuthorization(body);
  }
}
