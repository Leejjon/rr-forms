import { z } from "zod";

const nameMatcher = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/

export const CommentSchema = z.object({
    name: z.string().regex(nameMatcher).min(1).max(20),
    message: z.string()
});
