# Axiom AI database

The Supabase project is the source of truth for the Axiom AI monitoring database.

## Contents

- `migrations/` — ordered schema changes already applied to the hosted project.
- `seed.sql` — the 11 tracked brands, 30 RU/EN prompts, and 3 AI providers used for local development.

## Local workflow

1. Install the Supabase CLI and Docker.
2. Run `supabase start` to start the local stack.
3. Run `supabase db reset` to recreate the local database from migrations and seed data.
4. Run tests before changing the hosted database.

Never run `supabase db reset --linked` against the hosted Axiom AI project. It is destructive.

## Access model

All seven application tables have RLS enabled. Direct `anon` and `authenticated` access is intentionally revoked; server-side code must use a protected server credential and must never expose the Supabase service-role key in browser code.

The `v_share_of_voice` view uses `security_invoker = true` and is readable by `service_role` only.

## Measurement policy

The database and dashboard can be developed with local fixtures and synthetic responses. Real OpenAI, Anthropic, and Perplexity API calls must remain disabled until the project owner approves the budget.
