import type { CreateSchema, UpdateSchema } from './person.schema.js'
import * as PersonService from './person.service.js'
import type { Request, RequestHandler } from 'express'

export const getPersons: RequestHandler = async (req: Request, res) => {
  let queryParams = req.query;
  let query = {} as any;
  let where = {} as any;
  let effortWhereConditions = {} as any;
  
  if (queryParams.projectId) {
    effortWhereConditions = { percentEffort: { not: 0 } };
    effortWhereConditions.projectId = queryParams.projectId;
  }

  let include = {
    efforts: {
      include: { project: true },
    }
  } as any;

  if (Object.keys(effortWhereConditions).length > 0) include.efforts = { ...include.efforts, where: effortWhereConditions };
  
  if (queryParams.program) {
    where = { program: queryParams.program }
  }

  if (Object.keys(effortWhereConditions).length > 0) where.efforts = { some: effortWhereConditions };
  if (Object.keys(where).length > 0) query.where = where;

  if (Object.keys(include).length > 0) query.include = include;
  // Only return persons who have at least one effort matching our conditions

  console.log('query:', JSON.stringify(query, null, 2));
  try {
    const persons = await PersonService.getAllPersons(query)
    res.status(200).json(persons)
  } catch (error) {
    console.error('Error in getPersons:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }

}


export const getPersonById: RequestHandler<{ personId: string }> = async (req, res) => {
  const { personId } = req.params
  const person = await PersonService.getPersonById(personId)
  if (!person) {
    return res.status(404).json({ message: 'Person not found.' })
  }
  res.status(200).json(person)
}

export const createPerson: RequestHandler<{}, {}, CreateSchema> = async (req, res) => {
  const personData = req.body
  const newPerson = await PersonService.createPerson(personData)
  res.status(201).json(newPerson)
}

export const updatePerson: RequestHandler<{}, {}, UpdateSchema> = async (req, res) => {
  const personData = req.body
  if (!personData.id) {
    return res.status(400).json({ message: 'Person ID is required for update.' })
  }
  const updatedPerson = await PersonService.updatePerson(personData.id, personData)
  res.status(200).json(updatedPerson)
}