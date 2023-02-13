import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secretKey = 'jhhyywbbh.sdiSGDY@/234KSWK';

  generateToken(payload: any) {
    const myPayload = {
      uid: payload,
    };
    return jwt.sign(myPayload, this.secretKey, { expiresIn: '1h' });
  }

  verifyToken(token: any) {
    return jwt.verify(token, this.secretKey);
  }
}
