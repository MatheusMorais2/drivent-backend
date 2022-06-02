import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';

export async function getTicketsTypes(req: Request, res: Response) {
  const eventId = parseInt(req.params.eventId);
  const userId = parseInt(res.locals.userId);
  const tickets = await ticketsService.getTicketsTypes(eventId, userId);
  res.status(httpStatus.OK).send(tickets);
}

export async function getOptionals(req: Request, res: Response) {
  const eventId = parseInt(req.params.eventId);

  const userId = parseInt(res.locals.userId);
  const optionals = await ticketsService.getOptionals(eventId, userId);

  res.status(httpStatus.OK).send(optionals);
}

export async function updateTicket(req: Request, res: Response) {
  const ticketId = parseInt(req.body.ticketId);

  const userId = parseInt(res.locals.userId);

  await ticketsService.updateTicket(ticketId, userId);

  res.sendStatus(httpStatus.OK);
}

export async function updateOptional(req: Request, res: Response) {
  const optionalId = parseInt(req.body.optionalId);

  const userId = parseInt(res.locals.userId);

  await ticketsService.updateOptional(optionalId, userId);

  res.sendStatus(httpStatus.OK);
}

export async function getUserTicket(req: Request, res: Response) {
  /* const userId = parseInt(res.locals.userId); */
  const userId = parseInt(req.params.userId);

  const userTicket = await ticketsService.getUserTicket(userId);

  res.status(httpStatus.OK).send(userTicket);
}
