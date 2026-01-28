import { z } from 'zod'

export const GetByPersonSchema = z.object({
  params: z.object({
    personId: z.string(),
  }),
})

export type GetByPersonSchema = z.infer<typeof GetByPersonSchema>['params']

// Create Effort Schema & Type
export const CreateSchema = z.object({
  body: z.object({
    payrollDate: z.string(),
    percentEffort: z.number(),
    employeeId: z.string(),
    projectId: z.string(),
    
  }),
})
export type CreateSchema = z.infer<typeof CreateSchema>['body']

// Update Effort Schema & Type
export const UpdateSchema = z.object({
  body: z.object({
    id: z.string(),
    payrollDate: z.string().optional(),
    percentEffort: z.number().optional(),
    employeeId: z.string().optional(),
    projectId: z.string().optional(),
    
  }),
})
export type UpdateSchema = z.infer<typeof UpdateSchema>['body']