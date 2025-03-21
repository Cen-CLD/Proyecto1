import { App } from "@classes/App.js";

import "../../../../../assets/js/main.js";

describe("main.js", () => {
    test("should instantiate App and call init on DOMContentLoaded", () => {
        const spyInit = jest.spyOn(App.prototype, "init");
        const event = new Event("DOMContentLoaded");
        document.dispatchEvent(event);
        expect(spyInit).toHaveBeenCalled();
    });
});
