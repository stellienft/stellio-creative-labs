-- Add missing columns to blog_posts
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS date TEXT DEFAULT '';
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS read_time TEXT DEFAULT '3 min read';
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS gradient TEXT DEFAULT 'from-[#1a2a3a] to-[#0f1a24]';
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS ordering INTEGER DEFAULT 0;

-- Add missing columns to projects
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS year TEXT DEFAULT '2026';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT true;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS ordering INTEGER DEFAULT 0;

-- Create submissions table
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  name TEXT,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new','contacted','closed'))
);

-- Add site settings keys for GTM, GA4, Elastic Mail
INSERT INTO public.site_settings (key, value) VALUES 
  ('gtm_code', ''),
  ('ga4_code', ''),
  ('elastic_mail_api_key', ''),
  ('elastic_mail_from_email', 'hello@stellio.com.au'),
  ('elastic_mail_from_name', 'Stellio Creative Labs'),
  ('meta_description', 'Stellio Koutsis builds bold brands, smart websites, and AI-powered platforms.'),
  ('share_image_url', ''),
  ('favicon_url', '')
ON CONFLICT (key) DO NOTHING;

-- Enable RLS on submissions
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "Anon insert submissions" ON public.submissions FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Authenticated full submissions" ON public.submissions FOR ALL USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
