
const form = document.getElementById('noticesForm')
const list = document.getElementById('complaintList')

let complaints = []

form.addEventListener('submit', e => {
  e.preventDefault()

  const dateInput = document.getElementById('date')
  const textInput = document.getElementById('text')
  const imageInput = document.getElementById('image')

  const date = dateInput.value
  const text = textInput.value.trim()
  const image = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null

  if (!/\d{4}-\d{2}-\d{2}/.test(date)) {
    Swal.fire({
      icon: "warning",
      title: "Error",
      text: "Asegúrese de ingresar una fecha válida. (dd/mm/aaaa)",
    });
    return
  }

  if (text.length < 5) {
    Swal.fire({
      icon: "warning",
      title: "Error",
      text: "Por favor, ingrese al menos cinco caracteres.",
    });
    return
  }

  complaints.push({ date, text, image })
  renderList()
  form.reset()
})

function renderList() {
  list.innerHTML = ''
  complaints.forEach((item, index) => {
    const div = document.createElement('div')
    div.className = 'complaintBox'
    div.innerHTML = `
      <h4>${item.date}</h4>
      <p>${item.text.substring(0, 50)}...</p>
      <button onclick="previewComplaint(${index})">Ver</button>
      <button onclick="editComplaint(${index})">Editar</button>
      <button onclick="deleteComplaint(${index})">Borrar</button>
      <button onclick="viewPublishedNews(${index})">Ver noticia publicada</button>
    `
    list.appendChild(div)
  })
}

  function deleteComplaint(index) {
    complaints.splice(index, 1)
    renderList()
  }
    function editComplaint(index) {
      const item = complaints[index]
      document.getElementById('date').value = item.date
      document.getElementById('text').value = item.text
      deleteComplaint(index)
    }

    function previewComplaint(index) {
      const item = complaints[index]
      const modal = document.createElement('div')
      modal.className = 'modalOverlay'
      modal.innerHTML = `
        <div class="modalContent">
          <h3>${item.date}</h3>
          <p>${item.text}</p>
          ${item.image ? `<img src="${item.image}" style="max-width: 200px;">` : ''}
          <button onclick="this.parentElement.parentElement.remove()">cerrar</button>
        </div>
      `
      document.body.appendChild(modal)
    }

    function viewPublishedNews(index) {
      Swal.fire({
      icon: "warning",
      title: "Error",
      text: "Esta opción muestra la noticia asociada con el aviso."
    });
    }
