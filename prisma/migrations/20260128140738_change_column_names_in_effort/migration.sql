/*
  Warnings:

  - You are about to drop the column `effortEndDate` on the `Effort` table. All the data in the column will be lost.
  - You are about to drop the column `effortStartDate` on the `Effort` table. All the data in the column will be lost.
  - Added the required column `payrollDate` to the `Effort` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Effort` DROP COLUMN `effortEndDate`,
    DROP COLUMN `effortStartDate`,
    ADD COLUMN `payrollDate` VARCHAR(191) NOT NULL;
