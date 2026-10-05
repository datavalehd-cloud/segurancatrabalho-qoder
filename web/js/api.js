// Cliente HTTP do portal — chama a Function same-origin /functions/v1/app.
// Adaptado do helper requestJson (sem anotações TS). Nunca exibe erro bruto do servidor.
(function () {
  class ApiError extends Error {
    constructor(message, code, status = 0) {
      super(message);
      this.name = 'ApiError';
      this.code = code;
      this.status = status;
    }
  }

  const MESSAGES = {
    network_error: 'Não foi possível conectar ao serviço do site. Verifique sua conexão.',
    access_denied: 'Verifique seu acesso ao site e entre novamente.',
    invalid_response: 'O serviço do site retornou uma resposta inesperada.',
    invalid_input: 'Dados inválidos. Verifique as informações e tente novamente.',
    write_rejected: 'O registro foi recusado. Verifique os dados e tente novamente.',
    not_all_passed: 'Conclua e seja aprovado em todos os módulos antes de emitir o certificado.',
    database_request_failed: 'O banco de dados não respondeu. Tente novamente em instantes.',
    invalid_credentials: 'Senha incorreta. Tente novamente.',
    too_many_attempts: 'Muitas tentativas seguidas. Aguarde alguns minutos e tente de novo.',
    service_not_configured: 'A área do instrutor ainda não foi configurada pelo administrador do portal.',
    request_failed: 'A solicitação falhou. Verifique o estado atual antes de tentar novamente.'
  };

  async function requestJson(url, init = {}) {
    const headers = new Headers(init.headers);
    headers.set('Accept', 'application/json');
    let response;
    try {
      response = await fetch(url, { ...init, headers, credentials: 'same-origin' });
    } catch (error) {
      if (init.signal && init.signal.aborted) throw error;
      throw new ApiError(MESSAGES.network_error, 'network_error');
    }
    if (response.status === 401 || response.status === 403) {
      let code = 'access_denied';
      try { const d = await response.json(); if (d && typeof d.error === 'string') code = d.error; } catch {}
      const message = Object.prototype.hasOwnProperty.call(MESSAGES, code) ? MESSAGES[code] : MESSAGES.access_denied;
      throw new ApiError(message, code, response.status);
    }
    if (response.redirected || !(response.headers.get('content-type') || '').includes('application/json')) {
      throw new ApiError(MESSAGES.invalid_response, 'invalid_response', response.status);
    }
    let data;
    try { data = await response.json(); }
    catch { throw new ApiError(MESSAGES.invalid_response, 'invalid_response', response.status); }
    const body = data && typeof data === 'object' ? data : null;
    const code = body && typeof body.error === 'string' ? body.error
      : (!response.ok || (body && body.ok === false)) && body && typeof body.code === 'string' ? body.code
        : response.ok ? null : 'request_failed';
    if (!response.ok || (body && body.ok === false) || code) {
      const resolved = code || 'request_failed';
      const message = Object.prototype.hasOwnProperty.call(MESSAGES, resolved)
        ? MESSAGES[resolved] : MESSAGES.request_failed;
      throw new ApiError(message, resolved, response.status);
    }
    return data;
  }

  // Resultado de escrita desconhecido — nunca reenviar automaticamente.
  function isWriteOutcomeUnknown(error) {
    if (!(error instanceof ApiError) || error.status === 401 || error.status === 403) return false;
    if (error.code === 'write_rejected') return false;
    return ['network_error', 'invalid_response', 'write_result_unknown'].includes(error.code)
      || (error.status >= 500 && error.status < 600);
  }

  window.PortalApi = {
    ApiError, requestJson, isWriteOutcomeUnknown,
    saveResult(payload, signal) {
      return requestJson('/functions/v1/app?action=save_result', {
        method: 'POST', signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    },
    myResults(email, signal) {
      return requestJson('/functions/v1/app?action=my_results&email=' + encodeURIComponent(email), { signal });
    },
    issueCertificate(payload, signal) {
      return requestJson('/functions/v1/app?action=issue_certificate', {
        method: 'POST', signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    },
    instructorReport(password, signal) {
      return requestJson('/functions/v1/app?action=instructor_report', {
        method: 'POST', signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
    },
    instructorSaveResult(payload, signal) {
      return requestJson('/functions/v1/app?action=instructor_save_result', {
        method: 'POST', signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    },
    instructorDelete(payload, signal) {
      return requestJson('/functions/v1/app?action=instructor_delete', {
        method: 'POST', signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
  };
})();
