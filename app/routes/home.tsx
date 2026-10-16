import type {Route} from "./+types/home";
import type {NewComment} from "~/common/comments";
import {CommentSchema} from "~/common/validation";
import {addComment, getComments} from "~/database/comments.server";
import {Form, useLoaderData} from "react-router";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export async function action({request}: Route.ActionArgs) {
    const formData = await request.formData();
    const name = formData.get("name");
    const message = formData.get("message");

    const newComment = {name, message} as NewComment;

    const validationResult = CommentSchema.safeParse(
        newComment
    );
    if (validationResult.success) {
        addComment(newComment);
        return new Response("Success", {status: 200});
    } else {
        return new Response("Bad request", {status: 400});
    }
}

export async function loader() {
    return getComments();
}

export default function Home() {
    const comments = useLoaderData<typeof loader>();

    const {
        register,
        formState: { errors}
    } = useForm({
        resolver: zodResolver(CommentSchema),
        mode: "onChange"
    });

    return (
        <Form action="/?index" method="POST" className="flex flex-col items-start *:m-1">
            {comments.map((comment) => {
                return (
                    <div key={comment.id} className="flex flex-col">
                        <div><b>{comment.name}: </b><>{comment.message} </>
                        </div>
                        <i>Posted at {new Date(comment.timestamp).toLocaleString()}</i>
                    </div>
                );
            })
            }
            <label>Name:</label>
            <div className="flex items-center gap-2">
                <input {...register("name")} name='name'
                       className="border border-gray-400 rounded px-2 py-1"/>
                {errors.name && <label className="error">You entered an invalid name.</label>}
            </div>
            <label>Message:</label>
            <textarea {...register("message")} name='message' className="border border-gray-400 rounded px-2 py-1"/>
            <button
                type="submit"
                className="border border-gray-400 rounded bg-gray-100 px-3 py-1 hover:bg-gray-200 active:bg-gray-300">
                Submit
            </button>
        </Form>
    );
}
