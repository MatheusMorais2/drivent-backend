/*
  Warnings:

  - A unique constraint covering the columns `[userTicketId]` on the table `PaymentDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PaymentDetails_userTicketId_key" ON "PaymentDetails"("userTicketId");
