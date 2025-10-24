//Valor das casas
//0 está vazia
//jogador1 é X
//jogador2 é O


function TabuleiroJogo() {

  const tabuleiro = [[0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]];

  const obterTabuleiro = () => tabuleiro;

//fx que vai marcar a casa com o símbolo do jogador
  const marcarJogada = (fila, coluna, jogada) => {
    tabuleiro[fila].splice(coluna, 1, jogada);
  }
  return { obterTabuleiro, marcarJogada }
};

//fx que vai guardar os nomes dos jogadores, fazer a jogada
//e avaliar a jogada
function Jogo(jogador1, jogador2) {
  const jogadores = [{
    nome: jogador1,
    jogada: "X"
  },
  {
    nome: jogador2,
    jogada: "O"
  }];

  let valor;
  const tabuleiroJogoInt = TabuleiroJogo();
  let tabuleiroInt = tabuleiroJogoInt.obterTabuleiro();

  const tabuleiroTeste = () => tabuleiroInt;

  let jogadorActivo = jogadores[0];

  const mudarJogadorActivo = () => {
    jogadorActivo = jogadorActivo === jogadores[0] ? jogadores[1] : jogadores[0];
  }

  const mostrarJogadorActivo = () => jogadorActivo;

  let estadoJogo = true;
  let contJogadas = 0;
  let jog1Vencedor = false;
  let jog2Vencedor = false;

  //fx que vai fazer todos os passos da Jogada
  const fazerJogada = (linha, coluna) => {
    const array = tabuleiroTeste();
    valor = mostrarJogadorActivo().jogada;
    //se o estado do jogo for true, correr os vários passos
    if (estadoJogo) {
      mudarJogadorActivo();
      mostrarJogadorActivo();
      tabuleiroJogoInt.marcarJogada(linha, coluna, valor);
      avaliarJogada(array);
      if (contJogadas == 9 && !jog1Vencedor && !jog2Vencedor) {
        window.alert("Empate");
        return;
      }
    } else {
      window.alert("O jogo terminou!");
      return;
    }
  };
  //lógica para avaliar a jogada e determinar se existe 
  //vencedor
  const avaliarJogada = (array) => {
    contJogadas++;

    //lógica para as linhas
    array.forEach((e) => {
      let teste3 = e;
      let cont1 = 0;
      let cont2 = 0;
      teste3.forEach((e2) => {
        if (e2 === "X") {
          cont1++;
        } else if (e2 === "O") {
          cont2++;
        }
      });
      if (cont1 == 3) {
        estadoJogo = false;
        jog1Vencedor = true;
        window.alert(`${jogadores[0].nome} venceu.`);
      } else if (cont2 == 3) {
        estadoJogo = false;
        jog2Vencedor = true;
        window.alert(`${jogadores[1].nome} venceu.`);
      }
    });
    //lógica para colunas e diagonais
    const col1 = (array[0][0] && array[1][0] && array[2][0]);
    const col2 = (array[0][1] && array[1][1] && array[2][1]);
    const col3 = (array[0][2] && array[1][2] && array[2][2]);
    const diag1 = (array[2][0] && array[1][1] && array[0][2]);
    const diag2 = (array[2][2] && array[1][1] && array[0][0]);
    const exp = (col1 || col2 || col3 || diag1 || diag2);
    switch (exp) {
      case ("XXX"):
        estadoJogo = false;
        jog1Vencedor = true;
        window.alert(`${jogadores[0].nome} venceu.`);
        break;
      case ("OOO"):
        estadoJogo = false;
        jog2Vencedor = true;
        window.alert(`${jogadores[1].nome} venceu.`);
        break;
    }
  };

  //estado jogo: falso => jogo acabou
  const mostrarEstadoJogo = () => estadoJogo;

  return { jogadores, mostrarJogadorActivo, mudarJogadorActivo, fazerJogada, tabuleiroTeste, mostrarEstadoJogo };
};

//HTML
//criar as variáveis dos elementos HTML
const inputJog1 = document.querySelector("#nome-jog1");
const inputJog2 = document.querySelector("#nome-jog2");
const botãoJog1 = document.querySelector("#botão-jog1");
const botãoJog2 = document.querySelector("#botão-jog2");
const tabuleiroHTML = document.querySelector(".tabuleiro");
const iniciar = document.querySelector("#iniciar");
const reiniciar = document.querySelector("#reiniciar");

//Iniciar o jogo
//obter nomes dos jogadores e colocar em vars
iniciar.addEventListener("click", () => {
  let jog1 = prompt("Insira o nome do Jogador 1:");
  let jog2 = prompt("Insira o nome do Jogador 2:");

  const jogo = Jogo(jog1, jog2);

  alert(`${jog1} pode iniciar o jogo.`);

  let linhaJogada;
  let colunaJogada;

  //fazer a jogada quando se clica em iniciar
  tabuleiroHTML.addEventListener("click", (e) => {
    //obter coordenadas da casa clicada
    let elemento = e.target;
    linhaJogada = parseInt(elemento.dataset.linha);
    colunaJogada = parseInt(elemento.dataset.coluna);
    //fazer a jogada apenas se a casa estiver vazia
    if (elemento.textContent == "") {
      jogo.fazerJogada(linhaJogada, colunaJogada);
      //inserir o símbolo
      elemento.textContent = jogo.tabuleiroTeste()[linhaJogada][colunaJogada];
    } else {
      window.alert("Jogada inválida!");
      return;
    }
  })
});

//fx para o botão reiniciar
reiniciar.addEventListener("click", () => location.reload());






