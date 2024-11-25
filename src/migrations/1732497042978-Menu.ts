import { MigrationInterface, QueryRunner } from 'typeorm';

export class Menu1732497042978 implements MigrationInterface {
  name = 'Menu1732497042978';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`menu\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`icon\` varchar(255) NOT NULL, \`route\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
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
    await queryRunner.query(`DROP TABLE \`menu\``);
  }
}
