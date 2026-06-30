import type { CreateSchema, UpdateSchema } from './person.schema.js'
import * as PersonService from './person.service.js'
import type { Request, RequestHandler } from 'express'

export const getPersons: RequestHandler = async (req: Request, res) => {
  let queryParams = req.query;
  let query = {} as any;
  let where = {} as any;
  let include = {efforts: {include: {project: true}}, projects: true} as any;
  if (queryParams.program) {
    where = { program: queryParams.program }
  }
  if (queryParams.projectId){
    include.projects = { where: { id: queryParams.projectId } }
    include.efforts = { include: { project: true }, where: { projectId: queryParams.projectId } }
  }
  
    if (Object.keys(where).length > 0) query.where = where;
    if (Object.keys(include).length > 0) query.include = include;

  const persons = await PersonService.getAllPersons(query)
  res.status(200).json(persons)
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