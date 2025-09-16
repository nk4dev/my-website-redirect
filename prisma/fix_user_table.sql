-- Fix user table schema in Neon
ALTER TABLE IF EXISTS user
  ADD COLUMN IF NOT EXISTS email TEXT UNIQUE NOT NULL,
  ADD COLUMN IF NOT EXISTS password TEXT NOT NULL,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

-- Optionally, add id column if missing
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user' AND column_name='id') THEN
    ALTER TABLE user ADD COLUMN id UUID PRIMARY KEY DEFAULT gen_random_uuid();
  END IF;
END$$;