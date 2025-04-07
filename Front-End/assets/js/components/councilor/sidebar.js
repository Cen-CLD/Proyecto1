class UserSidebarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const currentView = this.getCurrentView();

        this.shadowRoot.innerHTML = `
            <style>
                .row {
                    display: flex;
                    min-height: 0;
                    width: 100%;
                }

                .left {
                    flex: 20%;
                    padding: 15px 0;
                    overflow-y: auto;

                    background: linear-gradient(
                        180deg,
                        #ffffff 0%,
                        var(--color-1) 10%,
                        rgba(var(--color-1-rgb), 0.9) 30%,
                        var(--color-2) 100%
                    );

                    border-top: var(--color-1);
                    box-shadow: 0 0 0 rgba(var(--color-1-rgb), 0.15); 
                    border-right: 1px solid rgba(255, 255, 255, 0.3);
                }

                .left h2,
                .left ul h4 {
                    color: white;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
                    padding: 15px 20px;
                    margin: 20px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
                }

                .left li {
                    color: white;
                    padding: 12px 25px;
                    margin: 8px 15px;
                    border-radius: 5px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    background: rgba(255, 255, 255, 0.6);
                    backdrop-filter: blur(1px);
                }

                .left li:hover {
                    background: rgba(255, 255, 255, 0.12);
                    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
                }

                .active {
                    background: rgba(255, 255, 255, 0.12);
                    transform: translateX(8px);
                    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
                }

                .right {
                    flex: 80%;
                    padding: 15px;
                    overflow-y: auto;
                    min-height: calc(100vh - 180vh);
                    gap: 2.5rem;
                }

                .sidebar {
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                }

                .sidebar li a {
                    padding: 12px;
                    text-decoration: none;
                    color: black;
                    display: block;
                }
            </style>

            <main>
                <div class="row">
                    <div class="left">
                        <h2>Menú de Acciones</h2>
                        
                        <ul class="sidebar">
                            <li class="${currentView === "home" ? "active" : ""}">
                                <a href="./home.html" data-target="inicio">Inicio</a>
                            </li>

                            <li class="${currentView === "news" ? "active" : ""}">
                                <a href="./news.html" data-target="noticias">Noticias</a>
                            </li>

                            <li class="${currentView === "notices" ? "active" : ""}">
                                <a href="./notices.html" data-target="avisos">Avisos</a>
                            </li>

                            <li class="${currentView === "initiatives" ? "active" : ""}">
                                <a href="./initiatives.html" data-target="iniciativas">Iniciativas</a>
                            </li>

                            <li class="${currentView === "complaints" ? "active" : ""}">
                                <a href="./complaints.html" data-target="denuncias">Denuncias</a>
                            </li>

                            <li class="${currentView === "services" ? "active" : ""}">
                                <a href="./services.html" data-target="servicios">Servicios</a>
                            </li>

                            <li class="${currentView === "community" ? "active" : ""}">
                                <a href="./community.html" data-target="community">Comunidad</a>
                            </li>
                        </ul>
                    </div>

                    <div class="right">
                        <slot name="content"></slot>
                    </div>
                </div>
            </main>
        `;
    }

    getCurrentView() {
        const url = window.location.pathname;

        if (url.includes("home")) return "home";
        if (url.includes("news")) return "news";
        if (url.includes("notices")) return "notices";
        if (url.includes("initiatives")) return "initiatives";
        if (url.includes("complaints")) return "complaints";
        if (url.includes("services")) return "services";
        if (url.includes("community")) return "community";

        return "";
    }
}

customElements.define("sidebar-component", UserSidebarComponent);
