import type {Route} from "./+types/home";

export async function loader(args: Route.LoaderArgs) {

    const commentForm = "<form action='/api/comments' method='POST'>" +
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
