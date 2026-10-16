# 🎃 Convite de Halloween — Anderson 39 Anos

Site interativo de aniversário com experiência cinematográfica de terror psicológico, introdução sombria com revelação gradual, pergaminho envelhecido com bordas queimadas, botão de confirmação via WhatsApp, mapa interativo de localização e rota, áudio ambiente imersivo com sussurros humanos e suporte completo para celulares e computadores.

---

## 🗂️ Estrutura do Projeto

```text
c:/APKs/Site do meu niver/
├── index.html                   # Estrutura HTML5 semântica e metadados Open Graph
├── README.md                    # Documentação e tutorial de publicação
├── css/
│   └── style.css                # Estilização cinematográfica, gótica e responsiva
├── js/
│   ├── config.js                # Arquivo de configuração simples com dados da festa
│   ├── audio.js                 # Motor de áudio sombrio (Web Audio API + sussurros)
│   └── app.js                   # Lógica de revelação, partículas e interações
└── assets/
    ├── images/
    │   ├── haunted_forest_bg.jpg    # Floresta assombrada cinematográfica (16:9)
    │   ├── parchment_scroll.jpg     # Textura de pergaminho antigo envelhecido
    │   ├── pumpkin_witch_hat.jpg    # Abóbora macabra com chapéu de bruxa
    │   └── og_share_preview.jpg     # Arte oficial de divulgação para o WhatsApp (1200x630)
    └── audio/                       # Diretório reservado para efeitos adicionais
```

---

## ⚙️ Como Personalizar os Dados da Festa (`js/config.js`)

Todas as informações estão centralizadas em um único arquivo de fácil leitura e edição: `js/config.js`.

Você pode alterar livremente:
- **Nome do aniversariante:** `aniversariante: "Anderson"`
- **Idade:** `idade: "39 Anos"`
- **Data e Horário:** `data: "31 de outubro"`, `hora: "20h"`
- **Local:** `local: "R. Pedro Moreira César, 1 - Reunidas, Bela Vista, Salto de Pirapora - SP"`
- **Prazo de Confirmação:** `prazoConfirmacao: "28/10"`
- **Telefone:** `telefoneExibicao: "(15) 99669-6096"`
- **WhatsApp:**
  - Número no formato internacional: `whatsappNumero: "5515996696096"` (55 = Brasil, 15 = DDD, 996696096 = Telefone)
  - Mensagem inicial pronta: `whatsappMensagem: "Olá! Estou entrando em contato sobre a festa de Halloween dos 39 anos do Anderson..."`
- **Observação Informal:** `"Obs: Vai ter som e karaoke pra vc se assustar a noite inteira huahuahuahuahuahua"`
- **Frases dos Sussurros:** edite ou adicione novas frases na lista `frasesSussurros`.
- **Volume e Intervalos:** ajuste `volumeGeral` (0.1 a 1.0) e intervalos mínimo e máximo em segundos.

---

## 🌐 Tutorial de Publicação Gratuita (Link Público Compartilhável)

Para que seus convidados possam acessar o site pelo celular ou computador, utilize um serviço de hospedagem estática gratuita. As duas opções recomendadas e 100% gratuitas são **GitHub Pages** e **Cloudflare Pages**.

### Opção 1: GitHub Pages (Mais Popular e Simples)

1. **Crie uma conta gratuita** no [GitHub](https://github.com) (se ainda não tiver).
2. **Crie um novo repositório:**
   - Nomeie como, por exemplo: `halloween-anderson-39`.
   - Marque o repositório como **Público (Public)**.
3. **Envie os arquivos do projeto:**
   - Faça upload de todo o conteúdo da pasta (`index.html`, `css/`, `js/`, `assets/`, etc.) diretamente pelo navegador ou via Git (`git push`).
4. **Ative o GitHub Pages:**
   - No repositório, clique na aba **Settings** (Configurações).
   - No menu lateral esquerdo, clique em **Pages**.
   - Em **Build and deployment > Branch**, selecione a branch `main` (ou `master`) e a pasta `/ (root)`.
   - Clique em **Save**.
5. **Obtenha o Link Público:**
   - Em cerca de 1 a 2 minutos, o GitHub exibirá o link no topo:
     `https://seu-usuario.github.io/halloween-anderson-39/`
   - Este é o link oficial para enviar aos convidados!

---

### Opção 2: Cloudflare Pages (Sem Limites de Transferência e Mais Rápido)

1. Crie uma conta gratuita no [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Vá em **Workers & Pages** > **Create application** > **Pages** > **Upload assets**.
3. Arraste a pasta `Site do meu niver` para o campo indicado.
4. Escolha um nome para o projeto (ex: `halloween-anderson`).
5. Clique em **Deploy site**.
6. Em segundos você receberá um link público instantâneo com certificado SSL gratuito:
   `https://halloween-anderson.pages.dev`

---

## 📲 Como Conferir e Testar a Prévia no WhatsApp

1. **Configuração da Imagem Absoluta no `index.html`:**
   Após ter o seu link público definitivo (ex: `https://seu-usuario.github.io/halloween-anderson-39/`), edite as tags `<meta property="og:image">` e `<meta property="og:url">` no topo do `index.html` colocando o endereço completo:
   ```html
   <meta property="og:image" content="https://seu-usuario.github.io/halloween-anderson-39/assets/images/og_share_preview.jpg">
   <meta property="og:url" content="https://seu-usuario.github.io/halloween-anderson-39/">
   ```
2. **Teste a prévia antes de compartilhar:**
   - Envie o link em uma conversa particular (ex: seu próprio número ou grupo de anotações).
   - Você também pode testar em validadores online como o [OpenGraph.xyz](https://www.opengraph.xyz/).
   > **Nota sobre o cache do WhatsApp:** O WhatsApp costuma guardar a imagem em cache na primeira vez em que um link é enviado. Se você alterar a imagem depois de publicar, pode demorar alguns minutos ou horas para atualizar no WhatsApp.

---

## 🔊 Recursos de Áudio e Voz

- **Sons de Ambiente (Vento e Drone):** Gerados via **Web Audio API** procedural nativa do navegador (osciladores harmônicos de baixa frequência + gerador de ruído rosa filtrado). Não requer download de arquivos de áudio pesados, não consome dados móveis e funciona 100% offline.
- **Sussurros Humanos:** Gerados via **Web Speech API** nativa do navegador (`pt-BR`), configurada com tom grave e cadência lenta de suspense.
- **Acessibilidade:**
  - O áudio inicia respeitando o gesto do usuário ao clicar em "REVELAR O CONVITE" ou no botão de áudio no topo.
  - O usuário pode silenciar a qualquer instante através do botão **Áudio: Mudo / Ativo**.
  - O convite é 100% funcional mesmo se o áudio estiver desativado ou se o navegador não suportar síntese de voz.
  - Legendas visuais discretas aparecem na parte inferior da tela caso o visitante esteja em um ambiente barulhento ou sem som.

---

## 🎨 Fontes e Licenças dos Recursos

- **Fontes Tipográficas:**
  - *Cinzel Decorative* (Google Fonts - Licença Open Font License)
  - *Creepster* (Google Fonts - Licença Open Font License)
  - *MedievalSharp* (Google Fonts - Licença Open Font License)
  - *Montserrat* (Google Fonts - Licença Open Font License)
- **Mapas:**
  - Google Maps Embed Iframe (Gratuito para visualização) + Links universais compatíveis com Google Maps e Waze.
- **Arte Visual:**
  - Ilustrações originais geradas com resolução cinematográfica e integradas localmente no projeto.
