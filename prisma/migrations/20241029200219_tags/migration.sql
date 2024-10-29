-- CreateTable
CREATE TABLE `tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `type` ENUM('ACTIVITIES', 'USERS') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags_activities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `activities_fk` INTEGER NULL,
    `tag_fk` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_fk` INTEGER NULL,
    `tag_fk` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tags_activities` ADD CONSTRAINT `tags_activities_activities_fk_fkey` FOREIGN KEY (`activities_fk`) REFERENCES `activities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags_activities` ADD CONSTRAINT `tags_activities_tag_fk_fkey` FOREIGN KEY (`tag_fk`) REFERENCES `tags`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags_users` ADD CONSTRAINT `tags_users_user_fk_fkey` FOREIGN KEY (`user_fk`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags_users` ADD CONSTRAINT `tags_users_tag_fk_fkey` FOREIGN KEY (`tag_fk`) REFERENCES `tags`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
