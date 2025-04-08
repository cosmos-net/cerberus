import { ConfigModuleOptions } from '@nestjs/config';

import { jwtLoader } from '@core/infrastructure/framework/loaders/jwt-loader';
import { configSchema } from '@core/infrastructure/framework/schemas/config.schema';

export const configOption: ConfigModuleOptions = {
  cache: true,
  isGlobal: true,
  load: [jwtLoader.jwt],
  validationSchema: configSchema,
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
  envFilePath: ['.env.local', '.env.test'],
};
