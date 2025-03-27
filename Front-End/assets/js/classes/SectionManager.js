export class SectionManager {
    showSection(sectionId) {
        try {
            const section = document.getElementById(sectionId);
            if (section) {
                let allSections = document.querySelectorAll(
                    "sidebar-component div section",
                );

                if (allSections.length === 0) {
                    allSections = document.querySelectorAll(".right section");
                }
                allSections.forEach((s) => {
                    if (s === section) {
                        s.style.display = "flex";
                        s.style.flexDirection = "column";
                    } else {
                        s.style.display = "none";
                    }
                });
            } else {
                console.error(`Sección con ID "${sectionId}" no encontrada.`);
            }
        } catch (error) {
            console.log("Error al mostrar la sección: ", error);
        }
    }
}
