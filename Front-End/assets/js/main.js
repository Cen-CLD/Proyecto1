import { App } from "./classes/App.js";
import { setAppInstance } from "./globals.js";

document.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    setAppInstance(app);
    app.init();
});
