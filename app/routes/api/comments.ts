import {type Route} from "../../../.react-router/types/app/routes/api/+types/comments";

export async function action({request}: Route.ActionArgs) {
    const formData = await request.formData();
    const name = formData.get("name");
    const message = formData.get("message");
    console.log(`Name=${name} Message=${message}`);
    return "Form submitted";
}
