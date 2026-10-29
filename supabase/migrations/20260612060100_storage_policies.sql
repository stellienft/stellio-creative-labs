-- Storage policies for site-assets bucket

-- Allow public to read from site-assets bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true) ON CONFLICT DO NOTHING;

-- Public read policy
DO $$ BEGIN
  CREATE POLICY "Public read site-assets" ON storage.objects FOR SELECT USING (bucket_id = 'site-assets');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Authenticated upload policy
DO $$ BEGIN
  CREATE POLICY "Authenticated upload site-assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'site-assets' AND auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Authenticated delete policy
DO $$ BEGIN
  CREATE POLICY "Authenticated delete site-assets" ON storage.objects FOR DELETE USING (bucket_id = 'site-assets' AND auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
