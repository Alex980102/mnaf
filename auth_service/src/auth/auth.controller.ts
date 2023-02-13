import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Headers,
  Req,
} from '@nestjs/common';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from './helpers/jwt';

@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiTags('login')
  @Post('/login')
  async create(@Body() LoginDto: LoginDto) {
    const serviceResponse: any = await this.authService.login(LoginDto);
    console.log('serviceResponse', serviceResponse);
    if (serviceResponse.ok === false) {
      throw new BadRequestException(serviceResponse.msg);
    }
    return serviceResponse;
  }

  @ApiTags('register')
  @Post('/register')
  async register(@Body() createAuthDto: CreateUserDto) {
    const serviceREsponse: any = await this.authService.create(createAuthDto);
    if (serviceREsponse.ok === false) {
      throw new BadRequestException(serviceREsponse.msg);
    }
    return {
      ok: true,
      message: 'El usuario se ha creado correctamente',
      data: serviceREsponse,
    };
  }

  @ApiTags('renew')
  @Get('login/renew')
  async renew(@Headers('x-token') headers: string, @Req() req: any) {
    console.log('req')
    console.log(req.uid.uid);
    delete req.uid.uid.password;
    delete req.uid.uid.__v;
    delete req.uid.uid.createdAt;
    delete req.uid.uid.updatedAt;
    const token = this.jwtService.generateToken(req.uid.uid);
    // quitar el password del req.uid.uid

    return {
      ok: true,
      token,
      role: req.uid.uid.role,
      menu: [{ titulo: 'Inicio', url: 'inicio', icon: 'mdi-view-dashboard' }],
      myid: req.uid.uid._id,
      usuario: req.uid.uid
    };
    // TODO: Implementar el metodo renew
    // return await this.authService.renew(token);
  }
}
