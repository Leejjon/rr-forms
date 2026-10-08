import type {Route} from "./+types/home";
import {addComment, getComments} from "~/database/comments.server";
import type {NewComment} from "~/common/comments";
import {redirect} from "react-router";
import {nameIsValid} from "~/common/validation";

function createCommentsElements() {
    return `<div>${getComments().map((comment) => {
        return `<div key="${comment.id}"><b>${comment.name}:</b> ${comment.message}` +
            `<br /><i>Posted at ${new Date(comment.timestamp).toISOString()}</i></div>`
    }).join('<br/>')}</div>`;
}

function createFormElement() {
    const nameErrorLabel = `<label class="error">You entered an invalid name.</label>`;
    return "<form action='/' method='POST'>" +
        `${createCommentsElements()}` +
        "<br />" +
        "<label>Name:</label><br />" +
        `<input name='name' required minlength='1' maxlength='20' pattern='^[A-Za-z0-9]+(?:[ _\\-][A-Za-z0-9]+)*$' placeholder='' />${nameErrorLabel}<br />` +
        "<label>Message:</label><br />" +
        "<textarea name='message'></textarea><br />" +
        "<br />" +
        "<button type='submit'>Submit</button>" +
        "</form>";
}

export async function action({request}: Route.ActionArgs) {
    const formData = await request.formData();
    const name = formData.get("name");
    const message = formData.get("message");

    if (nameIsValid(name?.toString())) {
        addComment({name, message} as NewComment);
        return redirect("/");
    } else {
        return new Response(`Invalid request`, {
            status: 400
        });
    }
}

const headAndStyleElement = "<head>" +
    "<style>" +
    "input:not(:placeholder-shown):invalid {" +
        "border: 2px solid red;" +
        "background-color: #ffecec;" +
    "}"+
    "input:not(:placeholder-shown):invalid + .error {" +
        "display: inline;" +
        "color: red;" +
    "}" +
    ".error { display: none; color: red; margin-left: 1em; }" +
    "</style>" +
    "</head>";

export async function loader(args: Route.LoaderArgs) {
    return new Response(`<html>${headAndStyleElement}${createFormElement()}</html>`, {
        headers: {"Content-Type": "text/html"},
        status: 200
    });
}
