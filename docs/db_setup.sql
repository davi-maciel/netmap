-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- People table (simplified - no separate profiles table)
CREATE TABLE public.people (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  bio TEXT,
  profile_picture_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Locations table
CREATE TABLE public.locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  person_id UUID NOT NULL REFERENCES public.people(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  connection TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_people_user_id ON public.people(user_id);
CREATE INDEX idx_locations_person_id ON public.locations(person_id);

-- Enable RLS
ALTER TABLE public.people ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

-- Simple RLS policies
CREATE POLICY "Users can manage own people"
  ON public.people
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own locations"
  ON public.locations
  USING (
    EXISTS (
      SELECT 1 FROM public.people
      WHERE people.id = locations.person_id
      AND people.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.people
      WHERE people.id = locations.person_id
      AND people.user_id = auth.uid()
    )
  );