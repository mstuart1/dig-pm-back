import { z } from 'zod'

// Create Project Schema & Type
export const CreateSchema = z.object({
  body: z.object({
    title: z.string(),
    funder: z.string().optional(),
    pi: z.string().optional(),
    program: z.string().optional(),
    fundingMechanism: z.string().optional(),
    status: z.string(),
    projectAccount: z.string().optional(),
    taskNumber: z.string().optional(),
    lastPiReportDate: z.string().optional(),
    lastPiReportBalance: z.number().optional(),
    indirectRate: z.number().optional(),    
    startDate: z.string().optional(),
    endDate: z.string(),
    softEndDate: z.boolean().optional(),
    
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
    
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    funder: z.string().optional(),
    pi: z.string().optional(),
    fundingMechanism: z.string().optional(),
    status: z.string().optional(),
    projectAccount: z.string().optional(),
    taskNumber: z.string().optional(),
    indirectRate: z.number().optional(),    
    
    softEndDate: z.boolean().optional()
  })
})
export type UpdateSchema = z.infer<typeof UpdateSchema>['body']
