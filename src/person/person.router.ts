
import { Router } from 'express'
import validateSchema from '../middleware/validateSchema.js'
import { CreateSchema, UpdateSchema } from './person.schema.js'
import * as PersonController from './person.controller.js'

const router = Router()

router.get('/', PersonController.getPersons)
  .post('/', validateSchema(CreateSchema), PersonController.createPerson)
  .put('/', validateSchema(UpdateSchema), PersonController.updatePerson)
  .get('/', PersonController.getPersons)
  .get('/:personId', PersonController.getPersonById)

export default router;