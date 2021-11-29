import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { SecureToken } from './secretToken';
import { compare } from 'bcrypt';
import { Response } from 'express';

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
  async verifyAuthorization(body: Body, res: Response): Promise<any> {
    const { email, password } = body;
    if (!email) {
      return res.status(400).json({error:{error:'Email, campo obrigatório!!'}});
    }
    if (!password) {
      return res.status(400).json({error:{error:'password, campo obrigatório!!'}});
    }
    const user = await this.userRepo.findOneOrFail({ email });
    const { senha, email: emailUser, ...userFormated } = user;
    const verifyHash = await compare(password, senha);
    if (!verifyHash) {
      return res.status(401).json({error:{error:'Not Auth'}});
    }
    const token = sign({ userFormated }, new SecureToken().secret(), {
      expiresIn: '8h',
    });
    return res.status(200).json({ token, userName: user.name, userId: user.id });
  }
}
