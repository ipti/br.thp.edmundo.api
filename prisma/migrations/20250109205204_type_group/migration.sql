/*
  Warnings:

  - A unique constraint covering the columns `[type_group_fk]` on the table `group` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `group` ADD COLUMN `type_group_fk` INTEGER NULL;

-- CreateTable
CREATE TABLE `type_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `value` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `group_type_group_fk_key` ON `group`(`type_group_fk`);

-- AddForeignKey
ALTER TABLE `group` ADD CONSTRAINT `group_type_group_fk_fkey` FOREIGN KEY (`type_group_fk`) REFERENCES `type_group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
