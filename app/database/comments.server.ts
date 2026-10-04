import {randomUUID, type UUID} from "node:crypto";
import type {NewCommentRequest} from "~/common/comments";

export type Comment = {
    id: UUID;
    timestamp: Date;
    name: string;
    message: string;
}

const comments: Comment[] = [];

export function getComments () {
    return [...comments].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

export function addComment(comment: NewCommentRequest) {
    comments.push({id: randomUUID(), timestamp: new Date(), name: comment.name, message: comment.message} as Comment);
}
