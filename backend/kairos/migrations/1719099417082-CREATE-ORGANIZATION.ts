
import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1719099417082 implements MigrationInterface {
    name = 'Migrations1719099417082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Organization\` (\`guid\` varchar(36) NOT NULL, \`name\` varchar(50) NOT NULL, \`description\` varchar(50) NULL, \`isActive\` tinyint NOT NULL DEFAULT '1', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp NULL, \`createdByGuid\` varchar(36) NULL, \`updatedByGuid\` varchar(36) NULL, \`deletedByGuid\` varchar(36) NULL, PRIMARY KEY (\`guid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_organization_organization\` (\`usersGuid\` varchar(36) NOT NULL, \`organizationGuid\` varchar(36) NOT NULL, INDEX \`IDX_db53dae4ddcc4a8f1f6cec7ccf\` (\`usersGuid\`), INDEX \`IDX_cb171b2ca98556ca7bdf2f2c28\` (\`organizationGuid\`), PRIMARY KEY (\`usersGuid\`, \`organizationGuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Organization\` ADD CONSTRAINT \`FK_b3cb751f39e7ea44cf825052056\` FOREIGN KEY (\`createdByGuid\`) REFERENCES \`Users\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Organization\` ADD CONSTRAINT \`FK_bdacc8f44ea5a8c764b436206ae\` FOREIGN KEY (\`updatedByGuid\`) REFERENCES \`Users\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Organization\` ADD CONSTRAINT \`FK_d4387eb5cd602518da48dd58696\` FOREIGN KEY (\`deletedByGuid\`) REFERENCES \`Users\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_organization_organization\` ADD CONSTRAINT \`FK_db53dae4ddcc4a8f1f6cec7ccf5\` FOREIGN KEY (\`usersGuid\`) REFERENCES \`Users\`(\`guid\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_organization_organization\` ADD CONSTRAINT \`FK_cb171b2ca98556ca7bdf2f2c289\` FOREIGN KEY (\`organizationGuid\`) REFERENCES \`Organization\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_organization_organization\` DROP FOREIGN KEY \`FK_cb171b2ca98556ca7bdf2f2c289\``);
        await queryRunner.query(`ALTER TABLE \`users_organization_organization\` DROP FOREIGN KEY \`FK_db53dae4ddcc4a8f1f6cec7ccf5\``);
        await queryRunner.query(`ALTER TABLE \`Organization\` DROP FOREIGN KEY \`FK_d4387eb5cd602518da48dd58696\``);
        await queryRunner.query(`ALTER TABLE \`Organization\` DROP FOREIGN KEY \`FK_bdacc8f44ea5a8c764b436206ae\``);
        await queryRunner.query(`ALTER TABLE \`Organization\` DROP FOREIGN KEY \`FK_b3cb751f39e7ea44cf825052056\``);
        await queryRunner.query(`DROP INDEX \`IDX_cb171b2ca98556ca7bdf2f2c28\` ON \`users_organization_organization\``);
        await queryRunner.query(`DROP INDEX \`IDX_db53dae4ddcc4a8f1f6cec7ccf\` ON \`users_organization_organization\``);
        await queryRunner.query(`DROP TABLE \`users_organization_organization\``);
        await queryRunner.query(`DROP TABLE \`Organization\``);
    }

}
