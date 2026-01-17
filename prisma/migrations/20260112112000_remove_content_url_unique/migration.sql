-- Remove unique constraint on Content.url to allow same content linked to multiple events
DROP INDEX IF EXISTS "Content_url_key";
