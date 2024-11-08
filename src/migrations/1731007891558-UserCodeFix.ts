import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserCodeFix1731007891558 implements MigrationInterface {
  name = 'UserCodeFix1731007891558';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`code\``);
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD \`code\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD UNIQUE INDEX \`IDX_f4d2a1a6767e8b4c143642a991\` (\`code\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP INDEX \`IDX_f4d2a1a6767e8b4c143642a991\``,
    );
    await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`code\``);
    await queryRunner.query(`ALTER TABLE \`person\` ADD \`code\` int NOT NULL`);
  }
}
