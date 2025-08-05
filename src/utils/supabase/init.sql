-- ========================================================================
-- 📄 Supabase Schema Setup
-- This file:
-- 1. Drops all existing user-defined tables (if they exist)
-- 2. Drops all existing user-defined enums (if they exist)
-- 3. Recreates all tables cleanly with proper schema and defaults
-- 4. Enables Row Level Security (RLS) on all tables
-- 5. Defines policies:
--     - Public read access for selected tables (frontend use)
--     - Public insert-only access for contact_messages
--     - Full authenticated access for everything else
-- ========================================================================

-- 🔥 Drop existing tables to start fresh (in reverse dependency order)
DROP TABLE IF EXISTS 
  service_categories,
  projects_tools,
  projects_categories,
  modules,
  experience_tool,
  experience_category,
  contact_messages,
  certification_tool,
  certification_project,
  certification_module,
  site_meta,
  services,
  tools,
  experiences,
  projects,
  certifications,
  categories 
CASCADE;

-- 🔄 Drop Enums if they exist (to allow clean re-creation)
DROP TYPE IF EXISTS project_status CASCADE;
DROP TYPE IF EXISTS project_role CASCADE;
DROP TYPE IF EXISTS employment_type CASCADE;


-- ENUM: project_status
CREATE TYPE project_status AS ENUM (
  'Beta',
  'Live',
  'Archived',
  'In Development'
);

-- ENUM: project_role
CREATE TYPE project_role AS ENUM (
  'Solo Build',
  'Team Lead',
  'Collaborator'
);

-- ENUM: employment_type
CREATE TYPE employment_type AS ENUM (
  'Full-time',
  'Part-time',
  'Contract',
  'Internship'
);


CREATE TABLE "categories" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "name" text
);

CREATE TABLE "certification_module" (
    "certification_id" uuid NOT NULL,
    "module_id" bigint NOT NULL,
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "certification_project" (
    "certification_id" uuid NOT NULL,
    "project_id" uuid NOT NULL,
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "certification_tool" (
    "certification_id" uuid NOT NULL,
    "tool_id" bigint NOT NULL,
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "certifications" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "type" text NOT NULL,
    "title" text NOT NULL,
    "issuer" text NOT NULL,
    "start_date" text,
    "end_date" text,
    "grade" text,
    "description" text,
    "link" text,
    "featured" boolean DEFAULT false,
    "is_private" boolean DEFAULT false,
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "contact_messages" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" text NOT NULL,
    "email" text NOT NULL,
    "message" text NOT NULL,
    "read" boolean DEFAULT false,
    "responded" boolean DEFAULT false,
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "experience_category" (
    "experience_id" uuid NOT NULL,
    "category_id" uuid NOT NULL,
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "experience_tool" (
    "experience_id" uuid NOT NULL,
    "tool_id" bigint NOT NULL,
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "experiences" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "title" text NOT NULL,
    "company" text NOT NULL,
    "employment_type" employment_type NOT NULL,
    "start_date" text NOT NULL,
    "end_date" text,
    "location" text,
    "responsibilities" text[],
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "modules" (
    "id" bigint NOT NULL,
    "name" text NOT NULL,
    "inserted_at" timestamp with time zone DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "projects" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "title" text NOT NULL,
    "status" project_status NOT NULL,
    "role" project_role NOT NULL,
    "description" text NOT NULL,
    "longdescription" text,
    "cover_image" text,
    "link" text,
    "github" text,
    "featured" boolean DEFAULT false,
    "is_private" boolean DEFAULT false,
    "year" integer,
    "impact_note" text,
    "inserted_at" timestamp with time zone DEFAULT now(),
    "updated_at" timestamp with time zone DEFAULT now()
);

CREATE TABLE "projects_categories" (
    "project_id" uuid NOT NULL,
    "category_id" uuid NOT NULL,
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "projects_tools" (
    "project_id" uuid NOT NULL,
    "tool_id" bigint NOT NULL,
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "service_categories" (
    "service_id" uuid NOT NULL,
    "category_id" uuid NOT NULL,
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "services" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "description" text,
    "price" numeric,
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "site_meta" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "key" text NOT NULL,
    "type" text NOT NULL,
    "value" jsonb NOT NULL,
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "tools" (
    "id" bigint NOT NULL,
    "name" text,
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);


-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.certification_module ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certification_project ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certification_tool ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_category ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_tool ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;


-- Public READ only; everything else requires authentication
CREATE POLICY "Public can read categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can modify categories" ON public.categories
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Public can read certifications" ON public.certifications
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can modify certifications" ON public.certifications
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Public can read projects" ON public.projects
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can modify projects" ON public.projects
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Public can read experiences" ON public.experiences
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can modify experiences" ON public.experiences
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Public can read services" ON public.services
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can modify services" ON public.services
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Public can read site_meta" ON public.site_meta
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can modify site_meta" ON public.site_meta
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Public can read tools" ON public.tools
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can modify tools" ON public.tools
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Public can insert contact messages
CREATE POLICY "Public can insert contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

-- Authenticated users can update or delete (optional, if needed)
CREATE POLICY "Authenticated users can modify contact messages" ON public.contact_messages
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');


-- Only authenticated users can read/write
DO $$
DECLARE
  table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'certification_module',
    'certification_project',
    'certification_tool',
    'experience_category',
    'experience_tool',
    'modules',
    'projects_categories',
    'projects_tools',
    'service_categories'
  ]
  LOOP
    EXECUTE format($f$
      CREATE POLICY "Authenticated users can access %I" ON public.%I
        FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
    $f$, table_name, table_name);
  END LOOP;
END $$;
