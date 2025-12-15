-- CreateTable
CREATE TABLE `user_classes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_fk` INTEGER NOT NULL,
    `classes_fk` INTEGER NOT NULL,
    `viewed` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_classes` ADD CONSTRAINT `user_classes_user_fk_fkey` FOREIGN KEY (`user_fk`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_classes` ADD CONSTRAINT `user_classes_classes_fk_fkey` FOREIGN KEY (`classes_fk`) REFERENCES `classes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
