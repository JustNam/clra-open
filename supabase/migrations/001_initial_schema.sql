create table question_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  questions jsonb not null default '[]',
  created_at timestamptz not null default now()
);

create table interviews (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  interviewee text not null,
  notes text,
  question_template_id uuid references question_templates(id) on delete set null,
  created_at timestamptz not null default now()
);

create table problems (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table highlights (
  id uuid primary key default gen_random_uuid(),
  interview_id uuid not null references interviews(id) on delete cascade,
  problem_id uuid not null references problems(id) on delete cascade,
  quote text not null,
  created_at timestamptz not null default now()
);

-- Enable RLS on all tables
alter table question_templates enable row level security;
alter table interviews enable row level security;
alter table problems enable row level security;
alter table highlights enable row level security;

-- Allow authenticated users full access
create policy "authenticated users can do everything" on question_templates
  for all to authenticated using (true) with check (true);

create policy "authenticated users can do everything" on interviews
  for all to authenticated using (true) with check (true);

create policy "authenticated users can do everything" on problems
  for all to authenticated using (true) with check (true);

create policy "authenticated users can do everything" on highlights
  for all to authenticated using (true) with check (true);
