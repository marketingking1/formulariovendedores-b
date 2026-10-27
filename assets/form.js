/* =============================================================================
   FORMULÁRIO "VAGA DE VENDAS" — KING OF LANGUAGES (variante B)
   =============================================================================

   COMO EDITAR (não precisa saber programar)
   -----------------------------------------
   Tudo o que o candidato lê está na ÁREA EDITÁVEL logo abaixo. Os textos da
   faixa vermelha (logo, título, 4 etapas, "+9 mil alunos") ficam no index.html.

   PODE mudar à vontade:
     - qualquer texto entre aspas: titulo, dica, placeholder, erro, texto, botao;
     - o "texto" das opções de múltipla escolha (é o que aparece no botão);
     - a ordem das perguntas: recorte um bloco { ... } inteiro, com a vírgula
       do fim, e cole em outro lugar da lista.
   Atalhos dentro dos textos:
     - *palavra*  aparece em vermelho e negrito;
     - \n         quebra a linha.
   A numeração "PERGUNTA 01 DE 13" e a barra de progresso se ajustam sozinhas.

   CUIDADO (combine antes com o time de dados):
     - "id" e "valor" são o que chega no painel do RH. Mudar o "valor" de uma
       opção muda o que fica gravado no cadastro do candidato.
     - "tipo" define como a pergunta funciona e é validada.
     - Pergunta NOVA: use tipo "escolha" ou "textolongo" e um id novo, sem
       espaços nem acentos (ex.: "ingles"). A resposta vai para o RH com esse
       id. Nunca use os ids "hp", "website" ou "url_field": o servidor trata
       esses nomes como robô e descarta a candidatura sem avisar.
     - Opção com  elimina: true  encerra a candidatura e mostra o "motivo"
       da pergunta na tela final. Opção com  reconsiderar: true  leva para a
       tela "Que tal reconsiderar?".

   Depois de editar: abra a página e percorra o formulário até a última
   pergunta. Se aparecer tela branca, faltou uma vírgula ou uma aspa.
   ========================================================================== */

/* ============================ ÁREA EDITÁVEL ================================ */

// Botão verde da tela de sucesso. {nome} = nome completo digitado.
// O código "(cód. ...)" que o RH usa para achar o candidato é colado no fim
// da mensagem automaticamente.
const WHATSAPP = {
  numero: "5511936212414",
  mensagem: "Olá! Acabei de me candidatar à vaga de vendedor na King of Languages. Meu nome é {nome}.",
  botao: "Finalizar no WhatsApp",
};

// Textos que se repetem em várias telas.
const TEXTOS = {
  avancar: "Avançar",
  selecione: "Selecione uma opção para continuar.",
  dicaEnter: "pressione *Enter ↵* para continuar",
  dicaQuebraLinha: "*Shift + Enter* para quebrar linha",
  rotuloPergunta: "PERGUNTA {n} DE {total}", // em cima de cada pergunta
  contador: "Pergunta {n} de {total}", // ao lado da barra de progresso
  contadorAbertura: "Vamos começar",
  contadorFim: "Concluído",
};

// As telas, na ordem em que aparecem.
const TELAS = [
  {
    id: "intro",
    tipo: "abertura",
    selo: "Vaga: Consultor(a) de Vendas",
    titulo: "Processo Seletivo\nVaga de Vendas",
    dica: "Que bom que você quer fazer parte do nosso time comercial!\nO processo é simples e tem 4 etapas:",
    // icone: prancheta, pessoa, video ou microfone
    etapas: [
      { icone: "prancheta", texto: "Preencher este formulário" },
      { icone: "pessoa", texto: "Análise do seu perfil pelo nosso time" },
      { icone: "video", texto: "Gravação de um vídeo curto de apresentação, pelo celular" },
      { icone: "microfone", texto: "Entrevista com o time comercial" },
    ],
    botao: "Começar",
  },
  {
    id: "nome",
    tipo: "nome", // exige nome e sobrenome
    titulo: "Qual é o seu *nome completo*?",
    placeholder: "Digite seu nome aqui...",
    erro: "Digite seu nome e sobrenome.",
  },
  {
    id: "idade",
    tipo: "idade",
    titulo: "Qual é a sua *idade*?",
    placeholder: "00",
    minima: 16,
    maxima: 80,
    erro: "Informe uma idade válida.",
  },
  {
    id: "email",
    tipo: "email",
    titulo: "Qual o seu *melhor e-mail*?",
    dica: "Ele será usado durante todo o processo seletivo.",
    placeholder: "exemplo@email.com",
    erro: "Hmm, esse e-mail não parece válido.",
  },
  {
    id: "whats",
    tipo: "whatsapp", // DDD + número
    titulo: "Seu número de *WhatsApp*",
    dica: "Com DDD — é por ele que vamos falar com você durante o processo.",
    placeholderDDD: "(11)",
    placeholder: "00000-0000",
    erroDDD: "Informe o DDD (2 dígitos).",
    erro: "Informe um número de WhatsApp válido.",
  },
  {
    id: "cpf",
    tipo: "cpf", // confere os dígitos verificadores
    titulo: "Qual é o seu *CPF*?",
    dica: "Usamos só para o seu cadastro no processo seletivo.",
    placeholder: "000.000.000-00",
    erro: "Confira o CPF: os números não batem.",
  },
  {
    id: "exp_consultiva",
    tipo: "escolha",
    titulo: "Você tem experiência com *vendas consultivas*?",
    opcoes: [
      { valor: "Sim", texto: "Sim, tenho" },
      { valor: "Não", texto: "Não tenho", elimina: true },
    ],
    motivo: "Para esta posição, buscamos pessoas com experiência em vendas consultivas, já que essa é a base do dia a dia do nosso time comercial.",
  },
  {
    id: "exp_vendas",
    tipo: "textolongo",
    titulo: "Conte sobre a sua *experiência com vendas*",
    dica: "Descreva o que você vendia, suas principais atividades, se trabalhava com metas e os resultados que alcançou.",
    placeholder: "Ex.: vendi planos de internet por telefone, meta de 40 vendas por mês, batia 110%...",
    minimo: 30, // caracteres
    maximo: 1000,
    contador: "{n} / {max} caracteres",
    erro: "Conte um pouco mais sobre sua experiência (mínimo de 30 caracteres).",
  },
  {
    id: "disponib",
    tipo: "escolha",
    titulo: "A operação comercial funciona das *9h às 19h30*, de *segunda a sexta*. Você teria disponibilidade para atuar em *toda essa janela*?",
    opcoes: [
      { valor: "Sim", texto: "Sim, tenho disponibilidade total" },
      { valor: "Não", texto: "Não tenho disponibilidade nesse horário", elimina: true },
    ],
    motivo: "Para esta posição, é necessário ter disponibilidade para atuar das 9h às 19h30, de segunda a sexta, que é o horário de funcionamento da nossa operação comercial.",
  },
  {
    id: "inicio",
    tipo: "escolha",
    titulo: "Você tem disponibilidade para *início imediato*?",
    opcoes: [
      { valor: "Sim", texto: "Sim, posso começar imediatamente" },
      // pedeData: só funciona nesta pergunta. A data vai para o RH junto
      // do texto de experiência com vendas.
      { valor: "Não", texto: "Não, não posso começar agora", pedeData: true },
    ],
    perguntaData: "A partir de qual data você pode iniciar?",
    erroData: "Informe a data em que você pode iniciar.",
    erroDataPassada: "Informe uma data a partir de hoje.",
  },
  {
    id: "mei",
    tipo: "escolha",
    titulo: "Esta vaga é para contratação como *Pessoa Jurídica (PJ)*.",
    dica: "Você já possui um *MEI* ou está disposto(a) a criar um caso seja aprovado(a) para a vaga?",
    opcoes: [
      { valor: "Sim, já possuo", texto: "Sim, já possuo." },
      { valor: "Não, mas posso abrir", texto: "Não, mas posso abrir!" },
      { valor: "Não e não pretendo abrir", texto: "Não e não pretendo abrir.", elimina: true },
    ],
    motivo: "Para esta posição, a contratação é feita como Pessoa Jurídica (PJ), por isso é necessário ter um MEI ou estar disposto(a) a abrir um.",
  },
  {
    id: "computador",
    tipo: "escolha",
    titulo: "Você possui *computador ou notebook próprio* com *webcam* e *acesso estável à internet*, para atuar na vaga?",
    opcoes: [
      { valor: "Sim", texto: "Sim" },
      { valor: "Não", texto: "Não", elimina: true },
    ],
    motivo: "Para esta posição, é necessário ter computador ou notebook próprio, com webcam e internet estável, já que toda a atuação é feita de forma online.",
  },
  {
    id: "video",
    tipo: "escolha",
    titulo: "Uma das etapas do nosso processo, em caso de avanço, é o envio de um *vídeo de até 2 minutos* contando um pouco sobre sua *experiência com vendas*. Você teria disponibilidade para enviá-lo?",
    opcoes: [
      { valor: "Sim", texto: "Sim" },
      { valor: "Não", texto: "Não", reconsiderar: true },
    ],
  },
  {
    // Última pergunta: é ela que envia a candidatura. Mantenha no fim.
    id: "curriculo",
    tipo: "arquivo",
    titulo: "Anexe seu *currículo atualizado*",
    dica: "PDF, DOC ou DOCX (até 7 MB). Se o currículo só estiver no celular, uma foto nítida em JPG ou PNG também vale.",
    tamanhoMaximoMB: 7,
    textoSemArquivo: "Clique para selecionar o arquivo",
    subtextoSemArquivo: "ou arraste seu currículo aqui",
    subtextoComArquivo: "Clique para trocar o arquivo",
    erro: "Anexe seu currículo para enviar.",
    erroVazio: "Não consegui ler esse arquivo (0 KB). Salve o currículo no aparelho e anexe de novo.",
    erroGrande: "O arquivo passa de 7 MB. Envie um menor.",
    botao: "Enviar candidatura",
    botaoEnviando: "Enviando…",
    erroEnvio: "Não consegui enviar agora. Verifique sua conexão e tente novamente.",
  },
];

// Telas finais (não contam como pergunta).
const FINAIS = {
  // quem marca uma opção "reconsiderar: true"
  recusa: {
    titulo: "Que tal reconsiderar?",
    texto: "O vídeo é rapidinho, de até 2 minutos, e nos ajuda a conhecer você além do currículo. Sem ele, não conseguimos avançar com a sua candidatura. Se quiser, é só voltar e marcar “Sim”.",
    botao: "Voltar",
  },
  // quem marca uma opção "elimina: true" (o "motivo" da pergunta vem antes do texto)
  fora: {
    titulo: "Obrigado por querer fazer parte do time King!",
    texto: "Por esse motivo, não poderemos seguir com a sua candidatura neste momento. Agradecemos muito o seu tempo e esperamos te ver em uma próxima oportunidade!",
  },
  // candidatura enviada. {nome} = primeiro nome
  ok: {
    titulo: "Obrigado por sua candidatura!",
    texto: "Recebemos seus dados, *{nome}*. Agora nosso time comercial vai analisar seu perfil com carinho.",
    proximoPasso: "Se o seu perfil for selecionado, entraremos em contato pelo *e-mail* e *WhatsApp* que você informou. O próximo passo é gravar um vídeo curto de apresentação pelo celular. Fique de olho!",
  },
};

/* ======================= FIM DA ÁREA EDITÁVEL ==============================
   Daqui para baixo é o funcionamento do formulário: validação, envio para o
   RH (edge function vendedores-intake) e eventos do Pixel da Meta.
   Não edite sem um desenvolvedor.
   ========================================================================== */

const INTAKE_URL = "https://quljxivtdmwpdrzbqobp.supabase.co/functions/v1/vendedores-intake";
const MAX_INTERNO_MB = 7; // acima disso o arquivo não vai no payload (curriculo_grande)

// Ids do formulário original com destino fixo no payload. Qualquer outro id
// vai para o payload com o próprio nome.
const IDS_PADRAO = ["intro", "nome", "idade", "email", "whats", "cpf", "exp_consultiva", "exp_vendas",
  "disponib", "inicio", "mei", "computador", "video", "curriculo"];
const ID_CAMPO = { nome: "i-nome", idade: "i-idade", email: "i-email", whats: "i-num", cpf: "i-cpf",
  exp_vendas: "i-exp", inicio: "i-data", curriculo: "i-cv" };
const ACEITA = ".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.heic,application/pdf,application/msword," +
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png,image/webp,image/heic";

const SVG = {
  seta: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  marca: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  alerta: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 8v5m0 3h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke="#cc213a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  upload: traco("M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12", "1.9"),
  sucesso: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  telefone: traco("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z", "1.9"),
  prancheta: traco("M8 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2M8 3a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2M8 3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2M9 12h6M9 16h4", "1.8"),
  pessoa: traco("M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z", "1.8"),
  video: traco("M23 7l-7 5 7 5V7ZM3 5h11a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z", "1.8"),
  microfone: traco("M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3ZM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8", "1.8"),
};
function traco(d, largura) {
  return `<svg viewBox="0 0 24 24"><path d="${d}" stroke-width="${largura}" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
}

// ---------------------------------------------------------------- estado
const resp = { nome: "", idade: "", email: "", ddd: "", num: "", cpf: "", exp_consultiva: "", exp_vendas: "",
  disponib: "", inicio: "", data_inicio: "", mei: "", computador: "", video: "", curriculo: null };
TELAS.forEach((t) => { if (!(t.id in resp) && t.tipo !== "abertura") resp[t.id] = ""; });

const IDS = TELAS.map((t) => t.id);
const PERGUNTAS = TELAS.filter((t) => t.tipo !== "abertura").map((t) => t.id);
const telaDe = (id) => TELAS.find((t) => t.id === id);
const opcaoMarcada = (t) => (t.opcoes || []).find((o) => o.valor === resp[t.id]);

let atual = IDS[0];
let origemRecusa = null; // de qual pergunta veio para a tela "recusa"
let motivo = ""; // texto do motivo mostrado na tela "fora"
let codigo = ""; // slug da campanha + session_id, vai na mensagem do WhatsApp
let enviando = false;
let timerFoco;
const el = {}; // elementos que mudam: el[id] = { tela, opcoes, contador, rotulo, ... }

// ---------------------------------------------------------------- helpers de DOM
function h(tag, attrs, ...filhos) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else if (k === "html") n.innerHTML = v;
    else n.setAttribute(k, v);
  }
  n.append(...filhos.flat().filter((f) => f != null && f !== false));
  return n;
}
const icone = (nome) => h("template", { html: SVG[nome] }).content.firstChild;

// "*palavra*" vira <b class="kw">, "\n" vira <br>, {chave} é trocado por vars[chave].
function rico(texto, classe = "kw", vars = {}) {
  const troca = (s) => s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
  return texto.split(/(\*[^*]+\*|\n)/).filter(Boolean).map((p) =>
    p === "\n" ? h("br") : p[0] === "*" && p.length > 2 ? h("b", { class: classe || null }, troca(p.slice(1, -1))) : troca(p));
}
const preenche = (modelo, vars) => modelo.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));

function botao(texto, onclick) {
  return h("button", { class: "btn", type: "button", onclick }, texto + " ", h("span", { class: "arrow" }, icone("seta")));
}
const dicaEnter = (modelo) => h("div", { class: "enterhint" }, rico(modelo, null).map((p) => (p.tagName === "B" ? h("kbd", {}, p.textContent) : p)));

function mostraErro(chave, msg) {
  document.querySelectorAll(`.err[data-erro="${chave}"]`).forEach((n) => {
    n.className = "err" + (msg ? " show" : "");
    n.replaceChildren(...(msg ? [icone("alerta"), msg] : []));
  });
}

// Liga um <input>/<textarea> à resposta, aplicando a máscara a cada tecla.
function campo(n, chave, mascara = (v) => v, depois) {
  n.addEventListener("input", () => {
    const v = mascara(n.value);
    if (n.value !== v) n.value = v;
    resp[chave] = v;
    depois && depois(v);
  });
  return n;
}

// ---------------------------------------------------------------- montagem das telas
function montaPergunta(t) {
  const filhos = [];
  const numero = PERGUNTAS.indexOf(t.id) + 1;
  const rotulo = preenche(TEXTOS.rotuloPergunta, { n: String(numero).padStart(2, "0"), total: String(PERGUNTAS.length).padStart(2, "0") });
  filhos.push(h("span", { class: "qnum" }, icone("check"), rotulo));

  const idCampo = ID_CAMPO[t.id] || "i-" + t.id;
  const comCampo = ["nome", "idade", "email", "whatsapp", "cpf", "textolongo", "arquivo"].includes(t.tipo);
  filhos.push(h(comCampo ? "label" : "div", { class: "qtitle", for: comCampo ? idCampo : null }, rico(t.titulo)));
  if (t.dica) filhos.push(h("p", { class: "qhint" }, rico(t.dica)));

  const e = (el[t.id] = {});
  let dica = TEXTOS.dicaEnter;
  switch (t.tipo) {
    case "nome":
      filhos.push(h("div", { class: "field" }, campo(h("input", { id: idCampo, type: "text", autocomplete: "name", placeholder: t.placeholder }), t.id)));
      break;
    case "idade":
      filhos.push(h("div", { class: "field age" }, campo(h("input", { id: idCampo, type: "tel", inputmode: "numeric", maxlength: "2", placeholder: t.placeholder }),
        t.id, (v) => v.replace(/\D/g, "").slice(0, 2))));
      break;
    case "email":
      filhos.push(h("div", { class: "field" }, campo(h("input", { id: idCampo, type: "email", autocomplete: "email", inputmode: "email", placeholder: t.placeholder }), t.id)));
      break;
    case "whatsapp": {
      const num = campo(h("input", { id: idCampo, class: "num", type: "tel", inputmode: "numeric", maxlength: "10", placeholder: t.placeholder }), "num", (v) => {
        const d = v.replace(/\D/g, "").slice(0, 9);
        return d.length > 5 ? d.slice(0, 5) + "-" + d.slice(5) : d;
      });
      const ddd = campo(h("input", { class: "ddd", type: "tel", inputmode: "numeric", maxlength: "2", placeholder: t.placeholderDDD }), "ddd",
        (v) => v.replace(/\D/g, "").slice(0, 2), (v) => v.length === 2 && num.focus());
      filhos.push(h("div", { class: "field phone" }, ddd, num));
      break;
    }
    case "cpf":
      filhos.push(h("div", { class: "field" }, campo(h("input", { id: idCampo, type: "tel", inputmode: "numeric", autocomplete: "off", maxlength: "14", placeholder: t.placeholder }),
        t.id, (v) => v.replace(/\D/g, "").slice(0, 11)
          .replace(/^(\d{3})(\d)/, "$1.$2")
          .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
          .replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2"))));
      break;
    case "textolongo": {
      const conta = (v) => {
        e.contador.textContent = preenche(t.contador, { n: v.length, max: t.maximo });
        e.contador.className = "kv-count" + (v.length >= t.maximo ? " max" : "");
      };
      filhos.push(h("div", { class: "field" }, campo(h("textarea", { id: idCampo, placeholder: t.placeholder, maxlength: String(t.maximo) }),
        t.id, (v) => v.slice(0, t.maximo), conta)));
      filhos.push((e.contador = h("div", { class: "kv-count" })));
      conta("");
      dica = TEXTOS.dicaQuebraLinha;
      break;
    }
    case "escolha": {
      e.opcoes = t.opcoes.map((o) => h("button", { type: "button", class: "choice", onclick: () => escolhe(t, o.valor) }, h("span", { class: "mark" }, icone("marca")), o.texto));
      filhos.push(h("div", { class: "choices" }, e.opcoes));
      if (t.opcoes.some((o) => o.pedeData)) {
        e.data = [
          h("label", { class: "qhint", for: idCampo, style: "margin-top: 8px;", hidden: "" }, t.perguntaData),
          h("div", { class: "field", hidden: "" }, (e.dataInput = h("input", { id: idCampo, type: "date" }))),
        ];
        e.dataInput.addEventListener("input", () => { resp.data_inicio = e.dataInput.value; mostraErro(t.id, ""); });
        filhos.push(...e.data);
      }
      dica = null;
      break;
    }
    case "arquivo": {
      const input = h("input", { id: idCampo, type: "file", accept: ACEITA });
      e.rotulo = h("label", { class: "uplabel", for: idCampo });
      input.addEventListener("change", () => {
        resp.curriculo = (input.files && input.files[0]) || null;
        if (resp.curriculo) mostraErro(t.id, "");
        atualizaArquivo(t);
      });
      filhos.push(h("div", { class: "upload" }, input, e.rotulo));
      atualizaArquivo(t);
      filhos.push(h("div", { class: "err", "data-erro": t.id }), h("div", { class: "err", "data-erro": "submit" }));
      filhos.push((e.enviar = h("button", { class: "btn", type: "button", onclick: enviar })));
      atualizaBotaoEnviar(t);
      return h("div", { class: "screen" }, filhos);
    }
  }
  filhos.push(h("div", { class: "err", "data-erro": t.id }), botao(TEXTOS.avancar, avancar));
  if (dica) filhos.push(dicaEnter(dica));
  return h("div", { class: "screen" }, filhos);
}

function montaAbertura(t) {
  return h("div", { class: "screen" },
    h("span", { class: "badge-fast" }, h("span", { class: "pulse" }), t.selo),
    h("div", { class: "qtitle" }, rico(t.titulo)),
    h("p", { class: "qhint" }, rico(t.dica)),
    h("div", { class: "intro-list" }, t.etapas.map((et) =>
      h("div", { class: "it" }, h("span", { class: "ic" }, icone(et.icone)), h("div", {}, et.texto)))),
    botao(t.botao, avancar));
}

function montaFinais() {
  el.recusa = { tela: h("div", { class: "screen" },
    h("div", { class: "qtitle" }, rico(FINAIS.recusa.titulo)),
    h("p", { class: "qhint" }, rico(FINAIS.recusa.texto)),
    h("button", { class: "btn", type: "button", onclick: voltar }, FINAIS.recusa.botao)) };
  el.fora = { texto: h("p", { class: "qhint" }) };
  el.fora.tela = h("div", { class: "screen" }, h("div", { class: "qtitle" }, rico(FINAIS.fora.titulo)), el.fora.texto);
  el.ok = { texto: h("p"), whats: h("a", {
    class: "btn", target: "_blank", rel: "noopener noreferrer",
    style: "margin-top: 20px; justify-content: center; text-decoration: none; background: linear-gradient(135deg, rgb(15, 122, 65), rgb(10, 92, 49));",
    onclick: () => window.fbq && window.fbq("track", "Contact", { content_name: "Confirmação WhatsApp Vendedor" }),
  }, WHATSAPP.botao) };
  el.ok.tela = h("div", { class: "screen success" },
    h("div", { class: "checkmark" }, icone("sucesso")),
    h("h2", {}, FINAIS.ok.titulo),
    el.ok.texto,
    h("div", { class: "nextbox" }, icone("telefone"), h("p", {}, rico(FINAIS.ok.proximoPasso, null))),
    el.ok.whats);
  // mesma ordem do original no DOM: recusa, fora, ok
  return [el.recusa.tela, el.fora.tela, el.ok.tela];
}

// ---------------------------------------------------------------- atualizações de tela
function atualizaArquivo(t) {
  const f = resp.curriculo;
  el[t.id].rotulo.className = "uplabel" + (f ? " has" : "");
  el[t.id].rotulo.replaceChildren(
    h("span", { class: "upic" }, icone("upload")),
    h("span", { class: "uptxt" }, f ? f.name : t.textoSemArquivo, h("small", {}, f ? t.subtextoComArquivo : t.subtextoSemArquivo)));
}

function atualizaBotaoEnviar(t) {
  const b = el[t.id].enviar;
  b.disabled = enviando;
  if (enviando) b.style.cssText = "opacity: 0.7; cursor: wait;";
  else b.removeAttribute("style");
  b.replaceChildren((enviando ? t.botaoEnviando : t.botao) + " ", h("span", { class: "arrow" }, icone("seta")));
}

function escolhe(t, valor) {
  resp[t.id] = valor;
  mostraErro(t.id, "");
  t.opcoes.forEach((o, i) => (el[t.id].opcoes[i].className = "choice" + (o.valor === valor ? " sel" : "")));
  if (el[t.id].data) {
    const mostra = !!(opcaoMarcada(t) || {}).pedeData;
    el[t.id].data.forEach((n) => (n.hidden = !mostra));
    el[t.id].dataInput.min = new Date().toISOString().slice(0, 10);
  }
}

function irPara(id) {
  atual = id;
  const final = id in FINAIS;
  for (const [k, v] of Object.entries(el)) v.tela.className = v.tela.className.replace(/ active$/, "") + (k === id ? " active" : "");

  const fhead = document.querySelector(".fhead");
  fhead.style.display = final ? "none" : "";
  const n = PERGUNTAS.indexOf(id) + 1;
  const pos = IDS.indexOf(id);
  fhead.querySelector(".back").className = "back" + (pos > 0 ? " show" : "");
  fhead.querySelector(".progress i").style.width = (id === IDS[0] ? 5 : id === "ok" ? 100 : Math.round((n / PERGUNTAS.length) * 94) + 6) + "%";
  fhead.querySelector(".counter").textContent = n ? preenche(TEXTOS.contador, { n, total: PERGUNTAS.length })
    : id === "ok" ? TEXTOS.contadorFim : TEXTOS.contadorAbertura;

  // faixa vermelha: etapa 1 (formulário) ativa; na tela de sucesso, etapa 2
  const etapa = id === "ok" ? 2 : 1;
  document.querySelectorAll(".brand .stp").forEach((s, i) => {
    s.className = "stp" + (i + 1 === etapa ? " active" : i + 1 < etapa ? " done" : "");
    s.querySelector(".dot").replaceChildren(i + 1 < etapa ? icone("check") : String(i + 1));
  });

  if (id === "fora") el.fora.texto.replaceChildren(...rico((motivo ? motivo + " " : "") + FINAIS.fora.texto));
  if (id === "ok") {
    el.ok.texto.replaceChildren(...rico(FINAIS.ok.texto, null, { nome: resp.nome.split(" ")[0] || "candidato(a)" }));
    const msg = preenche(WHATSAPP.mensagem, { nome: resp.nome.trim() }) + (codigo ? "\n\n(cód. " + codigo + ")" : "");
    el.ok.whats.href = "https://wa.me/" + WHATSAPP.numero + "?text=" + encodeURIComponent(msg);
  }

  clearTimeout(timerFoco);
  timerFoco = setTimeout(() => {
    const c = document.querySelector(".kf-form .screen.active input:not([type=file]), .kf-form .screen.active textarea");
    c && c.focus();
  }, 420);
}

// ---------------------------------------------------------------- validação
function cpfValido(c) {
  if (c.length !== 11 || /^(\d)\1{10}$/.test(c)) return false;
  for (let t = 9; t < 11; t++) {
    let s = 0;
    for (let i = 0; i < t; i++) s += +c[i] * (t + 1 - i);
    if (((s * 10) % 11) % 10 !== +c[t]) return false;
  }
  return true;
}

// Devolve a mensagem de erro da pergunta, ou "" se a resposta está ok.
function problema(t) {
  const v = resp[t.id];
  switch (t.tipo) {
    case "nome": return v.trim().length < 3 || !v.trim().includes(" ") ? t.erro : "";
    case "idade": {
      const n = parseInt(v.replace(/\D/g, ""), 10);
      return !n || n < t.minima || n > t.maxima ? t.erro : "";
    }
    case "email": return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : t.erro;
    case "whatsapp":
      if (resp.ddd.replace(/\D/g, "").length !== 2) return t.erroDDD;
      return resp.num.replace(/\D/g, "").length < 8 ? t.erro : "";
    case "cpf": return cpfValido(v.replace(/\D/g, "")) ? "" : t.erro;
    case "textolongo": return v.trim().length < t.minimo ? t.erro : "";
    case "escolha":
      if (!v) return TEXTOS.selecione;
      if ((opcaoMarcada(t) || {}).pedeData) {
        if (!resp.data_inicio) return t.erroData;
        if (resp.data_inicio < new Date().toISOString().slice(0, 10)) return t.erroDataPassada;
      }
      return "";
    case "arquivo": {
      const f = resp.curriculo;
      if (!f) return t.erro;
      if (f.size === 0) return t.erroVazio;
      return f.size > t.tamanhoMaximoMB * 1024 * 1024 ? t.erroGrande : "";
    }
  }
  return "";
}
function valida(t) {
  const msg = problema(t);
  mostraErro(t.id, msg);
  return !msg;
}

// ---------------------------------------------------------------- navegação
function avancar() {
  const t = telaDe(atual);
  if (!t) return;
  const op = opcaoMarcada(t);
  if (op && op.reconsiderar) {
    origemRecusa = atual;
    irPara("recusa");
    try { window.fbq && window.fbq("trackCustom", "RecusouVideo"); } catch {}
    return;
  }
  if (t.tipo !== "abertura" && !valida(t)) return;
  if (op && op.elimina) {
    motivo = t.motivo || "";
    irPara("fora");
    try { window.fbq && window.fbq("trackCustom", "Desqualificado", { etapa: t.id }); } catch {}
    return;
  }
  const i = IDS.indexOf(atual);
  if (i < IDS.length - 1) {
    irPara(IDS[i + 1]);
    try { window.fbq && window.fbq("trackCustom", "FormEtapa", { etapa: IDS[i + 1], n: i + 1 }); } catch {}
  }
}

function voltar() {
  if (atual === "recusa") return irPara(origemRecusa);
  const i = IDS.indexOf(atual);
  if (i > 0) irPara(IDS[i - 1]);
}

// ---------------------------------------------------------------- envio
const lerArquivo = (f) => new Promise((ok, falha) => {
  const r = new FileReader();
  r.onload = () => ok(String(r.result));
  r.onerror = () => falha(new Error("read error"));
  r.readAsDataURL(f);
});

function novoSessionId() {
  const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let s = "";
  try {
    const b = new Uint8Array(11);
    crypto.getRandomValues(b);
    for (let i = 0; i < 11; i++) s += A[b[i] % 36];
  } catch {
    s = "";
    for (let i = 0; i < 11; i++) s += A[Math.floor(Math.random() * 36)];
  }
  return s;
}
const slug = (c) => (c || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "recrutamento-vendedores";
const cookie = (nome) => (document.cookie.match(new RegExp("(?:^|;\\s*)" + nome + "=([^;]*)")) || [])[1] || "";

async function enviar() {
  const t = TELAS.find((x) => x.tipo === "arquivo");
  if (enviando || !valida(t)) return;
  enviando = true;
  atualizaBotaoEnviar(t);
  mostraErro("submit", "");
  try {
    const q = new URLSearchParams(window.location.search);
    const utmSource = q.get("utm_source") || "";
    const sid = novoSessionId();
    const cod = slug(q.get("utm_campaign")) + "|" + sid;
    const f = resp.curriculo;
    const arquivo = f && f.size <= MAX_INTERNO_MB * 1024 * 1024
      ? { nome: f.name, mime: f.type || "application/octet-stream", base64: await lerArquivo(f) }
      : null;
    // perguntas novas (fora do formulário original) vão com o próprio id
    const extras = {};
    TELAS.forEach((x) => { if (!IDS_PADRAO.includes(x.id) && x.tipo !== "abertura") extras[x.id] = resp[x.id]; });

    // Mesmo formato do formulário A, campo a campo (lido pela edge vendedores-intake).
    const payload = {
      session_id: sid,
      nome: resp.nome.trim(),
      email: resp.email.trim(),
      idade: resp.idade,
      ddd: resp.ddd,
      numero: resp.num,
      phone: `(${resp.ddd}) ${resp.num}`,
      cpf: resp.cpf.replace(/\D/g, ""),
      exp_vendas: resp.exp_vendas.trim() + (resp.inicio === "Não" && resp.data_inicio
        ? `\n\n[Início imediato: NÃO. Disponível a partir de ${resp.data_inicio.split("-").reverse().join("/")}]` : ""),
      disponib: resp.disponib,
      mei: resp.mei,
      computador: resp.computador,
      video_compromisso: resp.video,
      ...extras,
      channel: /goog/i.test(utmSource) ? "Google Ads" : "Meta Ads",
      utm_source: utmSource,
      utm_campaign: q.get("utm_campaign") || "",
      utm_medium: q.get("utm_medium") || "",
      fbclid: q.get("fbclid") || "",
      page: window.location.href,
      fbc: cookie("_fbc"),
      fbp: cookie("_fbp"),
      curriculo_grande: f && !arquivo ? f.name : undefined,
      curriculo: arquivo,
    };
    const r = await fetch(INTAKE_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!r.ok) throw new Error("HTTP " + r.status);
    codigo = cod;
    irPara("ok");
    // Lead só para candidatura dentro do perfil
    const foraDoPerfil = TELAS.some((x) => { const o = opcaoMarcada(x); return o && (o.elimina || o.reconsiderar); });
    try { window.fbq && (foraDoPerfil ? window.fbq("trackCustom", "CandidaturaForaDoPerfil") : window.fbq("track", "Lead")); } catch {}
  } catch {
    mostraErro("submit", t.erroEnvio);
  } finally {
    enviando = false;
    atualizaBotaoEnviar(t);
  }
}

// ---------------------------------------------------------------- início
// Enter avança (na última pergunta, envia). Dentro da caixa de texto longo, Enter quebra linha.
window.addEventListener("keydown", (ev) => {
  if (ev.key !== "Enter" || (ev.target && ev.target.tagName === "TEXTAREA")) return;
  if (atual in FINAIS) return;
  ev.preventDefault();
  telaDe(atual).tipo === "arquivo" ? enviar() : avancar();
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".fhead .back").addEventListener("click", voltar);
  const telas = TELAS.map((t) => {
    const tela = t.tipo === "abertura" ? montaAbertura(t) : montaPergunta(t);
    (el[t.id] = el[t.id] || {}).tela = tela;
    return tela;
  });
  document.querySelector(".screens").append(...telas, ...montaFinais());
  irPara(IDS[0]);
});
