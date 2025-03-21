import { SectionManager } from "@classes/SectionManager.js";

describe("SectionManager", () => {
    let sectionManager;

    beforeEach(() => {
        document.body.innerHTML = `
      <div class="right">
        <section id="section1"></section>
        <section id="section2"></section>
      </div>
    `;
        sectionManager = new SectionManager();
    });

    test("should display 'section1' and hide the others", () => {
        sectionManager.showSection("section1");
        expect(document.getElementById("section1").style.display).toBe("flex");
        expect(document.getElementById("section2").style.display).toBe("none");
    });

    test("should display an error if the section does not exist", () => {
        console.error = jest.fn();
        sectionManager.showSection("noExiste");
        expect(console.error).toHaveBeenCalledWith(
            'Sección con ID "noExiste" no encontrada.',
        );
    });
});
