class UserFooterComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="footerContainer">
                    <div class="footerContent">
                        <div class="footerColumn">
                            <a href="#" class="footerLogoMuni logoMuni"></a>

                            <div class="addressBlock">
                                <strong>Dirección</strong>
                                <p>Costa Rica</p>
                            </div>
                        </div>

                        <div class="footerColumn">
                            <strong class="columnTitle">Navegación</strong>

                            <ul class="footerNav">
                                <li>
                                    <a href="./home.html">Inicio</a>
                                </li>

                                <li>
                                    <a href="./news.html">Noticias</a>
                                </li>

                                <li>
                                    <a href="./notices.html" data-target="avisos">Avisos</a>
                                </li>

                                <li>
                                    <a href="./initiatives.html" data-target="iniciativas">Iniciativas</a>
                                </li>

                                <li>
                                    <a href="./complaints.html" data-target="denuncias">Denuncias</a>
                                </li>
                            </ul>
                        </div>

                        <div class="footerColumn">
                            <strong class="columnTitle">Nuestras Redes</strong>

                            <div class="socialContainer">
                                <i class="fa-brands fa-instagram"></i>
                                <i class="fa-brands fa-facebook"></i>
                                <i class="fa-solid fa-x"></i>
                            </div>
                        </div>

                        <div class="footerColumn">
                            <strong class="columnTitle">Contacto</strong>

                            <div class="contactInfo">
                                <div class="scheduleBlock">
                                    <h4>Horario de atención</h4>
                                    <p>Lunes a viernes</p>
                                    <p>8:00 AM - 4:00 PM</p>
                                </div>

                                <div class="phoneBlock">
                                    <h4>Central telefónica</h4>
                                    <p>2222-2222 / 8888-0000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="footerCopyright">
                    <p>Todos los derechos reservados © 2025</p>
                </div>
            </footer>
        `;
    }
}

customElements.define("footer-component", UserFooterComponent);