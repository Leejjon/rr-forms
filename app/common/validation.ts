const nameMatcher = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/

export function nameIsValid(comment: string | undefined): boolean {
    return comment !== undefined
        && comment.length > 1
        && comment.length <= 20
        && comment?.match(nameMatcher) !== null;
}
