
import { Router } from 'express'
import validateSchema from '../middleware/validateSchema.js'
import { CreateSchema, UpdateSchema } from './effort.schema.js'
import * as EffortController from './effort.controller.js'


  const router = Router()

    router.get('/person/:personId', EffortController.getEffortsByPersonId)
  .post('/', validateSchema(CreateSchema), EffortController.createEffort)
  .post('/bulk', EffortController.createBulkEffort)
  .put('/', validateSchema(UpdateSchema), EffortController.updateEffort)

  
export default router;