# Magento Queries


## EAV Product Attributes

> Uncomment `store_id` lines to filter by specific store view.

**EE (uses `row_id`):**

```sql
SELECT 
    e.entity_id, 
    e.sku, 
    attr_name.value AS product_name,
    attr_price.value AS price
FROM catalog_product_entity AS e
LEFT JOIN catalog_product_entity_varchar AS attr_name 
    ON e.row_id = attr_name.row_id AND attr_name.attribute_id = (
        SELECT attribute_id FROM eav_attribute WHERE attribute_code = 'name' AND entity_type_id = 4
    ) -- AND attr_name.store_id = 0
LEFT JOIN catalog_product_entity_decimal AS attr_price 
    ON e.row_id = attr_price.row_id AND attr_price.attribute_id = (
        SELECT attribute_id FROM eav_attribute WHERE attribute_code = 'price' AND entity_type_id = 4
    ) -- AND attr_price.store_id = 0
;
```

**CE (uses `entity_id`):**

```sql
SELECT 
    e.entity_id, 
    e.sku, 
    attr_name.value AS product_name,
    attr_price.value AS price
FROM catalog_product_entity AS e
LEFT JOIN catalog_product_entity_varchar AS attr_name 
    ON e.entity_id = attr_name.entity_id AND attr_name.attribute_id = (
        SELECT attribute_id FROM eav_attribute WHERE attribute_code = 'name' AND entity_type_id = 4
    ) -- AND attr_name.store_id = 0
LEFT JOIN catalog_product_entity_decimal AS attr_price 
    ON e.entity_id = attr_price.entity_id AND attr_price.attribute_id = (
        SELECT attribute_id FROM eav_attribute WHERE attribute_code = 'price' AND entity_type_id = 4
    ) -- AND attr_price.store_id = 0
;
```

---

## Message Queue

> Check the status of messages in the queue.

```sql
SELECT
    queue_message.id,
    queue_message.topic_name,
    queue_message_status.updated_at,
    queue_message_status.status,
    queue_message_status.number_of_trials
FROM queue_message
LEFT JOIN queue_message_status ON queue_message.id = queue_message_status.message_id
ORDER BY queue_message.id DESC
LIMIT 100;
```

**`status` values:**

| Value | Constant | Description |
|---|---|---|
| `2` | `MESSAGE_STATUS_NEW` | Queued, not yet processed |
| `3` | `MESSAGE_STATUS_IN_PROGRESS` | Currently being processed |
| `4` | `MESSAGE_STATUS_COMPLETE` | Successfully processed |
| `5` | `MESSAGE_STATUS_RETRY_REQUIRED` | Failed, scheduled for retry |
| `6` | `MESSAGE_STATUS_ERROR` | Failed, will not retry |
| `7` | `MESSAGE_STATUS_TO_BE_DELETED` | Marked for deletion |
