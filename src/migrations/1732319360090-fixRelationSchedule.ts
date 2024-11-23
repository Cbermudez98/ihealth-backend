import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixRelationSchedule1732319360090 implements MigrationInterface {
  name = 'FixRelationSchedule1732319360090';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD \`scheduleId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD CONSTRAINT \`FK_2540d0c8faece706fb52349c84b\` FOREIGN KEY (\`scheduleId\`) REFERENCES \`schedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`appointment\` DROP FOREIGN KEY \`FK_2540d0c8faece706fb52349c84b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` DROP COLUMN \`scheduleId\``,
    );
  }
}
