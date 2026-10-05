// Cenas do portal — avatares 3D (instrutora JL) ilustrando cada situação.
// Cada cena é uma imagem gerada + legenda flutuante; as descrições ficam no corpo da aula.
(function () {
  const SCENES = {
    'fire-flames': { alt: 'Instrutora aponta para um princípio de incêndio em uma sala', chip: '🔺 Triângulo do fogo: combustível • oxigênio • calor' },
    'extinguisher': { alt: 'Instrutora usando extintor em um princípio de incêndio', chip: 'P.A.S.S.: puxe • aponte à base • comprima • varra' },
    'evacuate': { alt: 'Instrutora rastejando sob a fumaça em direção à saída', chip: 'Rasteje sob a fumaça • não use elevadores • ☎ 193' },
    'epi-figure': { alt: 'Instrutora vestindo todos os EPIs', chip: '🪖 Capacete • 🥽 óculos • 🧤 luvas • 🥾 botas (CA ✓)' },
    'epi-duties': { alt: 'Instrutora com checklist de EPIs', chip: 'EPI: gratuito, obrigatório e substituído se danificado' },
    'bleed-pressure': { alt: 'Instrutora fazendo pressão direta em um ferimento', chip: '1️⃣ Pressione firme 2️⃣ Eleve o membro 3️⃣ 10 min sem espiar' },
    'bleed-shock': { alt: 'Vítima deitada em choque enquanto a instrutora liga 192', chip: 'Palidez + suor frio + pulso fraco → SAMU 192' },
    'choke-signs': { alt: 'Pessoa engasgada com as mãos no pescoço', chip: 'Não fala, não tosse, mãos no pescoço → AJA JÁ' },
    'choke-heimlich': { alt: 'Instrutora aplicando a manobra de Heimlich', chip: 'Punho 2 dedos acima do umbigo • compressões ↑ e p/ dentro' },
    'choke-baby': { alt: 'Instrutora realizando manobra em bebê engasgado', chip: 'Bebê: cabeça mais baixa • 5 pancadas + 5 compressões' },
    'cpr-check': { alt: 'Instrutora avaliando vítima caída', chip: 'Não responde + não respira normal → chame 192' },
    'cpr-compress': { alt: 'Instrutora realizando compressões torácicas', chip: 'Centro do peito • 100–120/min • 5–6 cm • deixe o peito voltar' },
    'cpr-aed': { alt: 'Instrutora usando DEA com pás no peito da vítima', chip: 'Ligue o DEA e siga a voz • AFASTEM-SE!' },
    'burn-stop': { alt: 'Instrutora apagando o fogo no corpo com uma manta', chip: 'PARE • DEITE • ROLE — nunca corra com roupas em chamas' },
    'burn-water': { alt: 'Braço queimado sob água corrente', chip: 'Água corrente 10–20 min ✔ • gelo/pasta/café ✘' },
    'burn-severity': { alt: 'Diagrama dos graus de queimadura', chip: 'Não estoure bolhas • rosto, mãos e crianças → médico' },
    'fall-assess': { alt: 'Vítima caída ao pé de uma escada', chip: 'Queda de altura: suspeite de coluna • NÃO mova' },
    'fracture-splint': { alt: 'Instrutora imobilizando perna fraturada com tala', chip: 'Imobilize como está • gelo em pano • não endireite' },
    'fracture-open': { alt: 'Fratura exposta coberta enquanto se chama o SAMU', chip: 'Fratura exposta: cubra, não pressione o osso • 192' },
    'shock-danger': { alt: 'Pessoa sofrendo choque elétrico com alerta de não tocar', chip: 'Com a corrente ligada, você vira a 2ª vítima: NÃO TOQUE' },
    'shock-breaker': { alt: 'Instrutora desligando o disjuntor', chip: '1º desligue a energia • 2º afaste o fio com material SECO' },
    'shock-assess': { alt: 'Vítima de choque avaliada com monitor cardíaco', chip: 'Mesmo parecendo bem: avaliação médica (arritmias)' },
    'samu-phone': { alt: 'Instrutora ligando para o SAMU 192', chip: '🚑 SAMU 192 • 24h • grátis' },
    'samu-avc': { alt: 'Instrutora identificando sinais de AVC', chip: 'AVC: S-orria • A-brace • R-epita → U-RGENTE 192' },
    'samu-call': { alt: 'Instrutora orientando a chegada da ambulância', chip: 'Endereço + referência • não desligue primeiro' }
  };

  window.getScene = function (id) {
    const meta = SCENES[id] || SCENES['samu-phone'];
    return `<div class="scene-wrap">
      <img class="scene-img" src="assets/scenes/${id}.jpg" alt="${meta.alt}" draggable="false">
      <div class="scene-chip">${meta.chip}</div>
    </div>`;
  };
})();
