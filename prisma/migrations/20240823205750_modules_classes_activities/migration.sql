-- AlterTable
ALTER TABLE `activities` ADD COLUMN `classesId` INTEGER NULL;

-- AlterTable
ALTER TABLE `classes` ADD COLUMN `moduleId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `classes_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `module`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `activities_classesId_fkey` FOREIGN KEY (`classesId`) REFERENCES `classes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
