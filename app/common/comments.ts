import {type UUID} from "node:crypto";
import type {CommentSchema} from "~/common/validation";
import { z } from "zod";

export type NewComment = z.infer<typeof CommentSchema>;

export type Comment = {
    id: UUID;
    timestamp: number;
    name: string;
    message: string;
}
