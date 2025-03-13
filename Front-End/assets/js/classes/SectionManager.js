export class SectionManager {
    showSection(section) {
        const allSections = document.querySelectorAll(".right section");
        allSections.forEach((s) => {
            s.style.display = s === section ? "flex" : "none";
        });
    }
}
