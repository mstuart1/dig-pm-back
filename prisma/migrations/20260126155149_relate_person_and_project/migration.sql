-- AlterTable
ALTER TABLE `EffortEntry` ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Person` ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Project` ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `_PersonToProject` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_PersonToProject_AB_unique`(`A`, `B`),
    INDEX `_PersonToProject_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PersonToProject` ADD CONSTRAINT `_PersonToProject_A_fkey` FOREIGN KEY (`A`) REFERENCES `Person`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PersonToProject` ADD CONSTRAINT `_PersonToProject_B_fkey` FOREIGN KEY (`B`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
