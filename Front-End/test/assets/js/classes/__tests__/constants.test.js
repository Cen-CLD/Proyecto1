import * as constants from "@assets/constants.js";

describe("constants.js", () => {
    beforeEach(() => {
        // Inject DOM elements for selector getters:
        document.body.innerHTML = `
      <!-- Notice Selectors -->
      <img id="notice-detail-image" />
      <span id="notice-detail-date"></span>
      <span id="notice-detail-category"></span>
      <span id="notice-detail-title"></span>
      <div id="notice-detail-body"></div>

      <!-- Initiative Selectors -->
      <img id="initiative-detail-image" />
      <span id="initiative-detail-date"></span>
      <span id="initiative-detail-category"></span>
      <span id="initiative-detail-title"></span>
      <div id="initiative-detail-body"></div>

      <!-- News Selectors -->
      <img id="detail-image" />
      <span id="detail-date"></span>
      <span id="detail-category"></span>
      <span id="detail-title"></span>
      <div id="detail-body"></div>

      <!-- Complaint Selectors -->
      <img id="complaint-detail-image" />
      <span id="complaint-detail-date"></span>
      <span id="complaint-detail-category"></span>
      <span id="complaint-detail-title"></span>
      <div id="complaint-detail-body"></div>
    `;
    });

    // 1) Check text constants
    test("LongLorem is a non-empty string", () => {
        expect(typeof constants.LongLorem).toBe("string");
        expect(constants.LongLorem.length).toBeGreaterThan(0);
    });

    test("initiativeText is a non-empty string", () => {
        expect(typeof constants.initiativeText).toBe("string");
        expect(constants.initiativeText.length).toBeGreaterThan(0);
    });

    test("initiativeText2 is a non-empty string", () => {
        expect(typeof constants.initiativeText2).toBe("string");
        expect(constants.initiativeText2.length).toBeGreaterThan(0);
    });

    test("complaintText is a non-empty string", () => {
        expect(typeof constants.complaintText).toBe("string");
        expect(constants.complaintText.length).toBeGreaterThan(0);
    });

    test("granEventoComunitarioText is a non-empty string", () => {
        expect(typeof constants.granEventoComunitarioText).toBe("string");
        expect(constants.granEventoComunitarioText.length).toBeGreaterThan(0);
    });

    // 2) Check data arrays
    test("newsData is an array", () => {
        expect(Array.isArray(constants.newsData)).toBe(true);
        expect(constants.newsData.length).toBeGreaterThan(0);
    });

    test("initiativeData is an array", () => {
        expect(Array.isArray(constants.initiativeData)).toBe(true);
        expect(constants.initiativeData.length).toBeGreaterThan(0);
    });

    test("complaintData is an array", () => {
        expect(Array.isArray(constants.complaintData)).toBe(true);
        expect(constants.complaintData.length).toBeGreaterThan(0);
    });

    test("noticiesData is an array", () => {
        expect(Array.isArray(constants.noticiesData)).toBe(true);
        expect(constants.noticiesData.length).toBeGreaterThan(0);
    });

    // 3) Check each selectors object (getter approach)
    test("noticeSelectors returns the correct DOM elements", () => {
        expect(constants.noticeSelectors.image).toBe(
            document.getElementById("notice-detail-image"),
        );
        expect(constants.noticeSelectors.date).toBe(
            document.getElementById("notice-detail-date"),
        );
        expect(constants.noticeSelectors.category).toBe(
            document.getElementById("notice-detail-category"),
        );
        expect(constants.noticeSelectors.title).toBe(
            document.getElementById("notice-detail-title"),
        );
        expect(constants.noticeSelectors.body).toBe(
            document.getElementById("notice-detail-body"),
        );
    });

    test("initiativeSelectors returns the correct DOM elements", () => {
        expect(constants.initiativeSelectors.image).toBe(
            document.getElementById("initiative-detail-image"),
        );
        expect(constants.initiativeSelectors.date).toBe(
            document.getElementById("initiative-detail-date"),
        );
        expect(constants.initiativeSelectors.category).toBe(
            document.getElementById("initiative-detail-category"),
        );
        expect(constants.initiativeSelectors.title).toBe(
            document.getElementById("initiative-detail-title"),
        );
        expect(constants.initiativeSelectors.body).toBe(
            document.getElementById("initiative-detail-body"),
        );
    });

    test("newsSelectors returns the correct DOM elements", () => {
        expect(constants.newsSelectors.image).toBe(
            document.getElementById("detail-image"),
        );
        expect(constants.newsSelectors.date).toBe(
            document.getElementById("detail-date"),
        );
        expect(constants.newsSelectors.category).toBe(
            document.getElementById("detail-category"),
        );
        expect(constants.newsSelectors.title).toBe(
            document.getElementById("detail-title"),
        );
        expect(constants.newsSelectors.body).toBe(
            document.getElementById("detail-body"),
        );
    });

    test("complaintSelectors returns the correct DOM elements", () => {
        expect(constants.complaintSelectors.image).toBe(
            document.getElementById("complaint-detail-image"),
        );
        expect(constants.complaintSelectors.date).toBe(
            document.getElementById("complaint-detail-date"),
        );
        expect(constants.complaintSelectors.category).toBe(
            document.getElementById("complaint-detail-category"),
        );
        expect(constants.complaintSelectors.title).toBe(
            document.getElementById("complaint-detail-title"),
        );
        expect(constants.complaintSelectors.body).toBe(
            document.getElementById("complaint-detail-body"),
        );
    });
});
