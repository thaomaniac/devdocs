# Drop All Tables

> Source: https://tableplus.com/blog/2018/08/mysql-how-to-drop-all-tables.html

## Steps

**1. Disable foreign key check:**

```bash
echo "SET FOREIGN_KEY_CHECKS = 0;" > ./temp.sql
```

**2. Dump DROP TABLE statements (no data):**

```bash
mysqldump --add-drop-table --no-data --no-tablespaces \
  -u[USER] -p[PASS] -h[HOST] -P[PORT] [DB_NAME] \
  | grep 'DROP TABLE' >> ./temp.sql
```

**3. Re-enable foreign key check:**

```bash
echo "SET FOREIGN_KEY_CHECKS = 1;" >> ./temp.sql
```

**4. Execute:**

```bash
mysql -u [USER] -p[PASS] [DB_NAME] < ./temp.sql
```
