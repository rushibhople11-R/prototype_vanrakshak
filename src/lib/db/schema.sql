-- VanRakshak SQLite Core Database Schema

CREATE TABLE IF NOT EXISTS nodes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    zone TEXT NOT NULL,
    firmware_version TEXT DEFAULT 'v1.2.4-tinyml',
    battery_pct INTEGER NOT NULL DEFAULT 100,
    battery_voltage REAL NOT NULL DEFAULT 3.32,
    solar_status TEXT CHECK(solar_status IN ('CHARGING', 'DISCHARGING', 'STANDBY', 'NIGHT')) DEFAULT 'STANDBY',
    status TEXT CHECK(status IN ('ONLINE', 'SLEEP', 'OFFLINE', 'ALERT')) DEFAULT 'ONLINE',
    last_seen_at TEXT NOT NULL,
    signal_rssi INTEGER DEFAULT -98,
    signal_snr REAL DEFAULT 7.5,
    is_simulated INTEGER NOT NULL DEFAULT 1,
    elevation_meters INTEGER DEFAULT 550,
    detection_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS threat_alerts (
    id TEXT PRIMARY KEY,
    node_id TEXT NOT NULL REFERENCES nodes(id),
    node_name TEXT NOT NULL,
    threat_type TEXT NOT NULL CHECK(threat_type IN ('CHAINSAW', 'AXE', 'HEAVY_VEHICLE', 'GUNSHOT', 'ANOMALY')),
    severity TEXT NOT NULL CHECK(severity IN ('CRITICAL', 'WARNING', 'INFO')),
    confidence REAL NOT NULL,
    sound_level_db REAL NOT NULL,
    detected_at TEXT NOT NULL,
    received_at TEXT NOT NULL,
    verification_status TEXT CHECK(verification_status IN ('PENDING', 'VERIFIED_THREAT', 'FALSE_POSITIVE', 'RESOLVED')) DEFAULT 'PENDING',
    verification_notes TEXT,
    verified_by TEXT,
    verified_at TEXT,
    frequency_peak_hz INTEGER DEFAULT 2400,
    duration_seconds REAL DEFAULT 10.0,
    is_simulated INTEGER NOT NULL DEFAULT 1,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS lora_packets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    raw_hex TEXT NOT NULL,
    node_id TEXT NOT NULL,
    packet_type TEXT NOT NULL,
    rssi INTEGER NOT NULL,
    snr REAL NOT NULL,
    frequency_mhz REAL DEFAULT 865.2,
    spreading_factor INTEGER DEFAULT 9,
    crc_valid INTEGER NOT NULL DEFAULT 1,
    received_at TEXT NOT NULL,
    is_simulated INTEGER NOT NULL DEFAULT 1,
    battery_mv INTEGER,
    solar_flag INTEGER,
    threat_class TEXT,
    confidence INTEGER,
    sound_level_db INTEGER,
    seq_number INTEGER
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action TEXT NOT NULL,
    details TEXT NOT NULL,
    actor TEXT NOT NULL DEFAULT 'System',
    created_at TEXT NOT NULL
);
