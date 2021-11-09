import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Groups } from 'src/models/groups.model';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Groups)
    private groupRepo: Repository<Groups>,
  ) {}

  async listAllGroupsService() {
    return await this.groupRepo.find();
  }

  async createGroupService(body: Groups, id: number): Promise<any | string> {
    console.log(id);
    const verify = await this.groupRepo.findOne({ name: body.name });
    if (verify) {
      return 'Nome de grupo em uso';
    }
    if (body.password) {
      body.password = await hash(body.password, 11);
    }
    body.user_creator_id = id;
    const group = this.groupRepo.create(body);
    const { password, ...groupSaved } = await this.groupRepo.save(group);
    return groupSaved;
  }

  async deleteGroup(id: string, userId: number): Promise<void | string> {
    await this.groupRepo.findOneOrFail({
      id: +id,
      user_creator_id: userId,
    });
    await this.groupRepo.delete({ id: +id, user_creator_id: userId });
    return;
  }
}
