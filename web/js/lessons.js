// Conteúdo dos módulos de treinamento — Portal JL Consultoria
// Cada módulo: passos com cena animada (scenes.js) + quiz final (75% para aprovar).
window.LESSONS = [
  {
    id: 'incendio',
    icon: '🔥',
    title: 'Princípio de Incêndio',
    category: 'Segurança do Trabalho',
    color: '#e8590c',
    steps: [
      { scene: 'fire-flames', title: 'O que é um princípio de incêndio', text: 'É o início do fogo, quando ele ainda é pequeno e pode ser controlado. Para o fogo existir, é preciso o "triângulo do fogo": combustível (o que queima), comburente (oxigênio) e calor. Retirando um dos três, o fogo se apaga.' },
      { scene: 'fire-flames', title: 'Classes de fogo', text: 'Classe A: sólidos (papel, madeira, tecido). Classe B: líquidos inflamáveis (gasolina, álcool, tintas). Classe C: equipamentos elétricos energizados. Classe D: metais (magnésio, sódio). Classe K: óleos e gorduras de cozinha. Use o extintor certo para cada classe!' },
      { scene: 'extinguisher', title: 'Como usar o extintor', text: 'Lembre do PASS: Puxe o pino de segurança. Aponte a mangueira para a BASE do fogo. Comprima o gatilho. Varra o jato de um lado para o outro. Mantenha distância segura e fique de costas para uma rota de fuga. NUNCA use extintor de água em fogo classe B ou C (eletricidade).' },
      { scene: 'evacuate', title: 'Quando evacuar', text: 'Se o fogo sair do controle, não seja herói: evacue imediatamente. Acione o alarme, feche as portas atrás de você (sem trancar), NÃO use elevadores e agache-se sob a fumaça — o ar limpo fica perto do chão. Do lado de fora, chame os Bombeiros pelo 193 e vá ao ponto de encontro.' }
    ],
    quiz: [
      { q: 'Quais são os três elementos do "triângulo do fogo"?', options: ['Combustível, oxigênio e calor', 'Fumaça, papel e faísca', 'Água, vento e madeira', 'Gás, luz e metal'], answer: 0, explain: 'O fogo precisa de combustível, comburente (oxigênio) e calor. Eliminando qualquer um deles, o fogo se apaga.' },
      { q: 'Em um equipamento elétrico energizado em chamas (classe C), qual extintor NUNCA deve ser usado?', options: ['Extintor de CO₂', 'Extintor de água', 'Pó químico ABC', 'Qualquer extintor serve'], answer: 1, explain: 'Água conduz eletricidade e pode causar choque grave. Em classe C use CO₂ ou pó químico.' },
      { q: 'Qual é a ordem correta do método PASS para usar o extintor?', options: ['Apontar, puxar, sacudir, soltar', 'Puxar o pino, apontar para a base do fogo, comprimir o gatilho, varrer o jato', 'Correr, avisar, sair, socorrer', 'Puxar a mangueira, apontar para o topo do fogo, esperar, voltar'], answer: 1, explain: 'PASS: Puxe o pino, Aponte para a base do fogo, Comprima o gatilho e Varra o jato lateralmente.' },
      { q: 'Durante uma evacuação com fumaça, o que você deve fazer?', options: ['Usar o elevador para descer mais rápido', 'Correr em pé respirando fundo', 'Agachar-se ou rastejar, pois o ar mais limpo fica perto do chão', 'Abrir todas as janelas e esperar socorro'], answer: 2, explain: 'A fumaça e o ar quente sobem. Rasteje até a saída, nunca use elevadores e acione os Bombeiros (193).' }
    ]
  },
  {
    id: 'nr6',
    icon: '🦺',
    title: 'NR6 — Equipamentos de Proteção Individual',
    category: 'Segurança do Trabalho',
    color: '#f08c00',
    steps: [
      { scene: 'epi-figure', title: 'O que é a NR6', text: 'A Norma Regulamentadora nº 6 define as regras sobre Equipamentos de Proteção Individual (EPI). EPI é todo dispositivo de uso individual destinado a proteger a saúde e a integridade física do trabalhador. Todo EPI deve ter Certificado de Aprovação (CA) do Ministério do Trabalho.' },
      { scene: 'epi-figure', title: 'Principais EPIs', text: 'Proteção da cabeça: capacete. Olhos e face: óculos e protetor facial. Auditiva: protetor auricular ou abafador. Respiratória: máscaras e respiradores. Mãos: luvas adequadas a cada risco. Pés: botas e calçados de segurança. Contra quedas: cinto de segurança com talabarte.' },
      { scene: 'epi-duties', title: 'Deveres da empresa', text: 'A empresa é obrigada a: fornecer o EPI adequado ao risco, gratuitamente e em perfeito estado de conservação; exigir seu uso; orientar e treinar o trabalhador sobre o uso correto; substituir o EPI danificado ou extraviado; e responsabilizar-se pela higienização e manutenção periódica.' },
      { scene: 'epi-duties', title: 'Deveres do trabalhador', text: 'O empregado deve: usar o EPI apenas para a finalidade a que se destina; guardar e conservar o equipamento; comunicar à empresa qualquer dano ou extravio; e cumprir as orientações de uso. Usar EPI não é opcional — é proteção para você e obrigação por lei.' }
    ],
    quiz: [
      { q: 'O que significa a sigla EPI?', options: ['Equipamento de Produção Industrial', 'Equipamento de Proteção Individual', 'Exame Periódico Interno', 'Emergência e Prevenção de Incêndio'], answer: 1, explain: 'EPI é o Equipamento de Proteção Individual, usado para proteger a saúde e a integridade física do trabalhador.' },
      { q: 'Todo EPI comercializado e utilizado deve ter:', options: ['Etiqueta com o preço', 'Certificado de Aprovação (CA)', 'Cor laranja obrigatoriamente', 'Manual apenas em inglês'], answer: 1, explain: 'O CA (Certificado de Aprovação) do Ministério do Trabalho garante que o equipamento foi testado e aprovado.' },
      { q: 'Qual das opções é um dever da EMPRESA segundo a NR6?', options: ['Comprar o próprio EPI com desconto', 'Usar o EPI fora do horário de trabalho', 'Fornecer o EPI adequado ao risco, gratuitamente e em perfeito estado', 'Fabricar o EPI internamente'], answer: 2, explain: 'A empresa deve fornecer gratuitamente o EPI adequado, exigir o uso, treinar e substituir equipamentos danificados.' },
      { q: 'Se o seu EPI for danificado durante o trabalho, o que fazer?', options: ['Continuar usando com cuidado', 'Jogar fora e trabalhar sem', 'Comunicar a empresa para substituição', 'Consertar com fita adesiva'], answer: 2, explain: 'EPI danificado não protege. Comunique imediatamente para a empresa providenciar a substituição.' }
    ]
  },
  {
    id: 'cortes',
    icon: '🩹',
    title: 'Cortes e Sangramentos',
    category: 'Primeiros Socorros',
    color: '#c92a2a',
    steps: [
      { scene: 'bleed-pressure', title: 'Antes de socorrer', text: 'Garanta sua segurança primeiro. Se possível, use luvas (ou um saco plástico limpo) para evitar contato com o sangue. Avalie a gravidade: sangramento leve ou grave? A vítima está consciente? Em sangramentos graves, chame o SAMU (192) imediatamente.' },
      { scene: 'bleed-pressure', title: 'Pressão direta', text: 'A medida mais importante é a pressão direta: comprima o ferimento com um pano limpo ou gaze, com firmeza, por pelo menos 10 minutos sem ficar espiando. Se possível, eleve o membro ferido acima do nível do coração para reduzir o sangramento.' },
      { scene: 'bleed-pressure', title: 'Curativo', text: 'Quando o sangramento diminuir, fixe um curativo com o pano ou gaze. IMPORTANTE: se o pano encharcar de sangue, NÃO o remova — coloque outro por cima e mantenha a pressão. Se houver objeto encravado (faca, vidro, ferro), NÃO retire: fixe o objeto com curativos ao redor e aguarde o socorro.' },
      { scene: 'bleed-shock', title: 'Sinais de gravidade', text: 'Chame o SAMU (192) se: o sangue jorrar em pulsos (arterial), o sangramento não parar após 10 minutos de pressão, a ferida for profunda ou no pescoço/tórax/abdômen, ou a vítima apresentar palidez, suor frio, tontura e pulsação fraca (sinais de choque). Mantenha a vítima deitada e aquecida.' }
    ],
    quiz: [
      { q: 'Qual é a primeira medida para controlar um sangramento?', options: ['Aplicar pó de café', 'Fazer pressão direta sobre o ferimento com pano limpo', 'Lavar com água quente', 'Torniquete imediato sempre'], answer: 1, explain: 'A pressão direta com pano limpo ou gaze é a medida mais eficaz e deve ser mantida por ~10 minutos.' },
      { q: 'O pano do curativo encharcou de sangue. O que fazer?', options: ['Retirar o pano e colocar um novo', 'Lavar o ferimento e recomeçar', 'Colocar outro pano por cima e manter a pressão', 'Remover tudo e elevar o membro'], answer: 2, explain: 'Nunca remova o pano encharcado — ele ajuda na coagulação. Coloque outro por cima e mantenha a pressão.' },
      { q: 'Há um objeto encravado no ferimento (ex.: um pedaço de vidro). Você deve:', options: ['Retirar o objeto com cuidado', 'Retirar o objeto e fazer pressão', 'NÃO retirar — fixar o objeto com curativos ao redor e chamar socorro', 'Empurrar o objeto para dentro'], answer: 2, explain: 'Retirar o objeto pode agravar a hemorragia. Imobilize-o com curativos ao redor e aguarde o SAMU.' },
      { q: 'Qual sinal indica sangramento arterial (muito grave)?', options: ['Sangue escorrendo devagar', 'Sangue vermelho escuro saindo sem pressão', 'Sangue vermelho vivo jorrando em pulsos', 'Apenas um arranhão que sangra pouco'], answer: 2, explain: 'Sangue vivo jorrando em pulsos indica lesão arterial: pressão firme imediata e SAMU 192.' }
    ]
  },
  {
    id: 'engasgo',
    icon: '🫁',
    title: 'Engasgo',
    category: 'Primeiros Socorros',
    color: '#1971c2',
    steps: [
      { scene: 'choke-signs', title: 'Reconhecendo o engasgo', text: 'A vítima leva as mãos ao pescoço, não consegue falar, tossir ou respirar; os lábios podem ficar azulados. Pergunte: "Você está engasgado?". Se a pessoa tosse com força, incentive-a a continuar tossindo — a tosse é o melhor remédio. Se ela NÃO consegue tossir nem falar, aja imediatamente.' },
      { scene: 'choke-heimlich', title: 'Pancadas nas costas', text: 'Peça para alguém chamar o SAMU (192). Incline a vítima para frente e aplique 5 pancadas firmes com a base da mão entre as omoplatas (no meio das costas), verificando se o objeto saiu após cada pancada.' },
      { scene: 'choke-heimlich', title: 'Manobra de Heimlich', text: 'Posicione-se atrás da vítima. Feche uma mão em punho e coloque-a dois dedos acima do umbigo. Segure o punho com a outra mão e faça compressões rápidas para dentro e para cima, como um "J". Repita até o objeto sair. Em gestantes e pessoas obesas, as compressões são no meio do peito (esterno), não no abdômen.' },
      { scene: 'choke-baby', title: 'Bebês e desmaio', text: 'Bebê menor de 1 ano: deite-o de bruços sobre seu antebraço, com a cabeça mais baixa que o corpo, e dê 5 pancadas leves entre as omoplatas; vire de barriga para cima e faça 5 compressões no peito com dois dedos. Alterne até desengasgar. Se a vítima desmaiar em qualquer idade: deite-a no chão e inicie RCP, chamando o SAMU (192).' }
    ],
    quiz: [
      { q: 'A vítima engasgada consegue tossir com força. O que fazer?', options: ['Manobra de Heimlich imediatamente', 'Incentivar a tosse e observar', 'Dar água para beber', 'Colocar o dedo na garganta'], answer: 1, explain: 'Se a tosse é eficaz, ela é o melhor mecanismo de desobstrução. Incentive a tossir e fique atento; nunca enfie o dedo às cegas.' },
      { q: 'Onde posicionar o punho na manobra de Heimlich em adultos?', options: ['No meio do peito', 'Dois dedos acima do umbigo', 'Na altura do estômago, abaixo das costelas, na linha central', 'No pescoço'], answer: 2, explain: 'O punho vai na linha média do abdômen, acima do umbigo e abaixo do esterno, com compressões para dentro e para cima.' },
      { q: 'Em gestantes e pessoas obesas, as compressões devem ser feitas:', options: ['No abdômen, mais forte', 'No meio do peito (esterno)', 'Nas costas apenas', 'Não se deve fazer Heimlich'], answer: 1, explain: 'Nesses casos, as compressões torácicas no meio do peito substituem as abdominais.' },
      { q: 'A vítima de engasgo desmaiou. Qual é o próximo passo?', options: ['Sentá-la em uma cadeira', 'Dar tapinhas no rosto e esperar', 'Deitá-la no chão, iniciar RCP e chamar o SAMU 192', 'Colocá-la de pé com apoio'], answer: 2, explain: 'Vítima inconsciente por engasgo recebe RCP: compressões torácicas, chamando o 192 e usando o DEA se disponível.' }
    ]
  },
  {
    id: 'rcp',
    icon: '❤️',
    title: 'Parada Cardiorrespiratória (RCP)',
    category: 'Primeiros Socorros',
    color: '#d6336c',
    steps: [
      { scene: 'cpr-check', title: 'Avaliação inicial', text: 'Verifique se o local é seguro. Toque nos ombros da vítima e chame em voz alta: "Você está bem?". Se ela não responde e não respira normalmente (ou apenas gaspa), é uma parada cardiorrespiratória. Aponte para alguém específico: "Você! Ligue 192 (SAMU) e traga o DEA!".' },
      { scene: 'cpr-compress', title: 'Compressões torácicas', text: 'Deite a vítima de barriga para cima em superfície rígida. Ajoelhe-se ao lado e posicione a base de uma mão no centro do peito (entre os mamilos), a outra mão por cima, dedos entrelaçados. Braços esticados, comprima forte e rápido: 5 a 6 cm de profundidade, 100 a 120 compressões por minuto. Deixe o peito voltar completamente entre as compressões.' },
      { scene: 'cpr-aed', title: 'Usando o DEA', text: 'O DEA (Desfibrilador Externo Automático) salva vidas e qualquer pessoa pode usar. Ligue o aparelho e siga as instruções de voz: cole as pás no peito nu (uma abaixo da clavícula direita, outra na lateral esquerda), afaste-se durante a análise e, se indicado, afaste todos antes do choque. Seque a pele molhada e evite colar as pás sobre marca-passo.' },
      { scene: 'cpr-compress', title: 'Até quando continuar', text: 'Continue as compressões sem interrupção até: o SAMU chegar e assumir, a vítima reagir (respirar normalmente, mexer-se), ou você estar exausto a ponto de não conseguir (revez-se com outra pessoa se possível). RCP de qualidade dobra ou triplica as chances de sobrevivência. Cada minuto sem compressões reduz ~10% a chance de vida.' }
    ],
    quiz: [
      { q: 'Qual é o ritmo e a profundidade corretos das compressões em adultos?', options: ['60 compressões/min, 2 cm', '100 a 120 compressões/min, 5 a 6 cm', '200 compressões/min, 1 cm', '50 compressões/min, 8 cm'], answer: 1, explain: 'Comprima forte e rápido: 100–120 por minuto, afundando o peito 5 a 6 cm e permitindo o retorno total.' },
      { q: 'Você encontra uma pessoa inconsciente que não respira normalmente. Primeiro você deve:', options: ['Fazer respiração boca a boca', 'Dar água com açúcar', 'Chamar o SAMU (192) e pedir o DEA, e iniciar compressões torácicas', 'Colocá-la sentada'], answer: 2, explain: 'Acione o socorro (192), peça o DEA e comece as compressões imediatamente — não espere.' },
      { q: 'Ao usar o DEA, no momento do choque você deve:', options: ['Segurar a vítima firmemente', 'Afastar-se e garantir que ninguém toque na vítima', 'Continuar as compressões durante o choque', 'Desligar o DEA'], answer: 1, explain: 'Todos devem se afastar durante a análise e o choque. Depois, retome as compressões imediatamente.' },
      { q: 'Até quando você deve continuar a RCP?', options: ['Por 5 minutos no máximo', 'Até o SAMU assumir, a vítima reagir ou você estar exausto sem substituto', 'Até a vítima acordar tossindo apenas', 'Até chegar um médico conhecido'], answer: 1, explain: 'Não pare até o socorro assumir, a vítima dar sinais de vida, ou exaustão total sem quem reveze.' }
    ]
  },
  {
    id: 'queimaduras',
    icon: '🧯',
    title: 'Queimaduras',
    category: 'Primeiros Socorros',
    color: '#e8590c',
    steps: [
      { scene: 'burn-stop', title: 'Interrompa a queimadura', text: 'Afaste a vítima da fonte de calor com segurança. Se as roupas estiverem em chamas, faça a vítima PARAR, DEITAR e ROLAR no chão, ou abafe com um coberto. Nunca deixe a pessoa correr. Remova roupas soltas e acessórios (anéis, pulseiras) da área próxima — antes de inchar. NÃO remova tecido grudado na pele.' },
      { scene: 'burn-water', title: 'Resfrie com água corrente', text: 'Coloque a área queimada sob água corrente em temperatura ambiente por 10 a 20 minutos. A água interrompe a lesão e alivia a dor. NÃO use gelo, água gelada, pasta de dente, manteiga, pó de café ou qualquer "receita caseira" — isso agrava a lesão e causa infecção.' },
      { scene: 'burn-water', title: 'Cubra a queimadura', text: 'Depois de resfriar, cubra com um pano limpo, gaze ou compressa estéril, sem apertar. NÃO estoure bolhas — elas são a proteção natural contra infecções. Não passe pomadas sem orientação médica em queimaduras graves.' },
      { scene: 'burn-severity', title: 'Quando procurar socorro', text: 'Chame o SAMU (192) ou vá ao pronto-socorro em queimaduras: de 3º grau (pele esbranquiçada ou carbonizada, indolor), de 2º grau maiores que a palma da mão, em rosto, pescoço, mãos, pés, genitais ou articulações, em crianças e idosos, por produtos químicos ou eletricidade, e sempre que houver suspeita de inalação de fumaça. Queimaduras elétricas sempre precisam de avaliação médica.' }
    ],
    quiz: [
      { q: 'Qual é a primeira medida em uma queimadura térmica?', options: ['Passar pasta de dente', 'Colocar gelo direto na pele', 'Resfriar com água corrente por 10 a 20 minutos', 'Estourar as bolhas'], answer: 2, explain: 'Água corrente em temperatura ambiente por 10–20 minutos. Gelo e produtos caseiros agravam a lesão.' },
      { q: 'As roupas da vítima estão em chamas. O que ela deve fazer?', options: ['Correr para o ar livre', 'Parar, deitar no chão e rolar, ou ser abafada com um cobertor', 'Tirar a roupa correndo', 'Entrar em um carro'], answer: 1, explain: 'Correr alimenta as chamas com oxigênio. Pare, deite e role, ou abafe o fogo com um coberto.' },
      { q: 'Sobre as bolhas de uma queimadura de 2º grau:', options: ['Devem ser estouradas para aliviar', 'Devem ser furadas com agulha quente', 'NUNCA devem ser estouradas — protegem contra infecção', 'Devem ser cobertas com álcool'], answer: 2, explain: 'As bolhas são uma barreira estéril natural. Estourá-las abre porta para infecções.' },
      { q: 'Qual queimadura exige atendimento médico sempre?', options: ['Queimadura elétrica', 'Queimadura leve de sol', 'Pequeno contato com panela quente no dedo', 'Vermelhidão passageira'], answer: 0, explain: 'Queimaduras elétricas podem causar lesões internas e arritmias — sempre avalie com médico, além das químicas e de 3º grau.' }
    ]
  },
  {
    id: 'fraturas',
    icon: '🤕',
    title: 'Quedas e Fraturas',
    category: 'Primeiros Socorros',
    color: '#6741d9',
    steps: [
      { scene: 'fall-assess', title: 'Não mova a vítima', text: 'Em quedas de altura, atropelamentos ou acidentes com impacto na cabeça/costas, suspeite de lesão na coluna: NÃO mova a vítima, a menos que haja perigo imediato (fogo, trânsito). Mantenha a cabeça e o pescoço alinhados e imóveis. Chame o SAMU (192). Verifique se está consciente e respirando.' },
      { scene: 'fall-assess', title: 'Reconhecendo a fratura', text: 'Sinais de fratura: dor intensa que piora ao movimento, inchaço, deformidade visível, incapacidade de mover o membro e, em fraturas expostas, o osso visível pela pele. Na dúvida, trate como fratura.' },
      { scene: 'fracture-splint', title: 'Imobilização', text: 'Imobilize o membro na posição em que foi encontrado, usando talas improvisadas (papelão, madeira, revista dobrada) com tiras de pano — sem apertar demais. NÃO tente colocar o osso no lugar nem endireitar o membro. Aplique gelo envolto em pano por até 20 minutos para reduzir dor e inchaço.' },
      { scene: 'fracture-open', title: 'Fratura exposta e cuidados gerais', text: 'Em fratura exposta: cubra com curativo estéril ou pano limpo, controle o sangramento ao redor SEM pressionar o osso, e chame o SAMU imediatamente. Não ofereça água ou comida à vítima — ela pode precisar de anestesia no hospital. Mantenha-a deitada, aquecida e calma até o socorro chegar.' }
    ],
    quiz: [
      { q: 'Após uma queda de altura, a vítima está consciente mas reclama de dor nas costas. Você deve:', options: ['Levantá-la com cuidado', 'Mantê-la imóvel, com cabeça e pescoço alinhados, e chamar o SAMU', 'Fazê-la caminhar até a ambulância', 'Sentá-la em uma cadeira'], answer: 1, explain: 'Suspeita de lesão de coluna: imobilize, não mova a vítima e acione o 192.' },
      { q: 'Em uma fratura de perna fechada, o que fazer enquanto espera o socorro?', options: ['Endireitar o osso com cuidado', 'Massagem vigorosa no local', 'Imobilizar o membro na posição encontrada e aplicar gelo envolto em pano', 'Colocar a vítima para caminhar devagar'], answer: 2, explain: 'Imobilize sem tentar alinhar o osso e use gelo (envolto em pano) para dor e inchaço.' },
      { q: 'Por que não oferecer água ou comida a uma vítima de fratura grave?', options: ['Porque piora a dor', 'Porque ela pode precisar de anestesia/cirurgia no hospital', 'Porque a água inflama o osso', 'Não há problema em oferecer água'], answer: 1, explain: 'Estômago cheio impede anestesia segura. Mantenha a vítima em jejum.' },
      { q: 'Em uma fratura exposta (osso visível), você deve:', options: ['Empurrar o osso para dentro', 'Lavar com água oxigenada e esfregar', 'Cobrir com curativo limpo, controlar o sangramento ao redor sem pressionar o osso e chamar o SAMU', 'Aplicar torniquete sempre'], answer: 2, explain: 'Cubra, não pressione o osso, não tente recolocá-lo e acione o socorro imediatamente.' }
    ]
  },
  {
    id: 'choque',
    icon: '⚡',
    title: 'Choque Elétrico',
    category: 'Primeiros Socorros',
    color: '#f59f00',
    steps: [
      { scene: 'shock-danger', title: 'Não toque na vítima!', text: 'A cena é perigosa: se a vítima ainda está em contato com a fonte elétrica, você pode se tornar a segunda vítima. NUNCA toque nela com as mãos. Avalie: de onde vem a corrente? Há fios caídos? O chão está molhado?' },
      { scene: 'shock-breaker', title: 'Corte a energia', text: 'Desligue o disjuntor ou tire o aparelho da tomada. Se não for possível desligar, afaste o fio ou o aparelho da vítima usando material isolante e SECO: cabo de vassoura de madeira, plástico, borracha. Em alta tensão (postes, subestações), não se aproxime — afaste todos e chame os Bombeiros (193) e a concessionária de energia.' },
      { scene: 'shock-assess', title: 'Avalie a vítima', text: 'Com a energia cortada, avalie: ela responde? Respira normalmente? Se NÃO responde e NÃO respira, inicie RCP imediatamente e peça o DEA — o choque elétrico frequentemente causa parada cardíaca. Chame o SAMU (192).' },
      { scene: 'shock-assess', title: 'Sempre procure atendimento', text: 'Mesmo que a vítima pareça bem, TODO choque elétrico exige avaliação médica: a corrente pode causar arritmias cardíacas horas depois e lesões internas invisíveis. Cubra as queimaduras de entrada e saída da corrente com curativo limpo. Mantenha a vítima deitada e acompanhada até a liberação médica.' }
    ],
    quiz: [
      { q: 'Você vê uma pessoa em contato com um fio elétrico energizado. Sua primeira ação é:', options: ['Puxá-la pelo braço rapidamente', 'Cortar a energia (disjuntor/tomada) ou afastar o fio com material isolante seco', 'Jogar água para apagar o fogo', 'Tocar nela com luva de pano'], answer: 1, explain: 'Nunca toque na vítima enquanto houver corrente. Desligue a energia ou use material isolante seco (madeira, borracha).' },
      { q: 'Após cortar a energia, a vítima não responde e não respira. O que fazer?', options: ['Esperar ela acordar', 'Dar água com açúcar', 'Iniciar RCP imediatamente e chamar o SAMU/DEA', 'Levantá-la e fazê-la andar'], answer: 2, explain: 'Choque elétrico costuma causar parada cardíaca: RCP imediata e socorro (192) com DEA.' },
      { q: 'A vítima levou um choque leve, mas está consciente e se sentindo bem. Você deve:', options: ['Liberá-la para o trabalho normal', 'Orientar avaliação médica mesmo assim — podem surgir arritmias horas depois', 'Dar um calmante e esperar', 'Fazer exercícios com ela'], answer: 1, explain: 'Toda vítima de choque elétrico precisa de avaliação médica pelos riscos cardíacos tardios.' },
      { q: 'Acidente com fio de alta tensão caído (poste/rua). O correto é:', options: ['Afastar o fio com um galho', 'Não se aproximar, afastar curiosos e chamar Bombeiros (193) e a concessionária', 'Pisar no fio para isolá-lo', 'Retirar a vítima imediatamente'], answer: 1, explain: 'Alta tensão cria zona de risco no solo. Isole a área e acione profissionais especializados.' }
    ]
  },
  {
    id: 'samu',
    icon: '🚑',
    title: 'Quando Chamar o SAMU — 192',
    category: 'Primeiros Socorros',
    color: '#0ca678',
    steps: [
      { scene: 'samu-phone', title: 'O que é o SAMU', text: 'O SAMU (Serviço de Atendimento Móvel de Urgência) é gratuito, funciona 24 horas por dia, e o telefone é 192. A ligação é atendida por profissionais que orientam o socorro e enviam a ambulância certa para cada caso — básica ou UTI móvel.' },
      { scene: 'samu-phone', title: 'Quando chamar', text: 'Chame o 192 em: parada cardiorrespiratória, dor no peito intensa, dificuldade respiratória, desmaio/perda de consciência, sangramento grave, queimaduras graves, fraturas, choque elétrico, afogamento, intoxicações e envenenamentos, trabalho de parto com risco, e suspeita de AVC.' },
      { scene: 'samu-avc', title: 'Reconhecendo o AVC', text: 'Use a escala SAMU para identificar o AVC (derrame): S — Sorria: peça para sorrir e veja se um lado do rosto não se move. A — Abrace: peça para levantar os dois braços e veja se um não sobe. R — Repita: peça para repetir uma frase e veja se fala enrolada. U — URGENTE: identificou qualquer um? Chame o 192 na hora! Tempo é cérebro: cada minuto conta.' },
      { scene: 'samu-call', title: 'Como fazer a ligação perfeita', text: 'Mantenha a calma e informe: endereço completo com pontos de referência, o que aconteceu, estado da vítima (consciente? respira?), quantidade de vítimas e um telefone de contato. Responda todas as perguntas do atendente e NÃO desligue primeiro — ele encerra a chamada. Se possível, envie alguém para orientar a ambulância na chegada.' }
    ],
    quiz: [
      { q: 'Qual é o telefone do SAMU?', options: ['190', '191', '192', '193'], answer: 2, explain: 'SAMU é 192. Bombeiros é 193, Polícia Militar 190 e Polícia Rodoviária Federal 191.' },
      { q: 'Na escala "SAMU" para detectar AVC, o "S" significa:', options: ['Sangue', 'Sorria — observe se um lado do rosto não se move', 'Sentar', 'Silêncio'], answer: 1, explain: 'S de Sorria (rosto), A de Abrace (braços), R de Repita (fala), U de Urgente (chame o 192).' },
      { q: 'Durante a ligação ao 192, você deve:', options: ['Desligar rapidamente para não gastar crédito', 'Responder às perguntas, dar o endereço com referência e não desligar antes do atendente', 'Passar o telefone para a vítima sempre', 'Gritar o endereço e desligar'], answer: 1, explain: 'O atendente precisa das informações para enviar o recurso certo; ele encerra a ligação, não você.' },
      { q: 'O SAMU deve ser chamado para qual situação?', options: ['Dor de cabeça leve há dias', 'Resfriado comum', 'Parada cardiorrespiratória, dor no peito intensa ou sangramento grave', 'Consulta de rotina'], answer: 2, explain: 'O 192 é para urgências e emergências. Casos não urgentes devem ir às unidades de saúde.' }
    ]
  },
  {
    id: 'nr35',
    icon: '🧗',
    title: 'NR-35 — Trabalho em Altura',
    category: 'Normas Regulamentadoras',
    color: '#1971c2',
    steps: [
      { scene: 'height-harness', title: 'O que é trabalho em altura', text: 'Para a NR-35, trabalho em altura é toda atividade executada ACIMA de 2,00 m do nível inferior, onde haja risco de queda. Só pode executar quem é maior de 18 anos, com ASO apto, treinamento válido e AUTORIZAÇÃO formal da empresa. Antes de subir, exige-se Análise de Risco (AR) e, nas atividades não rotineiras, Permissão de Trabalho (PT).' },
      { scene: 'height-harness', title: 'Condições impeditivas', text: 'NÃO trabalhe em altura se: houver vento forte, chuva ou descarga elétrica; faltar AR/PT aprovada; você estiver sem autorização ou treinamento vencido; houver sinais de cansaço, febre, uso de medicamento que cause sonolência ou alteração emocional. Qualquer condição impeditiva deve ser comunicada ao supervisor ANTES de iniciar — e você tem o direito de recusa.' },
      { scene: 'height-anchor', title: 'Proteção contra quedas (SPCQ)', text: 'Priorize a proteção COLETIVA: guarda-corpos, rodapés, telas e plataformas. Quando não for possível, use o Sistema de Proteção Contra Quedas: cinto tipo paraquedista, talabarte DUPLO com absorvedor de energia, trava-quedas em linha de vida e ponto de ancoragem certificado (resistência mínima de 15 kN). Ancore ACIMA da cabeça e nunca se conecte em ponto improvisado.' },
      { scene: 'height-rescue', title: 'Emergência e resgate', text: 'Toda atividade em altura exige PLANO DE RESGATE: quem resgata, com qual equipamento e em quanto tempo. Trabalhador suspenso no cinto por muito tempo pode desenvolver a síndrome do arnês (suspensão inerte) — o resgate deve ser rápido e a vítima avaliada por serviço médico. Em queda com lesão, não mova a vítima (suspeite de coluna), imobilize e chame o SAMU 192.' }
    ],
    quiz: [
      { q: 'Para a NR-35, é trabalho em altura a atividade executada acima de:', options: ['1,00 m', '1,50 m', '2,00 m do nível inferior, com risco de queda', '3,00 m apenas em telhados'], answer: 2, explain: 'A NR-35 considera trabalho em altura toda atividade acima de 2,00 m do nível inferior onde haja risco de queda.' },
      { q: 'Qual documento é obrigatório ANTES de iniciar trabalho em altura?', options: ['Ordem de serviço de produção', 'Análise de Risco (e PT nas não rotineiras)', 'Cartão de ponto', 'Laudo de insalubridade apenas'], answer: 1, explain: 'A Análise de Risco é obrigatória antes de iniciar; nas atividades não rotineiras soma-se a Permissão de Trabalho (PT).' },
      { q: 'Qual é a prioridade na proteção contra quedas?', options: ['Cinto de segurança sempre primeiro', 'Proteção coletiva (guarda-corpo, telas, plataformas)', 'Trabalhar mais rápido para ficar menos tempo exposto', 'Usar corda improvisada na estrutura'], answer: 1, explain: 'A hierarquia prioriza proteção coletiva; o SPCQ (cinto, talabarte, trava-quedas, ancoragem) entra quando a coletiva não é possível.' },
      { q: 'Um colega caiu e ficou suspenso no cinto, consciente. Além do resgate rápido, por que a avaliação médica é urgente?', options: ['Por causa da síndrome do arnês (suspensão inerte)', 'Para preencher a CAT depois', 'Porque o cinto estraga', 'Não é necessário avaliar'], answer: 0, explain: 'A suspensão prolongada no cinto pode causar a síndrome do arnês, com risco de vida: resgate rápido e avaliação médica imediata.' }
    ]
  },
  {
    id: 'nr18',
    icon: '🏗️',
    title: 'NR-18 — Segurança na Construção Civil',
    category: 'Normas Regulamentadoras',
    color: '#e67700',
    steps: [
      { scene: 'site-guardrail', title: 'O canteiro e o meio ambiente de trabalho', text: 'A NR-18 organiza o canteiro de obras: áreas de vivência (refeitório, sanitários, vestiário), circulação de pessoas e máquinas, armazenamento de materiais e sinalização de segurança. Antes de começar, você deve conhecer as condições do canteiro, as rotas seguras e os riscos da fase atual da obra.' },
      { scene: 'site-guardrail', title: 'Riscos por fase da obra', text: 'Cada fase tem riscos próprios: escavação (desmoronamento, soterramento), fundação (máquinas, ruído), estrutura (queda de altura, queda de materiais), alvenacia e acabamento (poeira, cortes, trabalho em escadas). O risco muda com o andamento da obra — por isso a análise de risco e o DDS (diálogo diário de segurança) são contínuos.' },
      { scene: 'site-scaffold', title: 'Proteção coletiva na obra', text: 'Priorize EPC: guarda-corpo e rodapé nas bordas, telas de proteção entre pavimentos, escoramento de valas, passarelas e escadas com corrimão, proteção de vãos e aberturas. Andaimes só com piso completo, guardas e acesso seguro; nunca improvise com tábuas soltas ou tambor. O EPC protege todos ao mesmo tempo — por isso vem antes do EPI.' },
      { scene: 'site-ppe', title: 'EPI e emergências na obra', text: 'Use o EPI adequado à tarefa: capacete com jugular, calçado de segurança, luvas, óculos, protetor auricular e, em altura, cinto com talabarte. Saiba onde ficam extintores, rotas de fuga e ponto de encontro; em acidente, isole a área, não mova vítima com suspeita de lesão e chame o SAMU 192 (ou Bombeiros 193 em incêndio). Todo acidente deve ser comunicado à empresa.' }
    ],
    quiz: [
      { q: 'O que a NR-18 organiza principalmente?', options: ['Apenas o pagamento de horas extras', 'As condições e o meio ambiente de trabalho no canteiro de obras', 'Somente o projeto arquitetônico', 'A compra de materiais'], answer: 1, explain: 'A NR-18 trata das condições e meio ambiente de trabalho na construção: áreas de vivência, circulações, proteções e sinalização.' },
      { q: 'Em escavações e valas, o risco típico é:', options: ['Desmoronamento e soterramento', 'Excesso de iluminação', 'Frio intenso', 'Ruído zero'], answer: 0, explain: 'Valas e escavações exigem escoramento e acesso seguro justamente pelo risco de desmoronamento/soterramento.' },
      { q: 'Qual destes é um Equipamento de Proteção COLETIVA?', options: ['Capacete', 'Guarda-corpo com rodapé nas bordas de laje', 'Luva de vaqueta', 'Protetor auricular'], answer: 1, explain: 'Guarda-corpo, telas e escoramentos protegem todos ao mesmo tempo: são EPC. Capacete, luva e protetor são EPI.' },
      { q: 'Antes de usar um andaime, você deve verificar:', options: ['Se tem piso completo, guarda-corpo e acesso seguro', 'Se dá para subir mais rápido por ele', 'Se pode retirar o rodapé para passar material', 'Se está encostado na parede apenas'], answer: 0, explain: 'Andaime seguro tem piso completo, proteção lateral e acesso próprio; improvisos e retiradas de proteção causam quedas.' }
    ]
  },
  {
    id: 'nr12',
    icon: '⚙️',
    title: 'NR-12 — Máquinas e Equipamentos',
    category: 'Normas Regulamentadoras',
    color: '#495057',
    steps: [
      { scene: 'machine-guard', title: 'A máquina e seus riscos', text: 'Toda máquina tem zonas de perigo: pontos de esmagamento, aprisionamento, corte e arraste onde roupas, cabelos e mãos podem ser puxados. Conheça a máquina que você opera: como funciona, onde estão os pontos de risco e quais proteções ela deve ter. Nunca opere máquina sem treinamento e autorização.' },
      { scene: 'machine-guard', title: 'Proteções e dispositivos de segurança', text: 'A NR-12 exige proteções FIXAS (carencagens que exigem ferramenta para remover), MÓVEIS (portas que param a máquina ao abrir) e INTERTRAVAMENTOS (a máquina não liga com a proteção aberta). O botão de emergência (vermelho, fundo amarelo) deve estar acessível e testado. Proteções removidas ou "burladas" são acidente esperando acontecer.' },
      { scene: 'machine-loto', title: 'Trabalho seguro e bloqueio de energias (LOTO)', text: 'Para limpeza, ajuste ou manutenção: desligue, BLOQUEIE e ETIQUETE todas as fontes de energia (elétrica, pneumática, hidráulica, gravitacional) — é o LOTO (Lock Out / Tag Out). Cada trabalhador coloca o SEU cadeado. Só opere com Permissão de Trabalho quando exigido e nunca com a máquina em movimento para limpar ou destravar.' },
      { scene: 'machine-emergency', title: 'Riscos adicionais e emergência', text: 'Máquinas somam riscos: ruído (use protetor), calor, eletricidade e ergonomia (postura e esforço). Em aprisionamento ou acidente: acione a PARADA DE EMERGÊNCIA, desligue a energia, NÃO puxe a vítima pela parte presa e chame socorro (SAMU 192). Em amputação, guarde o segmento em saco limpo, dentro de outro saco com gelo (sem contato direto), e leve com a vítima.' }
    ],
    quiz: [
      { q: 'São zonas de perigo típicas de máquinas:', options: ['Pontos de esmagamento, aprisionamento, corte e arraste', 'Apenas o painel elétrico', 'Somente a base da máquina', 'A área de refeitório'], answer: 0, explain: 'As zonas de perigo concentram esmagamento, aprisionamento, corte e arraste — onde mãos, roupas e cabelos são puxados.' },
      { q: 'O que faz um intertravamento?', options: ['Aumenta a velocidade da máquina', 'Impede o funcionamento com a proteção aberta e para a máquina ao abri-la', 'Desliga a iluminação da área', 'Trava a porta do refeitório'], answer: 1, explain: 'Intertravamento é o dispositivo que não permite ligar (ou para a máquina) quando a proteção móvel está aberta.' },
      { q: 'Antes de limpar ou ajustar uma máquina, o procedimento correto é:', options: ['Fazer rápido com ela ligada', 'Desligar, bloquear e etiquetar as fontes de energia (LOTO)', 'Pedir para um colega segurar a peça', 'Usar pano úmido nas partes móveis'], answer: 1, explain: 'LOTO: desligar, bloquear com cadeado individual e etiquetar todas as energias antes de qualquer intervenção.' },
      { q: 'Em caso de amputação por máquina, o segmento amputado deve:', options: ['Ser lavado em água corrente e descartado', 'Ir em saco limpo, dentro de outro saco com gelo, sem contato direto, junto com a vítima', 'Ser colocado direto no gelo', 'Ficar no local do acidente'], answer: 1, explain: 'O segmento vai em saco limpo e seco, dentro de outro com gelo (sem contato direto), transportado com a vítima ao hospital.' }
    ]
  },
  {
    id: 'nr11',
    icon: '📦',
    title: 'NR-11 — Movimentação e Armazenagem de Materiais',
    category: 'Normas Regulamentadoras',
    color: '#5f3dc4',
    steps: [
      { scene: 'forklift-check', title: 'Movimentação segura de materiais', text: 'A NR-11 regula transporte, movimentação, armazenagem e manuseio de materiais. No transporte manual, o peso deve ser compatível com sua força — nada de carregar o que pode lesionar sua coluna. Empurre em vez de puxar quando possível, mantenha a carga perto do corpo e use equipamentos (carrinhos, paleteiras) para cargas pesadas.' },
      { scene: 'forklift-check', title: 'Estabilidade e capacidade nominal', text: 'Empilhadeiras e equipamentos de elevação têm CAPACIDADE NOMINAL (placa de capacidade): nunca exceda. Entenda o triângulo de estabilidade: carga alta, pesada ou descentralizada desloca o centro de gravidade e TOMBA o equipamento. Mantenha os garfos baixos (15-20 cm do piso) ao circular e a carga inclinada para trás.' },
      { scene: 'forklift-stack', title: 'Checklist e circulação', text: 'Faça a inspeção de pré-operação (checklist): freios, buzina, luzes, pneus, garfos, correntes e vazamentos. Equipamento com defeito é TAGUEADO e não opera. Nas vias internas: velocidade reduzida, buzina em cruzamentos e pontos cegos, pedestre SEMPRE tem preferência, e ninguém circula sob carga suspensa.' },
      { scene: 'forklift-stack', title: 'Empilhamento e cargas especiais', text: 'Empilhe sobre piso nivelado e resistente, respeitando altura máxima e alinhamento; pilhas instáveis devem ser desfeitas com cuidado e sinalização. Cargas especiais (longas, perigosas, suspensas por içamento) exigem plano, sinalização e equipe treinada. Em acidente com prensamento ou queda de carga: isole, não mova a vítima e chame o SAMU 192.' }
    ],
    quiz: [
      { q: 'O que indica a placa de capacidade nominal de uma empilhadeira?', options: ['O peso máximo que pode ser elevado com segurança na configuração indicada', 'O peso do operador', 'A velocidade máxima na rua', 'A quantidade de combustível'], answer: 0, explain: 'A placa informa a carga máxima segura conforme altura e centro de carga; exceder causa tombamento.' },
      { q: 'O "triângulo de estabilidade" explica:', options: ['Por que a empilhadeira tomba com carga alta ou descentralizada', 'Como pintar o piso do armazém', 'O formato dos garfos', 'A ordem do checklist'], answer: 0, explain: 'O centro de gravidade fora do triângulo de estabilidade desequilibra o equipamento e provoca tombamento.' },
      { q: 'Antes de operar, a inspeção de pré-operação deve verificar:', options: ['Somente o nível de combustível', 'Freios, buzina, luzes, pneus, garfos e vazamentos', 'Apenas a cor da máquina', 'Nada, se operou ontem'], answer: 1, explain: 'O checklist diário cobre freios, buzina, iluminação, pneus, garfos, correntes e vazamentos; defeito = equipamento fora de operação.' },
      { q: 'Na circulação interna com empilhadeira:', options: ['O pedestre deve desviar sempre', 'Buzinar em cruzamentos e pontos cegos, com pedestre tendo preferência', 'Circular com garfos elevados para ver melhor', 'Passar sob carga suspensa para ganhar tempo'], answer: 1, explain: 'Velocidade reduzida, buzina em pontos cegos, pedestre com preferência e nunca circular sob carga suspensa.' }
    ]
  },
  {
    id: 'nr20',
    icon: '🛢️',
    title: 'NR-20 — Inflamáveis e Combustíveis',
    category: 'Normas Regulamentadoras',
    color: '#d9480f',
    steps: [
      { scene: 'fuel-station', title: 'Inflamáveis: perigos e riscos', text: 'Líquidos inflamáveis liberam vapores que, misturados ao ar, formam atmosferas explosivas — o vapor (não o líquido) é que pega fogo. Conheça o ponto de fulgor: abaixo dele o líquido não libera vapor suficiente para queimar. Em postos, tanques e áreas de transferência, o risco é invisível: vapor acumulado em pontos baixos e espaços confinados.' },
      { scene: 'fuel-station', title: 'Controles e fontes de ignição', text: 'Controle coletivo primeiro: ventilação, contenção de derrames, aterramento e equipotencialização (evita faísca de eletricidade estática), e classificação de áreas com equipamentos elétricos adequados. Controle fontes de ignição: chama aberta, faíscas, cigarro, celular fora de especificação e superfícies quentes. Trabalho a quente ou a frio exige PERMISSÃO DE TRABALHO.' },
      { scene: 'fuel-spill', title: 'Proteção contra incêndio e explosão', text: 'Áreas com inflamáveis exigem extintores compatíveis (pó químico, CO₂), hidrantes e sistemas de detecção e alarme, além de sinalização e isolamento da área. Em tanques, respiros e válvulas de segurança controlam a pressão. Saiba onde estão os equipamentos de combate e QUAL classe de fogo você pode enfrentar — e quando deve apenas evacuar.' },
      { scene: 'fuel-spill', title: 'Emergência: vazamento e incêndio', text: 'Em vazamento: elimine fontes de ignição, isole a área, contenha com material absorvente (nunca jogue água no líquido) e ventile. Em incêndio com inflamáveis: NÃO use jato de água direto (espalha o fogo); use pó químico/espuma e, se sair do controle, evacue e chame os Bombeiros 193. Queimaduras: água corrente 10-20 min e SAMU 192.' }
    ],
    quiz: [
      { q: 'O que realmente pega fogo em um líquido inflamável?', options: ['O líquido em si', 'Os vapores que ele libera, misturados ao ar', 'A embalagem', 'A etiqueta'], answer: 1, explain: 'São os vapores que formam a mistura inflamável com o ar; por isso o risco existe mesmo sem chama no líquido.' },
      { q: 'Para evitar faísca de eletricidade estática na transferência de inflamáveis:', options: ['Usar celular próximo para iluminar', 'Aterramento e equipotencialização dos equipamentos', 'Despejar de altura para render mais', 'Usar roupa de lã'], answer: 1, explain: 'Aterrar e equalizar potenciais dissipa a carga estática, eliminando uma fonte de ignição comum em transferências.' },
      { q: 'Trabalho a quente em área com inflamáveis exige:', options: ['Apenas boa vontade', 'Permissão de Trabalho e controles (medições, isolamento, extintores)', 'Somente luva de raspa', 'Nenhuma medida especial'], answer: 1, explain: 'A PT formaliza medições de atmosfera, isolamento da área, vigilância e meios de combate antes de soldar/cortar.' },
      { q: 'Em vazamento de inflamável, a conduta CORRETA é:', options: ['Jogar água para diluir', 'Eliminar fontes de ignição, isolar e conter com absorvente', 'Acender uma luz para ver melhor', 'Entrar no espaço confinado para fechar a válvula'], answer: 1, explain: 'Água espalha o líquido; o certo é eliminar ignição, isolar a área e conter com material absorvente e ventilação.' }
    ]
  },
  {
    id: 'nr17',
    icon: '🪑',
    title: 'NR-17 — Ergonomia',
    category: 'Normas Regulamentadoras',
    color: '#0b7285',
    steps: [
      { scene: 'ergo-desk', title: 'O que é ergonomia', text: 'Ergonomia (NR-17) é adaptar o trabalho à pessoa — e não o contrário. Ela olha mobiliário, equipamentos, ritmo, pausas, postura e organização das tarefas para prevenir lesões e adoecimento. Todo posto de trabalho deve ser avaliado (AEP — Análise Ergonômica Preliminar) e ajustado às características de quem o usa.' },
      { scene: 'ergo-lift', title: 'Riscos ergonômicos e levantamento seguro', text: 'Os riscos mais comuns: posturas inadequadas e mantidas, repetitividade, esforço físico excessivo e levantamento manual de cargas. Para levantar: aproxime-se da carga, pés afastados, coluna reta, dobre os JOELHOS (não a cintura), segure firme e levante com as pernas, mantendo a carga junto ao corpo. Evite torcer o tronco carregando peso.' },
      { scene: 'ergo-desk', title: 'Posto de trabalho e organização', text: 'Regule o posto: cadeira com altura e apoio ajustáveis, pés apoiados no piso (ou apoio), monitor com o topo na altura dos olhos a ~50-70 cm, teclado e mouse próximos, sem torção de tronco. Organização também é ergonomia: ritmo compatível, pausas reais, metas possíveis e autonomia para organizar a própria tarefa reduzem fadiga e erro.' },
      { scene: 'ergo-lift', title: 'Sinais de alerta e cuidado', text: 'Fique atento aos sinais: dor ou formigamento em punhos, ombros e pescoço, cansaço que não passa, ardência ou visão embaçada ao fim do dia (fadiga visual), irritação e dificuldade de concentração (fadiga mental). Dor que persiste deve ser comunicada à empresa e avaliada por saúde ocupacional cedo — LER/DORT tratada no início tem recuperação muito melhor.' }
    ],
    quiz: [
      { q: 'O objetivo central da ergonomia (NR-17) é:', options: ['Aumentar a velocidade a qualquer custo', 'Adaptar o trabalho às características psicofisiológicas do trabalhador', 'Padronizar cadeiras baratas', 'Reduzir pausas ao mínimo'], answer: 1, explain: 'A NR-17 busca conforto, segurança e desempenho: o trabalho se adapta à pessoa, não o contrário.' },
      { q: 'Na técnica correta de levantamento manual de carga, você deve:', options: ['Dobrar a cintura com pernas esticadas', 'Dobrar os joelhos, manter a coluna reta e erguer com as pernas', 'Girar o tronco enquanto levanta', 'Afastar a carga do corpo'], answer: 1, explain: 'Pernas fazem a força, coluna reta e carga junto ao corpo; torcer o tronco carregando peso lesiona a coluna.' },
      { q: 'Qual ajuste de posto de trabalho em computador está correto?', options: ['Monitor bem abaixo da linha dos olhos', 'Topo do monitor na altura dos olhos, a ~50-70 cm, pés apoiados', 'Cadeira baixa demais, punhos dobrados para cima', 'Teclado longe, com braços esticados'], answer: 1, explain: 'Altura e distância corretas do monitor + pés apoiados evitam sobrecarga de pescoço, ombros e punhos.' },
      { q: 'Formigamento frequente em punhos e mãos ao fim do dia indica:', options: ['Normalidade do trabalho', 'Possível sinal de LER/DORT — comunicar e avaliar cedo', 'Falta de café', 'Excesso de exercício em casa'], answer: 1, explain: 'Dor, formigamento e fadiga persistente são sinais de alerta de LER/DORT: quanto antes avaliar, melhor a recuperação.' }
    ]
  },
  {
    id: 'gro',
    icon: '🧠',
    title: 'Riscos Psicossociais — NR-01 (GRO)',
    category: 'Normas Regulamentadoras',
    color: '#9c36b5',
    steps: [
      { scene: 'mind-stress', title: 'O que são riscos psicossociais', text: 'Riscos psicossociais são aspectos da organização e das relações de trabalho que podem adoecer a mente e o corpo: sobrecarga, pressão excessiva, assédio, falta de autonomia e jornadas rígidas. Desde a atualização da NR-01, eles fazem parte do Gerenciamento de Riscos Ocupacionais (GRO) e devem estar no PGR da empresa, como qualquer outro risco.' },
      { scene: 'mind-stress', title: 'Fatores organizacionais que adoecem', text: 'Os principais produtores de estresse ocupacional: sobrecarga de trabalho, pressão por metas inatingíveis, falta de autonomia e de reconhecimento, turnos rígidos e jornadas longas, comunicação ruim e insegurança no emprego. Estresse crônico não é "frescura": eleva o risco de ansiedade, depressão, hipertensão e também de ACIDENTES (atenção e reação reduzidas).' },
      { scene: 'mind-support', title: 'Assédio é risco: prevenir e denunciar', text: 'Assédio moral (humilhações, isolamento, metas vexatórias, gritos) e assédio sexual (cantadas, insinuações, contato sem consentimento) são riscos psicossociais GRAVES e também ilícitos. A empresa deve prevenir com política clara, treinamento e canal de denúncia seguro e anônimo. Presenciar e se calar fortalece o agressor: registre fatos, datas e testemunhas e use o canal.' },
      { scene: 'mind-support', title: 'Cuidar da mente é segurança', text: 'Estratégias que funcionam: pausas reais durante a jornada, sono suficiente, falar com alguém de confiança, buscar o canal de apoio/SAÚDE ocupacional da empresa e atividades que deem descarga ao estresse. Percebeu sinais persistentes (irritação, insônia, desânimo, cansaço mental)? Procure ajuda cedo — cuidar da saúde mental protege você, sua equipe e a segurança de todos.' }
    ],
    quiz: [
      { q: 'Os riscos psicossociais devem ser gerenciados:', options: ['Apenas pelo RH, sem registro', 'Dentro do GRO/PGR, conforme a NR-01', 'Somente se houver queixa formal', 'Apenas em empresas com mais de 500 empregados'], answer: 1, explain: 'A NR-01 inclui os fatores psicossociais no Gerenciamento de Riscos Ocupacionais, com identificação e controle no PGR.' },
      { q: 'Qual destes é um fator organizacional produtor de estresse?', options: ['Pausas regulares', 'Metas inatingíveis com pressão excessiva', 'Autonomia para organizar a tarefa', 'Comunicação clara'], answer: 1, explain: 'Sobrecarga, metas inatingíveis, falta de autonomia e comunicação ruim estão entre os principais produtores de estresse.' },
      { q: 'Assédio moral no trabalho é:', options: ['Um estilo de liderança aceitável', 'Um risco psicossocial grave e ilícito, que a empresa deve prevenir', 'Algo que só existe fora do expediente', 'Uma brincadeira de equipe'], answer: 1, explain: 'Humilhações e constrangimentos repetidos são assédio moral: risco a ser prevenido e ilícito a ser apurado e punido.' },
      { q: 'Estresse ocupacional crônico aumenta o risco de:', options: ['Apenas gripes', 'Adoecimento mental E acidentes de trabalho (atenção e reação reduzidas)', 'Somente problemas estéticos', 'Nada, é passageiro'], answer: 1, explain: 'O estresse crônico adoece a mente e o corpo e reduz atenção e tempo de reação, elevando também o risco de acidentes.' }
    ]
  }
];

// Trilhas de certificação (NR-01, item 1.6.1.1): cada curso tem NR correspondente,
// carga horária e conteúdo programático próprio — o certificado é emitido por curso.
window.COURSES = [
  {
    id: 'ps', nr: '', title: 'Primeiros Socorros — Atendimento Básico', icon: '⛑️', color: '#c92a2a', hours: 8,
    lessons: ['cortes', 'engasgo', 'rcp', 'queimaduras', 'fraturas', 'choque', 'samu'],
    program: [
      'Avaliação da cena e segurança do socorrista; acionamento do SAMU (192)',
      'Hemorragias: pressão direta, curativos e sinais de choque',
      'Obstrução de vias aéreas: reconhecimento e manobra de Heimlich (adulto, gestante e bebê)',
      'Parada cardiorrespiratória: RCP de alta qualidade e uso do DEA',
      'Queimaduras: classificação, primeiros cuidados e critérios de gravidade',
      'Quedas, fraturas e imobilizações; suspeita de lesão de coluna',
      'Choque elétrico: segurança da cena e condutas',
      'Acidente vascular cerebral (AVC): sinais e comunicação com o 192'
    ]
  },
  {
    id: 'nr23', nr: 'NR-23', title: 'Proteção Contra Incêndios — Princípio de Incêndio', icon: '🔥', color: '#e8590c', hours: 4,
    lessons: ['incendio'],
    program: [
      'Triângulo do fogo: combustível, comburente e calor; métodos de extinção',
      'Classes de fogo (A, B, C, D e K) e agentes extintores adequados',
      'Uso correto do extintor: método PASS e limites de atuação',
      'Evacuação segura: rotas de fuga, fumaça, ponto de encontro e acionamento do 193'
    ]
  },
  {
    id: 'nr6', nr: 'NR-06', title: 'Equipamentos de Proteção Individual (EPI)', icon: '🦺', color: '#f08c00', hours: 2,
    lessons: ['nr6'],
    program: [
      'Definição e finalidade do EPI',
      'Direitos e deveres do empregador e do trabalhador',
      'Responsabilidades de uso, guarda, conservação, manutenção e higienização',
      'Forma correta de utilização e ajuste do EPI',
      'Limitações de proteção do equipamento',
      'Procedimentos para substituição de EPI danificado ou extraviado'
    ]
  },
  {
    id: 'nr35', nr: 'NR-35', title: 'Trabalho em Altura', icon: '🧗', color: '#1971c2', hours: 8,
    lessons: ['nr35'],
    program: [
      'Normas e regulamentos aplicáveis ao trabalho em altura',
      'Análise de Risco e condições impeditivas',
      'Riscos potenciais inerentes ao trabalho em altura e medidas de prevenção e controle',
      'Sistemas, equipamentos e procedimentos de proteção coletiva e individual (SPCQ)',
      'Acidentes típicos em trabalho em altura',
      'Condutas em situações de emergência, incluindo noções de técnicas de resgate e de primeiros socorros'
    ]
  },
  {
    id: 'nr18', nr: 'NR-18', title: 'Segurança na Construção Civil', icon: '🏗️', color: '#e67700', hours: 4,
    lessons: ['nr18'],
    program: [
      'Informações sobre as condições e meio ambiente de trabalho na obra',
      'Riscos inerentes às atividades desenvolvidas na respectiva fase da obra',
      'Equipamentos de Proteção Coletiva (EPC) existentes na obra',
      'Uso adequado dos Equipamentos de Proteção Individual (EPI)',
      'Medidas de prevenção e procedimentos de emergência adotados na obra'
    ]
  },
  {
    id: 'nr12', nr: 'NR-12', title: 'Segurança no Trabalho em Máquinas e Equipamentos', icon: '⚙️', color: '#495057', hours: 8,
    lessons: ['nr12'],
    program: [
      'Histórico da regulamentação de segurança sobre máquinas e equipamentos',
      'Descrição e funcionamento da máquina e seus riscos',
      'Riscos na operação, principais zonas de perigo e pontos de esmagamento/aprisionamento',
      'Medidas e dispositivos de segurança (proteções fixas, móveis e intertravamentos)',
      'Funcionamento dos dispositivos de intertravamento e botões de emergência',
      'Métodos de trabalho seguro, permissão de trabalho e bloqueio de energias perigosas (LOTO)',
      'Riscos adicionais (eletricidade, ruído, ergonomia, calor)',
      'Procedimentos em situações de emergência e primeiros socorros'
    ]
  },
  {
    id: 'nr11', nr: 'NR-11', title: 'Transporte, Movimentação, Armazenagem e Manuseio de Materiais', icon: '📦', color: '#5f3dc4', hours: 16,
    lessons: ['nr11'],
    program: [
      'Legislação específica e aspectos de segurança na movimentação de materiais',
      'Conceitos de estabilidade de carga (triângulo de estabilidade) e capacidade nominal',
      'Inspeção diária (checklist de pré-operação) dos equipamentos de elevação/transporte',
      'Regras de segurança na operação e circulação em vias internas',
      'Sinalização de segurança e movimentação de cargas especiais',
      'Procedimentos de segurança no carregamento, descarregamento e empilhamento',
      'Prevenção de acidentes e noções de primeiros socorros'
    ]
  },
  {
    id: 'nr20', nr: 'NR-20', title: 'Segurança com Inflamáveis e Combustíveis — Curso Básico', icon: '🛢️', color: '#d9480f', hours: 4,
    lessons: ['nr20'],
    program: [
      'Inflamáveis: características, propriedades, perigos e riscos',
      'Controles coletivos e individuais para trabalhos com inflamáveis',
      'Fontes de ignição e seu controle',
      'Procedimentos operacionais básicos e permissão para trabalho quente/frio',
      'Proteção contra incêndio e explosões',
      'Procedimentos básicos em situações de emergência (vazamentos, incêndios)'
    ]
  },
  {
    id: 'nr17', nr: 'NR-17', title: 'Ergonomia', icon: '🪑', color: '#0b7285', hours: 2,
    lessons: ['nr17'],
    program: [
      'Conceitos básicos de ergonomia e a importância da NR-17',
      'Riscos ergonômicos comuns (posturas inadequadas, repetitividade, esforço físico)',
      'Levantamento, transporte e descarga individual de materiais de forma segura',
      'Organização do trabalho (ritmos, pausas, metas) e sua relação com a fadiga',
      'Regulagem e uso correto do mobiliário e equipamentos nos postos de trabalho',
      'Sinais e sintomas de distúrbios osteomusculares (LER/DORT) e cansaço visual/mental'
    ]
  },
  {
    id: 'gro', nr: 'NR-01 (GRO)', title: 'Riscos Psicossociais no Trabalho', icon: '🧠', color: '#9c36b5', hours: 2,
    lessons: ['gro'],
    program: [
      'Conceito de riscos psicossociais e sua inclusão no Gerenciamento de Riscos Ocupacionais (GRO/NR-01)',
      'Fatores organizacionais produtores de estresse (sobrecarga, pressão por metas, falta de autonomia, turnos rígidos)',
      'Prevenção e combate ao assédio moral e sexual no ambiente de trabalho',
      'Impactos dos fatores psicossociais na segurança e incidência de acidentes de trabalho',
      'Mecanismos de apoio, canais de denúncia e acolhimento interno da empresa',
      'Estratégias de promoção da saúde mental e manejo do estresse ocupacional'
    ]
  }
];

window.COURSE_BY_ID = Object.fromEntries(window.COURSES.map((c) => [c.id, c]));
window.LESSON_COURSE = Object.fromEntries(
  window.COURSES.flatMap((c) => c.lessons.map((lid) => [lid, c.id]))
);

window.TOTAL_LESSONS = window.LESSONS.length;
window.PASS_SCORE = 0.75; // 3 de 4 acertos
