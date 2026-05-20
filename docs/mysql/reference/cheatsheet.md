# Cheatsheet

## CLI commands

```bash
# Connect
mysql -h<host> -u<user> -p<pass> <database>

# List databases
mysql -e "SHOW DATABASES;"

# Run SQL file
mysql -h<host> -u<user> -p<pass> <db> < script.sql

# Check version
mysql --version
```

---

## Info queries

```sql
SHOW DATABASES;
SHOW TABLES;
DESCRIBE users;
SHOW CREATE TABLE users;
SELECT VERSION();
SELECT DATABASE();
SELECT NOW();

-- Table size
SELECT
  table_name,
  ROUND((data_length + index_length) / 1024 / 1024, 2) AS size_mb
FROM information_schema.tables
WHERE table_schema = 'your_db'
ORDER BY size_mb DESC;
```

---

## Check GTID mode

```sql
SHOW VARIABLES LIKE 'gtid_mode';
SHOW VARIABLES LIKE 'gtid_purged';
SHOW MASTER STATUS;
```

> If `gtid_mode = OFF` — use `--set-gtid-purged=OFF` when dumping.
