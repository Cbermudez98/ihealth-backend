import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueUser1730848916298 implements MigrationInterface {
  name = 'UniqueUser1730848916298';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`auth\` ADD UNIQUE INDEX \`IDX_b54f616411ef3824f6a5c06ea4\` (\`email\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`code\``);
    await queryRunner.query(`ALTER TABLE \`person\` ADD \`code\` int NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`code\``);
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD \`code\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`auth\` DROP INDEX \`IDX_b54f616411ef3824f6a5c06ea4\``,
    );
  }
}
