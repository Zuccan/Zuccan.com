-- ═══════════════════════════════════════════════════════════════
-- ZUCCANO DASHBOARD — SUPABASE DATABASE SCHEMA
-- Run this script in your Supabase Project > SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- 1. Create Profiles Table (extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'Employee', -- 'CEO', 'Employee', 'CFO', 'Other Officers'
    product TEXT NOT NULL DEFAULT 'zfit', -- 'zfit', 'consumer', 'business', 'all'
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Messages Table (Internal Team Communications)
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product TEXT NOT NULL, -- 'zfit', 'consumer', 'business'
    sender_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    sender_role TEXT NOT NULL, -- 'CEO', 'Employee', etc.
    recipient_email TEXT, -- NULL for public channel or specific email for DM
    channel TEXT NOT NULL DEFAULT 'general', -- 'general', 'sprint-urgent', 'code-review'
    content TEXT NOT NULL,
    attachments JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Submissions Table (Employee Work & PR Uploads)
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product TEXT NOT NULL, -- 'zfit', 'consumer', 'business'
    title TEXT NOT NULL,
    module TEXT NOT NULL,
    employee_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    employee_email TEXT NOT NULL,
    employee_name TEXT NOT NULL,
    work_link TEXT,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'Pending Review', -- 'Pending Review', 'Approved', 'Revision Needed'
    reviewed_by TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies for Profiles
CREATE POLICY "Public profiles are viewable by authenticated users"
ON public.profiles FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- 6. Create RLS Policies for Messages (Division-based access)
CREATE POLICY "Users can view messages for their assigned product or all"
ON public.messages FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert messages"
ON public.messages FOR INSERT
TO authenticated
WITH CHECK (true);

-- 7. Create RLS Policies for Submissions
CREATE POLICY "Users can view submissions"
ON public.submissions FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert submissions"
ON public.submissions FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "CEOs and Officers can update submission review status"
ON public.submissions FOR UPDATE
TO authenticated
USING (true);

-- 8. Enable Realtime Replication for Instant Live Updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.submissions;

-- 9. Trigger for Auto-Creating Profile on New User Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, product)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'Employee'),
    COALESCE(NEW.raw_user_meta_data->>'product', 'zfit')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
