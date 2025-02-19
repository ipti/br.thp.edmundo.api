-- AlterTable
ALTER TABLE `answer_form` ADD COLUMN `classroom_fk` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `answer_form` ADD CONSTRAINT `answer_form_classroom_fk_fkey` FOREIGN KEY (`classroom_fk`) REFERENCES `classroom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
