/*
  Warnings:

  - You are about to drop the column `users_fk` on the `user_activities` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_activities` DROP FOREIGN KEY `user_activities_users_fk_fkey`;

-- AlterTable
ALTER TABLE `activities` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `user_activities` DROP COLUMN `users_fk`,
    ADD COLUMN `user_classroomId` INTEGER NULL;

-- CreateTable
CREATE TABLE `user_activities_archives` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `size` INTEGER NOT NULL,
    `original_name` TEXT NOT NULL,
    `archive_url` VARCHAR(191) NULL,
    `user_activities_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_activities` ADD CONSTRAINT `user_activities_user_classroomId_fkey` FOREIGN KEY (`user_classroomId`) REFERENCES `user_classroom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_activities_archives` ADD CONSTRAINT `user_activities_archives_user_activities_fk_fkey` FOREIGN KEY (`user_activities_fk`) REFERENCES `user_activities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
