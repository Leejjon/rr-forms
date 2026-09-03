import {type Route} from "../../../.react-router/types/app/routes/api/+types/comments";
import {addComment} from "~/database/comments.server";
import {type Comment} from "~/common/comments";
import {randomUUID} from "node:crypto";
import {redirect} from "react-router";

export async function action({request}: Route.ActionArgs) {
    const formData = await request.formData();
    const name = formData.get("name");
    const message = formData.get("message");

    function nameIsValid(): boolean {
        return !!name?.toString().match(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/);
    }

    if (nameIsValid()) {
        addComment({id: randomUUID(), timestamp: new Date(), name, message} as Comment);
        return redirect("/");
    } else {
        return new Response("Invalid name", {
            status: 400
        });
    }
}
