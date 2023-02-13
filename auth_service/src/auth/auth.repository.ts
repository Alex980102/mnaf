import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Auth, AuthDocument } from './schemas/auth.schema';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(Auth.name) private readonly AuthModel: Model<AuthDocument>,
  ) {}

  async login(loginDto: LoginDto) {
    return 'login';
  }

  async register(createAuthDto: CreateUserDto) {
    const createdAuth = new this.AuthModel(createAuthDto);
    return await createdAuth.save();
  }

  async findUserByEmail(email: string) {
    console.log('email', email);
    // quitar el password del query
    const user = await this.AuthModel.findOne({email: email});
    return user;
  }
}
