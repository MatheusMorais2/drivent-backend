-- DropForeignKey
ALTER TABLE "UserTicket" DROP CONSTRAINT "UserTicket_optionalId_fkey";

-- AlterTable
ALTER TABLE "UserTicket" ALTER COLUMN "optionalId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserTicket" ADD CONSTRAINT "UserTicket_optionalId_fkey" FOREIGN KEY ("optionalId") REFERENCES "Optional"("id") ON DELETE SET NULL ON UPDATE CASCADE;
