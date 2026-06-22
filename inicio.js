//Ainda tem coisas para melhorar.

const inputPrinipal = document.getElementById('inputPrinipal'); //Chama o input do nome da tarefa por JS.
const botaoAdicionar = document.getElementById('botaoAdicionar'); //Chama o botão de adicionar por JS.
const listaDeTarefas = document.getElementById('listaDeTarefas'); //Chama o espaço a onde as tarefas irão ficar por JS.
let ArrayDeVolta = localStorage.getItem('ArraySalvo'); //Pega o Array guardado no localStorage(ainda como texto) e põe numa variável.
let arrayDeTarefas = JSON.parse(ArrayDeVolta) || []; //Coverte o Array(de texto para Array), se caso não tiver nada, o Array fica vazio.

//Função para mostra na tela as tarefas que já existem no localStorage.
function renderizarTarefas() {
    
    //Ele pecorre a lista(Array) e pega as caixas que estão nela.
    for (const LerArray of arrayDeTarefas){
        listaDeTarefas.insertAdjacentHTML('afterbegin', LerArray.caixa); //Faz a tarefas aparecer na tela.
    };
};

//Função para criar uma tarefa.
function CriarTarefa(event) {
    
    event.preventDefault(); //Para a página não atualizar.

    const idUnico = Date.now(); //Cria um id único com base em milisegundos que aumentam de forma contínua.
    
    const tituloDaTarefa = inputPrinipal.value; //Pega o valor(titulo da tarefa) digitado no input.

    //A caixa.
    var Tarefa = {
        'id': idUnico,
        'caixa': 
            `<div id="caixasCSS-${idUnico}">
                <div class="caixasCSS">
                    <button class="botaoRemover" onclick="Deletar(${idUnico})">X</button>
                    <input class="inputRenomear" id="inputDaTarefa${idUnico}" type="text" value="${tituloDaTarefa}">
                    <button class="botaoRenomear" onclick="Renomear(${idUnico}) ">Renomear</button>
                </div>
            </div>`
    };

    arrayDeTarefas.push(Tarefa); //Põe as tarefas no Array de tarefas.
    
    localStorage.setItem('ArraySalvo', JSON.stringify(arrayDeTarefas)); //Transforma o Array de tarefas em texto, dá um nome a ele, e põe ele no localStorage.
    
    listaDeTarefas.insertAdjacentHTML('afterbegin', Tarefa.caixa); //Faz a tarefa aparecer na tela.
};

//Função de Renomear.
function Renomear(idUnico) {

    const novoLocalStorage = JSON.parse(localStorage.getItem('ArraySalvo')); //Agora o Array salvo no localStorage vai estar armazenado numa variável, além de ser transformado de texto para Array(JSON.parse).

    const indiceDaTarefa = novoLocalStorage.findIndex(item => item.id === idUnico); //Procura o índice(a posição) da tarefa, salva no localStorage, e salva numa variável.

    const novoTitulo = document.getElementById('inputDaTarefa'+idUnico).value; //O título novo da tarefa.
    
    //No localStorage: substitui a caixa antiga por uma nova(já com o título novo).
    novoLocalStorage[indiceDaTarefa].caixa = `<div id="caixasCSS-${idUnico}">
                <div class="caixasCSS">
                    <button class="botaoRemover" onclick="Deletar(${idUnico})">X</button>
                    <input class="inputRenomear" id="inputDaTarefa${idUnico}" type="text" value="${novoTitulo}">
                    <button class="botaoRenomear" onclick="Renomear(${idUnico}) ">Renomear</button>
                </div>
            </div>`;

    localStorage.setItem('ArraySalvo', JSON.stringify(novoLocalStorage)); //Transforma o novo Array(já com as alterações) em texto, e salva no localStorage.

    //No Array: substitui a caixa antiga por uma nova(já com o título novo).
    arrayDeTarefas[indiceDaTarefa].caixa = `<div id="caixasCSS-${idUnico}">
                <div class="caixasCSS">
                    <button class="botaoRemover" onclick="Deletar(${idUnico})">X</button>
                    <input class="inputRenomear" id="inputDaTarefa${idUnico}" type="text" value="${novoTitulo}">
                    <button class="botaoRenomear" onclick="Renomear(${idUnico}) ">Renomear</button>
                </div>
            </div>`;

};


//Função para deletar a caixa.
function Deletar(idUnico) {

    //localStorage.
    const AtualizarLocalStorage = JSON.parse(localStorage.getItem('ArraySalvo')); //Ele pega a Array de tarefas que estar salvo no localStorage(como texto), transforma ele num Array e salva numa variável.
    
    const indiceDaTarefaNoLocalStorage = AtualizarLocalStorage.findIndex(item => item.id === idUnico); //Ele procura o índice(a posição) da tarefa que ele deseja apagar, para apagar apenas ela.

    AtualizarLocalStorage.splice(indiceDaTarefaNoLocalStorage, 1); //Ele apaga o item com base no índice(a posição) achado.

    localStorage.setItem('ArraySalvo', JSON.stringify(AtualizarLocalStorage)); //Ele salva a nova lista(já sem o item apagado) no localStorage, transformando ela primeiro em um texto.

    //ArrayJS(arrayDeTarefas).
    const indiceDaTarefaNoArray = arrayDeTarefas.findIndex(item => item.id === idUnico); //Ele procura o índice(a posição) da tarefa que ele deseja apagar, para apagar apenas ela.
    
    arrayDeTarefas.splice(indiceDaTarefaNoArray, 1); //Remove a caixa(div) do Array.
   
    //Tela.
    const idDaCaixa = document.getElementById(`caixasCSS-${idUnico}`); //Pega a div das tarefas que foi criada no Java Script.

    idDaCaixa.remove(); //Remove a caixa(div) da tela.

};

//Chama a função de renderizar.
renderizarTarefas();