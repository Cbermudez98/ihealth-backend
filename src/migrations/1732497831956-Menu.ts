import { MigrationInterface, QueryRunner } from 'typeorm';

export class Menu1732497831956 implements MigrationInterface {
  name = 'Menu1732497831956';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`menu\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`icon\` varchar(255) NOT NULL, \`route\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`menu_roles_role\` (\`menuId\` int NOT NULL, \`roleId\` int NOT NULL, INDEX \`IDX_fe52b8dbda7b8d948170304c1f\` (\`menuId\`), INDEX \`IDX_f55b26bde1f8e4381035226873\` (\`roleId\`), PRIMARY KEY (\`menuId\`, \`roleId\`)) ENGINE=InnoDB`,
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
      `DROP INDEX \`IDX_f55b26bde1f8e4381035226873\` ON \`menu_roles_role\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_fe52b8dbda7b8d948170304c1f\` ON \`menu_roles_role\``,
    );
    await queryRunner.query(`DROP TABLE \`menu_roles_role\``);
    await queryRunner.query(`DROP TABLE \`menu\``);
  }
}
