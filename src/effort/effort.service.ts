import prisma from "../lib/prisma.js";

export const getEffortsByPersonId = async (personId: string) => {
  return await prisma.effort.findMany({
    where: { employeeId: personId },
    include: { project: true, employee: true },
  });
};

export const createEffort = async (effortData: any) => {
  return await prisma.effort.create({
    data: effortData,
    include: { project: true, employee: true },
  });
};

export const createBulkEffort = async (effortDataArray: any[]) => {
  return await prisma.effort.createMany({
    data: effortDataArray,
    skipDuplicates: true, // Skip duplicates based on unique constraints
  });
};

export const updateEffort = async (effortId: string, effortData: any) => {
  return await prisma.effort.update({
    where: { id: effortId },
    data: effortData,
    include: { project: true, employee: true },
  });
};

export const deleteEffort = async (effortId: string) => {
  return await prisma.effort.delete({
    where: { id: effortId },
  });
};