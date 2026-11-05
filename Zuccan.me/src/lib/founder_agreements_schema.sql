-- =========================================================================
-- ZUCCANO FOUNDER AGREEMENTS TABLE — SUPABASE POSTGRESQL SCHEMA
-- =========================================================================

CREATE TABLE IF NOT EXISTS public.founder_agreements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    audit_event_id TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL,
    subsidiary TEXT NOT NULL,
    document_ref TEXT NOT NULL,
    version TEXT NOT NULL,
    timestamp_ist TEXT NOT NULL,
    timestamp_iso TIMESTAMPTZ DEFAULT NOW(),
    signature_data TEXT NOT NULL,
    status TEXT DEFAULT 'EXECUTED_AND_FILED',
    agreement_metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.founder_agreements ENABLE ROW LEVEL SECURITY;

-- Allow public submission from the signing portal
CREATE POLICY "Allow public insert to founder_agreements" 
ON public.founder_agreements FOR INSERT 
WITH CHECK (true);

-- Allow read access for corporate board administrators
CREATE POLICY "Allow read access to founder_agreements" 
ON public.founder_agreements FOR SELECT 
USING (true);
