# Formulário de vendedores: versão B (teste A/B)

Cópia do formulário de `site.kingoflanguages.com.br/vendedores/` (versão A) para o teste A/B,
refeita em HTML simples para poder ser editada. Esta versão fica em
**`site.kingoflanguages.com.br/vendedores-b/`**. A versão A não muda quando você mexe aqui.

Hoje B é igual a A: mesmas telas, mesmas perguntas, mesmos dados enviados ao RH e mesmos eventos do Pixel.

## Como editar

- **Perguntas, opções, textos e o WhatsApp do botão final:** `assets/form.js`, na ÁREA EDITÁVEL do topo.
  As instruções do que pode e do que não pode mudar estão no próprio arquivo.
- **Faixa vermelha (logo, título, etapas):** `index.html`.
- **Visual:** `assets/style.css`.

Cada `push` na `main` publica sozinho em cerca de 1 minuto (GitHub Actions → Deploy Hook da Vercel).
Antes de editar, faça `git pull` para partir da versão mais nova. Depois de publicar, percorra o
formulário até a última pergunta: tela branca = faltou vírgula ou aspa.

## Não mexer sem falar com o marketing

- Tudo abaixo da ÁREA EDITÁVEL do `assets/form.js`: envio para o RH (`vendedores-intake`),
  nomes dos campos, `session_id`, UTMs, `fbc`/`fbp`.
- O Pixel do Meta (`760887529692872`) e seus eventos no `index.html`.

O teste separa A e B pela URL da página (`/vendedores/` × `/vendedores-b/`),
então não é preciso marcar nada no formulário. Pergunta nova chega ao RH com o `id` que você der.
