import type {Route} from "./+types/home";

export async function action({request}: Route.ActionArgs) {
    const formData = await request.formData();
    const name = formData.get("name");
    const message = formData.get("message");
    console.log(`Name=${name} Message=${message}`);
    return "Form submitted";
}

export async function loader(args: Route.LoaderArgs) {
    const commentForm = "<form action='/' method='POST'>" +
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
