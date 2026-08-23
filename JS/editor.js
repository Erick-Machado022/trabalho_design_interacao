// === 1. SELEÇÃO DE ELEMENTOS DO DOM ===
// Aqui "pegamos" os elementos do HTML para podermos manipulá-los no JavaScript.
const previewContainer = document.getElementById('menu-customizado');
const previewNav = document.getElementById('preview-nav');
const previewImg = document.getElementById('preview-img');

const inputsEstilo = {
    imgUrl: document.getElementById('img-url'),
    fundoMenu: document.getElementById('cor-fundo-menu'),
    fundoItem: document.getElementById('cor-fundo-item'),
    corTexto: document.getElementById('cor-texto'),
    corBorda: document.getElementById('cor-borda'),
    alinhamento: document.getElementById('alinhamento'),
    espacamento: document.getElementById('espacamento')
};

const listaInputsItens = document.getElementById('lista-inputs-itens');
const btnAdicionar = document.getElementById('btn-adicionar');
const btnRemover = document.getElementById('btn-remover');

// Array (lista) que guardará os textos dos nossos menus
let itensDoMenu = ['Home', 'Sobre', 'Contato'];

// === 2. FUNÇÃO PRINCIPAL DE RENDERIZAÇÃO ===
// Essa função é o "coração" do script. Toda vez que o usuário muda algo, ela redesenha o menu.
function atualizarPreview() {
    // A. Atualizar Imagem
    if (inputsEstilo.imgUrl.value.trim() !== "") {
        previewImg.src = inputsEstilo.imgUrl.value;
        previewImg.style.display = 'block';
    } else {
        previewImg.style.display = 'none'; // Esconde se estiver vazio
    }

    // B. Atualizar Estilos Gerais (Container)
    previewContainer.style.backgroundColor = inputsEstilo.fundoMenu.value;
    
    // C. Atualizar o layout do Nav (Alinhamento e Espaçamento)
    previewNav.style.justifyContent = inputsEstilo.alinhamento.value;
    previewNav.style.gap = inputsEstilo.espacamento.value + 'px';
    document.getElementById('valor-espacamento').innerText = inputsEstilo.espacamento.value + 'px';

    // D. Recriar os links (tags <a>)
    previewNav.innerHTML = ''; // Limpa o menu atual
    
    // Para cada item na nossa lista, criamos um link novo
    itensDoMenu.forEach(texto => {
        const link = document.createElement('a'); // Cria a tag <a>
        link.href = '#';
        link.innerText = texto;
        
        // Aplica os estilos em cada item individualmente
        link.style.backgroundColor = inputsEstilo.fundoItem.value;
        link.style.color = inputsEstilo.corTexto.value;
        link.style.border = `2px solid ${inputsEstilo.corBorda.value}`;
        
        previewNav.appendChild(link); // Joga a tag <a> dentro do <nav>
    });

    renderizarInputsDeTexto();
}

// === 3. FUNÇÃO PARA CRIAR OS INPUTS DE TEXTO DOS ITENS ===
function renderizarInputsDeTexto() {
    listaInputsItens.innerHTML = ''; // Limpa a lista atual

    // Cria um campo de input para cada item que existe no array
    itensDoMenu.forEach((texto, index) => {
        const div = document.createElement('div');
        div.className = 'grupo-controle';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.value = texto;
        
        // Se o usuário digitar num input, atualizamos o array e recarregamos o menu
        input.addEventListener('input', (e) => {
            itensDoMenu[index] = e.target.value; // Atualiza o texto na posição correta
            atualizarPreview(); // Chama a renderização de novo
        });

        div.appendChild(input);
        listaInputsItens.appendChild(div);
    });

    // Regra de prevenção de erros: Se só tiver 1 item, desabilita o botão de remover
    btnRemover.disabled = itensDoMenu.length <= 1;
}

// === 4. EVENTOS DE ADICIONAR E REMOVER ITENS ===
btnAdicionar.addEventListener('click', () => {
    itensDoMenu.push('Novo Item'); // Adiciona no final da lista
    atualizarPreview();
});

btnRemover.addEventListener('click', () => {
    if (itensDoMenu.length > 1) {
        itensDoMenu.pop(); // Remove o último da lista
        atualizarPreview();
    }
});

// === 5. EVENT LISTENERS PARA ESTILOS ===
// Fica "escutando" qualquer mudança nos campos de cor, range, etc.
Object.values(inputsEstilo).forEach(input => {
    input.addEventListener('input', atualizarPreview);
});

// Inicialização: Chama a função uma vez ao carregar a página
atualizarPreview();