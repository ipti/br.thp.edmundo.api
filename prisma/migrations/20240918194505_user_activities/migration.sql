/*
  Warnings:

  - You are about to drop the column `users_fk` on the `user_activities` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_activities` DROP FOREIGN KEY `user_activities_users_fk_fkey`;

-- AlterTable
ALTER TABLE `user_activities` DROP COLUMN `users_fk`,
    ADD COLUMN `user_classroomId` INTEGER NULL,
    ADD COLUMN `usersId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `user_activities` ADD CONSTRAINT `user_activities_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_activities` ADD CONSTRAINT `user_activities_user_classroomId_fkey` FOREIGN KEY (`user_classroomId`) REFERENCES `user_classroom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
