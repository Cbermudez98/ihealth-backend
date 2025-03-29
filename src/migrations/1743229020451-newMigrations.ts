import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigrations1743229020451 implements MigrationInterface {
  name = 'NewMigrations1743229020451';

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
      `CREATE TABLE \`menu\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`icon\` varchar(255) NOT NULL, \`route\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` enum ('attended', 'pending', 'close') NOT NULL DEFAULT 'pending', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cause\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`reasonId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`reason\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`day\` varchar(255) NOT NULL, \`start_time\` time NOT NULL, \`end_time\` time NOT NULL, \`appointmentsId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`appointment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`userId\` int NULL, \`psychologistId\` int NULL, \`statusId\` int NULL, \`reasonId\` int NULL, \`causeId\` int NULL, \`scheduleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`document\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`code\` bigint NOT NULL, \`gender\` varchar(1) NOT NULL, \`document_number\` varchar(255) NOT NULL, \`authId\` int NULL, \`directionId\` int NULL, \`studentDetailId\` int NULL, \`roleId\` int NULL, \`documentId\` int NULL, UNIQUE INDEX \`IDX_f4d2a1a6767e8b4c143642a991\` (\`code\`), UNIQUE INDEX \`IDX_db97007c3e3f308f96689e2a4e\` (\`document_number\`), UNIQUE INDEX \`REL_160978ab38d46c9dc1f5400ad8\` (\`authId\`), UNIQUE INDEX \`REL_c7f1be67cb7882f157d7345374\` (\`directionId\`), UNIQUE INDEX \`REL_1eb94422374ae60dbcb1d1cf25\` (\`studentDetailId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`foo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`foo\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`menu_roles_role\` (\`menuId\` int NOT NULL, \`roleId\` int NOT NULL, INDEX \`IDX_fe52b8dbda7b8d948170304c1f\` (\`menuId\`), INDEX \`IDX_f55b26bde1f8e4381035226873\` (\`roleId\`), PRIMARY KEY (\`menuId\`, \`roleId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`student_details\` ADD CONSTRAINT \`FK_f550b1a2aad41c3d6de09e07a90\` FOREIGN KEY (\`careerId\`) REFERENCES \`career\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cause\` ADD CONSTRAINT \`FK_cda173a44cb003c8c9f7a63ba13\` FOREIGN KEY (\`reasonId\`) REFERENCES \`reason\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_31c6fcae865720eab24d100addd\` FOREIGN KEY (\`appointmentsId\`) REFERENCES \`appointment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD CONSTRAINT \`FK_2a990a304a43ccc7415bf7e3a99\` FOREIGN KEY (\`userId\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD CONSTRAINT \`FK_800b970c0a9321523471257cf4c\` FOREIGN KEY (\`psychologistId\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD CONSTRAINT \`FK_140dd5768b9d794f8f8e3ded718\` FOREIGN KEY (\`statusId\`) REFERENCES \`status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD CONSTRAINT \`FK_291b81db1ed060b6c8670c5a832\` FOREIGN KEY (\`reasonId\`) REFERENCES \`reason\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD CONSTRAINT \`FK_7b6b70accd401811f07f16f610a\` FOREIGN KEY (\`causeId\`) REFERENCES \`cause\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD CONSTRAINT \`FK_2540d0c8faece706fb52349c84b\` FOREIGN KEY (\`scheduleId\`) REFERENCES \`schedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD CONSTRAINT \`FK_d9641e6c6663826091e8a68e64b\` FOREIGN KEY (\`documentId\`) REFERENCES \`document\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`menu_roles_role\` ADD CONSTRAINT \`FK_fe52b8dbda7b8d948170304c1f2\` FOREIGN KEY (\`menuId\`) REFERENCES \`menu\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`menu_roles_role\` ADD CONSTRAINT \`FK_f55b26bde1f8e43810352268739\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`menu_roles_role\` DROP FOREIGN KEY \`FK_f55b26bde1f8e43810352268739\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`menu_roles_role\` DROP FOREIGN KEY \`FK_fe52b8dbda7b8d948170304c1f2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_d9641e6c6663826091e8a68e64b\``,
    );
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
      `ALTER TABLE \`appointment\` DROP FOREIGN KEY \`FK_2540d0c8faece706fb52349c84b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` DROP FOREIGN KEY \`FK_7b6b70accd401811f07f16f610a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` DROP FOREIGN KEY \`FK_291b81db1ed060b6c8670c5a832\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` DROP FOREIGN KEY \`FK_140dd5768b9d794f8f8e3ded718\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` DROP FOREIGN KEY \`FK_800b970c0a9321523471257cf4c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` DROP FOREIGN KEY \`FK_2a990a304a43ccc7415bf7e3a99\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_31c6fcae865720eab24d100addd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cause\` DROP FOREIGN KEY \`FK_cda173a44cb003c8c9f7a63ba13\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`student_details\` DROP FOREIGN KEY \`FK_f550b1a2aad41c3d6de09e07a90\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f55b26bde1f8e4381035226873\` ON \`menu_roles_role\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_fe52b8dbda7b8d948170304c1f\` ON \`menu_roles_role\``,
    );
    await queryRunner.query(`DROP TABLE \`menu_roles_role\``);
    await queryRunner.query(`DROP TABLE \`foo\``);
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
      `DROP INDEX \`IDX_db97007c3e3f308f96689e2a4e\` ON \`person\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f4d2a1a6767e8b4c143642a991\` ON \`person\``,
    );
    await queryRunner.query(`DROP TABLE \`person\``);
    await queryRunner.query(`DROP TABLE \`document\``);
    await queryRunner.query(`DROP TABLE \`appointment\``);
    await queryRunner.query(`DROP TABLE \`schedule\``);
    await queryRunner.query(`DROP TABLE \`reason\``);
    await queryRunner.query(`DROP TABLE \`cause\``);
    await queryRunner.query(`DROP TABLE \`status\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``,
    );
    await queryRunner.query(`DROP TABLE \`role\``);
    await queryRunner.query(`DROP TABLE \`menu\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_b54f616411ef3824f6a5c06ea4\` ON \`auth\``,
    );
    await queryRunner.query(`DROP TABLE \`auth\``);
    await queryRunner.query(`DROP TABLE \`student_details\``);
    await queryRunner.query(`DROP TABLE \`career\``);
    await queryRunner.query(`DROP TABLE \`direction\``);
  }
}
