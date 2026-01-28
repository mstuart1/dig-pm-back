import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import type { ZodObject } from 'zod'
import { AppError } from './errorHandler.js'

const validateSchema = (schema: ZodObject) =>
  async (req: Request<unknown>, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      })
      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        const invalids = error.issues.map(issue => issue.path.pop())
        next(
          new AppError(
            'validation',
            `Invalid or missing input${
              invalids.length > 1 ? 's' : ''
            } provided for: ${invalids.join(', ')}`
          )
        )
      } else {
        next(new AppError('validation', 'Invalid input'))
      }
    }
  }
export default validateSchema