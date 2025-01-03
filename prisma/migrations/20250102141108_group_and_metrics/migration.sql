-- AlterTable
ALTER TABLE `activities` MODIFY `type_activities` ENUM('QUIZ', 'CODE', 'IA') NOT NULL;

-- CreateTable
CREATE TABLE `group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `activities_fk` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `metric_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` TEXT NOT NULL,
    `metric_percentange` INTEGER NOT NULL,
    `group_fk` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `group` ADD CONSTRAINT `group_activities_fk_fkey` FOREIGN KEY (`activities_fk`) REFERENCES `activities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `metric_group` ADD CONSTRAINT `metric_group_group_fk_fkey` FOREIGN KEY (`group_fk`) REFERENCES `group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
