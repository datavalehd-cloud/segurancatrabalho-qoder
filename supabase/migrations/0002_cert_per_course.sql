-- Portal JL Consultoria — certificado por curso (NR-01) + cadastro da instituição.
-- Rode no SQL Editor do Supabase (ou `supabase db push`) após 0001_init.sql.
-- Colunas derivadas exatamente de functions/handler.mjs (único escritor dos dados).

-- ---------- certificates: snapshot do curso e do cadastro no momento da emissão ----------
alter table public.certificates add column if not exists course_id           text;
alter table public.certificates add column if not exists course_title        text;
alter table public.certificates add column if not exists hours               integer;
alter table public.certificates add column if not exists started_at          timestamptz;
alter table public.certificates add column if not exists finished_at         timestamptz;
alter table public.certificates add column if not exists location            text;
alter table public.certificates add column if not exists modality            text;
alter table public.certificates add column if not exists institution_name    text;
alter table public.certificates add column if not exists institution_cnpj    text;
alter table public.certificates add column if not exists institution_address text;
alter table public.certificates add column if not exists technical_name      text;
alter table public.certificates add column if not exists technical_registry  text;
alter table public.certificates add column if not exists instructor_name     text;
alter table public.certificates add column if not exists instructor_registry text;

-- Idempotência: um certificado por aluno + curso (o handler reutiliza o existente).
-- Linhas antigas têm course_id NULL; no Postgres NULLs são distintos, então não conflitam.
create unique index if not exists certificates_email_course_uidx
  on public.certificates (email, course_id);

-- ---------- cadastro da instituição / responsável técnico / instrutor ----------
-- Linha única (id = 'default'), gravada pela área do instrutor.
create table if not exists public.portal_settings (
  id                  text        primary key,
  institution_name    text        not null default '',
  institution_cnpj    text        not null default '',
  institution_address text        not null default '',
  technical_name      text        not null default '',
  technical_registry  text        not null default '',
  instructor_name     text        not null default '',
  instructor_registry text        not null default '',
  location            text        not null default '',
  modality            text        not null default '',
  hours_override      text        not null default '',  -- JSON: { courseId: horas }
  updated_at          timestamptz not null default now(),
  created_at          timestamptz not null default now()
);

-- ---------- segurança (RLS) ----------
-- Assim como as demais tabelas: só a Edge Function (chave de serviço) acessa.
alter table public.portal_settings enable row level security;
revoke all on public.portal_settings from anon, authenticated;
