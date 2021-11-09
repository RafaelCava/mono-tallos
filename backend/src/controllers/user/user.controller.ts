import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  HttpCode,
  Headers,
} from '@nestjs/common';
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
    return;
  }

  @Post()
  async createUser(@Body() body) {
    return this.userService.createUserService(body);
  }

  @Delete()
  @HttpCode(204)
  deleteUser(@Headers('user') user: userHeader) {
    return this.userService.deleteUserService(user.userFormated.id);
  }
}
