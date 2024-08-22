/*
  Warnings:

  - You are about to drop the column `classes_date` on the `classes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `classes` DROP COLUMN `classes_date`,
    ADD COLUMN `duration` DOUBLE NULL,
    ADD COLUMN `necessary_material` VARCHAR(191) NULL,
    ADD COLUMN `objective` VARCHAR(191) NULL;
