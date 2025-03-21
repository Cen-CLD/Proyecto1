import { CommentForm } from "@forms/CommentForm.js";

describe("CommentForm", () => {
    let commentForm;

    beforeEach(() => {
        document.body.innerHTML = `
      <form id="commentForm">
        <textarea name="comment-text">Texto inicial</textarea>
      </form>
      <div id="comments-list"></div>
    `;

        commentForm = new CommentForm("commentForm", "comments-list");
    });

    test("should call addCommentToDOM on submit", async () => {
        jest.spyOn(commentForm, "addCommentToDOM");

        const form = document.getElementById("commentForm");
        const submitEvent = new Event("submit", {
            bubbles: true,
            cancelable: true,
        });
        form.dispatchEvent(submitEvent);

        await Promise.resolve();

        expect(commentForm.addCommentToDOM).toHaveBeenCalled();
    });
});
