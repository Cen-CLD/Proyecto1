function fetchRoles() {
    const url = 'http://localhost:3000/api/roles'; 

    axios.get(url)
        .then(function (response) {
            const data = response.data;

            let tbodyContent = '';  

            data.forEach(rol => {
                tbodyContent += `
                    <tr>
                        <td>
                            <button class="btn-create"><i class="fa fa-edit"></i></button>
                            <button class="btn-create"><i class="fa fa-trash"></i></button>
                        </td>
                        <td>${rol.type}</td>
                    </tr>
                `;
            });

            document.querySelector('#table-roles tbody').innerHTML = tbodyContent;
        })
        .catch(function (error) {
            console.error(error);
        });
}

window.onload = fetchRoles;