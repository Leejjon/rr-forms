import {type UUID} from "node:crypto";

export type Comment = {
    id: UUID;
    timestamp: Date;
    name: string;
    message: string;
}
