import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schemas/auth.schema';
import { AuthRepository } from './auth.repository';
import { JwtService } from './helpers/jwt';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  exports: [JwtService, AuthMiddleware],
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtService, AuthMiddleware],
})
export class AuthModule {}
