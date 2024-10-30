import { BullModuleOptions } from '@nestjs/bull';

export const mailBullConfig: BullModuleOptions = {
  redis: {
    host: 'localhost',
    port: 6379,
  },
};
