import { MigrationInterface, QueryRunner } from 'typeorm';

export class Document1742250367118 implements MigrationInterface {
  name = 'Document1742250367118';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`document\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD \`document_number\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD UNIQUE INDEX \`IDX_db97007c3e3f308f96689e2a4e\` (\`document_number\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD \`documentId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD CONSTRAINT \`FK_d9641e6c6663826091e8a68e64b\` FOREIGN KEY (\`documentId\`) REFERENCES \`document\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_d9641e6c6663826091e8a68e64b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP COLUMN \`documentId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP INDEX \`IDX_db97007c3e3f308f96689e2a4e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP COLUMN \`document_number\``,
    );
    await queryRunner.query(`DROP TABLE \`document\``);
  }
}
