import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/tickets-repository';
import eventRepository from '@/repositories/event-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getTicketsTypes(eventId: number, userId: number) {
  const event = await findEventOrFail(eventId);

  await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollmentRepository) throw notFoundError();

  const tickets = await ticketRepository.findTickets(event.id);
  if (!tickets) throw notFoundError();

  return tickets;
}

async function getTicketsOptionals(ticketId: number, userId: number) {
  const ticket = await findTicketOrFail(ticketId);

  await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollmentRepository) throw notFoundError();

  const optionals = await ticketRepository.findOptionals(ticket.id);
  if (!optionals) throw notFoundError();

  return optionals;
}

async function getOptionals(ticketId: number, userId: number) {
  const ticket = await findTicketOrFail(ticketId);

  await enrollmentRepository.findWithAddressByUserId(userId);

  const optionals = await ticketRepository.findOptionalById(ticket.id);
  if (!optionals) throw notFoundError();

  return optionals;
}

async function updateTicket(ticketId: number, userId: number) {
  const ticket = await ticketRepository.findTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const userTicket = await ticketRepository.findUserTicket(userId);
  if (!userTicket) return await ticketRepository.createUserTicket(ticket.id, userId);

  if (ticket.type === 'Online') {
    await setOptionalToNull(userTicket.id);
  }

  await ticketRepository.updateTicket(ticket.id, userId);
}

async function updateOptional(optionalId: number, userId: number) {
  const optional = await ticketRepository.findOptionalById(optionalId);
  if (!optional) throw notFoundError();

  const userTicket = await ticketRepository.findUserTicket(userId);
  if (!userTicket) throw notFoundError();

  await ticketRepository.updateOptional(optional.id, userId);
}

async function getUserTicket(userId: number) {
  const userTicket = await ticketRepository.getUserTicket(userId);
  if (!userTicket) throw notFoundError();

  return userTicket;
}

async function deleteUserTicket(userId: number) {
  const userTicket = await ticketRepository.getUserTicket(userId);
  if (!userTicket) throw notFoundError();

  await ticketRepository.deleteUserTicket(userTicket.id);
}

async function findEventOrFail(eventId: number) {
  const event = await eventRepository.findById(eventId);
  if (!event) throw notFoundError();

  return event;
}

async function findTicketOrFail(ticketId: number) {
  const ticket = await ticketRepository.findTicketById(ticketId);
  if (!ticket) throw notFoundError();

  return ticket;
}

async function setOptionalToNull(userTicketId: number) {
  await ticketRepository.setOptionalToNullByUserTicketId(userTicketId);
}

const ticketsService = {
  getTicketsTypes,
  getTicketsOptionals,
  getOptionals,
  updateTicket,
  updateOptional,
  getUserTicket,
  deleteUserTicket,
};

export default ticketsService;
