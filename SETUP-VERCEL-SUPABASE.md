# Rodar o Portal na Vercel + Supabase (migração a partir do Qoder Sites)

O front-end (`web/`) é estático e **não muda**. A lógica do backend
(`functions/handler.mjs`) foi **reaproveitada sem alteração** dentro de uma Edge
Function da Vercel (`api/app.ts`), que agora conversa com **o seu** projeto
Supabase. O site publicado no Qoder Sites continua no ar e intocado.

## O que é novo neste repositório
- `package.json`, `vercel.json`, `.env.example` — configuração do deploy Vercel.
- `api/app.ts` — Edge Function `/api/app`. O `vercel.json` redireciona
  `/functions/v1/app` → `/api/app`, então o front-end continua chamando o mesmo
  caminho.
- `supabase/migrations/0001_init.sql` — cria `training_results` e `certificates`
  com os índices/constraints que a lógica exige (ex.: único por `email,lesson_id`)
  e **ativa RLS negando acesso anônimo**.
- `supabase/migrations/0002_cert_per_course.sql` — certificado **por curso** (NR-01):
  adiciona as colunas de snapshot do curso/cadastro em `certificates` (curso, horas,
  datas, local, modalidade, instituição, responsável técnico, instrutor), o índice
  único `email,course_id` (idempotência) e cria `portal_settings` (cadastro da
  instituição editável na área do instrutor). Também ativa RLS negando acesso anônimo.
- `scripts/export-instructor-report.mjs` + `scripts/generate-seed.mjs` — exportam os
  dados atuais e geram um `seed.sql` reexecutável.

## Diferença de segurança (importante)
No Qoder Sites o banco era exposto ao navegador com grants anônimos. Aqui **só a
Edge Function acessa o banco**, com a `service_role key` guardada como variável de
ambiente da Vercel; o navegador nunca vê credencial. RLS fica ligado sem políticas,
de modo que a anon key sozinha não lê/escreve nada.

## Passo 1 — Criar o projeto Supabase
1. Acesse https://supabase.com e crie um projeto (região mais próxima).
2. Em **SQL Editor**, rode o conteúdo de `supabase/migrations/0001_init.sql` e,
   em seguida, `supabase/migrations/0002_cert_per_course.sql` (nessa ordem).
3. Em **Project Settings → API**, copie a **Project URL**, a **anon key** (não vai
   para o app, mas guarde) e a **service_role key**.

## Passo 2 — Variáveis de ambiente
Copie `.env.example` para `.env` (fica fora do git) e preencha:
```
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=chave-service-role
```
Estas duas variáveis também serão definidas na Vercel (Passo 4).

## Passo 3 — Migrar os dados atuais (opcional, recomendado)
> Os scripts **não** têm a senha do instrutor embutida; ela vem do ambiente. Nunca a
> escreva em arquivo nem a versione.

```bash
# 1) baixa training_results + certificates do site publicado no Qoder Sites
INSTRUCTOR_PASSWORD="a-se…dora" npm run export:data
# 2) gera supabase/seed.sql a partir do JSON exportado
npm run make:seed
# 3) cole o conteúdo de supabase/seed.sql no SQL Editor do Supabase e execute
```
O `seed.sql` é idempotente (`on conflict do nothing`), então pode rodar de novo sem
duplicar. Se quiser recomeçar do zero, pule este passo.

## Passo 4 — Subir no GitHub e conectar na Vercel
1. Confirme o repositório (o remote `origin` já aponta para `github.com`):
   ```bash
   git add package.json vercel.json .env.example api/ supabase/ scripts/ .gitignore SETUP-VERCEL-SUPABASE.md
   git commit -m "Adaptar para Vercel + Supabase (Edge Function, schema, seed)"
   git push
   ```
2. Em https://vercel.com → **Add New → Project** → importe o repositório do GitHub.
   - Framework Preset: **Other** (o `vercel.json` define `outputDirectory: web`).
   - Build Command / Output: já vêm do `vercel.json` — não precisa mudar.
3. Em **Settings → Environment Variables**, adicione `SUPABASE_URL` e
   `SUPABASE_SERVICE_ROLE_KEY` (valores do Passo 2). Faça **Redeploy**.

## Passo 5 — Testar
- Abra o domínio da Vercel. Faça um login de aluno, responda um quiz e emita o
  certificado.
- Na **Área do instrutor**, confirme que o relatório mostra o progresso.
- Se der erro, cheque: env vars presentes e redeploy feito; a migração SQL foi
  executada; a `service_role key` está correta (não a anon).

## Depois que a Vercel estiver OK
Este site passa a ser a versão principal. O Qoder Sites pode continuar no ar em
paralelo ou ser desativado — decisão sua; não remova nada sem você pedir.
