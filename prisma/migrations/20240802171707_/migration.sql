/*
  Warnings:

  - You are about to alter the column `birthday` on the `registration` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `registration` MODIFY `birthday` DATETIME(3) NOT NULL;
