import {
    newsData,
    initiativeData,
    newsSelectors,
    initiativeSelectors,
} from "../constants.js";
import { prettifyText } from "../utils/prettify.js";

export class ContentManager {
    constructor(sectionManager) {
        this.sectionManager = sectionManager;
    }

    handleLinkClick(e) {
        const btnLink = e.target.closest(".btn-link");
        if (btnLink) {
            e.preventDefault();

            const newsId = parseInt(btnLink.dataset.newsId);
            const initiativeId = parseInt(btnLink.dataset.initiativesId);

            if (!isNaN(newsId)) {
                this.showContentDetail(
                    newsId,
                    newsData,
                    document.getElementById("news-detail"),
                    newsSelectors,
                );
            }

            if (!isNaN(initiativeId)) {
                this.showContentDetail(
                    initiativeId,
                    initiativeData,
                    document.getElementById("initiatives-detail"),
                    initiativeSelectors,
                );
            }
        }
    }

    showContentDetail(contentId, contentData, section, selectors) {
        const content = contentData.find((item) => item.id === contentId);
        if (content) {
            selectors.image.src = content.image;
            selectors.date.textContent = content.date;
            selectors.category.textContent = content.category;
            selectors.title.textContent = content.title;
            selectors.body.innerHTML = prettifyText(content.content);
            this.sectionManager.showSection(section);
        }
    }
}
