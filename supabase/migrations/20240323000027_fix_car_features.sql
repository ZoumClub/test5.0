-- Drop existing car_features table if it exists
drop table if exists car_features cascade;

-- Create car_features table with proper constraints
create table car_features (
  id uuid default gen_random_uuid() primary key,
  car_id uuid not null references cars(id) on delete cascade,
  name text not null,
  available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(car_id, name)
);

-- Add indexes
create index idx_car_features_car_id on car_features(car_id);
create index idx_car_features_name on car_features(name);

-- Enable RLS
alter table car_features enable row level security;

-- Create policies
create policy "Car features are viewable by everyone"
  on car_features for select
  using (true);

create policy "Authenticated users can manage car features"
  on car_features for all
  using (true)
  with check (true);

-- Create function to manage car features
create or replace function manage_car_features(
  p_car_id uuid,
  p_features jsonb
) returns void as $$
begin
  -- Delete existing features for the car
  delete from car_features where car_id = p_car_id;
  
  -- Insert new features
  insert into car_features (car_id, name, available)
  select 
    p_car_id,
    feature->>'name',
    (feature->>'available')::boolean
  from jsonb_array_elements(p_features) as feature;
end;
$$ language plpgsql security definer;

-- Grant execute permission to authenticated users
grant execute on function manage_car_features(uuid, jsonb) to authenticated;

-- Add default features to existing cars
insert into car_features (car_id, name, available)
select c.id, f.name, true
from cars c
cross join (
  values 
    ('Speed Regulator'),
    ('Air Condition'),
    ('Reversing Camera'),
    ('Reversing Radar'),
    ('GPS Navigation'),
    ('Park Assist'),
    ('Start and Stop'),
    ('Airbag'),
    ('ABS'),
    ('Computer'),
    ('Rims'),
    ('Electric mirrors'),
    ('Electric windows'),
    ('Bluetooth')
) as f(name)
on conflict (car_id, name) do nothing;