-- Portal JL Consultoria — schema inicial para Supabase (Postgres padrão).
-- Rode este arquivo no SQL Editor do seu projeto Supabase (ou `supabase db push`).
-- Colunas/Tipos derivados exatamente de functions/handler.mjs (único escritor dos dados).

create extension if not exists pgcrypto;  -- gen_random_uuid()

-- ---------- resultados dos quizzes ----------
create table if not exists public.training_results (
  id            uuid primary key default gen_random_uuid(),
  student_name  text        not null,
  email         text        not null,
  company       text        not null default '',
  lesson_id     text        not null,
  score         integer     not null,
  total         integer     not null,
  passed        boolean     not null default false,
  completed_at  timestamptz not null default now(),
  created_at    timestamptz not null default now()
);

-- upsert do handler usa onConflict "email,lesson_id" -> exige índice único.
create unique index if not exists training_results_email_lesson_uidx
  on public.training_results (email, lesson_id);
create index if not exists training_results_email_idx
  on public.training_results (email);

-- ---------- certificados ----------
create table if not exists public.certificates (
  id            uuid primary key default gen_random_uuid(),
  code          text        not null unique,
  student_name  text        not null,
  email         text        not null,
  company       text        not null default '',
  issued_at     timestamptz not null default now(),
  created_at    timestamptz not null default now()
);

create index if not exists certificates_email_idx
  on public.certificates (email);

-- ---------- segurança (RLS) ----------
-- Diferença importante vs. Qoder Sites: aqui o navegador NÃO fala com o banco.
-- Só a Edge Function (chave de serviço, que ignora RLS) acessa os dados.
-- Habilitar RLS sem políticas nega qualquer acesso via anon/public key.
alter table public.training_results enable row level security;
alter table public.certificates   enable row level security;

-- Garantia extra: sem grants para o papel anônimo/authenticated.
revoke all on public.training_results from anon, authenticated;
revoke all on public.certificates     from anon, authenticated;
