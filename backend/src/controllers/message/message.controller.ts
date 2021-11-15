import { Body, Controller, Get, Headers, Param, Post, Response } from '@nestjs/common';
import { Response as ResponseExpress } from 'express';
import { Message } from 'src/models/message.model';
import { MessageService } from 'src/services/messageServices/message.service';
import { userHeader } from '../user/user.controller';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get(':id')
  async index(@Param('id') id: string) {
    return await this.messageService.getMessagesOfOneGroup(id);
  }

  @Post(':id')
  async store(
    @Param('id') id: string,
    @Headers('user') user: userHeader,
    @Body() body: Message,
    @Response() res: ResponseExpress
  ) {
    return await this.messageService.createMessageOfOneGroup(
      user.userFormated.id,
      id,
      body.message,
      res
    );
  }
}
