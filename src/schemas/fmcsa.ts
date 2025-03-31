import { z } from 'zod';

export const verifyCarrierId = z.object({
  query: z.object({
    mc: z.string().optional(),
    dot: z.string().optional(),
  })
  // Check that at least one of the two fields is provided AND has content
  .refine(
    data => 
      (data.mc !== undefined && data.mc.trim() !== '') || 
      (data.dot !== undefined && data.dot.trim() !== ''),
    {
      message: "Either mc or dot must be provided",
      path: ["query"]
    }
  )
})
