
import { Router } from 'express'
import validateSchema from '../middleware/validateSchema.js'
import { CreateSchema, UpdateSchema } from './project.schema.js'
import * as ProjectController from './project.controller.js'


  const router = Router()

  router.get('/', ProjectController.getProjects)
  .post('/', validateSchema(CreateSchema), ProjectController.createProject)
  .put('/', validateSchema(UpdateSchema), ProjectController.updateProject)
  .get('/:projectId', ProjectController.getProjectById)
  .put('/:projectId/connect-person/:personId', ProjectController.connectPersonToProject )
  .put('/:projectId/disconnect-person/:personId', ProjectController.disconnectPersonFromProject )

  
export default router;