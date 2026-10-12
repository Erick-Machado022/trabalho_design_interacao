
const dadosProva = {
    titulo: "Fundamentos de JavaScript",

    questoes: [
        {
            enunciado: "Qual palavra-chave declara uma constante em JavaScript?",
            alternativas: [
                { id: "a", texto: "var" },
                { id: "b", texto: "const" },
                { id: "c", texto: "function" }
            ],
            correta: "b"
        },
        {
            enunciado: "Qual símbolo é utilizado para comentários de uma linha em JavaScript?",
            alternativas: [
                { id: "a", texto: "//" },
                { id: "b", texto: "<!-- -->" },
                { id: "c", texto: "**" }
            ],
            correta: "a"
        },
        {
            enunciado: "Qual método adiciona um elemento ao final de um array?",
            alternativas: [
                { id: "a", texto: "pop()" },
                { id: "b", texto: "shift()" },
                { id: "c", texto: "push()" }
            ],
            correta: "c"
        }
    ]
};


class MyTest extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.renderizarProva();
    }

    renderizarProva() {
        this.shadowRoot.innerHTML = `
            
            <link rel="stylesheet" href="CSS/provaComponentes.css">

            <div class="prova">
                <h2></h2>        
                <form>
                    <div class="questoes"></div>
                    <button type="submit">Corrigir prova</button>
                </form>

                <div class="resultado" aria-live="polite"></div>
            </div>
        `;

        this.shadowRoot.querySelector("h2").textContent =
            dadosProva.titulo;

        const formulario = this.shadowRoot.querySelector("form");
        const listaQuestoes = this.shadowRoot.querySelector(".questoes");

        dadosProva.questoes.forEach((questao, indice) => {
            const grupo = document.createElement("fieldset");
            grupo.classList.add("questao");

            const legenda = document.createElement("legend");
            legenda.classList.add("enunciado");
            legenda.textContent = `${indice + 1}. ${questao.enunciado}`;

            grupo.appendChild(legenda);

            questao.alternativas.forEach((alternativa) => {
                const label = document.createElement("label");
                label.classList.add("alternativa");

                const input = document.createElement("input");
                input.type = "radio";
                input.name = `questao-${indice}`;
                input.value = alternativa.id;
                input.required = true;

                const texto = document.createElement("span");
                texto.textContent = alternativa.texto;

                label.append(input, texto);
                grupo.appendChild(label);
            });

            listaQuestoes.appendChild(grupo);
        });

        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            this.corrigirProva();
        });
    }

    

    
corrigirProva() {
    const formulario = this.shadowRoot.querySelector("form");
    const resultado = this.shadowRoot.querySelector(".resultado");

    let acertos = 0;

    const listaResultados = document.createElement("div");
    listaResultados.classList.add("lista-resultados");

    dadosProva.questoes.forEach((questao, indice) => {
        const respostaUsuario = new FormData(formulario)
            .get(`questao-${indice}`);

        const alternativaEscolhida = questao.alternativas.find(
            (alternativa) => alternativa.id === respostaUsuario
        );

        const alternativaCorreta = questao.alternativas.find(
            (alternativa) => alternativa.id === questao.correta
        );

        const acertou = respostaUsuario === questao.correta;

        if (acertou) {
            acertos++;
        }

        const item = document.createElement("div");
        item.classList.add("resposta");
        item.classList.add(
            acertou ? "resposta-correta" : "resposta-incorreta"
        );

        const titulo = document.createElement("h4");
        titulo.textContent = `${indice + 1}. ${questao.enunciado}`;

        const resposta = document.createElement("p");
        resposta.textContent =
            `Sua resposta: ${alternativaEscolhida.texto}`;

        const gabarito = document.createElement("p");
        gabarito.textContent =
            `Resposta correta: ${alternativaCorreta.texto}`;

        const situacao = document.createElement("p");
        situacao.textContent = acertou
            ? "Resposta correta!"
            : "Resposta incorreta.";

        item.append(titulo, resposta, gabarito, situacao);
        listaResultados.appendChild(item);
    });

    const nota = (acertos / dadosProva.questoes.length) * 10;
    const notaFormatada = nota.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const painelNota = document.createElement("div");
    painelNota.classList.add("nota");

    const tituloNota = document.createElement("h3");
    tituloNota.textContent = "Resultado da prova";

    const textoNota = document.createElement("p");
    textoNota.textContent = `Sua nota: ${notaFormatada} de 10`;

    const textoAcertos = document.createElement("p");
    textoAcertos.textContent =
        `Você acertou ${acertos} de ${dadosProva.questoes.length} questões.`;

    const botaoRefazer = document.createElement("button");
    botaoRefazer.type = "button";
    botaoRefazer.classList.add("botao-refazer");
    botaoRefazer.textContent = "Refazer prova";

    botaoRefazer.addEventListener("click", () => {
        formulario.reset();
        resultado.replaceChildren();
        formulario.querySelector("button[type='submit']").focus();
    });

    painelNota.append(tituloNota, textoNota, textoAcertos);
    resultado.replaceChildren(painelNota, listaResultados, botaoRefazer);

    resultado.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

}

customElements.define("my-test", MyTest);

