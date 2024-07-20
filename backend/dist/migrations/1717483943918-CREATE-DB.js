"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1717483943918 = void 0;
class Migrations1717483943918 {
    constructor() {
        this.name = 'Migrations1717483943918';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`Categories\` (\`guid\` varchar(36) NOT NULL, \`name\` varchar(50) NOT NULL, \`description\` varchar(250) NULL, \`isActive\` tinyint NOT NULL DEFAULT '1', \`image\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp NULL, \`createdByGuid\` varchar(36) NULL, \`updatedByGuid\` varchar(36) NULL, \`deletedByGuid\` varchar(36) NULL, PRIMARY KEY (\`guid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`PaymentMethod\` (\`guid\` varchar(36) NOT NULL, \`name\` varchar(50) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT '1', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp NULL, \`createdByGuid\` varchar(36) NULL, \`updatedByGuid\` varchar(36) NULL, \`deletedByGuid\` varchar(36) NULL, PRIMARY KEY (\`guid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Roles\` (\`guid\` varchar(38) NOT NULL, \`role\` varchar(45) NOT NULL, \`description\` varchar(200) NULL, PRIMARY KEY (\`guid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Users\` (\`guid\` varchar(36) NOT NULL, \`document\` varchar(10) NULL, \`name\` varchar(50) NOT NULL, \`lastname\` varchar(50) NULL, \`email\` varchar(50) NOT NULL, \`address\` varchar(50) NULL, \`birthdate\` date NULL, \`profileImage\` varchar(255) NOT NULL, \`documentSideA\` varchar(255) NOT NULL, \`documentSideB\` varchar(255) NOT NULL, \`backgroundCheck\` varchar(255) NOT NULL, \`backgroundCheckDate\` date NULL, \`backgroundCheckExpirationDate\` date NULL, \`phone\` varchar(50) NULL, \`mapAdress\` varchar(150) NULL, \`username\` varchar(50) NOT NULL, \`googleID\` varchar(50) NULL, \`isActive\` tinyint NOT NULL DEFAULT '1', \`password\` varchar(250) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp NULL, \`availability\` varchar(350) NULL, \`description\` varchar(550) NULL, \`previusWorks\` varchar(3250) NULL, \`certifications\` varchar(3250) NULL, \`isAvailable\` tinyint NOT NULL DEFAULT '1', \`roleGuid\` varchar(38) NOT NULL, \`createdBy\` varchar(36) NULL, \`updatedBy\` varchar(36) NULL, UNIQUE INDEX \`IDX_cf5b6b34e888c0034e30210c86\` (\`document\`), UNIQUE INDEX \`IDX_3c3ab3f49a87e6ddb607f3c494\` (\`email\`), UNIQUE INDEX \`IDX_ffc81a3b97dcbf8e320d5106c0\` (\`username\`), UNIQUE INDEX \`Users_uk\` (\`username\`), PRIMARY KEY (\`guid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Notification\` (\`guid\` varchar(36) NOT NULL, \`title\` varchar(1500) NOT NULL, \`description\` varchar(1500) NOT NULL, \`link\` varchar(1500) NULL, \`isActive\` tinyint NOT NULL DEFAULT '1', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp NULL, \`createdByGuid\` varchar(36) NULL, \`updatedByGuid\` varchar(36) NULL, \`deletedByGuid\` varchar(36) NULL, \`notificationTypeGuid\` varchar(36) NULL, PRIMARY KEY (\`guid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`NotificationType\` (\`guid\` varchar(36) NOT NULL, \`name\` varchar(1500) NOT NULL, \`description\` varchar(1500) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT '1', PRIMARY KEY (\`guid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_category_categories\` (\`usersGuid\` varchar(36) NOT NULL, \`categoriesGuid\` varchar(36) NOT NULL, INDEX \`IDX_6a9fb5a4565856faa6d5ff4b7c\` (\`usersGuid\`), INDEX \`IDX_7b278a9b9b557617ba0f6a47cf\` (\`categoriesGuid\`), PRIMARY KEY (\`usersGuid\`, \`categoriesGuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_payment_method_payment_method\` (\`usersGuid\` varchar(36) NOT NULL, \`paymentMethodGuid\` varchar(36) NOT NULL, INDEX \`IDX_81677030e50ff65528fc99fb52\` (\`usersGuid\`), INDEX \`IDX_a91581a3fd7391a8cf3365eeb2\` (\`paymentMethodGuid\`), PRIMARY KEY (\`usersGuid\`, \`paymentMethodGuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Categories\` ADD CONSTRAINT \`FK_9445d5029daaaa497314020dc07\` FOREIGN KEY (\`createdByGuid\`) REFERENCES \`Users\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Categories\` ADD CONSTRAINT \`FK_bf150ad20e2247a284531879c5c\` FOREIGN KEY (\`updatedByGuid\`) REFERENCES \`Users\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Categories\` ADD CONSTRAINT \`FK_cb4e5a10deb23947949fc174622\` FOREIGN KEY (\`deletedByGuid\`) REFERENCES \`Users\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`PaymentMethod\` ADD CONSTRAINT \`FK_987b13be02d806c5b5e51a52973\` FOREIGN KEY (\`createdByGuid\`) REFERENCES \`Users\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`PaymentMethod\` ADD CONSTRAINT \`FK_f5c6f6a2dba918e75a6665d0155\` FOREIGN KEY (\`updatedByGuid\`) REFERENCES \`Users\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`PaymentMethod\` ADD CONSTRAINT \`FK_493e13c49d6cab80534c41f9998\` FOREIGN KEY (\`deletedByGuid\`) REFERENCES \`Users\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Users\` ADD CONSTRAINT \`Users_Roles_fk\` FOREIGN KEY (\`roleGuid\`) REFERENCES \`Roles\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Users\` ADD CONSTRAINT \`Users_fk_1\` FOREIGN KEY (\`createdBy\`) REFERENCES \`Users\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Users\` ADD CONSTRAINT \`Users_fk_2\` FOREIGN KEY (\`updatedBy\`) REFERENCES \`Users\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Users\` ADD CONSTRAINT \`Users_fk_3\` FOREIGN KEY (\`updatedBy\`) REFERENCES \`Users\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Notification\` ADD CONSTRAINT \`FK_ec3c3eb88be4e33e9b8fbd92a60\` FOREIGN KEY (\`createdByGuid\`) REFERENCES \`Users\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Notification\` ADD CONSTRAINT \`FK_f31ce3e1cbb249ea65703b4d042\` FOREIGN KEY (\`updatedByGuid\`) REFERENCES \`Users\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Notification\` ADD CONSTRAINT \`FK_5bece5781eec0da0fd62ddd748f\` FOREIGN KEY (\`deletedByGuid\`) REFERENCES \`Users\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Notification\` ADD CONSTRAINT \`FK_125b2ca9e00b617ffede78e155a\` FOREIGN KEY (\`notificationTypeGuid\`) REFERENCES \`NotificationType\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_category_categories\` ADD CONSTRAINT \`FK_6a9fb5a4565856faa6d5ff4b7ce\` FOREIGN KEY (\`usersGuid\`) REFERENCES \`Users\`(\`guid\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_category_categories\` ADD CONSTRAINT \`FK_7b278a9b9b557617ba0f6a47cf2\` FOREIGN KEY (\`categoriesGuid\`) REFERENCES \`Categories\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_payment_method_payment_method\` ADD CONSTRAINT \`FK_81677030e50ff65528fc99fb529\` FOREIGN KEY (\`usersGuid\`) REFERENCES \`Users\`(\`guid\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_payment_method_payment_method\` ADD CONSTRAINT \`FK_a91581a3fd7391a8cf3365eeb25\` FOREIGN KEY (\`paymentMethodGuid\`) REFERENCES \`PaymentMethod\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users_payment_method_payment_method\` DROP FOREIGN KEY \`FK_a91581a3fd7391a8cf3365eeb25\``);
        await queryRunner.query(`ALTER TABLE \`users_payment_method_payment_method\` DROP FOREIGN KEY \`FK_81677030e50ff65528fc99fb529\``);
        await queryRunner.query(`ALTER TABLE \`users_category_categories\` DROP FOREIGN KEY \`FK_7b278a9b9b557617ba0f6a47cf2\``);
        await queryRunner.query(`ALTER TABLE \`users_category_categories\` DROP FOREIGN KEY \`FK_6a9fb5a4565856faa6d5ff4b7ce\``);
        await queryRunner.query(`ALTER TABLE \`Notification\` DROP FOREIGN KEY \`FK_125b2ca9e00b617ffede78e155a\``);
        await queryRunner.query(`ALTER TABLE \`Notification\` DROP FOREIGN KEY \`FK_5bece5781eec0da0fd62ddd748f\``);
        await queryRunner.query(`ALTER TABLE \`Notification\` DROP FOREIGN KEY \`FK_f31ce3e1cbb249ea65703b4d042\``);
        await queryRunner.query(`ALTER TABLE \`Notification\` DROP FOREIGN KEY \`FK_ec3c3eb88be4e33e9b8fbd92a60\``);
        await queryRunner.query(`ALTER TABLE \`Users\` DROP FOREIGN KEY \`Users_fk_3\``);
        await queryRunner.query(`ALTER TABLE \`Users\` DROP FOREIGN KEY \`Users_fk_2\``);
        await queryRunner.query(`ALTER TABLE \`Users\` DROP FOREIGN KEY \`Users_fk_1\``);
        await queryRunner.query(`ALTER TABLE \`Users\` DROP FOREIGN KEY \`Users_Roles_fk\``);
        await queryRunner.query(`ALTER TABLE \`PaymentMethod\` DROP FOREIGN KEY \`FK_493e13c49d6cab80534c41f9998\``);
        await queryRunner.query(`ALTER TABLE \`PaymentMethod\` DROP FOREIGN KEY \`FK_f5c6f6a2dba918e75a6665d0155\``);
        await queryRunner.query(`ALTER TABLE \`PaymentMethod\` DROP FOREIGN KEY \`FK_987b13be02d806c5b5e51a52973\``);
        await queryRunner.query(`ALTER TABLE \`Categories\` DROP FOREIGN KEY \`FK_cb4e5a10deb23947949fc174622\``);
        await queryRunner.query(`ALTER TABLE \`Categories\` DROP FOREIGN KEY \`FK_bf150ad20e2247a284531879c5c\``);
        await queryRunner.query(`ALTER TABLE \`Categories\` DROP FOREIGN KEY \`FK_9445d5029daaaa497314020dc07\``);
        await queryRunner.query(`DROP INDEX \`IDX_a91581a3fd7391a8cf3365eeb2\` ON \`users_payment_method_payment_method\``);
        await queryRunner.query(`DROP INDEX \`IDX_81677030e50ff65528fc99fb52\` ON \`users_payment_method_payment_method\``);
        await queryRunner.query(`DROP TABLE \`users_payment_method_payment_method\``);
        await queryRunner.query(`DROP INDEX \`IDX_7b278a9b9b557617ba0f6a47cf\` ON \`users_category_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_6a9fb5a4565856faa6d5ff4b7c\` ON \`users_category_categories\``);
        await queryRunner.query(`DROP TABLE \`users_category_categories\``);
        await queryRunner.query(`DROP TABLE \`NotificationType\``);
        await queryRunner.query(`DROP TABLE \`Notification\``);
        await queryRunner.query(`DROP INDEX \`Users_uk\` ON \`Users\``);
        await queryRunner.query(`DROP INDEX \`IDX_ffc81a3b97dcbf8e320d5106c0\` ON \`Users\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c3ab3f49a87e6ddb607f3c494\` ON \`Users\``);
        await queryRunner.query(`DROP INDEX \`IDX_cf5b6b34e888c0034e30210c86\` ON \`Users\``);
        await queryRunner.query(`DROP TABLE \`Users\``);
        await queryRunner.query(`DROP TABLE \`Roles\``);
        await queryRunner.query(`DROP TABLE \`PaymentMethod\``);
        await queryRunner.query(`DROP TABLE \`Categories\``);
    }
}
exports.Migrations1717483943918 = Migrations1717483943918;
//# sourceMappingURL=1717483943918-CREATE-DB.js.map