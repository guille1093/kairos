-- THIS EXECUTES WHEN THE DOCKER CONTAINER IS STARTED DO NOT MODIFY!!!
DROP DATABASE IF EXISTS kairos;
CREATE DATABASE kairos;
DROP USER IF EXISTS 'kairos'@'%';
CREATE USER 'kairos'@'%' IDENTIFIED BY 'kairos';
GRANT ALL PRIVILEGES ON *.* TO 'kairos'@'%';
FLUSH PRIVILEGES;

USE kairos;


SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `Categories`;
CREATE TABLE `Categories` (
  `guid` varchar(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  `image` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdByGuid` varchar(36) DEFAULT NULL,
  `updatedByGuid` varchar(36) DEFAULT NULL,
  `deletedByGuid` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`guid`),
  KEY `FK_9445d5029daaaa497314020dc07` (`createdByGuid`),
  KEY `FK_bf150ad20e2247a284531879c5c` (`updatedByGuid`),
  KEY `FK_cb4e5a10deb23947949fc174622` (`deletedByGuid`),
  CONSTRAINT `FK_9445d5029daaaa497314020dc07` FOREIGN KEY (`createdByGuid`) REFERENCES `Users` (`guid`),
  CONSTRAINT `FK_bf150ad20e2247a284531879c5c` FOREIGN KEY (`updatedByGuid`) REFERENCES `Users` (`guid`),
  CONSTRAINT `FK_cb4e5a10deb23947949fc174622` FOREIGN KEY (`deletedByGuid`) REFERENCES `Users` (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(1,	1717483943918,	'Migrations1717483943918'),
(2,	1719099417082,	'Migrations1719099417082');

DROP TABLE IF EXISTS `Notification`;
CREATE TABLE `Notification` (
  `guid` varchar(36) NOT NULL,
  `title` varchar(1500) NOT NULL,
  `description` varchar(1500) NOT NULL,
  `link` varchar(1500) DEFAULT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdByGuid` varchar(36) DEFAULT NULL,
  `updatedByGuid` varchar(36) DEFAULT NULL,
  `deletedByGuid` varchar(36) DEFAULT NULL,
  `notificationTypeGuid` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`guid`),
  KEY `FK_ec3c3eb88be4e33e9b8fbd92a60` (`createdByGuid`),
  KEY `FK_f31ce3e1cbb249ea65703b4d042` (`updatedByGuid`),
  KEY `FK_5bece5781eec0da0fd62ddd748f` (`deletedByGuid`),
  KEY `FK_125b2ca9e00b617ffede78e155a` (`notificationTypeGuid`),
  CONSTRAINT `FK_125b2ca9e00b617ffede78e155a` FOREIGN KEY (`notificationTypeGuid`) REFERENCES `NotificationType` (`guid`),
  CONSTRAINT `FK_5bece5781eec0da0fd62ddd748f` FOREIGN KEY (`deletedByGuid`) REFERENCES `Users` (`guid`),
  CONSTRAINT `FK_ec3c3eb88be4e33e9b8fbd92a60` FOREIGN KEY (`createdByGuid`) REFERENCES `Users` (`guid`),
  CONSTRAINT `FK_f31ce3e1cbb249ea65703b4d042` FOREIGN KEY (`updatedByGuid`) REFERENCES `Users` (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `NotificationType`;
CREATE TABLE `NotificationType` (
  `guid` varchar(36) NOT NULL,
  `name` varchar(1500) NOT NULL,
  `description` varchar(1500) NOT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `Organization`;
CREATE TABLE `Organization` (
  `guid` varchar(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdByGuid` varchar(36) DEFAULT NULL,
  `updatedByGuid` varchar(36) DEFAULT NULL,
  `deletedByGuid` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`guid`),
  KEY `FK_b3cb751f39e7ea44cf825052056` (`createdByGuid`),
  KEY `FK_bdacc8f44ea5a8c764b436206ae` (`updatedByGuid`),
  KEY `FK_d4387eb5cd602518da48dd58696` (`deletedByGuid`),
  CONSTRAINT `FK_b3cb751f39e7ea44cf825052056` FOREIGN KEY (`createdByGuid`) REFERENCES `Users` (`guid`),
  CONSTRAINT `FK_bdacc8f44ea5a8c764b436206ae` FOREIGN KEY (`updatedByGuid`) REFERENCES `Users` (`guid`),
  CONSTRAINT `FK_d4387eb5cd602518da48dd58696` FOREIGN KEY (`deletedByGuid`) REFERENCES `Users` (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Organization` (`guid`, `name`, `description`, `isActive`, `createdAt`, `updatedAt`, `deletedAt`, `createdByGuid`, `updatedByGuid`, `deletedByGuid`) VALUES
('1232assdasd121',	'Shake Again',	'asdadasd 1',	1,	'2024-07-20 22:04:12.000000',	'2024-07-20 22:04:12.000000',	NULL,	NULL,	NULL,	NULL),
('123ksdkajdkcsdf3',	'Aguilas Devs',	'asdadlklkl',	1,	'2024-07-20 22:04:41.000000',	'2024-07-20 22:04:41.000000',	NULL,	NULL,	NULL,	NULL);

DROP TABLE IF EXISTS `PaymentMethod`;
CREATE TABLE `PaymentMethod` (
  `guid` varchar(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdByGuid` varchar(36) DEFAULT NULL,
  `updatedByGuid` varchar(36) DEFAULT NULL,
  `deletedByGuid` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`guid`),
  KEY `FK_987b13be02d806c5b5e51a52973` (`createdByGuid`),
  KEY `FK_f5c6f6a2dba918e75a6665d0155` (`updatedByGuid`),
  KEY `FK_493e13c49d6cab80534c41f9998` (`deletedByGuid`),
  CONSTRAINT `FK_493e13c49d6cab80534c41f9998` FOREIGN KEY (`deletedByGuid`) REFERENCES `Users` (`guid`),
  CONSTRAINT `FK_987b13be02d806c5b5e51a52973` FOREIGN KEY (`createdByGuid`) REFERENCES `Users` (`guid`),
  CONSTRAINT `FK_f5c6f6a2dba918e75a6665d0155` FOREIGN KEY (`updatedByGuid`) REFERENCES `Users` (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `Roles`;
CREATE TABLE `Roles` (
  `guid` varchar(38) NOT NULL,
  `role` varchar(45) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Roles` (`guid`, `role`, `description`) VALUES
('R01',	'Super',	'Super User'),
('R02',	'Client',	'Client User'),
('R03',	'ServiceProvier',	'ServiceProvier User'),
('R04',	'Moderator',	'Moderator User');

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `guid` varchar(36) NOT NULL,
  `document` varchar(10) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `profileImage` varchar(255) NOT NULL,
  `documentSideA` varchar(255) NOT NULL,
  `documentSideB` varchar(255) NOT NULL,
  `backgroundCheck` varchar(255) NOT NULL,
  `backgroundCheckDate` date DEFAULT NULL,
  `backgroundCheckExpirationDate` date DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `mapAdress` varchar(150) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `googleID` varchar(50) DEFAULT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  `password` varchar(250) DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` timestamp NULL DEFAULT NULL,
  `availability` varchar(350) DEFAULT NULL,
  `description` varchar(550) DEFAULT NULL,
  `previusWorks` varchar(3250) DEFAULT NULL,
  `certifications` varchar(3250) DEFAULT NULL,
  `isAvailable` tinyint NOT NULL DEFAULT '1',
  `roleGuid` varchar(38) NOT NULL,
  `createdBy` varchar(36) DEFAULT NULL,
  `updatedBy` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`guid`),
  UNIQUE KEY `IDX_3c3ab3f49a87e6ddb607f3c494` (`email`),
  UNIQUE KEY `IDX_ffc81a3b97dcbf8e320d5106c0` (`username`),
  UNIQUE KEY `Users_uk` (`username`),
  UNIQUE KEY `IDX_cf5b6b34e888c0034e30210c86` (`document`),
  KEY `Users_Roles_fk` (`roleGuid`),
  KEY `Users_fk_1` (`createdBy`),
  KEY `Users_fk_3` (`updatedBy`),
  CONSTRAINT `Users_fk_1` FOREIGN KEY (`createdBy`) REFERENCES `Users` (`guid`),
  CONSTRAINT `Users_fk_2` FOREIGN KEY (`updatedBy`) REFERENCES `Users` (`guid`),
  CONSTRAINT `Users_fk_3` FOREIGN KEY (`updatedBy`) REFERENCES `Users` (`guid`),
  CONSTRAINT `Users_Roles_fk` FOREIGN KEY (`roleGuid`) REFERENCES `Roles` (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Users` (`guid`, `document`, `name`, `lastname`, `email`, `address`, `birthdate`, `profileImage`, `documentSideA`, `documentSideB`, `backgroundCheck`, `backgroundCheckDate`, `backgroundCheckExpirationDate`, `phone`, `mapAdress`, `username`, `googleID`, `isActive`, `password`, `createdAt`, `updatedAt`, `deletedAt`, `availability`, `description`, `previusWorks`, `certifications`, `isAvailable`, `roleGuid`, `createdBy`, `updatedBy`) VALUES
('1',	'1',	'admin',	'admin',	'admin@admin.com',	NULL,	NULL,	'',	'',	'',	'',	NULL,	NULL,	NULL,	NULL,	'admin',	'admin',	1,	'$2b$08$EGql1iM0V/gqGjwPonbbCu82mdU5ycIfg.zcJTuukEVdyhNS9eC2a',	'2024-07-20 22:09:51.000000',	'2024-07-20 22:09:51.000000',	NULL,	NULL,	NULL,	NULL,	NULL,	1,	'R01',	NULL,	NULL);

DROP TABLE IF EXISTS `users_category_categories`;
CREATE TABLE `users_category_categories` (
  `usersGuid` varchar(36) NOT NULL,
  `categoriesGuid` varchar(36) NOT NULL,
  PRIMARY KEY (`usersGuid`,`categoriesGuid`),
  KEY `IDX_6a9fb5a4565856faa6d5ff4b7c` (`usersGuid`),
  KEY `IDX_7b278a9b9b557617ba0f6a47cf` (`categoriesGuid`),
  CONSTRAINT `FK_6a9fb5a4565856faa6d5ff4b7ce` FOREIGN KEY (`usersGuid`) REFERENCES `Users` (`guid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_7b278a9b9b557617ba0f6a47cf2` FOREIGN KEY (`categoriesGuid`) REFERENCES `Categories` (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `users_organization_organization`;
CREATE TABLE `users_organization_organization` (
  `usersGuid` varchar(36) NOT NULL,
  `organizationGuid` varchar(36) NOT NULL,
  PRIMARY KEY (`usersGuid`,`organizationGuid`),
  KEY `IDX_db53dae4ddcc4a8f1f6cec7ccf` (`usersGuid`),
  KEY `IDX_cb171b2ca98556ca7bdf2f2c28` (`organizationGuid`),
  CONSTRAINT `FK_cb171b2ca98556ca7bdf2f2c289` FOREIGN KEY (`organizationGuid`) REFERENCES `Organization` (`guid`),
  CONSTRAINT `FK_db53dae4ddcc4a8f1f6cec7ccf5` FOREIGN KEY (`usersGuid`) REFERENCES `Users` (`guid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `users_payment_method_payment_method`;
CREATE TABLE `users_payment_method_payment_method` (
  `usersGuid` varchar(36) NOT NULL,
  `paymentMethodGuid` varchar(36) NOT NULL,
  PRIMARY KEY (`usersGuid`,`paymentMethodGuid`),
  KEY `IDX_81677030e50ff65528fc99fb52` (`usersGuid`),
  KEY `IDX_a91581a3fd7391a8cf3365eeb2` (`paymentMethodGuid`),
  CONSTRAINT `FK_81677030e50ff65528fc99fb529` FOREIGN KEY (`usersGuid`) REFERENCES `Users` (`guid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_a91581a3fd7391a8cf3365eeb25` FOREIGN KEY (`paymentMethodGuid`) REFERENCES `PaymentMethod` (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- 2024-07-20 22:10:25