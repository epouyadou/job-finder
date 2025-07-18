CREATE OR REPLACE FUNCTION jobfinder.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now(); 
    RETURN NEW;
END;
$$ language 'plpgsql';