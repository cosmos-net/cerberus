import { EnvironmentMapType } from '@core/infrastructure/framework/loaders/environment-map.type';

export const configLoader = (): EnvironmentMapType => ({
  jwt: {
    tokenSecret: process.env.JWT_SECRET ?? '',
    tokenExpiresIn: process.env.JWT_EXPIRATION_TIME ?? '',
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET ?? '',
    refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME ?? '',
  },
});
