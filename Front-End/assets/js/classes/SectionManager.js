export class SectionManager {
    showSection(sectionId) {
        try {
            const section = document.getElementById(sectionId);
            if (section) {
                const allSections = document.querySelectorAll(".right section");
                allSections.forEach((s) => {
                    s.style.display = s === section ? "flex" : "none";
                });
            } else {
                console.error(`Sección con ID "${sectionId}" no encontrada.`);
            }
        } catch (error) {
            console.log("Error al mostrar la sección: ", error);
        }
    }
}
