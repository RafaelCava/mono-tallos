import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { SecureToken } from './secretToken';
import { compare } from 'bcrypt';

interface Body {
  email: string;
  password: string;
}

@Injectable()
export class AuthServices {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  async verifyAuthorization(body: Body): Promise<any> {
    const { email, password } = body;
    if (!email) {
      return 'Email, campo obrigatório!!';
    }
    if (!password) {
      return 'Password, campo obrigatório!!';
    }
    const user = await this.userRepo.findOneOrFail({ email });
    const { senha, email: emailUser, ...userFormated } = user;
    const verifyHash = await compare(password, senha);
    if (!verifyHash) {
      return 'error, not authorized';
    }
    const token = sign({ userFormated }, new SecureToken().secret(), {
      expiresIn: '8h',
    });
    return { token };
  }
}
