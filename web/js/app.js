// Portal de Treinamentos JL Consultoria — lógica do SPA (vanilla JS, hash routing).
(function () {
  const $ = (sel) => document.querySelector(sel);
  const app = $('#app');

  const LS_STUDENT = 'dv_student';
  const LS_PROGRESS = 'dv_progress';
  const LS_PENDING = 'dv_pending';
  const LS_CERT = 'dv_cert';

  let student = null;
  let progress = {};
  let pending = [];
  let cert = null;
  let cloudOk = null; // null = ainda verificando

  function load() {
    try { student = JSON.parse(localStorage.getItem(LS_STUDENT)) || null; } catch { student = null; }
    try { progress = JSON.parse(localStorage.getItem(LS_PROGRESS)) || {}; } catch { progress = {}; }
    try { pending = JSON.parse(localStorage.getItem(LS_PENDING)) || []; } catch { pending = []; }
    try { cert = JSON.parse(localStorage.getItem(LS_CERT)) || null; } catch { cert = null; }
  }
  function saveStudent() { localStorage.setItem(LS_STUDENT, JSON.stringify(student)); }
  function saveProgress() { localStorage.setItem(LS_PROGRESS, JSON.stringify(progress)); }
  function savePending() { localStorage.setItem(LS_PENDING, JSON.stringify(pending)); }
  function saveCert() { localStorage.setItem(LS_CERT, JSON.stringify(cert)); }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function fmtDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  function passedCount() {
    return LESSONS.filter((l) => progress[l.id] && progress[l.id].passed).length;
  }

  function allPassed() { return passedCount() === TOTAL_LESSONS; }

  // ---------- sincronização com a nuvem ----------
  async function flushPending() {
    while (pending.length) {
      const item = pending[0];
      try {
        await PortalApi.saveResult(item);
        pending.shift();
        savePending();
        cloudOk = true;
        if (progress[item.lessonId]) { progress[item.lessonId].cloud = true; saveProgress(); }
      } catch (e) {
        cloudOk = false;
        return; // continua offline; tenta no próximo carregamento
      }
    }
  }

  async function pullCloud() {
    if (!student) return;
    try {
      const data = await PortalApi.myResults(student.email);
      cloudOk = true;
      if (data && Array.isArray(data.items)) {
        let changed = false;
        for (const it of data.items) {
          const local = progress[it.lesson_id];
          if (!local || !local.cloud) {
            progress[it.lesson_id] = {
              score: it.score, total: it.total, passed: it.passed,
              completedAt: it.completed_at, cloud: true
            };
            changed = true;
          }
        }
        if (changed) saveProgress();
      }
    } catch { cloudOk = false; }
  }

  // ---------- rotas ----------
  function route() {
    const hash = location.hash || '#/painel';
    if (hash === '#/instrutor') { renderInstructor(); return; }
    if (!student) { renderLogin(); return; }
    if (hash === '#/painel') renderDashboard();
    else if (hash === '#/certificado') renderCertificate();
    else if (hash.startsWith('#/modulo/')) {
      const lesson = LESSONS.find((l) => hash === '#/modulo/' + l.id);
      if (lesson) renderLesson(lesson); else renderDashboard();
    } else renderDashboard();
  }

  // ---------- login ----------
  function renderLogin() {
    app.innerHTML = `
    <div class="login-screen">
      <div class="login-card">
        <div class="logo-plate">
          <img src="assets/brand/logo-jl.png?v=1" alt="JL — Consultoria de Saúde e Segurança do Trabalho" width="132" height="132">
          <div class="brand-name">JL Consultoria</div>
          <div class="brand-slogan">Saúde e Segurança do Trabalho</div>
        </div>
        <h1>Portal de Treinamentos e Segurança do Trabalho</h1>
        <p class="muted">Primeiros Socorros • Princípio de Incêndio • NR6. Assista às aulas animadas, faça os quizzes e emita seu certificado.</p>
        <form id="login-form" novalidate>
          <label>Nome completo *
            <input id="f-name" type="text" required minlength="2" maxlength="100" autocomplete="name" placeholder="Ex.: Maria da Silva">
          </label>
          <label>E-mail *
            <input id="f-email" type="email" required maxlength="160" autocomplete="email" placeholder="Ex.: maria@empresa.com.br">
          </label>
          <label>Empresa
            <input id="f-company" type="text" maxlength="100" autocomplete="organization" placeholder="Ex.: Indústria ABC Ltda">
          </label>
          <p class="form-error" id="login-error" role="alert" hidden></p>
          <button type="submit" class="btn primary big">Começar o treinamento</button>
          <a class="instr-link" href="#/instrutor">👩‍🏫 Área do instrutor</a>
        </form>
        <div class="login-credit">Idealização e desenvolvimento DataVale — <a class="dv-link" href="https://www.datavalehd.online" target="_blank" rel="noopener noreferrer">Visite-nos</a></div>
      </div>
    </div>`;
    $('#login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#f-name').value.trim();
      const email = $('#f-email').value.trim().toLowerCase();
      const company = $('#f-company').value.trim();
      const err = $('#login-error');
      if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        err.textContent = 'Informe seu nome completo e um e-mail válido.';
        err.hidden = false;
        return;
      }
      student = { name, email, company };
      saveStudent();
      location.hash = '#/painel';
      route();
      syncCloud().then(route);
    });
  }

  async function syncCloud() {
    await Promise.allSettled([flushPending(), pullCloud()]);
  }

  // ---------- dashboard ----------
  function renderDashboard() {
    const done = passedCount();
    const pct = Math.round((done / TOTAL_LESSONS) * 100);
    const cats = [...new Set(LESSONS.map((l) => l.category))];
    const cloudNote = cloudOk === false
      ? `<div class="sync local">💾 Serviço de registros indisponível no momento — seu progresso está salvo neste dispositivo e será sincronizado automaticamente.</div>`
      : pending.length
        ? `<div class="sync local">⏳ ${pending.length} registro(s) aguardando sincronização com a nuvem.</div>`
        : cloudOk === null
          ? `<div class="sync local">☁️ Verificando seus registros na nuvem…</div>`
          : `<div class="sync ok">☁️ Registros sincronizados com a nuvem.</div>`;

    app.innerHTML = `
    <header class="topbar">
      <div class="brand small">
        <img class="brand-logo" src="assets/brand/logo-jl.png?v=1" alt="JL" width="34" height="34">
        <div class="brand-name">JL Consultoria</div>
      </div>
      <div class="topbar-right">
        <span class="student-chip" title="${esc(student.email)}">👤 ${esc(student.name.split(' ')[0])}</span>
        <button class="btn ghost small" id="btn-edit">Trocar aluno</button>
      </div>
    </header>
    <main class="dash">
      <section class="progress-card">
        <div>
          <h1>Olá, ${esc(student.name.split(' ')[0])}! 👋</h1>
          <p class="muted">Complete os ${TOTAL_LESSONS} módulos abaixo (aula + quiz com no mínimo 75%) para emitir seu certificado.</p>
        </div>
        <div class="progress-ring" role="img" aria-label="${pct}% concluído">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#e9ecef" stroke-width="12"/>
            <circle cx="60" cy="60" r="52" fill="none" stroke="#2f9e44" stroke-width="12"
              stroke-linecap="round" stroke-dasharray="${(pct / 100) * 327} 327" transform="rotate(-90 60 60)"/>
          </svg>
          <div class="ring-label">${done}/${TOTAL_LESSONS}</div>
        </div>
      </section>
      ${cloudNote}
      ${cats.map((cat) => `
        <h2 class="cat-title">${cat === 'Segurança do Trabalho' ? '🦺' : '⛑️'} ${esc(cat)}</h2>
        <div class="cards">
          ${LESSONS.filter((l) => l.category === cat).map((l) => {
            const p = progress[l.id];
            const status = p && p.passed
              ? `<span class="badge done">✔ Concluído — ${p.score}/${p.total}</span>`
              : p ? `<span class="badge retry">Refazer quiz</span>` : `<span class="badge new">Não iniciado</span>`;
            return `<a class="module-card" href="#/modulo/${l.id}" style="--accent:${l.color}">
              <div class="module-icon">${l.icon}</div>
              <div class="module-info">
                <h3>${esc(l.title)}</h3>
                <p class="muted">${l.steps.length} etapas + quiz</p>
                ${status}
              </div>
            </a>`;
          }).join('')}
        </div>`).join('')}
      <a class="cert-card ${allPassed() ? 'unlocked' : ''}" href="#/certificado">
        <div class="module-icon">🏆</div>
        <div class="module-info">
          <h3>Meu Certificado</h3>
          <p class="muted">${allPassed() ? 'Todos os módulos concluídos — emita seu certificado!' : `Conclua todos os módulos para desbloquear (${done}/${TOTAL_LESSONS}).`}</p>
        </div>
      </a>
    </main>
    <footer class="footer">
      <div class="footer-main">JL Consultoria — Saúde e Segurança do Trabalho. <a class="instr-link" href="#/instrutor">Área do instrutor</a></div>
      <div class="footer-credit">Idealização e desenvolvimento DataVale — <a class="dv-link" href="https://www.datavalehd.online" target="_blank" rel="noopener noreferrer">Visite-nos</a></div>
    </footer>`;

    $('#btn-edit').addEventListener('click', () => {
      localStorage.removeItem(LS_STUDENT);
      student = null;
      location.hash = '';
      renderLogin();
    });
  }

  // ---------- lição ----------
  function renderLesson(lesson) {
    let stepIdx = 0;

    function renderStep() {
      const st = lesson.steps[stepIdx];
      const last = stepIdx === lesson.steps.length - 1;
      app.innerHTML = `
      <header class="topbar lesson-bar">
        <a class="btn ghost small" href="#/painel">← Painel</a>
        <div class="lesson-title"><span>${lesson.icon}</span> ${esc(lesson.title)}</div>
        <div class="dots" aria-label="Etapa ${stepIdx + 1} de ${lesson.steps.length}">
          ${lesson.steps.map((_, i) => `<span class="dot ${i < stepIdx ? 'past' : ''} ${i === stepIdx ? 'now' : ''}"></span>`).join('')}
        </div>
      </header>
      <main class="lesson">
        <div class="stage">${window.getScene(st.scene)}</div>
        <div class="lesson-body">
          <h1>${esc(st.title)}</h1>
          <p>${esc(st.text)}</p>
          <div class="lesson-nav">
            <button class="btn ghost" id="btn-prev" ${stepIdx === 0 ? 'disabled' : ''}>← Anterior</button>
            <button class="btn primary" id="btn-next">${last ? 'Ir para o quiz 🎯' : 'Próximo →'}</button>
          </div>
        </div>
      </main>`;
      $('#btn-prev').addEventListener('click', () => { if (stepIdx > 0) { stepIdx--; renderStep(); } });
      $('#btn-next').addEventListener('click', () => {
        if (last) startQuiz(); else { stepIdx++; renderStep(); }
      });
    }

    function startQuiz() {
      let qIdx = 0, correct = 0, locked = false;

      function renderQuestion() {
        locked = false;
        const q = lesson.quiz[qIdx];
        app.innerHTML = `
        <header class="topbar lesson-bar">
          <a class="btn ghost small" href="#/painel">← Painel</a>
          <div class="lesson-title">🎯 Quiz — ${esc(lesson.title)}</div>
          <div class="dots">${lesson.quiz.map((_, i) => `<span class="dot ${i < qIdx ? 'past' : ''} ${i === qIdx ? 'now' : ''}"></span>`).join('')}</div>
        </header>
        <main class="quiz">
          <div class="quiz-progress">Pergunta ${qIdx + 1} de ${lesson.quiz.length} • mínimo ${Math.ceil(lesson.quiz.length * PASS_SCORE)} acertos</div>
          <h1>${esc(q.q)}</h1>
          <div class="options" id="options">
            ${q.options.map((op, i) => `<button class="option" data-i="${i}">${esc(op)}</button>`).join('')}
          </div>
          <div class="feedback" id="feedback" hidden></div>
        </main>`;
        $('#options').addEventListener('click', (e) => {
          const btn = e.target.closest('.option');
          if (!btn || locked) return;
          locked = true;
          const i = Number(btn.dataset.i);
          const right = i === q.answer;
          if (right) correct++;
          document.querySelectorAll('.option').forEach((b, bi) => {
            b.disabled = true;
            if (bi === q.answer) b.classList.add('right');
            else if (bi === i) b.classList.add('wrong');
          });
          const fb = $('#feedback');
          fb.hidden = false;
          fb.className = 'feedback ' + (right ? 'good' : 'bad');
          fb.innerHTML = `<strong>${right ? '✅ Correto!' : '❌ Não foi dessa vez.'}</strong> ${esc(q.explain)}
            <button class="btn primary" id="btn-cont">${qIdx === lesson.quiz.length - 1 ? 'Ver resultado' : 'Próxima pergunta →'}</button>`;
          $('#btn-cont').addEventListener('click', () => {
            if (qIdx === lesson.quiz.length - 1) finish();
            else { qIdx++; renderQuestion(); }
          });
        });
      }

      async function finish() {
        const total = lesson.quiz.length;
        const passed = correct / total >= PASS_SCORE;
        const rec = {
          score: correct, total, passed,
          completedAt: new Date().toISOString(),
          cloud: false
        };
        progress[lesson.id] = rec;
        saveProgress();

        const payload = {
          name: student.name, email: student.email, company: student.company || '',
          lessonId: lesson.id, score: correct, total, passed
        };
        let cloudMsg;
        try {
          await PortalApi.saveResult(payload);
          rec.cloud = true;
          saveProgress();
          cloudMsg = '<div class="sync ok">☁️ Registro salvo na nuvem.</div>';
        } catch (e) {
          cloudOk = false;
          pending.push(payload);
          savePending();
          cloudMsg = '<div class="sync local">⏳ Sem conexão com o serviço agora — registro salvo neste dispositivo, sincronização automática mais tarde.</div>';
        }

        app.innerHTML = `
        <main class="result ${passed ? 'pass' : 'fail'}">
          <div class="result-icon">${passed ? '🎉' : '💪'}</div>
          <h1>${passed ? 'Aprovado!' : 'Quase lá!'}</h1>
          <p class="score">Você acertou <strong>${correct}</strong> de <strong>${total}</strong> perguntas${passed ? '' : ' (mínimo: ' + Math.ceil(total * PASS_SCORE) + ')'}</p>
          ${cloudMsg}
          <div class="lesson-nav center">
            <a class="btn ghost" href="#/painel">Voltar ao painel</a>
            ${passed ? '' : `<button class="btn primary" id="btn-retry">Refazer quiz</button>`}
          </div>
        </main>`;
        const retry = $('#btn-retry');
        if (retry) retry.addEventListener('click', () => renderLesson(lesson));
        if (passed) confetti();
      }

      renderQuestion();
    }

    renderStep();
  }

  function confetti() {
    const colors = ['#ffd43b', '#69db7c', '#4dabf7', '#ff8787', '#b197fc', '#ffa94d'];
    for (let i = 0; i < 60; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = colors[i % colors.length];
      c.style.animationDelay = Math.random() * 0.6 + 's';
      c.style.animationDuration = 1.6 + Math.random() * 1.4 + 's';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 3500);
    }
  }

  // ---------- certificado ----------
  function renderCertificate() {
    if (!allPassed()) {
      app.innerHTML = `
      <header class="topbar lesson-bar"><a class="btn ghost small" href="#/painel">← Painel</a>
        <div class="lesson-title">🏆 Certificado</div><span></span></header>
      <main class="result fail">
        <div class="result-icon">🔒</div>
        <h1>Certificado bloqueado</h1>
        <p class="muted">Conclua todos os ${TOTAL_LESSONS} módulos com aproveitamento mínimo de 75% (${passedCount()}/${TOTAL_LESSONS} concluídos).</p>
        <div class="lesson-nav center"><a class="btn primary" href="#/painel">Voltar ao painel</a></div>
      </main>`;
      return;
    }

    if (!cert) {
      app.innerHTML = `
      <header class="topbar lesson-bar"><a class="btn ghost small" href="#/painel">← Painel</a>
        <div class="lesson-title">🏆 Certificado</div><span></span></header>
      <main class="result pass">
        <div class="result-icon">🏆</div>
        <h1>Parabéns, ${esc(student.name.split(' ')[0])}!</h1>
        <p class="muted">Você concluiu todos os módulos do treinamento. Emita seu certificado oficial.</p>
        <div id="cert-msg"></div>
        <div class="lesson-nav center"><button class="btn primary big" id="btn-issue">Emitir certificado</button></div>
      </main>`;
      $('#btn-issue').addEventListener('click', async () => {
        const btn = $('#btn-issue');
        btn.disabled = true;
        btn.textContent = 'Emitindo…';
        try {
          const data = await PortalApi.issueCertificate({
            name: student.name, email: student.email, company: student.company || ''
          });
          cert = { code: data.code, issuedAt: data.issuedAt, preview: false };
          saveCert();
          showCertificate();
        } catch (e) {
          cert = { code: null, issuedAt: new Date().toISOString(), preview: true };
          saveCert();
          $('#cert-msg').innerHTML = `<div class="sync local">⏳ ${esc(e.message)} Mostrando uma prévia local — o código oficial de verificação é gerado quando o serviço estiver disponível.</div>`;
          showCertificate();
        }
      });
      return;
    }
    showCertificate();

    function showCertificate() {
      app.innerHTML = `
      <div class="cert-actions no-print">
        <a class="btn ghost small" href="#/painel">← Painel</a>
        <div>
          <button class="btn primary" id="btn-print">🖨️ Imprimir / Salvar PDF</button>
          ${cert.code ? '' : '<button class="btn ghost" id="btn-reissue">Tentar registro oficial</button>'}
        </div>
      </div>
      <main class="cert-page">
        <div class="cert">
          <div class="cert-border">
            <div class="cert-head">
              <img class="cert-logo" src="assets/brand/logo-jl.png?v=1" alt="JL — Consultoria de Saúde e Segurança do Trabalho" width="92" height="92">
              <div class="brand-name">JL Consultoria</div>
              <div class="brand-slogan">Saúde e Segurança do Trabalho</div>
            </div>
            <h1 class="cert-title">Certificado de Conclusão</h1>
            <p class="cert-text">Certificamos que</p>
            <p class="cert-name">${esc(student.name)}</p>
            ${student.company ? `<p class="cert-text">da empresa <strong>${esc(student.company)}</strong></p>` : ''}
            <p class="cert-text">concluiu com aproveitamento o <strong>Curso de Segurança do Trabalho e Primeiros Socorros</strong>,
            contemplando os módulos:</p>
            <ul class="cert-list">
              ${LESSONS.map((l) => `<li>${l.icon} ${esc(l.title)}${progress[l.id] ? ` — ${progress[l.id].score}/${progress[l.id].total}` : ''}</li>`).join('')}
            </ul>
            <div class="cert-foot">
              <div>
                <div class="cert-date">${fmtDate(cert.issuedAt)}</div>
                <div class="cert-role">Data de conclusão</div>
              </div>
              <div class="cert-seal">🏅</div>
              <div>
                <div class="cert-date">${cert.code || 'PRÉVIA SEM CÓDIGO'}</div>
                <div class="cert-role">${cert.code ? 'Código de verificação' : 'Emitido localmente (sem registro)'}</div>
              </div>
            </div>
          </div>
        </div>
      </main>`;
      $('#btn-print').addEventListener('click', () => window.print());
      const re = $('#btn-reissue');
      if (re) re.addEventListener('click', () => { cert = null; saveCert(); route(); });
    }
  }

  // ---------- área do instrutor ----------
  const SS_INSTR = 'dv_instr_pass';

  function renderInstructor() {
    const pass = sessionStorage.getItem(SS_INSTR);
    if (pass) renderInstrDash(pass); else renderInstrLogin();
  }

  function renderInstrLogin() {
    app.innerHTML = `
    <div class="login-screen">
      <div class="login-card">
        <div class="logo-plate">
          <img src="assets/brand/logo-jl.png?v=1" alt="JL — Consultoria de Saúde e Segurança do Trabalho" width="132" height="132">
          <div class="brand-name">JL Consultoria</div>
          <div class="brand-slogan">Saúde e Segurança do Trabalho</div>
        </div>
        <h1>Área do Instrutor</h1>
        <p class="muted">Acompanhe módulos concluídos, aprovações e certificados emitidos por cada aluno.</p>
        <form id="instr-form" novalidate>
          <label>Senha do instrutor *
            <input id="i-pass" type="password" required maxlength="200" autocomplete="current-password" placeholder="Senha fornecida pelo administrador">
          </label>
          <p class="form-error" id="instr-error" role="alert" hidden></p>
          <button type="submit" class="btn primary big">Entrar</button>
          <a class="instr-link" href="#/painel">← Voltar ao portal</a>
        </form>
      </div>
    </div>`;
    $('#instr-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = $('#instr-form button[type="submit"]');
      const err = $('#instr-error');
      err.hidden = true;
      btn.disabled = true; btn.textContent = 'Verificando…';
      try {
        const report = await PortalApi.instructorReport($('#i-pass').value);
        sessionStorage.setItem(SS_INSTR, $('#i-pass').value);
        renderInstrDash($('#i-pass').value, report);
      } catch (e2) {
        err.textContent = e2.message; err.hidden = false;
        btn.disabled = false; btn.textContent = 'Entrar';
      }
    });
  }

  function instrChipHtml(modules, lessonId) {
    const m = modules[lessonId];
    if (!m) return `<span class="mchip none" title="Não iniciado">·</span>`;
    if (m.passed) return `<span class="mchip pass" title="${m.score}/${m.total} — ${fmtDate(m.completed_at)}">✓</span>`;
    return `<span class="mchip fail" title="${m.score}/${m.total} — reprovado">↻</span>`;
  }

  function renderInstrDash(pass, cachedReport) {
    app.innerHTML = `
    <header class="topbar">
      <div class="brand small">
        <img class="brand-logo" src="assets/brand/logo-jl.png?v=1" alt="JL" width="34" height="34">
        <div class="brand-name">Área do Instrutor</div>
      </div>
      <div class="topbar-right">
        <a class="btn ghost small" href="#/painel">← Portal do aluno</a>
        <button class="btn ghost small" id="instr-exit">Sair</button>
      </div>
    </header>
    <main class="dash instr">
      <div id="instr-content"><p class="muted">Carregando registros…</p></div>
      <div class="reg-modal" id="reg-modal" hidden></div>
    </main>
    <footer class="footer">JL Consultoria — Saúde e Segurança do Trabalho.</footer>`;
    $('#instr-exit').addEventListener('click', () => {
      sessionStorage.removeItem(SS_INSTR);
      renderInstrLogin();
    });

    const loadReport = cachedReport
      ? Promise.resolve(cachedReport)
      : PortalApi.instructorReport(pass);

    loadReport.then((report) => {
      const modById = {};
      LESSONS.forEach((l) => { modById[l.id] = l; });
      let students = report.students;

      const rowHtml = (s) => `
        <tr>
          <td class="who"><strong>${esc(s.name)}</strong><span class="sub">${esc(s.email)}</span>
            <span class="row-acts">
              <button class="btn ghost small reg-btn" data-name="${esc(s.name)}" data-email="${esc(s.email)}" data-company="${esc(s.company || '')}">＋ módulo</button>
              <button class="btn ghost small del-btn" data-name="${esc(s.name)}" data-email="${esc(s.email)}">🗑 apagar aluno</button>
            </span></td>
          <td>${esc(s.company || '—')}</td>
          <td class="mods">${report.lessonIds.map((id) => instrChipHtml(s.modules, id)).join('')}</td>
          <td class="prog"><span class="badge ${s.passedCount === report.lessonIds.length ? 'done' : s.attempted ? 'retry' : 'new'}">${s.passedCount}/${report.lessonIds.length}</span></td>
          <td>${s.certificate ? `<code class="cert-code">${esc(s.certificate.code)}</code><span class="sub">${fmtDate(s.certificate.issuedAt)}</span>` : '<span class="muted">—</span>'}</td>
          <td class="sub">${s.lastActivity ? fmtDate(s.lastActivity) : '—'}</td>
        </tr>`;

      $('#instr-content').innerHTML = `
        <section class="instr-stats">
          <div class="stat"><div class="stat-num">${report.totals.students}</div><div class="stat-lbl">alunos registrados</div></div>
          <div class="stat"><div class="stat-num">${report.totals.completedAll}</div><div class="stat-lbl">concluíram todos os módulos</div></div>
          <div class="stat"><div class="stat-num">${report.totals.certificates}</div><div class="stat-lbl">certificados emitidos</div></div>
          <div class="stat"><div class="stat-num">${report.totals.averageProgress}%</div><div class="stat-lbl">progresso médio</div></div>
        </section>
        <div class="instr-toolbar">
          <input id="instr-search" type="search" placeholder="Buscar por nome, empresa ou e-mail…" aria-label="Buscar aluno">
          <span class="muted" id="instr-count"></span>
          <button class="btn primary small" id="instr-add">➕ Registrar conclusão</button>
        </div>
        <p class="form-ok" id="instr-flash" role="status" hidden></p>
        <div class="instr-table-wrap">
          <table class="instr-table">
            <thead><tr>
              <th>Aluno</th><th>Empresa</th>
              <th>Módulos (${LESSONS.map((l) => l.icon).join(' ')})</th>
              <th>Aprovados</th><th>Certificado</th><th>Última atividade</th>
            </tr></thead>
            <tbody id="instr-rows"></tbody>
          </table>
        </div>`;

      const drawRows = (list) => {
        $('#instr-rows').innerHTML = list.length
          ? list.map(rowHtml).join('')
          : `<tr><td colspan="6" class="muted center">Nenhum aluno encontrado.</td></tr>`;
        $('#instr-count').textContent = `${list.length} de ${students.length}`;
      };
      drawRows(students);

      $('#instr-search').addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        drawRows(!q ? students : students.filter((s) =>
          [s.name, s.email, s.company].some((v) => (v || '').toLowerCase().includes(q))));
      });

      // exclusão e recarga de registros
      const flash = (msg) => { const el = $('#instr-flash'); el.textContent = msg; el.hidden = !msg; };
      const isAuthError = (e) => e.code === 'invalid_credentials' || e.code === 'access_denied';
      const authExpired = () => {
        sessionStorage.removeItem(SS_INSTR);
        renderInstrLogin();
        const ie = $('#instr-error');
        if (ie) { ie.textContent = 'A senha não é mais válida. Entre novamente.'; ie.hidden = false; }
      };
      const refreshStudents = async () => {
        const r = await PortalApi.instructorReport(pass).catch(() => null);
        if (r) { students = r.students; drawRows(students); }
      };

      // registro de módulos concluídos — modal guiado (aluno → módulos)
      const modal = $('#reg-modal');
      const regState = { step: 'who', student: null, newStudent: false, picked: new Set(), sig: '' };

      const currentStudents = () => students.filter((s) => {
        const q = regState.sig.trim().toLowerCase();
        return !q || [s.name, s.email].some((v) => (v || '').toLowerCase().includes(q));
      });

      const modRows = (s) => {
        const passed = Object.keys(s.modules || {}).filter((id) => s.modules[id].passed).length;
        return `
          <p class="reg-who"><strong>${esc(s.name)}</strong> <span class="sub">${esc(s.email)}</span>
            <span class="badge ${passed === LESSONS.length ? 'done' : passed ? 'retry' : 'new'}">${passed}/${LESSONS.length} aprovados</span></p>
          <div class="mod-list">${LESSONS.map((l) => {
            const m = (s.modules || {})[l.id];
            const tip = m ? (m.passed ? `já aprovado (${m.score}/${m.total})` : `reprovado (${m.score}/${m.total}) — pode refazer`) : 'não iniciado';
            return `<label class="mod-item${regState.picked.has(l.id) ? ' on' : ''}">
              <input type="checkbox" value="${l.id}" ${regState.picked.has(l.id) ? 'checked' : ''}>
              <span class="mod-ic">${l.icon}</span>
              <span class="mod-t">${esc(l.title)}</span>
              <span class="mod-s">${tip}</span>
              ${m ? `<button type="button" class="mod-del" data-lesson="${l.id}" data-title="${esc(l.title)}" title="Apagar o registro deste módulo">🗑</button>` : ''}
            </label>`;
          }).join('')}</div>
          <p class="muted">Cada módulo marcado é registrado como aprovado com nota máxima no quiz (${LESSONS.map((l) => l.quiz.length).join(', ')} perguntas respectivamente).</p>`;
      };

      const drawModal = () => {
        if (regState.step === 'who') {
          const list = currentStudents();
          const q = regState.sig.trim();
          const exact = q ? students.some((s) => s.email.toLowerCase() === q.toLowerCase()) : false;
          modal.innerHTML = `
            <div class="reg-card" role="dialog" aria-modal="true" aria-labelledby="reg-title">
              <div class="reg-head"><h3 id="reg-title">Registrar módulos realizados</h3>
                <button type="button" class="reg-x" id="reg-close" aria-label="Fechar">✕</button></div>
              <p class="muted">Busque o aluno pelo nome ou e-mail para marcar os módulos concluídos.</p>
              <input id="reg-q" type="search" placeholder="Nome ou e-mail do aluno…" value="${esc(regState.sig)}" aria-label="Buscar aluno">
              <div class="s-list">
                ${list.slice(0, 8).map((s) => `<button type="button" class="s-row" data-email="${esc(s.email)}">
                  <strong>${esc(s.name)}</strong><span class="sub">${esc(s.email)}${s.company ? ' · ' + esc(s.company) : ''}</span></button>`).join('')}
                ${!list.length && regState.sig.trim() ? `<p class="muted">Nenhum aluno encontrado para “${esc(regState.sig.trim())}”.</p>` : ''}
                <button type="button" class="s-row s-new" data-act="new">➕${exact ? ' Atualizar módulos de' : ' Cadastrar'} ${esc(regState.sig.trim() || 'novo aluno')}</button>
              </div>
            </div>`;
          const qInput = $('#reg-q');
          qInput.addEventListener('input', () => { regState.sig = qInput.value; drawModal(); });
          if (!regState.sig) qInput.focus();
          return;
        }
        if (regState.step === 'confirm') {
          const s = regState.student;
          modal.innerHTML = `
            <div class="reg-card" role="dialog" aria-modal="true" aria-labelledby="reg-title">
              <div class="reg-head"><h3 id="reg-title">${regState.newStudent ? 'Novo aluno' : 'Aluno'}</h3>
                <button type="button" class="reg-x" id="reg-close" aria-label="Fechar">✕</button></div>
              <div class="reg-grid">
                <label>Nome do aluno * <input id="n-name" type="text" maxlength="100" value="${esc(s.name)}"></label>
                <label>E-mail * <input id="n-email" type="email" maxlength="160" value="${esc(s.email)}"></label>
                <label>Empresa <input id="n-company" type="text" maxlength="100" value="${esc(s.company || '')}"></label>
              </div>
              <p class="muted">O e-mail identifica o aluno — atualize um já cadastrado para registrar módulos sem criar duplicata.</p>
              <p class="form-error" id="reg-error" role="alert" hidden></p>
              <div class="lesson-nav">
                <button type="button" class="btn ghost" id="reg-back">← Voltar</button>
                <button type="button" class="btn primary" id="reg-next">Escolher módulos →</button>
              </div>
            </div>`;
          return;
        }
        const s = regState.student;
        modal.innerHTML = `
          <div class="reg-card" role="dialog" aria-modal="true" aria-labelledby="reg-title">
            <div class="reg-head"><h3 id="reg-title">Módulos concluídos</h3>
              <button type="button" class="reg-x" id="reg-close" aria-label="Fechar">✕</button></div>
            ${modRows(s)}
            <p class="form-error" id="reg-error" role="alert" hidden></p>
            <p class="form-ok" id="reg-ok" role="status" hidden></p>
            <div class="lesson-nav">
              <button type="button" class="btn ghost" id="reg-back">← Voltar</button>
              <button type="button" class="btn primary" id="reg-save">Salvar registro</button>
            </div>
          </div>`;
      };

      const closeReg = () => { modal.hidden = true; modal.innerHTML = ''; };

      const openReg = (pre) => {
        regState.step = 'who';
        regState.student = null;
        regState.newStudent = false;
        regState.picked = new Set();
        regState.sig = pre && pre.email ? pre.email : '';
        if (pre && pre.email) {
          const hit = students.find((s) => s.email.toLowerCase() === pre.email.toLowerCase());
          if (hit) { regState.student = hit; regState.step = 'pick'; }
        }
        modal.hidden = false;
        drawModal();
      };

      modal.addEventListener('click', async (e) => {
        const t = e.target;
        const delMod = t.closest('.mod-del');
        if (delMod) {
          e.preventDefault();
          const s = regState.student;
          if (!confirm(`Apagar o registro de “${delMod.dataset.title}” de ${s.name}? O aluno poderá refazer o quiz.`)) return;
          try {
            await PortalApi.instructorDelete({ password: pass, email: s.email, lessonId: delMod.dataset.lesson });
            regState.picked.delete(delMod.dataset.lesson);
            await refreshStudents();
            const fresh = students.find((x) => x.email.toLowerCase() === s.email.toLowerCase());
            if (fresh) regState.student = fresh;
            flash(`🗑 Registro de ${delMod.dataset.title} removido de ${s.name}.`);
            drawModal();
          } catch (e2) {
            if (isAuthError(e2)) return authExpired();
            const err = $('#reg-error');
            if (err) { err.textContent = e2.message; err.hidden = false; }
          }
          return;
        }
        if (t.closest('#reg-close')) return closeReg();
        if (t.closest('#reg-back')) {
          regState.step = regState.newStudent ? 'confirm' : 'who';
          regState.picked = new Set();
          return drawModal();
        }
        const row = t.closest('.s-row');
        if (row) {
          if (row.dataset.act === 'new') {
            const sig = regState.sig.trim();
            const hit = sig ? students.find((s) => s.email.toLowerCase() === sig.toLowerCase()) : null;
            if (hit) { regState.student = hit; regState.newStudent = false; regState.step = 'pick'; }
            else {
              regState.student = { name: '', email: sig, company: '', modules: {} };
              regState.newStudent = true; regState.step = 'confirm';
            }
            return drawModal();
          }
          const hit = students.find((s) => s.email === row.dataset.email);
          if (!hit) return;
          regState.student = hit; regState.newStudent = false; regState.step = 'pick';
          return drawModal();
        }
        if (t.closest('#reg-next')) {
          const err = $('#reg-error');
          err.hidden = true;
          const s = regState.student;
          s.name = $('#n-name').value.trim();
          s.email = $('#n-email').value.trim().toLowerCase();
          s.company = $('#n-company').value.trim();
          if (s.name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email)) {
            err.textContent = 'Informe nome (2+ caracteres) e e-mail válido.';
            err.hidden = false; return;
          }
          const hit = students.find((x) => x.email.toLowerCase() === s.email);
          if (hit) { regState.student = hit; regState.newStudent = false; }
          regState.step = 'pick';
          return drawModal();
        }
        if (t.closest('#reg-save')) {
          const err = $('#reg-error'), ok = $('#reg-ok');
          err.hidden = true; ok.hidden = true;
          if (!regState.picked.size) {
            err.textContent = 'Marque pelo menos um módulo para registrar.';
            err.hidden = false; return;
          }
          const s = regState.student;
          const btn = $('#reg-save');
          btn.disabled = true;
          const ids = [...regState.picked];
          const savedTitles = [];
          let failCount = 0;
          for (const id of ids) {
            btn.textContent = `Salvando ${savedTitles.length + failCount + 1}/${ids.length}…`;
            const lesson = modById[id];
            try {
              await PortalApi.instructorSaveResult({
                password: pass, name: s.name, email: s.email, company: s.company || '',
                lessonId: id, score: lesson.quiz.length, total: lesson.quiz.length,
              });
              savedTitles.push(lesson.title);
            } catch (e2) {
              if (e2.code === 'invalid_credentials' || e2.code === 'access_denied') {
                sessionStorage.removeItem(SS_INSTR);
                closeReg();
                renderInstrLogin();
                const ie = $('#instr-error');
                if (ie) { ie.textContent = 'A senha não é mais válida. Entre novamente.'; ie.hidden = false; }
                return;
              }
              failCount += 1;
            }
          }
          const refreshed = await PortalApi.instructorReport(pass).catch(() => null);
          if (refreshed) { students = refreshed.students; drawRows(students); }
          btn.disabled = false; btn.textContent = 'Salvar registro';
          if (savedTitles.length) {
            ok.textContent = `✅ ${savedTitles.length} módulo${savedTitles.length > 1 ? 's' : ''} registrado${savedTitles.length > 1 ? 's' : ''} para ${s.name}: ${savedTitles.join(', ')}` +
              (failCount ? ` — ${failCount} falhou${failCount > 1 ? 'ram' : ''}, tente novamente.` : '.');
            ok.hidden = false;
            regState.picked = new Set();
          } else {
            err.textContent = 'Não foi possível salvar. Verifique a conexão e tente novamente.';
            err.hidden = false;
          }
          return;
        }
        if (t === modal) return closeReg();
      });
      modal.addEventListener('change', (e) => {
        if (e.target.matches('.mod-list input[type="checkbox"]')) {
          const id = e.target.value;
          if (e.target.checked) regState.picked.add(id); else regState.picked.delete(id);
          e.target.closest('.mod-item').classList.toggle('on', e.target.checked);
        }
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) closeReg();
      });

      $('#instr-add').addEventListener('click', () => openReg());
      $('#instr-rows').addEventListener('click', async (e) => {
        const del = e.target.closest('.del-btn');
        if (del) {
          const s = students.find((x) => x.email === del.dataset.email);
          const n = s ? s.attempted : 0;
          const hasCert = !!(s && s.certificate);
          if (!confirm(`Apagar TODOS os registros de ${del.dataset.name} (${del.dataset.email})?\n\n` +
            `Serão removidos ${n} módulo(s)${hasCert ? ' e o certificado emitido' : ''}. Isso não pode ser desfeito.`)) return;
          try {
            const res = await PortalApi.instructorDelete({ password: pass, email: del.dataset.email });
            flash(`🗑 ${del.dataset.name} removido: ${res.deleted.results} registro(s)${res.deleted.certificates ? ' e ' + res.deleted.certificates + ' certificado(s)' : ''}.`);
            await refreshStudents();
          } catch (e2) {
            if (isAuthError(e2)) return authExpired();
            flash('');
            alert('Não foi possível apagar: ' + e2.message);
          }
          return;
        }
        const btn = e.target.closest('.reg-btn');
        if (!btn) return;
        openReg({ name: btn.dataset.name, email: btn.dataset.email, company: btn.dataset.company });
      });
    }).catch((e) => {
      if (e.code === 'access_denied' || e.code === 'invalid_credentials') {
        sessionStorage.removeItem(SS_INSTR);
        renderInstrLogin();
        const err = $('#instr-error');
        if (err) { err.textContent = 'A senha não é mais válida. Entre novamente.'; err.hidden = false; }
        return;
      }
      $('#instr-content').innerHTML = `<div class="sync local">⚠️ ${esc(e.message)}</div>
        <div class="lesson-nav center"><button class="btn ghost" id="instr-reload">Tentar novamente</button></div>`;
      $('#instr-reload').addEventListener('click', () => renderInstrDash(pass));
    });
  }

  // ---------- init ----------
  window.addEventListener('hashchange', route);
  load();
  route();
  if (student) syncCloud().then(() => { if (location.hash === '#/painel' || !location.hash) renderDashboard(); });
})();
