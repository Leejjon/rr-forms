import {type UUID} from "node:crypto";

export type NewComment = {
    name: string;
    message: string;
}

export type Comment = {
    id: UUID;
    timestamp: number;
    name: string;
    message: string;
}
