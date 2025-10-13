//fx para definir o que existe na casa
//0 está vazia
//jogador1 é X
//jogador2 é O

const Casa = () => {
  let valor = "0";
  
  
  const adicionarSímbolo = (jogador) => valor = jogador;
  const obterValor = () => valor;
  
  return { obterValor, adicionarSímbolo };
}



function TabuleiroJogo() {
  const filas = 3;
  const colunas = 3;
  const tabuleiro = [[0,0,0],
                     [0,0,0],
                     [0,0,0]];

  // Create a 2d array that will represent the state of the game board
  // For this 2d array, row 0 will represent the top row and
  // column 0 will represent the left-most column.
  // This nested-loop technique is a simple and common way to create a 2d array.
/*   for (let i = 0; i < filas; i++) {
    tabuleiro[i] = [];
    for (let j = 0; j < colunas; j++) {
      tabuleiro[i].push(Casa());
    }
  }  */

  const obterTabuleiro = () => tabuleiro;
  
  const marcarJogada = (fila, coluna, jogador) => {
    tabuleiro[fila][coluna].adicionarSímbolo(jogador);
  }
  
  return { obterTabuleiro }
}



const Jogador = (jogador1, jogador2) => {
const jogadores = [{
  nome: jogador1,
  jogada: "X"
}, 
{
  nome: jogador2,
  jogada: "O"
}];
  
  let jogadorActivo = jogadores[0];
  
  const mudarJogadorActivo = () => {
   jogadorActivo = jogadorActivo === jogadores[0] ? jogador[1] : jogador[0];
  }
  
  
  return { jogadores, jogadorActivo };
}

const obterSímbolo = Jogador("Rui", "Joaquim");
const tabuleiroJogo = TabuleiroJogo();
console.log(tabuleiroJogo);
console.log(obterSímbolo.jogadorActivo);


