import { prisma } from '@/config';

async function findFirst() {
  return prisma.event.findFirst();
}

async function findById(eventId: number) {
  return prisma.event.findFirst({
    where: {
      id: eventId,
    },
  });
}

const eventRepository = {
  findFirst,
  findById,
};

export default eventRepository;
