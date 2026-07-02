import type { CreateSchema, UpdateSchema, GetByPersonSchema } from './effort.schema.js'
import * as EffortService from './effort.service.js'
import type {  RequestHandler } from 'express'

export const getEffortsByPersonId: RequestHandler<GetByPersonSchema> = async (req, res) => {
  const { personId } = req.params
  const efforts = await EffortService.getEffortsByPersonId(personId)
  res.status(200).json(efforts)
}

export const createBulkEffort: RequestHandler<{}, {}, CreateSchema[]> = async (req, res) => {
  console.log('createBulkEffort');
  try {
    const effortDataArray = req.body
  // for each effortData in effortDataArray, ensure that it is not a duplicate of an existing effort for the same person, project, and payrollDate
  for (const effortData of effortDataArray) {
    const existingEfforts = await EffortService.getEffortsByPersonId(effortData.employeeId)
    const duplicateEffort = existingEfforts.find(effort => 
      effort.projectId === effortData.projectId &&
      effort.payrollDate === effortData.payrollDate
    )
    if (duplicateEffort) {
      if (duplicateEffort.percentEffort === effortData.percentEffort) {
        console.log(`skipping duplicate effort`);
        continue
      } else {
        // If the percentEffort is different, update the existing effort instead of creating a new one
        await EffortService.updateEffort(duplicateEffort.id, { percentEffort: effortData.percentEffort })
        continue
      }
    }
  }
  const newEfforts = await EffortService.createBulkEffort(effortDataArray)
  res.status(201).json(newEfforts)
  } catch (error) {
    console.error('Error in createBulkEffort:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
  
}   

export const updateEffort: RequestHandler<{}, {}, UpdateSchema> = async (req, res) => {
  const effortData = req.body
  if (!effortData.id) {
    return res.status(400).json({ message: 'Effort ID is required for update.' })
  }
  if (effortData.percentEffort === 0){
    // Handle the case where percentEffort is 0, e.g., delete the effort or set it to a default value
    await EffortService.deleteEffort(effortData.id)
    return res.status(200).json({ message: 'Effort deleted due to 0 percent effort.' })
  } else {
    const updatedEffort = await EffortService.updateEffort(effortData.id, effortData)
    res.status(200).json(updatedEffort)

  }
}