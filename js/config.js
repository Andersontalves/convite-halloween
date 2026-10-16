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
  prazoConfirmacao: "28/10",
  telefoneExibicao: "(15) 99669-6096",
  
  // WhatsApp para confirmação
  // Formato internacional: código do país (55) + DDD (15) + número (996696096)
  whatsappNumero: "5515996696096",
  whatsappMensagem: "Olá! Estou entrando em contato sobre a festa de Halloween dos 39 anos do Anderson, no dia 31 de outubro.",
  textoBotaoWhatsapp: "CONFIRMAR PRESENÇA",

  // Observação especial do convite (pequeno bilhete amassado)
  observacao: "Obs: Vai ter som e karaoke pra vc se assustar a noite inteira huahuahuahuahuahua",

  // Mapa e Localização
  mapa: {
    enderecoPesquisa: "R. Pedro Moreira César, 1 - Reunidas, Bela Vista, Salto de Pirapora - SP",
    // Link direto do Google Maps para traçar rotas
    linkGoogleMapsRota: "https://www.google.com/maps/dir/?api=1&destination=R.+Pedro+Moreira+C%C3%A9sar,+1+-+Reunidas,+Bela+Vista,+Salto+de+Pirapora+-+SP",
    // Link Waze alternativo
    linkWaze: "https://waze.com/ul?q=R.+Pedro+Moreira+C%C3%A9sar,+1+-+Reunidas,+Bela+Vista,+Salto+de+Pirapora+-+SP",
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
