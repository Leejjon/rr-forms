import {type Comment, type NewComment} from "~/common/comments";
import {randomUUID} from "node:crypto";

const comments: Comment[] = [];

export function getComments () {
    return [...comments].sort((a, b) => a.timestamp - b.timestamp);
}

export function addComment(comment: NewComment) {
    comments.push({id: randomUUID(), timestamp: Date.now(), name: comment.name, message: comment.message} as Comment);
}
