CREATE TABLE IF NOT EXISTS agents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  summary TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ailments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS agent_ailments (
  agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  ailment_id TEXT NOT NULL REFERENCES ailments(id) ON DELETE CASCADE,
  PRIMARY KEY (agent_id, ailment_id)
);

CREATE TABLE IF NOT EXISTS therapies (
  id TEXT PRIMARY KEY,
  ailment_id TEXT NOT NULL REFERENCES ailments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL REFERENCES agents(id),
  therapy_id TEXT NOT NULL REFERENCES therapies(id),
  requested_at TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL CHECK (status IN ('Requested', 'Confirmed', 'Declined', 'Completed')),
  created_at TEXT NOT NULL,
  idempotency_key TEXT NOT NULL UNIQUE
);

CREATE INDEX IF NOT EXISTS appointments_created_at_idx ON appointments(created_at DESC);
