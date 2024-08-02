-- CreateTable
CREATE TABLE `user_reapplication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_fk` INTEGER NULL,
    `reapplication_fk` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_reapplication` ADD CONSTRAINT `user_reapplication_reapplication_fk_fkey` FOREIGN KEY (`reapplication_fk`) REFERENCES `reapplication`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_reapplication` ADD CONSTRAINT `user_reapplication_user_fk_fkey` FOREIGN KEY (`user_fk`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
