import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1730241893493 implements MigrationInterface {
  name = 'User1730241893493';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`auth\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`direction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`neighborhood\` varchar(255) NOT NULL, \`street\` varchar(255) NOT NULL, \`number\` varchar(255) NOT NULL, \`aditional_information\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`career\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`student_details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`semester\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`code\` varchar(255) NOT NULL, \`gender\` varchar(1) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`person\``);
    await queryRunner.query(`DROP TABLE \`student_details\``);
    await queryRunner.query(`DROP TABLE \`career\``);
    await queryRunner.query(`DROP TABLE \`direction\``);
    await queryRunner.query(`DROP TABLE \`auth\``);
  }
}
