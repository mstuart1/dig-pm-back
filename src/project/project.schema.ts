import { z } from 'zod'

// Create Project Schema & Type
export const CreateSchema = z.object({
  body: z.object({
    program: z.string().optional(),
    lastPiReportDate: z.string().optional(),
    lastPiReportBalance: z.number().optional(),
    title: z.string(),
    budget: z.number().optional(),
    startDate: z.string(),
    endDate: z.string(),
    funder: z.string(),
    pi: z.string(),
    fundingMechanism: z.string(),
    status: z.string(),
    projectAccount: z.string().optional(),
    taskNumber: z.string().optional(),
    indirectRate: z.number().optional(),    
    effortEntries: z.array(z.any()).optional(), // Replace z.any() with the actual EffortEntry schema if available
    softEndDate: z.boolean().optional()
  })
})
export type CreateSchema = z.infer<typeof CreateSchema>['body']

// Update Project Schema & Type
export const UpdateSchema = z.object({
  body: z.object({
    id: z.string(),
    program: z.string().optional(),
    lastPiReportDate: z.string().optional(),
    lastPiReportBalance: z.number().optional(),
    title: z.string().optional(),
    budget: z.number().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    funder: z.string().optional(),
    pi: z.string().optional(),
    fundingMechanism: z.string().optional(),
    status: z.string().optional(),
    projectAccount: z.string().optional(),
    taskNumber: z.string().optional(),
    indirectRate: z.number().optional(),    
    effortEntries: z.array(z.any()), // Replace z.any() with the actual EffortEntry schema if available
    softEndDate: z.boolean().optional()
  })
})
export type UpdateSchema = z.infer<typeof UpdateSchema>['body']
