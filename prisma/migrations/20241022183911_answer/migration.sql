-- DropForeignKey
ALTER TABLE `user_activities_form` DROP FOREIGN KEY `user_activities_form_options_fk_fkey`;

-- CreateTable
CREATE TABLE `answer_form` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `users_fk` INTEGER NULL,
    `form_fk` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `answer_question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `answer_form_fk` INTEGER NOT NULL,
    `question_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `answer_option` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `answer_question_fk` INTEGER NOT NULL,
    `options_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_optionsTouser_activities_form` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_optionsTouser_activities_form_AB_unique`(`A`, `B`),
    INDEX `_optionsTouser_activities_form_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `answer_form` ADD CONSTRAINT `answer_form_users_fk_fkey` FOREIGN KEY (`users_fk`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer_form` ADD CONSTRAINT `answer_form_form_fk_fkey` FOREIGN KEY (`form_fk`) REFERENCES `form`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer_question` ADD CONSTRAINT `answer_question_answer_form_fk_fkey` FOREIGN KEY (`answer_form_fk`) REFERENCES `answer_form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer_question` ADD CONSTRAINT `answer_question_question_fk_fkey` FOREIGN KEY (`question_fk`) REFERENCES `question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer_option` ADD CONSTRAINT `answer_option_answer_question_fk_fkey` FOREIGN KEY (`answer_question_fk`) REFERENCES `answer_question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer_option` ADD CONSTRAINT `answer_option_options_fk_fkey` FOREIGN KEY (`options_fk`) REFERENCES `options`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_optionsTouser_activities_form` ADD CONSTRAINT `_optionsTouser_activities_form_A_fkey` FOREIGN KEY (`A`) REFERENCES `options`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_optionsTouser_activities_form` ADD CONSTRAINT `_optionsTouser_activities_form_B_fkey` FOREIGN KEY (`B`) REFERENCES `user_activities_form`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
