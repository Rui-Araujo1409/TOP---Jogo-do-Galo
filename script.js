//Valor das casas
//0 está vazia
//jogador1 é X
//jogador2 é O

function TabuleiroJogo() {

  const tabuleiro = [[0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]];

  const obterTabuleiro = () => tabuleiro;

  const marcarJogada = (fila, coluna, jogada) => {
    if (tabuleiro[fila][coluna] === "X" || tabuleiro[fila][coluna] === "O") {
      console.log("Jogada inválida");
      return;
    } else {
      tabuleiro[fila].splice(coluna, 1, jogada);
    }
  }
  return { obterTabuleiro, marcarJogada }
};

function Jogador(jogador1, jogador2) {
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
  const fazerJogada = (linha, coluna) => {

    const array = tabuleiroTeste();
    valor = mostrarJogadorActivo().jogada;
    if (estadoJogo) {
      mudarJogadorActivo();
      mostrarJogadorActivo();
      tabuleiroJogoInt.marcarJogada(linha, coluna, valor);
      console.log(array);
      avaliarJogada(array);
      if (contJogadas == 9 && !jog1Vencedor && !jog2Vencedor) {
        console.log("Empate");
      }
    } else {
      return console.log("O jogo terminou!");
    }
  };
  //lógica para determinar o vencedor
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
        return console.log(`O jogador1 venceu.`);
      } else if (cont2 == 3) {
        estadoJogo = false;
        jog2Vencedor = true;
        return console.log(`O jogador2 venceu.`);
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
        return console.log("O jogador 1 ganhou");
        break;
      case ("OOO"):
        estadoJogo = false;
        jog2Vencedor = true;
        return console.log("O jogador 2 ganhou");
        break;
    }
  };

  const mostrarEstadoJogo = () => estadoJogo;

  return { jogadores, mostrarJogadorActivo, mudarJogadorActivo, fazerJogada, tabuleiroTeste, mostrarEstadoJogo };
};


const jogo = Jogador("Rui", "Joaquim");
const jogadores = jogo.jogadores;
const tabuleiro = jogo.tabuleiroTeste();

console.log(tabuleiro);
