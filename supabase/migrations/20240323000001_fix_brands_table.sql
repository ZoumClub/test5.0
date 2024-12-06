-- Drop existing tables if they exist
drop table if exists brands cascade;

-- Recreate brands table
create table brands (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  logo_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table brands enable row level security;

-- Create RLS policy for brands
create policy "Brands are viewable by everyone"
  on brands for select
  using (true);

-- Insert sample brands
insert into brands (name, logo_url) values
  ('BMW', 'https://images.unsplash.com/photo-1617886903355-9354bb57751f'),
  ('Mercedes-Benz', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8'),
  ('Audi', 'https://images.unsplash.com/photo-1610768764270-790fbec18178'),
  ('Toyota', 'https://images.unsplash.com/photo-1629897048514-3dd7414fe72a'),
  ('Honda', 'https://images.unsplash.com/photo-1618843479619-f3d0d81e4d10'),
  ('Ford', 'https://images.unsplash.com/photo-1612825173281-9a193378527e'),
  ('Volkswagen', 'https://images.unsplash.com/photo-1622353219448-46a009f0d44f');