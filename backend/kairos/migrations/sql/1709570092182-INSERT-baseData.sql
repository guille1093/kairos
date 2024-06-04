INSERT INTO `Roles` (`guid`, `role`, `description`) VALUES
('R01',	'Super',	'Super User'),
('R02',	'Client',	'Client User'),
('R03',	'ServiceProvier',	'ServiceProvier User'),
('R04',	'Moderator',	'Moderator User');

INSERT INTO `Users` (`guid`, `document`, `name`, `lastname`, `email`, `address`, `phone`, `username`, `googleID`, `isActive`, `password`, `createdAt`, `updatedAt`, `deletedAt`, `roleGuid`, `createdBy`, `updatedBy`) VALUES
('1',	'33444555',	'admin',	'admin',	'kairos@kairos.com',	NULL,	NULL,	'kairos@kairos.com',	'adminGoogleID',	1,	'$2b$08$EGql1iM0V/gqGjwPonbbCu82mdU5ycIfg.zcJTuukEVdyhNS9eC2a',	'2021-08-01 03:00:00.000000',	'2021-08-01 03:00:00.000000',	NULL,	'R01',	NULL,	NULL);