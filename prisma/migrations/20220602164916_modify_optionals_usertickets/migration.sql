/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserTicket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ticketId` to the `Optional` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Optional" DROP CONSTRAINT "Optional_eventId_fkey";

-- AlterTable
ALTER TABLE "Optional" ADD COLUMN     "ticketId" INTEGER NOT NULL,
ALTER COLUMN "eventId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserTicket_userId_key" ON "UserTicket"("userId");

-- AddForeignKey
ALTER TABLE "Optional" ADD CONSTRAINT "Optional_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Optional" ADD CONSTRAINT "Optional_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
