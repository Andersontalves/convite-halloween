/**
 * APLICAÇÃO PRINCIPAL: CONVITE DE HALLOWEEN
 * ----------------------------------------------------
 * Controla a revelação cinematográfica do convite, integração com
 * configuração dinâmica, partículas de névoa no Canvas e interatividade.
 */

document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.HALLOWEEN_CONFIG || {};

  // Elementos da UI
  const introSection = document.getElementById('introSection');
  const revealBtn = document.getElementById('revealBtn');
  const invitationContainer = document.getElementById('invitationContainer');
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const motionToggleBtn = document.getElementById('motionToggleBtn');
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  const whisperToast = document.getElementById('whisperToast');
  const mistCanvas = document.getElementById('mistCanvas');

  // Preenche dados dinâmicos da configuração
  populateDynamicContent(cfg);

  // Inicializa partículas de névoa e brasas no Canvas
  initMistCanvas(mistCanvas);

  // Escuta evento de sussurros para exibir legenda fantasmagórica
  window.addEventListener('halloween:whisper', (e) => {
    if (whisperToast && e.detail && e.detail.text) {
      whisperToast.textContent = `“${e.detail.text}”`;
      whisperToast.classList.add('active');
      setTimeout(() => {
        whisperToast.classList.remove('active');
      }, 4000);
    }
  });

  // Evento: Revelar o Convite
  if (revealBtn) {
    revealBtn.addEventListener('click', () => {
      revealInvitationSequence();
    });
  }

  // Evento: Alternar Áudio
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      toggleAudioState();
    });
  }

  // Evento: Reduzir Animações
  if (motionToggleBtn) {
    motionToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('reduced-motion');
      const isReduced = document.body.classList.contains('reduced-motion');
      motionToggleBtn.setAttribute('aria-pressed', isReduced);
      motionToggleBtn.innerHTML = isReduced 
        ? '<span>⚡</span> Animações: Reduzidas' 
        : '<span>🦇</span> Animações: Normais';
    });
  }

  // Evento: Copiar Endereço
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const address = cfg.local || "R. Pedro Moreira César, 1 - Reunidas, Bela Vista, Salto de Pirapora - SP";
      navigator.clipboard.writeText(address).then(() => {
        const originalText = copyAddressBtn.innerHTML;
        copyAddressBtn.innerHTML = '<span>✓</span> Copiado!';
        setTimeout(() => {
          copyAddressBtn.innerHTML = originalText;
        }, 2200);
      }).catch(() => {
        alert("Endereço: " + address);
      });
    });
  }

  /**
   * Sequência cinematográfica de revelação
   */
  function revealInvitationSequence() {
    // Inicia áudio sombrio se não estiver ativo
    if (window.HorrorAudio) {
      window.HorrorAudio.start();
      window.HorrorAudio.playRevealStinger();
      updateAudioButtonUI(true);
      
      // Primeiro sussurro sutil logo após revelar
      setTimeout(() => {
        window.HorrorAudio.playWhisper("Você foi avisado...");
      }, 2600);
    }

    // Efeito de transição na tela com fade out
    introSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    introSection.style.opacity = '0';
    introSection.style.transform = 'scale(0.92) translateY(-20px)';

    setTimeout(() => {
      introSection.classList.add('hidden-intro');
      invitationContainer.classList.remove('collapsed');
      invitationContainer.classList.add('revealed');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  }

  /**
   * Alterna estado do áudio
   */
  function toggleAudioState() {
    if (!window.HorrorAudio) return;
    const isNowPlaying = window.HorrorAudio.toggle();
    updateAudioButtonUI(isNowPlaying);
  }

  function updateAudioButtonUI(isPlaying) {
    if (!audioToggleBtn) return;
    if (isPlaying) {
      audioToggleBtn.classList.add('active');
      audioToggleBtn.innerHTML = '<span class="audio-icon-pulse">🔊</span> Áudio: Ativo';
      audioToggleBtn.setAttribute('aria-label', 'Desativar áudio assustador');
    } else {
      audioToggleBtn.classList.remove('active');
      audioToggleBtn.innerHTML = '<span>🔇</span> Áudio: Mudo';
      audioToggleBtn.setAttribute('aria-label', 'Ativar áudio assustador');
    }
  }

  /**
   * Popula os textos a partir do config.js
   */
  function populateDynamicContent(data) {
    setText('introQuestionText', data.fraseIntro);
    setText('revealBtnText', data.textoBotaoRevelar);
    setText('scrollSubheadingText', data.subtituloTopo);
    setText('scrollMainTitleText', 'HALLOWEEN');
    setText('scrollAuthorText', `do ${data.aniversariante || 'Anderson'}`);
    setText('scrollTaglineText', `“${data.fraseAbertura || ''}”`);
    
    setText('detailDateText', data.data);
    setText('detailTimeText', data.hora);
    setText('detailLocationText', data.local);
    setText('detailCostumeText', data.traje);
    setText('detailDeadlineText', data.prazoConfirmacao);
    setText('detailPhoneText', data.telefoneExibicao);
    setText('crumpledNoteText', data.observacao);

    // Link do WhatsApp
    const whatsappBtn = document.getElementById('whatsappRsvpBtn');
    if (whatsappBtn && data.whatsappNumero) {
      const cleanPhone = data.whatsappNumero.replace(/\D/g, '');
      const encodedMsg = encodeURIComponent(data.whatsappMensagem || '');
      whatsappBtn.href = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
      setText('whatsappBtnText', data.textoBotaoWhatsapp || 'CONFIRMAR PRESENÇA');
    }

    // Links do Mapa
    const gmapsBtn = document.getElementById('gmapsRouteBtn');
    if (gmapsBtn && data.mapa?.linkGoogleMapsRota) {
      gmapsBtn.href = data.mapa.linkGoogleMapsRota;
      setText('gmapsBtnText', data.mapa.textoBotaoRota || 'ABRIR ROTA NO MAPA');
    }

    const wazeBtn = document.getElementById('wazeRouteBtn');
    if (wazeBtn && data.mapa?.linkWaze) {
      wazeBtn.href = data.mapa.linkWaze;
      setText('wazeBtnText', data.mapa.textoBotaoWaze || 'ABRIR NO WAZE');
    }

    // Iframe do Google Maps com coordenadas exatas
    const mapIframe = document.getElementById('mapIframe');
    if (mapIframe) {
      if (data.mapa?.embedUrl) {
        mapIframe.src = data.mapa.embedUrl;
      } else if (data.mapa?.enderecoPesquisa) {
        const query = encodeURIComponent(data.mapa.enderecoPesquisa);
        mapIframe.src = `https://maps.google.com/maps?q=${query}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
      }
    }
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el && text !== undefined) {
      el.textContent = text;
    }
  }

  /**
   * Sistema de Partículas de Névoa e Brasas no Canvas
   */
  function initMistCanvas(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Partículas de névoa roxa e cinzas/brasas alaranjadas
    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 40 + 20,
        type: Math.random() > 0.4 ? 'mist' : 'ember',
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.3 ? 'rgba(147, 51, 234,' : 'rgba(234, 88, 12,'
      });
    }

    // Morcego ocasional voando
    let bat = {
      active: false,
      x: -50,
      y: 100,
      vx: 3.5,
      vy: 0.5,
      wingTimer: 0
    };

    function triggerBat() {
      if (!bat.active && Math.random() < 0.003) {
        bat.active = true;
        bat.x = -60;
        bat.y = 80 + Math.random() * (height * 0.5);
        bat.vx = 2.8 + Math.random() * 2.2;
        bat.vy = (Math.random() - 0.5) * 1.5;
      }
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Desenha partículas
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -p.radius * 2) {
          p.y = height + p.radius;
          p.x = Math.random() * width;
        }
        if (p.x < -p.radius) p.x = width + p.radius;
        if (p.x > width + p.radius) p.x = -p.radius;

        ctx.beginPath();
        if (p.type === 'mist') {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          grad.addColorStop(0, `${p.color} ${p.alpha})`);
          grad.addColorStop(1, `${p.color} 0)`);
          ctx.fillStyle = grad;
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Pequena brasa incandescente
          ctx.fillStyle = `rgba(255, 140, 20, ${p.alpha * 1.5})`;
          ctx.arc(p.x, p.y, Math.random() * 2 + 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Morcego
      triggerBat();
      if (bat.active) {
        bat.x += bat.vx;
        bat.y += bat.vy;
        bat.wingTimer += 0.2;

        const wingFlap = Math.sin(bat.wingTimer) * 8;
        ctx.fillStyle = "rgba(10, 5, 18, 0.85)";
        ctx.beginPath();
        // Silhueta de morcego
        ctx.moveTo(bat.x, bat.y);
        ctx.quadraticCurveTo(bat.x - 12, bat.y - wingFlap, bat.x - 22, bat.y - 4);
        ctx.quadraticCurveTo(bat.x - 10, bat.y + 4, bat.x, bat.y + 2);
        ctx.quadraticCurveTo(bat.x + 10, bat.y + 4, bat.x + 22, bat.y - 4);
        ctx.quadraticCurveTo(bat.x + 12, bat.y - wingFlap, bat.x, bat.y);
        ctx.fill();

        if (bat.x > width + 80) {
          bat.active = false;
        }
      }

      requestAnimationFrame(render);
    }

    render();
  }
});
