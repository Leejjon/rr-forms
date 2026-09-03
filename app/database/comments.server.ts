import {type Comment} from "~/common/comments";

const comments: Comment[] = [];

export function getComments () {
    return [...comments].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

export function addComment(comment: Comment) {
    comments.push(comment);
}
