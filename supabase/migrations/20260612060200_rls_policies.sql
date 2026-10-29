-- Add public read policies for the new project tables

-- blog_posts: public can read published posts
DO $$ BEGIN
  CREATE POLICY "Public read published blog_posts" ON public.blog_posts FOR SELECT USING (status = 'published');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- blog_posts: authenticated users have full access
DO $$ BEGIN
  CREATE POLICY "Authenticated full blog_posts" ON public.blog_posts FOR ALL USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- projects: public can read published projects
DO $$ BEGIN
  CREATE POLICY "Public read published projects" ON public.projects FOR SELECT USING (published = true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- projects: authenticated users have full access
DO $$ BEGIN
  CREATE POLICY "Authenticated full projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- site_settings: public can read all settings
DO $$ BEGIN
  CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- site_settings: authenticated users have full access
DO $$ BEGIN
  CREATE POLICY "Authenticated full site_settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
