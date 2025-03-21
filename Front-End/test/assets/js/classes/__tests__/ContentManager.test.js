import { ContentManager } from "@classes/ContentManager.js";
import { SectionManager } from "@classes/SectionManager.js";

describe("ContentManager", () => {
    let contentManager;

    beforeEach(() => {
        document.body.innerHTML = `
      <!-- Containers for renderContentCards -->
      <div id="complaints-container"></div>
      <div id="initiatives-container"></div>
      <div id="news-container"></div>
      <div id="notices-container"></div>

      <!-- Detail elements for 'complaints' -->
      <img id="complaint-detail-image" />
      <span id="complaint-detail-date"></span>
      <span id="complaint-detail-category"></span>
      <span id="complaint-detail-title"></span>
      <div id="complaint-detail-body"></div>

      <!-- Detail elements for 'initiatives' -->
      <img id="initiative-detail-image" />
      <span id="initiative-detail-date"></span>
      <span id="initiative-detail-category"></span>
      <span id="initiative-detail-title"></span>
      <div id="initiative-detail-body"></div>

      <!-- Detail elements for 'news' -->
      <img id="detail-image" />
      <span id="detail-date"></span>
      <span id="detail-category"></span>
      <span id="detail-title"></span>
      <div id="detail-body"></div>

      <!-- Detail elements for 'notices' -->
      <img id="notice-detail-image" />
      <span id="notice-detail-date"></span>
      <span id="notice-detail-category"></span>
      <span id="notice-detail-title"></span>
      <div id="notice-detail-body"></div>
    `;
        const sectionManager = new SectionManager();
        contentManager = new ContentManager(sectionManager);
    });

    describe("renderContentCards", () => {
        test("renders a valid content type (complaints)", () => {
            contentManager.renderContentCards("complaints");
            expect(
                document.getElementById("complaints-container").innerHTML,
            ).not.toBe("");
        });

        test("logs an error for invalid content type", () => {
            console.error = jest.fn();
            contentManager.renderContentCards("invalidType");
            expect(console.error).toHaveBeenCalledWith(
                'Tipo de contenido "invalidType" no encontrado.',
            );
        });

        test("does nothing if the container is missing", () => {
            document.getElementById("complaints-container").remove();
            contentManager.renderContentCards("complaints");
            expect(document.body.innerHTML).not.toContain("content-card");
        });
    });

    describe("handleLinkClick", () => {
        test("does nothing if the clicked element is not .btn-link", () => {
            const spy = jest.spyOn(contentManager, "showContentDetail");
            document.body.click();
            expect(spy).not.toHaveBeenCalled();
        });

        test("logs error if ID is invalid (NaN)", () => {
            console.error = jest.fn();
            const link = document.createElement("a");
            link.className = "btn-link";
            link.dataset.section = "complaints-detail";
            document.body.appendChild(link);
            link.click();
            expect(console.error).toHaveBeenCalledWith(
                "ID de contenido no válido.",
            );
        });

        test("logs error if contentType is invalid but ID is valid", () => {
            console.error = jest.fn();
            const link = document.createElement("a");
            link.className = "btn-link";
            link.dataset.section = "foo-detail"; // => contentType="foo"
            link.dataset.complaintId = "1"; // parseInt => 1
            document.body.appendChild(link);
            link.click();
            expect(console.error).toHaveBeenCalledWith(
                'Tipo de contenido "foo" no válido.',
            );
        });

        test("calls showContentDetail if ID and contentType are valid", () => {
            const spy = jest.spyOn(contentManager, "showContentDetail");
            const link = document.createElement("a");
            link.className = "btn-link";
            link.dataset.section = "complaints-detail"; // => contentType="complaints"
            link.dataset.complaintId = "1"; // parseInt => 1
            document.body.appendChild(link);
            link.click();
            expect(spy).toHaveBeenCalledWith(1, "complaints");
        });
    });

    describe("showContentDetail", () => {
        test("logs error if the content is not found", () => {
            console.error = jest.fn();
            contentManager.showContentDetail(9999, "complaints");
            expect(console.error).toHaveBeenCalledWith(
                "Contenido con ID 9999 no encontrado.",
            );
        });

        test("shows detail if content is found", () => {
            jest.spyOn(contentManager.sectionManager, "showSection");
            contentManager.showContentDetail(1, "complaints");
            expect(
                contentManager.sectionManager.showSection,
            ).toHaveBeenCalledWith("complaints-detail");
        });
    });
});
