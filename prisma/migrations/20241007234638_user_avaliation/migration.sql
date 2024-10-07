-- AlterTable
ALTER TABLE `classroom_activities` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `classroom_classes` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `classroom_module` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `form` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `options` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `question` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `response_question` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user_activities_form` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `user_avaliation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `user_activities_fk` INTEGER NOT NULL,
    `complete_the_activity_correctly` DOUBLE NULL,
    `content_organization` DOUBLE NULL,
    `completion_within_the_indicated_deadline` DOUBLE NULL,
    `creativity_in_the_response` DOUBLE NULL,
    `collaboration` DOUBLE NULL,
    `understanding_the_content` DOUBLE NULL,
    `total` DOUBLE NULL,

    UNIQUE INDEX `user_avaliation_user_activities_fk_key`(`user_activities_fk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_avaliation` ADD CONSTRAINT `user_avaliation_user_activities_fk_fkey` FOREIGN KEY (`user_activities_fk`) REFERENCES `user_activities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
