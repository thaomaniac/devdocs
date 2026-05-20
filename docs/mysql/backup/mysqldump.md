# mysqldump

## Full Backup (recommended)

```bash
mysqldump -h<host> -u<user> -p<pass> \
  --single-transaction \
  --quick \
  --routines --triggers --events \
  --no-tablespaces \
  --set-gtid-purged=OFF \
  <database_name> \
  | sed -e 's/DEFINER[ ]*=[ ]*[^*]*\*/\*/' \
  | gzip > full_backup_$(date +%y%m%d).sql.gz
```

**Options:**

| Option | Description |
|---|---|
| `--single-transaction` | Dump without locking tables, DB stays operational |
| `--quick` | Stream rows one by one, avoids loading entire table into RAM |
| `--routines` | Export stored procedures & functions |
| `--triggers` | Export triggers |
| `--events` | Export scheduled events |
| `--no-tablespaces` | Skip tablespace info, avoids permission errors on restore |
| `--set-gtid-purged=OFF` | Omit GTID info from dump. Only safe when `gtid_mode = OFF` — use `AUTO` or omit this flag if GTID is enabled on the server |
| `sed DEFINER` | Strip DEFINER, avoids errors if the user doesn't exist on restore |

---

## Dump specific tables

```bash
mysqldump -h<host> -u<user> -p<pass> \
  --single-transaction \
  <database_name> <table1> <table2> \
  | gzip > partial_$(date +%y%m%d).sql.gz
```
