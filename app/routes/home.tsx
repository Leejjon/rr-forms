import type {Route} from "./+types/home";
import type {Comment, NewComment} from "~/common/comments";
import {type ChangeEvent, useRef, useState} from "react";
import {nameIsValid} from "~/common/validation";
import {addComment, getComments} from "~/database/comments.server";
import {useLoaderData} from "react-router";

export async function action({request}: Route.ActionArgs) {
    const newComment = await request.json() as NewComment;

    if (nameIsValid(newComment.name)) {
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

    const [nameInvalid, setNameInvalid] = useState(false);
    const nameInputRef = useRef<HTMLInputElement | null>(null);
    const messageInputRef = useRef<HTMLTextAreaElement | null>(null);

    function validateUpdatedName(event: ChangeEvent<HTMLInputElement>) {
        if (nameIsValid(event.target.value)) {
            setNameInvalid(false);
        } else {
            setNameInvalid(true);
        }
    }

    function submitComment() {
        if (!nameIsValid(nameInputRef.current?.value)) {
            nameInputRef.current?.focus();
            return;
        }

        const commentRequestBody = {
            name: nameInputRef.current?.value, message: messageInputRef.current?.value
        };

        fetch('/?index', {
            method: "POST",
            body: JSON.stringify(commentRequestBody)
        }).then(response => {
            if (response.status === 200) {
                window.location.reload();
            } else {
                setNameInvalid(true);
            }
        });
    }

    return (
        <div className="flex flex-col items-start *:m-1">
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
                <input name='name' ref={nameInputRef} onChange={validateUpdatedName}
                       className="border border-gray-400 rounded px-2 py-1"/>
                {nameInvalid && <label className="error">You entered an invalid name.</label>}
            </div>
            <label>Message:</label>
            <textarea name='message' ref={messageInputRef} className="border border-gray-400 rounded px-2 py-1"/>
            <button
                className="border border-gray-400 rounded bg-gray-100 px-3 py-1 hover:bg-gray-200 active:bg-gray-300"
                onClick={submitComment}>Submit
            </button>
        </div>
    );
}
