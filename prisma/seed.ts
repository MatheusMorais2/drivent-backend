/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }
  console.log({ event });

  const ticket = await prisma.ticket.findFirst();
  if (!ticket) {
    await prisma.ticket.createMany({
      data: [
        {
          eventId: 1,
          type: 'Presencial',
          price: 250,
        },
        {
          eventId: 1,
          type: 'Online',
          price: 100,
        },
      ],
      skipDuplicates: true,
    });
  }

  const optional = await prisma.optional.findFirst();
  if (!optional) {
    await prisma.optional.createMany({
      data: [
        {
          eventId: 1,
          price: 0,
          type: 'Sem Hotel',
        },
        {
          eventId: 1,
          price: 350,
          type: 'Com Hotel',
        },
      ],
      skipDuplicates: true,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
