import {type UUID} from "node:crypto";

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

export function addComment(comment: Comment) {
    comments.push(comment);
}
