PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS assets (
  asset_id TEXT PRIMARY KEY,
  r2_key TEXT NOT NULL UNIQUE,
  public_url TEXT,
  original_filename TEXT NOT NULL,
  content_type TEXT NOT NULL,
  byte_size INTEGER NOT NULL DEFAULT 0,
  width INTEGER,
  height INTEGER,
  content_hash TEXT,
  asset_type TEXT NOT NULL DEFAULT 'image',
  topic TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'needs_review', 'approved', 'deprecated', 'archived')),
  focal_x REAL NOT NULL DEFAULT 0.5 CHECK (focal_x >= 0 AND focal_x <= 1),
  focal_y REAL NOT NULL DEFAULT 0.5 CHECK (focal_y >= 0 AND focal_y <= 1),
  copyright_owner TEXT,
  license_scope TEXT,
  source_url TEXT,
  seo_indexable INTEGER NOT NULL DEFAULT 0 CHECK (seo_indexable IN (0, 1)),
  metadata_json TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  approved_at TEXT,
  approved_by TEXT
);

CREATE TABLE IF NOT EXISTS asset_translations (
  translation_id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL,
  locale TEXT NOT NULL,
  alt_text TEXT,
  title TEXT,
  caption TEXT,
  description TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (asset_id) REFERENCES assets(asset_id) ON DELETE CASCADE,
  UNIQUE (asset_id, locale)
);

CREATE TABLE IF NOT EXISTS asset_relations (
  relation_id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('article', 'product', 'page', 'brand', 'team_member', 'factory', 'document')),
  entity_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('article_hero', 'product_primary', 'product_gallery', 'page_hero', 'card', 'open_graph', 'inline', 'document_preview')),
  canonical_url TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (asset_id) REFERENCES assets(asset_id) ON DELETE CASCADE,
  UNIQUE (asset_id, entity_type, entity_id, role)
);

CREATE TABLE IF NOT EXISTS asset_versions (
  version_id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL,
  replaces_asset_id TEXT,
  reason TEXT,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (asset_id) REFERENCES assets(asset_id) ON DELETE CASCADE,
  FOREIGN KEY (replaces_asset_id) REFERENCES assets(asset_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS asset_audit_log (
  event_id TEXT PRIMARY KEY,
  asset_id TEXT,
  event_type TEXT NOT NULL,
  actor TEXT,
  details_json TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (asset_id) REFERENCES assets(asset_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS sync_runs (
  sync_id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  started_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at TEXT,
  status TEXT NOT NULL CHECK (status IN ('running', 'succeeded', 'failed')),
  objects_seen INTEGER NOT NULL DEFAULT 0,
  objects_created INTEGER NOT NULL DEFAULT 0,
  objects_updated INTEGER NOT NULL DEFAULT 0,
  error_message TEXT
);

CREATE INDEX IF NOT EXISTS idx_assets_status_topic ON assets(status, topic);
CREATE INDEX IF NOT EXISTS idx_assets_r2_key ON assets(r2_key);
CREATE INDEX IF NOT EXISTS idx_assets_hash ON assets(content_hash);
CREATE INDEX IF NOT EXISTS idx_translations_locale ON asset_translations(locale);
CREATE INDEX IF NOT EXISTS idx_relations_entity ON asset_relations(entity_type, entity_id, role);
CREATE INDEX IF NOT EXISTS idx_relations_asset ON asset_relations(asset_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_article_hero ON asset_relations(entity_type, entity_id) WHERE role = 'article_hero';
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_product_primary ON asset_relations(entity_type, entity_id) WHERE role = 'product_primary';
