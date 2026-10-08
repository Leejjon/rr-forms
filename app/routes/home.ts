import type {Route} from "./+types/home";
import {addComment, getComments} from "~/database/comments.server";
import type {NewComment} from "~/common/comments";
import {redirect} from "react-router";

function createCommentsElements() {
    return `<div>${getComments().map((comment) => {
        return `<div key="${comment.id}"><b>${comment.name}:</b> ${comment.message}` +
            `<br /><i>Posted at ${new Date(comment.timestamp).toISOString()}</i></div>`
    }).join('<br/>')}</div>`;
}

function createFormElement(nameError?: string) {
    const nameErrorLabel = `<label style="color: red; margin-left: 1em;">${nameError}</label>`;
    return "<form action='/' method='POST'>" +
        `${createCommentsElements()}` +
        "<br />" +
        "<label>Name:</label><br />" +
        `<input name='name' autocomplete='off' />${nameError !== undefined ? nameErrorLabel : ''}<br />` +
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

    function nameIsValid(): boolean {
        if (name) {
            return name.toString().length > 0 && name.toString().length < 20 &&
                name.toString().match(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/) !== null;
        }
        return false;
    }

    if (nameIsValid()) {
        addComment({name, message} as NewComment);
        return redirect("/");
    } else {
        return new Response(`<html>${createFormElement('You entered an invalid name.')}</html>`, {
            headers: {"Content-Type": "text/html"},
            status: 200
        });
    }
}

export async function loader(args: Route.LoaderArgs) {
    return new Response(`<html>${createFormElement()}</html>`, {
        headers: {"Content-Type": "text/html"},
        status: 200
    });
}
