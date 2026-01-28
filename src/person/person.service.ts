import prisma from "../lib/prisma.js";

export const getAllPersons = async () => {
  return await prisma.person.findMany();
};

export const getPersonById = async (personId: string) => {
  return await prisma.person.findUnique({
    where: { id: personId },
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