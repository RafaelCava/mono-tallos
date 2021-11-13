import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  HttpCode,
  Headers,
  Response as Response_Nest
} from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/models/user.model';
import { UserService } from '../../services/userServices/user.service';

export interface userHeader {
  userFormated: User;
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  index(@Headers('user') user: userHeader) {
    return this.userService.searchUserService(user.userFormated.id);
  }

  @Post()
  async createUser(@Body() body, @Response_Nest() response: Response) {
    return this.userService.createUserService(body, response);
  }

  @Delete()
  @HttpCode(204)
  deleteUser(@Headers('user') user: userHeader) {
    return this.userService.deleteUserService(user.userFormated.id);
  }
}
