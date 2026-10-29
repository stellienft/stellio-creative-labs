-- Page views tracking table
CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  path TEXT NOT NULL,
  referrer TEXT DEFAULT '',
  user_agent TEXT DEFAULT '',
  screen_width INTEGER DEFAULT 0,
  session_id TEXT DEFAULT '',
  country TEXT DEFAULT '',
  utm_source TEXT DEFAULT '',
  utm_medium TEXT DEFAULT '',
  utm_campaign TEXT DEFAULT ''
);

-- Index for fast queries
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON public.page_views (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON public.page_views (path);
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON public.page_views (session_id);

-- RLS: anyone can insert (for tracking), only authenticated can read
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Anon insert page_views" ON public.page_views FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Authenticated read page_views" ON public.page_views FOR SELECT USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
