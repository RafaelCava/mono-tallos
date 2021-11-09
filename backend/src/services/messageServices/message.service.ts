import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Groups } from 'src/models/groups.model';
import { Message } from 'src/models/message.model';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
    @InjectRepository(Groups)
    private groupRepo: Repository<Groups>,
  ) {}

  async getMessagesOfOneGroup(idGroup: string): Promise<Message[]> {
    return await this.messageRepo.find({ group_id: +idGroup });
  }

  async createMessageOfOneGroup(
    idUser: number,
    idGroup: string,
    message: string,
  ) {
    const group = await this.groupRepo.findOne({ id: +idGroup });
    if (!group) {
      return 'Não existe o grupo que você esta tentando enviar mensagem';
    }
    const messageCreated = this.messageRepo.create({
      user_id: idUser,
      group_id: +idGroup,
      message,
    });

    return await this.messageRepo.save(messageCreated);
  }
}