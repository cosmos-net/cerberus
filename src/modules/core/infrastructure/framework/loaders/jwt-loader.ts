import { registerAs } from '@nestjs/config';

import { configLoader } from '@core/infrastructure/framework/loaders/config.loader';
import { JwtType } from '@core/infrastructure/framework/loaders/jwt-type';

export const jwtLoader = {
  jwt: registerAs(
    'jwt',
    (): JwtType => ({
      tokenSecret: configLoader().jwt.tokenSecret,
      tokenExpiresIn: configLoader().jwt.tokenExpiresIn,
      refreshTokenSecret: configLoader().jwt.refreshTokenSecret,
      refreshTokenExpiresIn: configLoader().jwt.refreshTokenExpiresIn,
    }),
  ),
};
