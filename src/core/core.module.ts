import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environmentSchema } from 'src/common/environment/environment-schema';
import { typeOrmConfigAsync } from 'src/core/typeorm/type-orm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: environmentSchema,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    JwtModule.register({
      global: true,
      secret: '1234567890',
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class CoreModule {}
