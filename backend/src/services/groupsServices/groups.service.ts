import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Response } from 'express';
import { Groups } from 'src/models/groups.model';
import { Repository } from 'typeorm';
import { User } from '../../models/user.model'
@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Groups)
    private groupRepo: Repository<Groups>,
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async listAllGroupsService() {
    return await this.groupRepo.find();
  }

  async createGroupService(body: Groups, id: number, res: Response): Promise<any | string> {
    const user: User = await this.usersRepo.findOne(id)

    if(user.groups_create_mount === 3) {
      return res.status(400).json({error: {
        error: "Limite de grupos atingidos"
      }})
    } 
    const verify = await this.groupRepo.findOne({ name: body.name });

    if (verify) {
      return res.status(400).json({
        error:{
          error:'Nome de grupo em uso'
        }
      });
    }
    if (body.password) {
      body.password = await hash(body.password, 11);
    }
    body.user_creator_id = id;
    const group = this.groupRepo.create(body);
    const { password, ...groupSaved } = await this.groupRepo.save(group);

    await this.usersRepo.update({ id }, {groups_create_mount: ++user.groups_create_mount});

    return res.status(201).json(groupSaved);
  }

  async deleteGroup(id: string, userId: number, res: Response): Promise<any | string> {
    await this.groupRepo.findOneOrFail({
      id: +id,
      user_creator_id: userId,
    });
    await this.groupRepo.delete({ id: +id, user_creator_id: userId });
    return res.status(204).json();
  }
}
