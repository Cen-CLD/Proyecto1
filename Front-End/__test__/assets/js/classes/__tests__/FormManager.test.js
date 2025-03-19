import { FormManager } from "@classes/FormManager.js";

describe("FormManager", () => {
    let formManager;

    beforeEach(() => {
        document.body.innerHTML = `
      <form id="testForm">
        <input type="text" id="test-title" value="Hello" />
      </form>
    `;
        const config = {
            fields: [{ name: "title", selector: "#test-title" }],
        };
        formManager = new FormManager("testForm", config);
    });

    test("should call handleSubmit on submit", () => {
        jest.spyOn(formManager, "handleSubmit");
        const mockEvent = new Event("submit", {
            bubbles: true,
            cancelable: true,
        });
        document.getElementById("testForm").dispatchEvent(mockEvent);
        expect(formManager.handleSubmit).toHaveBeenCalled();
    });
});
