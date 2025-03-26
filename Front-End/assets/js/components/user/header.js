class UserHeaderComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header>
                <a href="./home.html" class="logoMuni"></a>

                <nav>
                    <ul class="navbar"></ul>
                </nav>

                <a href="./profile.html" class="userPhotoContainer">
                    <img class="userProfilePhoto" src="../../assets/img/user_profile.jpg"/>
                </a>
            </header>
        `;
    }
}

customElements.define("header-component", UserHeaderComponent);