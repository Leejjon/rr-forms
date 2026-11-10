import type {Route} from "./+types/home";
import type {NewComment} from "~/common/comments";
import {CommentSchema} from "~/common/validation";
import {addComment, getComments} from "~/database/comments.server";
import {Form, useActionData, useLoaderData, useNavigation} from "react-router";
import {parseSubmission, useForm, report, type SubmissionResult} from "@conform-to/react/future";
import { coerceFormValue } from '@conform-to/zod/v4/future';

type FormSubmitResponse = {
    data?: NewComment;
    validationResult?: SubmissionResult<string[], string | number | boolean | null>
}

export async function action({request}: Route.ActionArgs): Promise<FormSubmitResponse> {
    const formData = await request.formData();
    const submission = parseSubmission(formData);

    const validationResult = CommentSchema.safeParse(submission.payload);
    if (validationResult.success) {
        addComment(validationResult.data);
        return { validationResult: report(submission, { targetValue: { ...submission.payload, message: "" }})};
    } else {
        return { validationResult: report(submission, { error: { issues: validationResult.error.issues} })};
    }
}

export async function loader() {
    return getComments();
}

export default function Home() {
    const comments = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state !== "idle" && navigation.formMethod === "POST" && navigation.formAction === "/?index";

    const {
        form, fields
    } = useForm(
        coerceFormValue(CommentSchema), {
        lastResult: actionData?.validationResult, shouldValidate: 'onBlur', shouldRevalidate: 'onInput',
    });

    return (
        <Form action="/?index" method="POST" {...form.props} className="flex flex-col items-start *:m-1">
            {comments.map((comment) => {
                return (
                    <div key={comment.id} className="flex flex-col">
                        <div><b>{comment.name}: </b><>{comment.message} </></div>
                        <i>Posted at {new Date(comment.timestamp).toLocaleString()}</i>
                    </div>
                );
            })
            }
            <label>Name:</label>
            <div className="flex items-center gap-2">
                <input id={fields.name.id} name={fields.name.name} defaultValue={fields.name.defaultValue}
                       aria-invalid={!fields.name.valid || undefined} aria-describedby={fields.name.ariaDescribedBy}
                       required={fields.message.required}
                       minLength={fields.message.minLength}
                       maxLength={fields.message.maxLength}
                       pattern={fields.name.pattern} // TODO: Make sure it actually shows an error in these cases without javascript
                       className="border border-gray-400 rounded px-2 py-1" />
                {!fields.name.valid ? <label className="error">You entered an invalid name.</label> : <label></label>}
            </div>
            <label>Message:</label>
            <textarea id={fields.message.id} name={fields.message.name} defaultValue={actionData?.data?.message ?? ""}
                      className="border border-gray-400 rounded px-2 py-1"/>
            <button
                type="submit"
                disabled={!form.valid || isSubmitting}
                className="border border-gray-400 rounded bg-gray-100 px-3 py-1 hover:bg-gray-200 active:bg-gray-300">
                {isSubmitting ? "Submitting..." : "Submit"}
            </button>
        </Form>
    );
}
