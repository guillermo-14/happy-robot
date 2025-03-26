import { z } from 'zod';

export const verifyNumberSchema = z.object({
  query: z.object({
    mc_number: z.string().optional(),
    usdot_number: z.string().optional(),
  })
  // Check that at least one of the two fields is provided AND has content
  .refine(
    data => 
      (data.mc_number !== undefined && data.mc_number.trim() !== '') || 
      (data.usdot_number !== undefined && data.usdot_number.trim() !== ''),
    {
      message: "You must provide either 'mc_number' or 'usdot_number' with a valid value",
      path: ["query"]
    }
  )
});
