-- DropIndex: Remove unique constraint on ExternalLink.url
DROP INDEX IF EXISTS "ExternalLink_url_key";
