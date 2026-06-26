import type { CreateSchema, UpdateSchema, GetByPersonSchema } from './effort.schema.js'
import * as EffortService from './effort.service.js'
import type {  RequestHandler } from 'express'

export const getEffortsByPersonId: RequestHandler<GetByPersonSchema> = async (req, res) => {
  const { personId } = req.params
  const efforts = await EffortService.getEffortsByPersonId(personId)
  res.status(200).json(efforts)
}

export const createEffort: RequestHandler<{}, {}, CreateSchema> = async (req, res) => {
  const effortData = req.body
  const newEffort = await EffortService.createEffort(effortData)
  res.status(201).json(newEffort)
}

export const createBulkEffort: RequestHandler<{}, {}, CreateSchema[]> = async (req, res) => {
  const effortDataArray = req.body
  // for each effortData in effortDataArray, ensure that it is not a duplicate of an existing effort for the same person, project, and payrollDate
  for (const effortData of effortDataArray) {
    const existingEfforts = await EffortService.getEffortsByPersonId(effortData.employeeId)
    const duplicateEffort = existingEfforts.find(effort => 
      effort.projectId === effortData.projectId &&
      effort.payrollDate === effortData.payrollDate
    )
    if (duplicateEffort) {
   console.log(`skipping duplicate effort for employeeId ${effortData.employeeId}, projectId ${effortData.projectId}, payrollDate ${effortData.payrollDate}`)
    }
  }
  const newEfforts = await EffortService.createBulkEffort(effortDataArray)
  res.status(201).json(newEfforts)
}   

export const updateEffort: RequestHandler<{}, {}, UpdateSchema> = async (req, res) => {
  const effortData = req.body
  if (!effortData.id) {
    return res.status(400).json({ message: 'Effort ID is required for update.' })
  }
  const updatedEffort = await EffortService.updateEffort(effortData.id, effortData)
  res.status(200).json(updatedEffort)
}