import {type Route} from "../../../.react-router/types/app/routes/api/+types/comments";
import {type Comment, addComment} from "~/database/comments.server";
import {randomUUID} from "node:crypto";
import {redirect} from "react-router";

export async function action({request}: Route.ActionArgs) {
    const formData = await request.formData();
    const name = formData.get("name");
    const message = formData.get("message");
    addComment({id: randomUUID(), timestamp: new Date(), name, message} as Comment);
    return redirect("/");
}
