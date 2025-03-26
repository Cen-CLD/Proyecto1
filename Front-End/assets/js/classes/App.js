import { InitiativeForm } from "../forms/InitiativeForm.js";
import { NoticeForm } from "../forms/NoticeForm.js";
import { NewsForm } from "../forms/NewsForm.js";
import { CommentForm } from "../forms/CommentForm.js";
import { ComplaintForm } from "../forms/ComplaintForm.js";
import { SectionManager } from "./SectionManager.js";
import { ContentManager } from "./ContentManager.js";

export class App {
    constructor() {
        this.role = this.getUserRoleFromURL();
        this.sectionManager = new SectionManager();
        this.contentManager = new ContentManager(
            this.sectionManager,
            this.role,
        );
        this.newsForm = new NewsForm("newForm");
        this.noticeForm = new NoticeForm("noticeForm");
        this.initiativeForm = new InitiativeForm("initiativeForm");
        this.complaintForm = new ComplaintForm("complaintForm");
        this.commentForm = new CommentForm("comment-form", "comments-list");
        this.initiativeCommentForm = new CommentForm(
            "initiative-comment-form",
            "initiative-comments-list",
        );
        this.complaintCommentForm = new CommentForm(
            "complaint-comment-form",
            "complaint-comments-list",
        );
    }

    init() {
        this.setupEventListeners();
        this.renderInitialContent();
        this.getUserRoleFromURL();
    }

    /*
     * This is a temporal function that will do the functionalilty of having
     * a role check from database user.
     *
     * We will remove or improve this function in the future
     */

    getUserRoleFromURL() {
        const path = window.location.pathname;
        if (path.includes("/admin/")) {
            return "admin";
        } else if (path.includes("/councilor/")) {
            return "councilor";
        } else {
            return "user";
        }
    }

    setupEventListeners() {
        document.addEventListener("click", (e) => this.handleClick(e));
        document.addEventListener("submit", (e) => this.handleSubmit(e));
    }

    handleClick(e) {
        try {
            if (e.target.closest("#btn-create-initiative")) {
                this.sectionManager.showSection("initiatives-form");
            } else if (e.target.closest("#btn-create-complaint")) {
                this.sectionManager.showSection("complaints-form");
            } else if (e.target.closest("#btn-create-new")) {
                this.sectionManager.showSection("news-form");
            } else if (e.target.closest("#btn-create-notice")) {
                this.sectionManager.showSection("notices-form");
            }
        } catch (error) {
            console.log("Error en el click, mas detalles: ", error);
        }
    }

    handleSubmit(e) {
        try {
            if (
                [
                    "comment-form",
                    "initiative-comment-form",
                    "complaint-comment-form",
                ].includes(e.target.id)
            ) {
                e.preventDefault();
                if (e.target.id === "complaintForm") {
                    this.complaintForm.handleSubmit(e);
                }
            }
        } catch (error) {
            console.log("Error al enviar: ", error);
        }
    }

    renderInitialContent() {
        this.contentManager.renderContentCards("complaints");
        this.contentManager.renderContentCards("initiatives");
        this.contentManager.renderContentCards("news");
        this.contentManager.renderContentCards("notices");
        this.contentManager.renderContentCards("services");
        this.contentManager.renderContentCards("community");
    }
}
