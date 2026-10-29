const palavras = [
  { palavra: "GITHUB", dica: "Onde guardamos o código" },
  { palavra: "CLOUDFLARE", dica: "Publica o site na internet" },
  { palavra: "JAVASCRIPT", dica: "Linguagem da lógica do site" },
  { palavra: "REPOSITORIO", dica: "Pasta do projeto no Git" },
];
const MAX_ERROS = 6;
let escolhida, acertos, erros;

function iniciar() {
  const sorteio = palavras[Math.floor(Math.random() * palavras.length)];
  escolhida = sorteio.palavra;
  acertos = [];
  erros = 0;
  document.getElementById("dica").textContent = "Dica: " + sorteio.dica;
  document.getElementById("mensagem").textContent = "";
  criarTeclado();
  atualizar();
}

function criarTeclado() {
  const teclado = document.getElementById("teclado");
  teclado.innerHTML = "";
  for (const letra of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    const botao = document.createElement("button");
    botao.textContent = letra;
    botao.addEventListener("click", () => jogar(letra, botao));
    teclado.appendChild(botao);
  }
}

function jogar(letra, botao) {
  botao.disabled = true;
  if (escolhida.includes(letra)) {
    acertos.push(letra);
  } else {
    erros++;
  }
  atualizar();
}

function atualizar() {
  const exibida = escolhida
    .split("")
    .map((l) => (acertos.includes(l) ? l : "_"))
    .join(" ");
  document.getElementById("palavra").textContent = exibida;
  document.getElementById("erros").textContent = erros;

  if (!exibida.includes("_")) {
    terminar("Você ganhou! 🎉");
  } else if (erros >= MAX_ERROS) {
    terminar("Você perdeu! A palavra era " + escolhida);
  }
}

function terminar(texto) {
  document.getElementById("mensagem").textContent = texto;
  document.querySelectorAll("#teclado button").forEach((b) => (b.disabled = true));
}

document.getElementById("reiniciar").addEventListener("click", iniciar);
iniciar();