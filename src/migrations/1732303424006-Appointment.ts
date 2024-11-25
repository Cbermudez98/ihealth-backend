import { MigrationInterface, QueryRunner } from 'typeorm';

export class Appointment1732303424006 implements MigrationInterface {
  name = 'Appointment1732303424006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`appointment\` DROP COLUMN \`time\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD \`time\` time NOT NULL`,
    );
  }
}
