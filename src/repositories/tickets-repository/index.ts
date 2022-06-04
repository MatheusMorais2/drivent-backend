import { prisma } from '@/config';

async function findTickets(eventId: number) {
  return prisma.ticket.findMany({
    where: {
      eventId: eventId,
    },
  });
}

async function findTicketById(ticketId: number) {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });
}

async function findOptionals(ticketId: number) {
  return prisma.optional.findMany({
    where: {
      ticketId: ticketId,
    },
  });
}

async function findOptionalById(optionalId: number) {
  return prisma.optional.findUnique({
    where: {
      id: optionalId,
    },
  });
}

async function findUserTicket(userId: number) {
  return prisma.userTicket.findFirst({
    where: {
      userId: userId,
    },
    include: {
      PaymentDetails: true,
    },
  });
}

async function updateTicket(ticketId: number, userId: number) {
  return prisma.userTicket.updateMany({
    where: {
      userId: userId,
    },
    data: {
      ticketId: ticketId,
    },
  });
}

async function createUserTicket(ticketId: number, userId: number) {
  return prisma.userTicket.create({
    data: {
      userId: userId,
      ticketId: ticketId,
    },
  });
}

async function updateOptional(optionalId: number, userId: number) {
  return prisma.userTicket.updateMany({
    where: {
      userId: userId,
    },
    data: {
      optionalId: optionalId,
    },
  });
}

async function getUserTicket(userId: number) {
  return prisma.userTicket.findFirst({
    where: {
      userId: userId,
    },
    include: {
      Ticket: true,
      Optional: true,
      PaymentDetails: true,
      HotelReservation: true,
    },
  });
}

const ticketRepository = {
  findTickets,
  findOptionals,
  updateTicket,
  updateOptional,
  findTicketById,
  findOptionalById,
  createUserTicket,
  findUserTicket,
  getUserTicket,
};

export default ticketRepository;
