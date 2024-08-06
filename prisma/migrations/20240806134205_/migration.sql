/*
  Warnings:

  - You are about to drop the `_classroomTousers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_classroomTousers` DROP FOREIGN KEY `_classroomTousers_A_fkey`;

-- DropForeignKey
ALTER TABLE `_classroomTousers` DROP FOREIGN KEY `_classroomTousers_B_fkey`;

-- DropTable
DROP TABLE `_classroomTousers`;

-- CreateTable
CREATE TABLE `user_classroom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `classroomId` INTEGER NULL,
    `usersId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_classroom` ADD CONSTRAINT `user_classroom_classroomId_fkey` FOREIGN KEY (`classroomId`) REFERENCES `classroom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_classroom` ADD CONSTRAINT `user_classroom_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
