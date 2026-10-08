import {randomUUID, type UUID} from "node:crypto";
import {type Comment} from "~/common/comments";
import type {NewCommentRequest} from "~/common/comments";

const comments: Comment[] = [];

export function getComments () {
    return [...comments].sort((a, b) => a.timestamp - b.timestamp);
}

export function addComment(comment: NewCommentRequest) {
    comments.push({id: randomUUID(), timestamp: Date.now(), name: comment.name, message: comment.message} as Comment);
}
