/**
 * CONFIGURAÇÃO DO CONVITE DE HALLOWEEN
 * ----------------------------------------------------
 * Altere as informações da festa diretamente neste arquivo.
 * Não é necessário mexer nos arquivos de estilo ou lógica.
 */

const HALLOWEEN_CONFIG = {
  // Informações do Aniversariante e Evento
  aniversariante: "Anderson",
  idade: "39 Anos",
  tituloEvento: "HALLOWEEN do Anderson",
  subtituloTopo: "Festa de 39 Anos",
  fraseAbertura: "Você está convidado para a festa mais aterrorizante do ano!",
  fraseIntro: "Você foi convidado. Terá coragem de abrir?",
  textoBotaoRevelar: "REVELAR O CONVITE",

  // Dados da Festa
  data: "31 de outubro",
  hora: "20h",
  local: "R. Pedro Moreira César, 1 - Reunidas, Bela Vista, Salto de Pirapora - SP",
  traje: "A caráter (Fantasia obrigatória!) 🧛‍♂️🧙‍♀️",
  prazoConfirmacao: "28/10",
  // Contribuição e PIX
  contribuicao: "R$ 30,00 por pessoa",
  chavePix: "37757887860",
  instrucaoPix: "Envie o comprovante do PIX pelo WhatsApp até 28/10 para colocar o seu nome na lista!",

  // O que levar
  oQueLevar: {
    rango: "Traga a carne em espetinhos (fica bem mais fácil e prático para assar e todo mundo curtir!).",
    bebidas: "Traga seu cooler abastecido com as bebidas da sua preferência!"
  },

  // WhatsApp para confirmação
  // Formato internacional: código do país (55) + DDD (15) + número (996696096)
  whatsappNumero: "5515996696096",
  whatsappMensagem: "Olá! Segue o comprovante do PIX para confirmar meu nome na lista da festa de Halloween dos 39 anos do Anderson!",
  textoBotaoWhatsapp: "CONFIRMAR & ENVIAR COMPROVANTE",

  // Observação especial do convite (pequeno bilhete amassado)
  observacao: "Obs: Vai ter som e karaoke pra vc se assustar a noite inteira huahuahuahuahuahua",

  // Mapa e Localização Exata (Espaço Recanto Ruiz)
  mapa: {
    nomeLocal: "Espaço Recanto Ruiz",
    enderecoPesquisa: "Espaço Recanto Ruiz, Salto de Pirapora - SP",
    coordenadas: {
      lat: -23.5936204,
      lng: -47.5402406
    },
    // Link direto fornecido no Google Maps
    linkGoogleMapsExato: "https://maps.app.goo.gl/3F1vXKsnZfaFSxsB6",
    // Link para traçar rota direta no Google Maps
    linkGoogleMapsRota: "https://www.google.com/maps/dir/?api=1&destination=-23.5936204,-47.5402406",
    // Link direto do Waze
    linkWaze: "https://waze.com/ul?ll=-23.5936204,-47.5402406&navigate=yes",
    // Iframe embed com o marcador nas coordenadas exatas
    embedUrl: "https://maps.google.com/maps?q=-23.5936204,-47.5402406+(Espa%C3%A7o+Recanto+Ruiz)&t=&z=16&ie=UTF8&iwloc=&output=embed",
    textoBotaoRota: "ABRIR ROTA NO MAPA",
    textoBotaoWaze: "ABRIR NO WAZE"
  },

  // Áudio e Sussurros
  audio: {
    habilitadoPorPadrao: true,
    volumeGeral: 0.4, // Volume de 0.0 a 1.0 (moderado)
    intervaloMinSussurrosSegundos: 12,
    intervaloMaxSussurrosSegundos: 25,
    frasesSussurros: [
      "Eu estava esperando por você...",
      "Não olhe para trás...",
      "Você ouviu isso?",
      "A noite está apenas começando...",
      "Anderson te espera nas sombras...",
      "Entre por sua própria conta e risco..."
    ]
  },

  // Metadados de Compartilhamento (WhatsApp / Redes)
  meta: {
    titulo: "Convite de Halloween — Anderson 39 Anos",
    descricao: "Você foi convidado. Terá coragem de abrir?",
    urlImagemPadrao: "https://andersontalves.github.io/convite-halloween/assets/images/og_share_preview.jpg",
    urlSitePadrao: "https://andersontalves.github.io/convite-halloween/"
  }
};

// Exporta globalmente para uso no app
if (typeof window !== "undefined") {
  window.HALLOWEEN_CONFIG = HALLOWEEN_CONFIG;
}
