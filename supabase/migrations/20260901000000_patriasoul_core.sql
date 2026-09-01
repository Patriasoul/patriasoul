-- Migration: centralni profil, rezultati, omiljena pitanja i javne rang-liste.
-- Primjenjuje se nakon povezivanja Supabase projekta s repozitorijem.
-- Namjerno idempotentna radi sigurnog ponovnog pokretanja.
\i supabase/schema.sql
