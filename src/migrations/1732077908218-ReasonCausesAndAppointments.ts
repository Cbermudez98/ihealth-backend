import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReasonCausesAndAppointments1732077908218
  implements MigrationInterface
{
  name = 'ReasonCausesAndAppointments1732077908218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` enum ('attended', 'pending', 'close') NOT NULL DEFAULT 'pending', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`day\` varchar(255) NOT NULL, \`start_time\` time NOT NULL, \`end_time\` time NOT NULL, \`appointmentsId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`appointment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`time\` time NOT NULL, \`userId\` int NULL, \`psychologistId\` int NULL, \`statusId\` int NULL, \`reasonId\` int NULL, \`causeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
    await queryRunner.query(`DROP TABLE \`appointment\``);
    await queryRunner.query(`DROP TABLE \`schedule\``);
    await queryRunner.query(`DROP TABLE \`status\``);
  }
}
