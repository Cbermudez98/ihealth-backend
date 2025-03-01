import { MigrationInterface, QueryRunner } from 'typeorm';

export class Documents1740781754968 implements MigrationInterface {
  name = 'Documents1740781754968';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`document\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD \`documentsId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD CONSTRAINT \`FK_6cd5f26b72f5e221288f7d86c65\` FOREIGN KEY (\`documentsId\`) REFERENCES \`document\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_6cd5f26b72f5e221288f7d86c65\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP COLUMN \`documentsId\``,
    );
    await queryRunner.query(`DROP TABLE \`document\``);
  }
}
