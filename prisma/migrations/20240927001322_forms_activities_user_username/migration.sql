/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `username` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `form` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `activitiesId` INTEGER NOT NULL,

    UNIQUE INDEX `form_activitiesId_key`(`activitiesId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `type` ENUM('MULTIPLE_CHOICE', 'SELECTION_BOX') NOT NULL,
    `formId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `response_question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `option_fk` INTEGER NOT NULL,
    `question_fk` INTEGER NULL,

    UNIQUE INDEX `response_question_option_fk_key`(`option_fk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `options` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `value` INTEGER NULL,
    `questionId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_activities_form` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_classroom_fk` INTEGER NOT NULL,
    `options_fk` INTEGER NOT NULL,
    `question_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_username_key` ON `users`(`username`);

-- AddForeignKey
ALTER TABLE `form` ADD CONSTRAINT `form_activitiesId_fkey` FOREIGN KEY (`activitiesId`) REFERENCES `activities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `response_question` ADD CONSTRAINT `response_question_option_fk_fkey` FOREIGN KEY (`option_fk`) REFERENCES `options`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `response_question` ADD CONSTRAINT `response_question_question_fk_fkey` FOREIGN KEY (`question_fk`) REFERENCES `question`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `options` ADD CONSTRAINT `options_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_activities_form` ADD CONSTRAINT `user_activities_form_user_classroom_fk_fkey` FOREIGN KEY (`user_classroom_fk`) REFERENCES `user_classroom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_activities_form` ADD CONSTRAINT `user_activities_form_options_fk_fkey` FOREIGN KEY (`options_fk`) REFERENCES `options`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_activities_form` ADD CONSTRAINT `user_activities_form_question_fk_fkey` FOREIGN KEY (`question_fk`) REFERENCES `question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
