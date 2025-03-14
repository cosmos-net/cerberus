import { ConfigModuleOptions } from '@nestjs/config';

import { configSchema } from '@core/infrastructure/framework/schemas/config.schema';

export const mainConfigOptions: ConfigModuleOptions = {
  cache: true,
  isGlobal: true,
  load: [],
  validationSchema: configSchema,
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
  envFilePath: ['.env.local', '.env.test'],
};
