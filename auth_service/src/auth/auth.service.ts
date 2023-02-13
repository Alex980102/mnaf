import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
// Importar bcrypt
import * as bcrypt from 'bcrypt';
import { JwtService } from './helpers/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      // TODO: insertar el role en el type del usuario
      const usuarioDB: any = await this.authRepository.findUserByEmail(
        loginDto.email,
      );
      console.log('usuarioDB', usuarioDB);
      if (!usuarioDB) {
        return { ok: false, msg: 'El usuario no existe' };
      }
      const validPassword = bcrypt.compareSync(
        loginDto.password,
        usuarioDB.password,
      );
      if (!validPassword) {
        return { ok: false, msg: 'La contraseña no es válida' };
      }
      const token = this.jwtService.generateToken(usuarioDB);
      return {
        ok: true,
        token,
        menu: [{ titulo: 'Inicio', url: 'inicio', icon: 'mdi-view-dashboard' }],
        role: usuarioDB.role,
        myid: usuarioDB.id,
      }
    } catch (error) {}
    return await this.authRepository.login(loginDto);
  }

  async create(createAuthDto: CreateUserDto) {
    try {
      const userExists = await this.authRepository.findUserByEmail(
        createAuthDto.email,
      );
      if (userExists) {
        return { ok: false, msg: 'El usuario ya existe' };
      }

      return this.authRepository.register(createAuthDto);
    } catch (error) {}
  }
}
