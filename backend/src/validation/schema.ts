import { z } from "zod"

export const runSchema = z.object({
  prompt: z.string().min(1).max(500),
  tool: z.enum(["calculator", "web-search"]),
})

export type RunInput = z.infer<typeof runSchema>
