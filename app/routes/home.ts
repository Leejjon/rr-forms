import type {Route} from "./+types/home";
import {getComments} from "~/database/comments.server";

export async function loader(args: Route.LoaderArgs) {
    const commentsElement = `<div>${getComments().map((comment) => {
        return `<div key="${comment.id}"><b>${comment.name}:</b> ${comment.message}` +
            `<br /><i>Posted at ${comment.timestamp}</i></div>`
    }).join('<br/>')}</div>`;

    const commentForm = "<form action='/api/comments' method='POST'>" +
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
