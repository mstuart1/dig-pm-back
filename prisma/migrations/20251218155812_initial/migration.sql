-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `program` ENUM('DIGDEV', 'DIGGIS', 'EACPOLICY', 'EACPLANNING', 'CCRC', 'PUBLICHEALTH') NOT NULL,
    `lastPiReportDate` VARCHAR(191) NULL,
    `lastPiReportBalance` DOUBLE NULL,
    `title` VARCHAR(191) NOT NULL,
    `budget` DOUBLE NULL,
    `startDate` VARCHAR(191) NOT NULL,
    `endDate` VARCHAR(191) NOT NULL,
    `funder` VARCHAR(191) NOT NULL,
    `pi` VARCHAR(191) NOT NULL,
    `fundingMechanism` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `projectAccount` VARCHAR(191) NOT NULL,
    `taskNumber` VARCHAR(191) NOT NULL,
    `indirectRate` DOUBLE NULL,

    UNIQUE INDEX `Project_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Person` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `salary` INTEGER NOT NULL,
    `salaryEnteredDate` VARCHAR(191) NOT NULL,
    `program` ENUM('DIGDEV', 'DIGGIS', 'EACPOLICY', 'EACPLANNING', 'CCRC', 'PUBLICHEALTH') NOT NULL,

    UNIQUE INDEX `Person_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EffortEntry` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `effortStartDate` VARCHAR(191) NOT NULL,
    `effortEndDate` VARCHAR(191) NOT NULL,
    `percentEffort` INTEGER NULL,

    UNIQUE INDEX `EffortEntry_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EffortEntry` ADD CONSTRAINT `EffortEntry_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EffortEntry` ADD CONSTRAINT `EffortEntry_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
