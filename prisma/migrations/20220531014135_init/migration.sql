-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('Presential', 'Online');

-- CreateEnum
CREATE TYPE "AccomodationType" AS ENUM ('Single', 'Double', 'Triple');

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "presentialPrice" INTEGER NOT NULL,
    "onlinePrice" INTEGER NOT NULL,
    "hotelPrice" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Optional" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Optional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTicket" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "optionalId" INTEGER NOT NULL,

    CONSTRAINT "UserTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentDetails" (
    "id" SERIAL NOT NULL,
    "userTicketId" INTEGER NOT NULL,
    "totalValue" INTEGER NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PaymentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotel" (
    "id" SERIAL NOT NULL,
    "name" INTEGER NOT NULL,
    "AccomdationTypes" "AccomodationType"[],
    "TotalRooms" INTEGER NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HotelRoom" (
    "id" SERIAL NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "availableBeds" INTEGER NOT NULL,

    CONSTRAINT "HotelRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HotelReservation" (
    "id" SERIAL NOT NULL,
    "userTicketId" INTEGER NOT NULL,
    "hotelRoomId" INTEGER NOT NULL,

    CONSTRAINT "HotelReservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_name_key" ON "Hotel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "HotelReservation_userTicketId_key" ON "HotelReservation"("userTicketId");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Optional" ADD CONSTRAINT "Optional_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTicket" ADD CONSTRAINT "UserTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTicket" ADD CONSTRAINT "UserTicket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTicket" ADD CONSTRAINT "UserTicket_optionalId_fkey" FOREIGN KEY ("optionalId") REFERENCES "Optional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentDetails" ADD CONSTRAINT "PaymentDetails_userTicketId_fkey" FOREIGN KEY ("userTicketId") REFERENCES "UserTicket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotelRoom" ADD CONSTRAINT "HotelRoom_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotelReservation" ADD CONSTRAINT "HotelReservation_userTicketId_fkey" FOREIGN KEY ("userTicketId") REFERENCES "UserTicket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotelReservation" ADD CONSTRAINT "HotelReservation_hotelRoomId_fkey" FOREIGN KEY ("hotelRoomId") REFERENCES "HotelRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
