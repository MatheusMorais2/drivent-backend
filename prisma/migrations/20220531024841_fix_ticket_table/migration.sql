/*
  Warnings:

  - You are about to drop the column `hotelPrice` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `onlinePrice` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `presentialPrice` on the `Ticket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[type]` on the table `Optional` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[type]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "hotelPrice",
DROP COLUMN "onlinePrice",
DROP COLUMN "presentialPrice",
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Optional_type_key" ON "Optional"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_type_key" ON "Ticket"("type");
