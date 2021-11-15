import { Body, Controller, Post, Response } from '@nestjs/common';
import { Response as ResponseExpress } from 'express';
import { AuthServices } from 'src/services/authServices/auth.service';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthServices) {}

  @Post()
  async login(@Body() body, @Response() res: ResponseExpress): Promise<void> {
    return await this.authService.verifyAuthorization(body, res);
  }
}
