import { AdminRoutes } from "./AdminRoutes.js";
import { AdminManager } from "./AdminManager.js";
import { ROUTES } from "../constants.js";

export class App {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.apiUrl = ROUTES[this.currentPage];
        this.adminRoutes = null;
        this.adminManager = null;
    }

    getCurrentPage() {
        const path = window.location.pathname;
        return path.substring(path.lastIndexOf("/") + 1);
    }

    init() {
        if (this.apiUrl) {
            this.adminRoutes = new AdminRoutes();
            this.adminManager = new AdminManager(
                this.currentPage,
                this.apiUrl,
                this.adminRoutes,
            );
        }
    }
}
