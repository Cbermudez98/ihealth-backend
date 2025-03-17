import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1731513052330 implements MigrationInterface {
  name = 'FirstMigration1731513052330';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`direction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`neighborhood\` varchar(255) NOT NULL, \`street\` varchar(255) NOT NULL, \`number\` varchar(255) NOT NULL, \`aditional_information\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`career\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`student_details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`semester\` int NOT NULL, \`careerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`auth\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_b54f616411ef3824f6a5c06ea4\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`code\` bigint NOT NULL, \`gender\` varchar(1) NOT NULL, \`authId\` int NULL, \`directionId\` int NULL, \`studentDetailId\` int NULL, \`roleId\` int NULL, UNIQUE INDEX \`IDX_f4d2a1a6767e8b4c143642a991\` (\`code\`), UNIQUE INDEX \`REL_160978ab38d46c9dc1f5400ad8\` (\`authId\`), UNIQUE INDEX \`REL_c7f1be67cb7882f157d7345374\` (\`directionId\`), UNIQUE INDEX \`REL_1eb94422374ae60dbcb1d1cf25\` (\`studentDetailId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`foo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`foo\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`student_details\` ADD CONSTRAINT \`FK_f550b1a2aad41c3d6de09e07a90\` FOREIGN KEY (\`careerId\`) REFERENCES \`career\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD CONSTRAINT \`FK_160978ab38d46c9dc1f5400ad85\` FOREIGN KEY (\`authId\`) REFERENCES \`auth\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD CONSTRAINT \`FK_c7f1be67cb7882f157d7345374b\` FOREIGN KEY (\`directionId\`) REFERENCES \`direction\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD CONSTRAINT \`FK_1eb94422374ae60dbcb1d1cf254\` FOREIGN KEY (\`studentDetailId\`) REFERENCES \`student_details\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD CONSTRAINT \`FK_8c252b7bfff409f0c040c8ac8d9\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_8c252b7bfff409f0c040c8ac8d9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_1eb94422374ae60dbcb1d1cf254\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_c7f1be67cb7882f157d7345374b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_160978ab38d46c9dc1f5400ad85\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`student_details\` DROP FOREIGN KEY \`FK_f550b1a2aad41c3d6de09e07a90\``,
    );
    await queryRunner.query(`DROP TABLE \`foo\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``,
    );
    await queryRunner.query(`DROP TABLE \`role\``);
    await queryRunner.query(
      `DROP INDEX \`REL_1eb94422374ae60dbcb1d1cf25\` ON \`person\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_c7f1be67cb7882f157d7345374\` ON \`person\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_160978ab38d46c9dc1f5400ad8\` ON \`person\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f4d2a1a6767e8b4c143642a991\` ON \`person\``,
    );
    await queryRunner.query(`DROP TABLE \`person\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_b54f616411ef3824f6a5c06ea4\` ON \`auth\``,
    );
    await queryRunner.query(`DROP TABLE \`auth\``);
    await queryRunner.query(`DROP TABLE \`student_details\``);
    await queryRunner.query(`DROP TABLE \`career\``);
    await queryRunner.query(`DROP TABLE \`direction\``);
  }
}
