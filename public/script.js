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
  const msg = document.getElementById("mensagem");
  msg.textContent = "";
  msg.className = "mensagem";
  document.querySelectorAll(".parte").forEach((p) => p.classList.remove("visivel"));
  document.getElementById("confete").innerHTML = "";
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
    botao.classList.add("certa");
  } else {
    erros++;
    botao.classList.add("errada");
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

  for (let i = 1; i <= MAX_ERROS; i++) {
    document.getElementById("parte-" + i).classList.toggle("visivel", i <= erros);
  }

  if (!exibida.includes("_")) {
    terminar("Você ganhou! 🎉", "ganhou");
    confete();
  } else if (erros >= MAX_ERROS) {
    terminar("Você perdeu! A palavra era " + escolhida, "perdeu");
  }
}

function terminar(texto, classe) {
  const msg = document.getElementById("mensagem");
  msg.textContent = texto;
  msg.className = "mensagem " + classe;
  document.querySelectorAll("#teclado button").forEach((b) => (b.disabled = true));
}

function confete() {
  const cores = ["#fd79a8", "#6c5ce7", "#00b894", "#fdcb6e", "#74b9ff"];
  const area = document.getElementById("confete");
  for (let i = 0; i < 60; i++) {
    const pedaco = document.createElement("span");
    pedaco.className = "confete-pedaco";
    pedaco.style.left = Math.random() * 100 + "vw";
    pedaco.style.background = cores[i % cores.length];
    pedaco.style.animationDuration = 2 + Math.random() * 2 + "s";
    pedaco.style.animationDelay = Math.random() * 0.5 + "s";
    area.appendChild(pedaco);
  }
  setTimeout(() => (area.innerHTML = ""), 5000);
}

document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT") return;
  const letra = e.key.toUpperCase();
  if (!/^[A-Z]$/.test(letra)) return;
  const botao = [...document.querySelectorAll("#teclado button")].find((b) => b.textContent === letra);
  if (botao && !botao.disabled) botao.click();
});

document.getElementById("reiniciar").addEventListener("click", iniciar);
iniciar();