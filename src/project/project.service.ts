import prisma from "../lib/prisma.js";

export const getAllProjects = async () => {
  return await prisma.project.findMany();
};

export const getProjectById = async (projectId: string) => {
  return await prisma.project.findUnique({
    where: { id: projectId },
    include: {persons: {include: {efforts: true}} },
  });
};

export const createProject = async (projectData: any) => {
  console.log('Creating project with data:', projectData);
  try {

    return await prisma.project.create({
      data: projectData,
      include: {persons: true},
    });
  } catch (error) {
    throw new Error('Error creating project: ' + (error as Error).message); 
  }
};

export const updateProject = async (projectId: string, projectData: any) => {
  return await prisma.project.update({
    where: { id: projectId },
    data: projectData,
    include: {persons: true},
  });
};

export const connectPersonToProject = async (projectId: string, personId: string) => {
  // Check if project exists
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });
  if (!project) {
    throw new Error('Project not found.');
  }

  // Check if person exists
  const person = await prisma.person.findUnique({
    where: { id: personId },
  });
  if (!person) {
    throw new Error('Person not found.');
  }

  // Connect person to project
  return await prisma.project.update({
    where: { id: projectId },
    data: {
      persons: {
        connect: { id: personId },
      },
    },
    include: {persons: true},
  });
}

export const disconnectPersonFromProject = async (projectId: string, personId: string) => {
  // Check if project exists
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });
  if (!project) {
    throw new Error('Project not found.');
  }

  // Check if person exists
  const person = await prisma.person.findUnique({
    where: { id: personId },
  });
  if (!person) {
    throw new Error('Person not found.');
  }

  // Disconnect person from project
  return await prisma.project.update({
    where: { id: projectId },
    data: {
      persons: {
        disconnect: { id: personId },
      },
    },
    include: {persons: true},
  });
};