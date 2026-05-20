# Performance

## Slow queries & processes

```sql
-- List running queries
SHOW FULL PROCESSLIST;

-- Kill a running query
KILL QUERY <process_id>;

-- Check slow query log config
SHOW VARIABLES LIKE 'slow_query%';
SHOW VARIABLES LIKE 'long_query_time';
```
