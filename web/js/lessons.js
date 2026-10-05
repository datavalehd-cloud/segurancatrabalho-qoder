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
  }
];

window.TOTAL_LESSONS = window.LESSONS.length;
window.PASS_SCORE = 0.75; // 3 de 4 acertos
