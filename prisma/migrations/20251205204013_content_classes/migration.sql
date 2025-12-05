-- AlterTable
ALTER TABLE `classes` ADD COLUMN `content` MEDIUMTEXT NULL;

-- AddForeignKey
ALTER TABLE `group_avaliation` ADD CONSTRAINT `group_avaliation_type_group_avaliation_fk_fkey` FOREIGN KEY (`type_group_avaliation_fk`) REFERENCES `type_group_avaliation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
