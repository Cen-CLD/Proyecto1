import { InitiativeForm } from "../forms/InitiativeForm.js";
import { CommentForm } from "../forms/CommentForm.js";

import { SectionManager } from "./SectionManager.js";
import { ContentManager } from "./ContentManager.js";

export class App {
    constructor() {
        // Managers
        this.sectionManager = new SectionManager();
        this.contentManager = new ContentManager(this.sectionManager);

        // Forms
        this.initiativeForm = new InitiativeForm("initiativeForm");
        this.commentForm = new CommentForm("comment-form", "comments-list");
        this.initiativeCommentForm = new CommentForm(
            "initiative-comment-form",
            "initiative-comments-list",
        );
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Global Clicks
        document.addEventListener("click", (e) => this.handleClick(e));

        // Global Submit
        document.addEventListener("submit", (e) => this.handleSubmit(e));
    }

    // Handlers
    handleClick(e) {
        if (e.target.closest(".btn-link")) {
            this.contentManager.handleLinkClick(e);
        } else if (e.target.closest("#btn-create-initiative")) {
            this.sectionManager.showSection(
                document.getElementById("initiatives-form"),
            );
        } else if (e.target.closest("#back-to-initiatives")) {
            this.sectionManager.showSection(
                document.getElementById("initiatives"),
            );
        }
    }

    handleSubmit(e) {
        if (
            e.target.matches(
                "#comment-form, #initiative-comment-form, #contact-form",
            )
        ) {
            e.preventDefault();

            if (e.target.id === "initiativeForm") {
                this.initiativeForm.handleSubmit(e);
            }
            if (e.target.id === "commentForm") {
                this.commentFormManager.handleSubmit(e);
            }
        }
    }
}
