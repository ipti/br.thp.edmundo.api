-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'STUDENT', 'TEACHER') NOT NULL DEFAULT 'STUDENT',
    `name` VARCHAR(150) NOT NULL,
    `password` VARCHAR(60) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `registration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `avatar_url` VARCHAR(191) NULL,
    `birthday` DATETIME(3) NOT NULL,
    `cpf` VARCHAR(11) NULL,
    `sex` SMALLINT NOT NULL,
    `color_race` SMALLINT NOT NULL,
    `deficiency` BOOLEAN NOT NULL,
    `deficiency_description` TEXT NULL,
    `responsable_name` VARCHAR(90) NULL,
    `responsable_cpf` VARCHAR(11) NULL,
    `responsable_telephone` VARCHAR(11) NULL,
    `zone` SMALLINT NOT NULL,
    `kinship` ENUM('PAI', 'MAE', 'AVO_A', 'TIO_A', 'IRMAO_A', 'PRIMO_A', 'OUTRO', 'NAO_PARENTE', 'NAO_DEFINIDO') NULL DEFAULT 'NAO_DEFINIDO',
    `kinship_description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `user_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_reapplication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_fk` INTEGER NULL,
    `reapplication_fk` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reapplication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classroom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `owner_user_fk` INTEGER NOT NULL,
    `reapplication_fk` INTEGER NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_classroomTousers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_classroomTousers_AB_unique`(`A`, `B`),
    INDEX `_classroomTousers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `registration` ADD CONSTRAINT `registration_user_fk_fkey` FOREIGN KEY (`user_fk`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_reapplication` ADD CONSTRAINT `user_reapplication_reapplication_fk_fkey` FOREIGN KEY (`reapplication_fk`) REFERENCES `reapplication`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_reapplication` ADD CONSTRAINT `user_reapplication_user_fk_fkey` FOREIGN KEY (`user_fk`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classroom` ADD CONSTRAINT `classroom_reapplication_fk_fkey` FOREIGN KEY (`reapplication_fk`) REFERENCES `reapplication`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_classroomTousers` ADD CONSTRAINT `_classroomTousers_A_fkey` FOREIGN KEY (`A`) REFERENCES `classroom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_classroomTousers` ADD CONSTRAINT `_classroomTousers_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
