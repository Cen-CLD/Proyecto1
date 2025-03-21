import { App } from "@classes/App.js";

describe("App", () => {
    let app;

    beforeEach(() => {
        document.body.innerHTML = `
      <form id="initiativeForm">
        <input type="text" id="initiative-title" />
        <input type="text" id="initiative-category" />
        <textarea id="initiative-content"></textarea>
        <input type="file" id="initiative-image" />
      </form>
      <form id="complaintForm">
        <input type="text" id="complaint-title" />
        <input type="text" id="complaint-category" />
        <textarea id="complaint-content"></textarea>
        <input type="file" id="complaint-image" />
      </form>
      <form id="comment-form">
        <textarea name="comment-text"></textarea>
      </form>
      <form id="initiative-comment-form">
        <textarea name="comment-text"></textarea>
      </form>
      <form id="complaint-comment-form">
        <textarea name="comment-text"></textarea>
      </form>
      <div id="complaints-container"></div>
      <div id="initiatives-container"></div>
      <div id="news-container"></div>
      <div id="notices-container"></div>
      <section id="initiatives-form" class="right section"></section>
      <section id="complaints-form" class="right section"></section>
      <button id="btn-create-initiative"></button>
      <button id="btn-create-complaint"></button>
    `;
        app = new App();
        app.init();
    });

    test("should initialize without errors", () => {
        expect(document.getElementById("initiativeForm")).not.toBeNull();
    });

    test("should handle the click on #btn-create-initiative", () => {
        const spyShowSection = jest.spyOn(app.sectionManager, "showSection");
        document.getElementById("btn-create-initiative").click();
        expect(spyShowSection).toHaveBeenCalledWith("initiatives-form");
    });

    test("should handle the click on #btn-create-complaint", () => {
        const spyShowSection = jest.spyOn(app.sectionManager, "showSection");
        document.getElementById("btn-create-complaint").click();
        expect(spyShowSection).toHaveBeenCalledWith("complaints-form");
    });

    test("should handle the submit event on #complaintForm", () => {
        jest.spyOn(app.complaintForm, "handleSubmit");
        const form = document.getElementById("complaintForm");
        const event = new Event("submit", { bubbles: true, cancelable: true });
        form.dispatchEvent(event);
        expect(app.complaintForm.handleSubmit).toHaveBeenCalled();
    });
});
