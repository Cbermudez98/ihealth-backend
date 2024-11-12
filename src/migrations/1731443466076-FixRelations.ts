import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixRelations1731443466076 implements MigrationInterface {
  name = 'FixRelations1731443466076';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`student_details\` ADD \`careerId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`student_details\` ADD UNIQUE INDEX \`IDX_f550b1a2aad41c3d6de09e07a9\` (\`careerId\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`person\` ADD \`authId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD UNIQUE INDEX \`IDX_160978ab38d46c9dc1f5400ad8\` (\`authId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD \`directionId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD UNIQUE INDEX \`IDX_c7f1be67cb7882f157d7345374\` (\`directionId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD \`studentDetailId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD UNIQUE INDEX \`IDX_1eb94422374ae60dbcb1d1cf25\` (\`studentDetailId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_f550b1a2aad41c3d6de09e07a9\` ON \`student_details\` (\`careerId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_160978ab38d46c9dc1f5400ad8\` ON \`person\` (\`authId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_c7f1be67cb7882f157d7345374\` ON \`person\` (\`directionId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_1eb94422374ae60dbcb1d1cf25\` ON \`person\` (\`studentDetailId\`)`,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
      `DROP INDEX \`REL_f550b1a2aad41c3d6de09e07a9\` ON \`student_details\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP INDEX \`IDX_1eb94422374ae60dbcb1d1cf25\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP COLUMN \`studentDetailId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP INDEX \`IDX_c7f1be67cb7882f157d7345374\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP COLUMN \`directionId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP INDEX \`IDX_160978ab38d46c9dc1f5400ad8\``,
    );
    await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`authId\``);
    await queryRunner.query(
      `ALTER TABLE \`student_details\` DROP INDEX \`IDX_f550b1a2aad41c3d6de09e07a9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`student_details\` DROP COLUMN \`careerId\``,
    );
  }
}
