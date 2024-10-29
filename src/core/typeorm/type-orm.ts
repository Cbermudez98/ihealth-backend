import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { join } from 'path';
import { Foo } from 'src/lib/foo-bar/infrastructure/entity/foo.entity';
import { Auth } from 'src/lib/user/infrastructure/entity/auth.entity';
import { Career } from 'src/lib/user/infrastructure/entity/career.entity';
import { Direction } from 'src/lib/user/infrastructure/entity/direction.entity';
import { StudentDetail } from 'src/lib/user/infrastructure/entity/student-details.entity';
import { User } from 'src/lib/user/infrastructure/entity/user.entity';

export default class TypeOrmConfig {
  static getOrmConfig(config: ConfigService): TypeOrmModuleOptions {
    return {
      type: config.get<string>('DATABASE_DIALECT') as 'mysql',
      synchronize: false,
      username: config.get<string>('DATABASE_USER'),
      password: config.get<string>('DATABASE_PASSWORD'),
      host: config.get<string>('DATABASE_HOST'),
      port: config.get<number>('DATABASE_PORT'),
      database: config.get<string>('DATABASE_NAME'),
      entities: [Foo, Auth, StudentDetail, User, Direction, Career],
      migrationsTableName: config.get<string>('MIGRATION_TABLE'),
      migrations: [join(__dirname, '/../../migrations/**/*.{ts, js}')],
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> =>
    TypeOrmConfig.getOrmConfig(config),
  inject: [ConfigService],
};
