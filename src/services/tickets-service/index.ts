import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/tickets-repository';
import eventRepository from '@/repositories/event-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getTicketsTypes(eventId: number, userId: number) {
  const event = await findEventOrFail(eventId);

  await enrollmentRepository.findWithAddressByUserId(userId);

  const tickets = await ticketRepository.findMany(event.id);
  if (!tickets) throw notFoundError();

  return tickets;
}

async function getOptionals(eventId: number, userId: number) {
  const event = await findEventOrFail(eventId);

  await enrollmentRepository.findWithAddressByUserId(userId);

  const optionals = await ticketRepository.findOptionals(event.id);
  if (!optionals) throw notFoundError();

  return optionals;
}

async function updateTicket(ticketId: number, userId: number) {
  const ticket = await ticketRepository.findTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const userTicket = await ticketRepository.findUserTicket(userId);
  if (!userTicket) return await ticketRepository.createUserTicket(ticket.id, userId);

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

async function findEventOrFail(eventId: number) {
  const event = await eventRepository.findById(eventId);
  if (!event) throw notFoundError();

  return event;
}

const ticketsService = {
  getTicketsTypes,
  getOptionals,
  updateTicket,
  updateOptional,
  getUserTicket,
};

export default ticketsService;
