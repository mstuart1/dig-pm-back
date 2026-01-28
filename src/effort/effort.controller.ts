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

export const updateEffort: RequestHandler<{}, {}, UpdateSchema> = async (req, res) => {
  const effortData = req.body
  if (!effortData.id) {
    return res.status(400).json({ message: 'Effort ID is required for update.' })
  }
  const updatedEffort = await EffortService.updateEffort(effortData.id, effortData)
  res.status(200).json(updatedEffort)
}