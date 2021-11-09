import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
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
  ) {
    return await this.messageService.createMessageOfOneGroup(
      user.userFormated.id,
      id,
      body.message,
    );
  }
}
