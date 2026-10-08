import type {Route} from "./+types/home";
import {addComment, getComments} from "~/database/comments.server";
import type {NewComment} from "~/common/comments";
import {redirect} from "react-router";

export async function action({request}: Route.ActionArgs) {
    const formData = await request.formData();
    const name = formData.get("name");
    const message = formData.get("message");
    addComment({name, message} as NewComment);
    return redirect("/");
}

export async function loader(args: Route.LoaderArgs) {
    const commentsElement = `<div>${getComments().map((comment) => {
        return `<div key="${comment.id}"><b>${comment.name}:</b> ${comment.message}` +
            `<br /><i>Posted at ${new Date(comment.timestamp).toISOString()}</i></div>`
    }).join('<br/>')}</div>`;

    const commentForm = "<form action='/' method='POST'>" +
        `${commentsElement}` +
        "<br />" +
        "<label>Name:</label><br />" +
        "<input name='name' /><br />" +
        "<label>Message:</label><br />" +
        "<textarea name='message'></textarea><br />" +
        "<br />" +
        "<button type='submit'>Submit</button>" +
        "</form>";
    return new Response(`<html>${commentForm}</html>`, {
        headers: {"Content-Type": "text/html"},
        status: 200
    });
}
