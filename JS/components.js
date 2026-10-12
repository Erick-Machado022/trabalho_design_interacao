
class SiteHeader extends HTMLElement {
    connectedCallback() {
        const titulo = this.getAttribute("titulo") || "Interação Web";

        this.innerHTML = `
            <header class="header">
                <h1>${titulo}</h1>
            </header>
        `;
    }
}

class SiteNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="menu" aria-label="Navegação principal">
                <a href="index.html">Início</a>
                <a href="editor.html">Trabalho 1</a>
                <a href="prova.html">Trabalho 2</a>
            </nav>
        `;
    }
}

class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="footer">
                <p>Interação Web &copy; 2026</p>
            </footer>
        `;
    }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-nav", SiteNav);
customElements.define("site-footer", SiteFooter);


class InfoCard extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin: 24px 0;
                }

                .card {
                    padding: 20px;
                    border: 1px solid #263442;
                    border-left: 4px solid #00e5ff;
                    border-radius: 12px;
                    background: #111820;
                    color: #f1f5f9;
                    font-family: Arial, sans-serif;
                }

                h3 {
                    margin-top: 0;
                    color: #00e5ff;
                }

                p {
                    line-height: 1.6;
                }
            </style>

            <aside class="card">
                <h3><slot name="titulo">Informação</slot></h3>
                <div>
                    <slot>Conteúdo informativo.</slot>
                </div>
            </aside>
        `;
    }
}

customElements.define("info-card", InfoCard);

