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
  service_category,
  project_tool,
  project_category,
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


CREATE TABLE certifications (
    "id" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
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

CREATE TABLE experiences (
    "id" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
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

CREATE TABLE projects (
    "id" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
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

CREATE TABLE services (
    "id" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL UNIQUE,
    "description" text,
    "price" numeric,
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE site_meta (
    "id" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "key" text NOT NULL,
    "type" text NOT NULL,
    "value" jsonb NOT NULL,
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE categories (
    "id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "name" text NOT NULL UNIQUE
);

CREATE TABLE modules (
    "id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" text NOT NULL UNIQUE,
    "inserted_at" timestamp with time zone DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE tools (
    "id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" text,
    "order_index" integer,
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);


CREATE TABLE contact_messages (
    "id" uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    "name" text NOT NULL,
    "email" text NOT NULL,
    "message" text NOT NULL,
    "read" boolean DEFAULT false,
    "responded" boolean DEFAULT false,
    "inserted_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE experience_category (
  experience_id uuid NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  category_id bigint NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  inserted_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  UNIQUE(experience_id, category_id)
);

CREATE TABLE experience_tool (
  experience_id uuid NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  tool_id bigint NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  inserted_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  UNIQUE(experience_id, tool_id)
);

CREATE TABLE project_category (
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  category_id bigint NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  inserted_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  UNIQUE(project_id, category_id)
);

CREATE TABLE project_tool (
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  tool_id bigint NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  inserted_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  UNIQUE(project_id, tool_id)
);

CREATE TABLE certification_module (
  certification_id uuid NOT NULL REFERENCES certifications(id) ON DELETE CASCADE,
  module_id bigint NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  inserted_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  UNIQUE(certification_id, module_id)
);


CREATE TABLE certification_project (
  certification_id uuid NOT NULL REFERENCES certifications(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  inserted_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  UNIQUE(certification_id, project_id)
);


CREATE TABLE certification_tool (
  certification_id uuid NOT NULL REFERENCES certifications(id) ON DELETE CASCADE,
  tool_id bigint NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  inserted_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  UNIQUE(certification_id, tool_id)
);

CREATE TABLE service_category (
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  category_id bigint NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  inserted_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  UNIQUE(service_id, category_id)
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
ALTER TABLE public.project_category ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tool ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_category ENABLE ROW LEVEL SECURITY;


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
    'project_category',
    'project_tool',
    'service_category'
  ]
  LOOP
    EXECUTE format($f$
      CREATE POLICY "Authenticated users can access %I" ON public.%I
        FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
    $f$, table_name, table_name);
  END LOOP;
END $$;

-- Reusable trigger function to update the updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to auto-update updated_at on row updates
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at
  BEFORE UPDATE ON public.certifications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at
  BEFORE UPDATE ON public.experiences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tools_updated_at
  BEFORE UPDATE ON public.tools
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_meta_updated_at
  BEFORE UPDATE ON public.site_meta
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_certification_module_updated_at
  BEFORE UPDATE ON public.certification_module
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_certification_project_updated_at
  BEFORE UPDATE ON public.certification_project
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_certification_tool_updated_at
  BEFORE UPDATE ON public.certification_tool
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at
  BEFORE UPDATE ON public.contact_messages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_experience_category_updated_at
  BEFORE UPDATE ON public.experience_category
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_experience_tool_updated_at
  BEFORE UPDATE ON public.experience_tool
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_modules_updated_at
  BEFORE UPDATE ON public.modules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_category_updated_at
  BEFORE UPDATE ON public.project_category
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_tool_updated_at
  BEFORE UPDATE ON public.project_tool
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_service_category_updated_at
  BEFORE UPDATE ON public.service_category
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
