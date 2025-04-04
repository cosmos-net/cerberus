import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from '@common/domain/models/value-object/jwt-payload.vo';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(payload: any): Promise<JwtPayload> {
    // Aquí se puede agregar validación adicional como verificar si el usuario existe en la base de datos
    return new JwtPayload(payload.accountId, payload.policies, payload.sessionId);
  }
}
