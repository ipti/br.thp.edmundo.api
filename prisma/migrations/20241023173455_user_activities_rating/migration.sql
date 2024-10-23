-- DropIndex
DROP INDEX `user_activities_form_options_fk_fkey` ON `user_activities_form`;

-- CreateTable
CREATE TABLE `user_activities_rating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` INTEGER NOT NULL,
    `user_activities_fk` INTEGER NULL,

    UNIQUE INDEX `user_activities_rating_user_activities_fk_key`(`user_activities_fk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_activities_rating` ADD CONSTRAINT `user_activities_rating_user_activities_fk_fkey` FOREIGN KEY (`user_activities_fk`) REFERENCES `user_activities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
