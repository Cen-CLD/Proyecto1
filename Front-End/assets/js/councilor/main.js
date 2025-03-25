let modal = document.getElementById("modalInitiatives");
let openModalBtn = document.getElementById("btnOpenModalInitiatives");
let closeModalBtn = document.getElementById("btnCloseModalInitiatives");

let viewStatusBtn = document.getElementById("btnViewStatus");
let prioritizeBtn = document.getElementById("btnPrioritize");

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

viewStatusBtn.addEventListener("click", viewStatus);
prioritizeBtn.addEventListener("click", prioritizeInitiative);

function viewStatus() {
    Swal.fire({
        icon: "warning",
        title: "No revisado",
        text: "La iniciativa aún está pendiente."
      });
}

function prioritizeInitiative() {
    Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "La iniciativa ha sido priorizada."
      });
}