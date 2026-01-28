/*
  Warnings:

  - You are about to drop the `EffortEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `EffortEntry` DROP FOREIGN KEY `EffortEntry_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `EffortEntry` DROP FOREIGN KEY `EffortEntry_projectId_fkey`;

-- DropTable
DROP TABLE `EffortEntry`;

-- CreateTable
CREATE TABLE `Effort` (
    `id` VARCHAR(191) NOT NULL,
    `effortStartDate` VARCHAR(191) NOT NULL,
    `effortEndDate` VARCHAR(191) NOT NULL,
    `percentEffort` INTEGER NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Effort_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Effort` ADD CONSTRAINT `Effort_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Effort` ADD CONSTRAINT `Effort_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
