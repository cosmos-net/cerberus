import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from '@common/domain/models/value-object/jwt-payload.vo';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.refreshTokenSecret'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any): Promise<JwtPayload> {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    // Aquí puedes hacer validaciones adicionales, como verificar si el refresh token
    // está en la base de datos o si ha sido revocado
    return new JwtPayload(payload.accountId, payload.policies, payload.sessionId);
  }
}
