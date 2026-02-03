-- ==========================================
-- STORAGE SETUP (IDEMPOTENT)
-- Run this in Supabase SQL Editor
-- ==========================================

-- 1. Create Bucket 'vendor-docs'
-- "on conflict do nothing" checks if it already exists
insert into storage.buckets (id, name, public) 
values ('vendor-docs', 'vendor-docs', true)
on conflict (id) do nothing;

-- 2. Enable RLS (Safe to run multiple times)
alter table storage.objects enable row level security;

-- 3. Create Policies (Drop first to ensure clean state)

-- Upload Policy
drop policy if exists "Give public access to upload docs" on storage.objects;
create policy "Give public access to upload docs" 
on storage.objects for insert 
with check ( bucket_id = 'vendor-docs' );

-- Read Policy
drop policy if exists "Give public access to read docs" on storage.objects;
create policy "Give public access to read docs" 
on storage.objects for select 
using ( bucket_id = 'vendor-docs' );
