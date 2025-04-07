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
        title: "¿Está seguro que desea priorizar la iniciativa?",
        text: "La función de priorizar no se puede revertir por el momento.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",  
        confirmButtonText: "Sí"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Éxito",
            text: "La iniciativa ha sido priorizada.",
            icon: "success"
          })
        }
      })
    }