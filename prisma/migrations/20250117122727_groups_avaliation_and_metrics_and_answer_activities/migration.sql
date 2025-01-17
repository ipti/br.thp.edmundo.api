-- AlterTable
ALTER TABLE `activities` MODIFY `type_activities` ENUM('QUIZ', 'CODE', 'IA') NOT NULL;

-- CreateTable
CREATE TABLE `activities_group_avaliation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `activitie_fk` INTEGER NULL,
    `group_avaliation_fk` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `group_avaliation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `type_group_avaliation_fk` INTEGER NULL,

    UNIQUE INDEX `group_avaliation_type_group_avaliation_fk_key`(`type_group_avaliation_fk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `metric_group_avaliation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` TEXT NOT NULL,
    `metric_percentange` INTEGER NOT NULL,
    `group_avaliation_fk` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_group_avaliation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `value` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `answer_user_activities_ia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `analyzerFeedback` TEXT NOT NULL,
    `user_activities_fk` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `answer_user_activities_ia_group_avaliation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_avaliation_fk` INTEGER NULL,
    `answer_user_activities_ia_fk` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `answer_user_activities_ia_group_avaliation_metrics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grade` INTEGER NOT NULL,
    `metric_group_avaliation_fk` INTEGER NULL,
    `answer_user_activities_ia_group_avaliation_fk` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `answer_user_activities_group_avaliation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `answer` MEDIUMTEXT NOT NULL,
    `group_avaliation_fk` INTEGER NULL,
    `user_activities_fk` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `activities_group_avaliation` ADD CONSTRAINT `activities_group_avaliation_activitie_fk_fkey` FOREIGN KEY (`activitie_fk`) REFERENCES `activities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activities_group_avaliation` ADD CONSTRAINT `activities_group_avaliation_group_avaliation_fk_fkey` FOREIGN KEY (`group_avaliation_fk`) REFERENCES `group_avaliation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_avaliation` ADD CONSTRAINT `group_avaliation_type_group_avaliation_fk_fkey` FOREIGN KEY (`type_group_avaliation_fk`) REFERENCES `type_group_avaliation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `metric_group_avaliation` ADD CONSTRAINT `metric_group_avaliation_group_avaliation_fk_fkey` FOREIGN KEY (`group_avaliation_fk`) REFERENCES `group_avaliation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer_user_activities_ia` ADD CONSTRAINT `answer_user_activities_ia_user_activities_fk_fkey` FOREIGN KEY (`user_activities_fk`) REFERENCES `user_activities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer_user_activities_ia_group_avaliation` ADD CONSTRAINT `answer_user_activities_ia_group_avaliation_group_avaliation_fkey` FOREIGN KEY (`group_avaliation_fk`) REFERENCES `group_avaliation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer_user_activities_ia_group_avaliation` ADD CONSTRAINT `answer_user_activities_ia_group_avaliation_answer_user_acti_fkey` FOREIGN KEY (`answer_user_activities_ia_fk`) REFERENCES `answer_user_activities_ia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer_user_activities_ia_group_avaliation_metrics` ADD CONSTRAINT `answer_user_activities_ia_group_avaliation_metrics_metric_g_fkey` FOREIGN KEY (`metric_group_avaliation_fk`) REFERENCES `metric_group_avaliation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer_user_activities_ia_group_avaliation_metrics` ADD CONSTRAINT `answer_user_activities_ia_group_avaliation_metrics_answer_u_fkey` FOREIGN KEY (`answer_user_activities_ia_group_avaliation_fk`) REFERENCES `answer_user_activities_ia_group_avaliation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer_user_activities_group_avaliation` ADD CONSTRAINT `answer_user_activities_group_avaliation_group_avaliation_fk_fkey` FOREIGN KEY (`group_avaliation_fk`) REFERENCES `group_avaliation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer_user_activities_group_avaliation` ADD CONSTRAINT `answer_user_activities_group_avaliation_user_activities_fk_fkey` FOREIGN KEY (`user_activities_fk`) REFERENCES `user_activities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
