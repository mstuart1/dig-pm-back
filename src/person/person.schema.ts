import { z } from 'zod'

export const CreateSchema = z.object({
    body: z.object({
        firstName: z.string(),
        lastName: z.string(),
        salary: z.number(),
        salaryEnteredDate: z.string(),
        program: z.string(),
        effortEntries: z.array(z.any()).optional(),
        projects: z.array(z.any()).optional() // Replace z.any() with actual Project schema if available,
    })
})
export type CreateSchema = z.infer<typeof CreateSchema>['body']

export const UpdateSchema = z.object({
    body: z.object({
        id: z.string(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        salary: z.number().optional(),
        salaryEnteredDate: z.string().optional(),
        program: z.string().optional(),
        effortEntries: z.array(z.any()).optional(),
        projects: z.array(z.any()).optional() // Replace z.any() with actual Project schema if available,
    })
})
export type UpdateSchema = z.infer<typeof UpdateSchema>['body']