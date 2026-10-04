import {type UUID} from "node:crypto";

export type NewCommentRequest = {
    name: string;
    message: string;
}

export type CommentResponse = {
    id: UUID;
    timestamp: string;
    name: string;
    message: string;
}
