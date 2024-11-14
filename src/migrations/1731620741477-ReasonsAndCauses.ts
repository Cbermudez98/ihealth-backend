import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReasonsAndCauses1731620741477 implements MigrationInterface {
  name = 'ReasonsAndCauses1731620741477';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`cause\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`reasonId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`reason\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cause\` ADD CONSTRAINT \`FK_cda173a44cb003c8c9f7a63ba13\` FOREIGN KEY (\`reasonId\`) REFERENCES \`reason\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cause\` DROP FOREIGN KEY \`FK_cda173a44cb003c8c9f7a63ba13\``,
    );
    await queryRunner.query(`DROP TABLE \`reason\``);
    await queryRunner.query(`DROP TABLE \`cause\``);
  }
}
