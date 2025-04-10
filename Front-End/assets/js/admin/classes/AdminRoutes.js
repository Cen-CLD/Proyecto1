import { ROUTES, COLUMNS } from "../constants.js";

export class AdminRoutes {
    constructor() {
        this.routes = ROUTES;
        this.columns = COLUMNS;

        this.currentPage = this.getCurrentPage();
        this.url = this.routes[this.currentPage];
        this.currentColumns = this.columns[this.currentPage];

        if (this.url && this.currentColumns) {
            this.render();
        }
    }

    getCurrentPage() {
        const path = window.location.pathname;
        return path.substring(path.lastIndexOf("/") + 1);
    }

    async render() {
        try {
            const response = await axios.get(this.url);
            const data = response.data;
            this.renderTable(data, this.currentColumns);
        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    }

    renderTable(data, columns) {
        const tbody = document.querySelector("tbody");
        if (!tbody) return;

        let html = "";

        data.forEach((item) => {
            console.log(item._id);
            html += "<tr>";
            html += `
                <td>
                    <button class="btn-edit" data-id="${item._id}"><i class="fa fa-edit"></i></button>
                    <button class="btn-delete" data-id="${item._id}"><i class="fa fa-trash"></i></button>
                </td>
            `;

            columns.forEach((col) => {
                html += `<td>${item[col] ?? "—"}</td>`;
            });

            html += "</tr>";
        });

        tbody.innerHTML = html;
    }
}
