
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


let itensDoMenu = ['Home', 'Sobre', 'Contato'];



function atualizarPreview() {
    
    if (inputsEstilo.imgUrl.value.trim() !== "") {
        previewImg.src = inputsEstilo.imgUrl.value;
        previewImg.style.display = 'block';
    } else {
        previewImg.style.display = 'none'; 
    }

    previewContainer.style.backgroundColor = inputsEstilo.fundoMenu.value;
    
  
    previewNav.style.justifyContent = inputsEstilo.alinhamento.value;
    previewNav.style.gap = inputsEstilo.espacamento.value + 'px';
    document.getElementById('valor-espacamento').innerText = inputsEstilo.espacamento.value + 'px';

  
    previewNav.innerHTML = ''; 
    
   
    itensDoMenu.forEach(texto => {
        const link = document.createElement('a'); 
        link.href = '#';
        link.innerText = texto;
        
        
        link.style.backgroundColor = inputsEstilo.fundoItem.value;
        link.style.color = inputsEstilo.corTexto.value;
        link.style.border = `2px solid ${inputsEstilo.corBorda.value}`;
        
        previewNav.appendChild(link); 
    });

    renderizarInputsDeTexto();
}


function renderizarInputsDeTexto() {
    listaInputsItens.innerHTML = ''; 

    
    itensDoMenu.forEach((texto, index) => {
        const div = document.createElement('div');
        div.className = 'grupo-controle';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.value = texto;
        
       
        input.addEventListener('input', (e) => {
            itensDoMenu[index] = e.target.value; 
            atualizarPreview(); 
        });

        div.appendChild(input);
        listaInputsItens.appendChild(div);
    });

   
    btnRemover.disabled = itensDoMenu.length <= 1;
}

btnAdicionar.addEventListener('click', () => {
    itensDoMenu.push('Novo Item'); 
    atualizarPreview();
});

btnRemover.addEventListener('click', () => {
    if (itensDoMenu.length > 1) {
        itensDoMenu.pop(); 
        atualizarPreview();
    }
});


Object.values(inputsEstilo).forEach(input => {
    input.addEventListener('input', atualizarPreview);
});

atualizarPreview();