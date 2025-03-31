import { z } from 'zod';

export const verifyLoadsCriteria = z.object({
  query: z.object({
    reference_number: z.string().optional().describe("Filter by reference number"),
    
    origin: z.string().optional().describe("Filter by origin city"),
    
    destination: z.string().optional().describe("Filter by destination city"),
    
    equipment_type: z.string().optional().describe("Filter by equipment type name"),
    
    rate: z.number().optional().describe("Filter by rate"),

    commodity: z.string().optional().describe("Filter by commodity name")
  })
});
