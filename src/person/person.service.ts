import prisma from "../lib/prisma.js";

export const getAllPersons = async ( query: any) => {
  return await prisma.person.findMany(query);
};

export const getPersonById = async (personId: string) => {
  return await prisma.person.findUnique({
    where: { id: personId },
    include: {
      efforts: {
        include: {
          project: true
        }
      },
      projects: true
    }
  });
};

export const createPerson = async (personData: any) => {
  return await prisma.person.create({
    data: personData,
  });
};

export const updatePerson = async (personId: string, personData: any) => {
  return await prisma.person.update({
    where: { id: personId },
    data: personData,
  });
};