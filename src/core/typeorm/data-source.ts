import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Foo } from 'src/lib/foo-bar/infrastructure/entity/foo.entity';
import { join } from 'path';

config();

export const appDataSource = new DataSource({
  type: process.env.DATABASE_DIALECT as any,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT as any,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    join(__dirname, '../../lib/**/infrastructure/entity/*.entity.{ts, js}'),
  ],
  migrations: [join(__dirname, '../../migrations/**/*.{ts, js}')],
  migrationsTableName: process.env.MIGRATION_TABLE,
  synchronize: false,
});
