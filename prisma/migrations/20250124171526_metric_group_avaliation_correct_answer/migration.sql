-- CreateTable
CREATE TABLE `metric_group_avaliation_correct_answer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `correct_answer` VARCHAR(191) NOT NULL,
    `metric_group_avaliation_fk` INTEGER NULL,
    `activities_fk` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `metric_group_avaliation_correct_answer` ADD CONSTRAINT `metric_group_avaliation_correct_answer_metric_group_avaliat_fkey` FOREIGN KEY (`metric_group_avaliation_fk`) REFERENCES `metric_group_avaliation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `metric_group_avaliation_correct_answer` ADD CONSTRAINT `metric_group_avaliation_correct_answer_activities_fk_fkey` FOREIGN KEY (`activities_fk`) REFERENCES `activities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
