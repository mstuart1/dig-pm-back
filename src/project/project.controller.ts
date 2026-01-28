import type { CreateSchema, UpdateSchema } from './project.schema.js'
import * as ProjectService from './project.service.js'
import type { Request, RequestHandler } from 'express'

export const getProjects: RequestHandler = async (req: Request, res) => {
  const projects = await ProjectService.getAllProjects()
  res.status(200).json(projects)
}

export const getProjectById: RequestHandler<{ projectId: string }> = async (req, res) => {
  const { projectId } = req.params
  const project = await ProjectService.getProjectById(projectId)
  if (!project) {
    return res.status(404).json({ message: 'Project not found.' })
  }
  res.status(200).json(project)
}

export const createProject: RequestHandler<{}, {}, CreateSchema> = async (req, res) => {
  const projectData = req.body
  const newProject = await ProjectService.createProject(projectData)
  res.status(201).json(newProject)
}

export const updateProject: RequestHandler<{}, {}, UpdateSchema> = async (req, res) => {
  const projectData = req.body
  if (!projectData.id) {
    return res.status(400).json({ message: 'Project ID is required for update.' })
  }
  const updatedProject = await ProjectService.updateProject(projectData.id, projectData)
  res.status(200).json(updatedProject)
}

export const connectPersonToProject: RequestHandler<{ projectId: string }, {}, { personId: string }> = async (req, res) => {
  const { projectId } = req.params
  const { personId } = req.body

  try {
    const updatedProject = await ProjectService.connectPersonToProject(projectId, personId)
    res.status(200).json(updatedProject)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const disconnectPersonFromProject: RequestHandler<{ projectId: string; personId: string }> = async (req, res) => {
  const { projectId, personId } = req.params

  try {
    const updatedProject = await ProjectService.disconnectPersonFromProject(projectId, personId)
    res.status(200).json(updatedProject)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}