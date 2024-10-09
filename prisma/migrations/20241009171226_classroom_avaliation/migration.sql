-- CreateTable
CREATE TABLE `classroom_avaliation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `classroom_activities_fk` INTEGER NOT NULL,
    `complete_the_activity_correctly` BOOLEAN NULL,
    `content_organization` BOOLEAN NULL,
    `completion_within_the_indicated_deadline` BOOLEAN NULL,
    `creativity_in_the_response` BOOLEAN NULL,
    `collaboration` BOOLEAN NULL,
    `understanding_the_content` BOOLEAN NULL,

    UNIQUE INDEX `classroom_avaliation_classroom_activities_fk_key`(`classroom_activities_fk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `classroom_avaliation` ADD CONSTRAINT `classroom_avaliation_classroom_activities_fk_fkey` FOREIGN KEY (`classroom_activities_fk`) REFERENCES `classroom_activities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
