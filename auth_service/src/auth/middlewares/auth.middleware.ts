import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '../helpers/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: any, res: Response, next: Function) {
    const token = req.headers['x-token'];

    if (!token) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
      console.log(token)
      const decoded = this.jwtService.verifyToken(token);
      console.log(decoded)
      req.uid = decoded;
      next();
    } catch (error) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  }
}
