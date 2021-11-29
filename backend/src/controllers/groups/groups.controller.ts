import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Response,
} from '@nestjs/common';
import { Response as ResponseExpress } from 'express';
import { Groups } from 'src/models/groups.model';
import { GroupsService } from 'src/services/groupsServices/groups.service';
import { userHeader } from '../user/user.controller';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Get()
  async index() {
    return await this.groupsService.listAllGroupsService();
  }

  @Post()
  async store(@Body() body: Groups, @Headers('user') user: userHeader, @Response() res: ResponseExpress) {
    return await this.groupsService.createGroupService(
      body,
      user.userFormated.id,
      res
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string, @Headers('user') user: userHeader, @Response() res: ResponseExpress) {
    return await this.groupsService.deleteGroup(id, user.userFormated.id, res);
  }
}
