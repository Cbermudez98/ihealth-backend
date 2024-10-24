import { MigrationInterface, QueryRunner } from 'typeorm';

export class Foobar1729754641706 implements MigrationInterface {
  name = 'Foobar1729754641706';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`foo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`foo\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`foo\``);
  }
}
