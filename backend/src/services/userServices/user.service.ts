import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../models/user.model';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async searchUserService(id: number): Promise<any> {
    const { senha, ...user } = await this.userRepo.findOneOrFail(id);
    return user;
  }

  async createUserService(body: User): Promise<void | string> {
    const verify = await this.userRepo.findOne({ email: body.email });
    if (verify) {
      return 'Email em uso';
    }
    body.senha = await hash(body.senha, 11);
    const usuario = this.userRepo.create(body);
    await this.userRepo.save(usuario);
    return;
  }

  async deleteUserService(id: number): Promise<void> {
    await this.userRepo.findOneOrFail(id);
    await this.userRepo.delete(id);
    return;
  }
}
