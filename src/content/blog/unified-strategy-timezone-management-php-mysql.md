---
title: PHP Timezone Guide
date: 2025-06-21T00:35:22.761Z
coverImage: /images/timezone-do-dont.png
description: A comprehensive guide for managing timezones in distributed PHP and MySQL applications, establishing a unified strategy based on UTC to eliminate common bugs and architectural flaws.
---

## Section 1: Foundational Principles of Time Management in Distributed Systems

### 1.1 The Two Forms of Time: Absolute vs. Civil (Wall Clock) Time
- **Absolute Time**: A single, unambiguous point on the universal timeline (e.g., Unix timestamp, ISO 8601 UTC). Use for historical events.
- **Civil Time**: Human-readable local time that varies by location (e.g., "9:00 AM" in Tokyo vs. London). Store for future or recurring events.

### 1.2 The UTC Imperative: A Single Source of Truth
- Store all historical data in UTC.
- Convert to local time only in the presentation layer.
- Simplifies sorting and comparison across distributed systems.

### 1.3 Offsets vs. IANA Timezone Identifiers
- Avoid static UTC offsets (e.g., "+08:00").
- Use IANA identifiers (e.g., `Asia/Tokyo`) for proper DST handling.

### 1.4 Storing Future and Recurring Events
- Store civil date, civil time, and timezone identifier separately.
- Resolve to UTC just-in-time using latest timezone rules.

## Section 2: The Database Layer: MySQL Best Practices

### 2.1 DATETIME vs. TIMESTAMP
| Feature | DATETIME | TIMESTAMP |
|--------|----------|-----------|
| Timezone Handling | Naive | Session-dependent conversions |
| Range | 1000–9999 | 1970–2038 |
| Use Case | Canonical UTC timestamp | Avoid for application data |

**Recommendation**: Use `DATETIME` for all absolute timestamps.

### 2.2 Schema Recommendations
| Concept | Columns | Example | Rationale |
|--------|---------|---------|-----------|
| Historical Event | `created_at DATETIME` | '2024-07-20 15:30:00' | UTC storage |
| Future Event | `event_start_local DATETIME`, `event_timezone VARCHAR` | '2025-07-04 19:00:00', 'America/Chicago' | Civil time with IANA zone |
| Recurring Event | `start_time TIME`, `timezone VARCHAR`, `recurrence_rule VARCHAR` | '09:00:00', 'Europe/Paris', 'FREQ=DAILY' | Scheduler resolves to UTC |
| Duration | `duration_seconds INT` | 3661 | Integer arithmetic |
| User Pref | `timezone VARCHAR` | 'Asia/Tokyo' | Display conversion |

### 2.3 Stack Configuration
- **MySQL**: Set `default-time-zone = '+00:00'`
- **Connection**: Always `SET time_zone = '+00:00'`
- **PHP**: Set `date.timezone = "UTC"` in php.ini

### 2.4 Database Functions
- Use `UTC_TIMESTAMP()` instead of `NOW()`.
- Use `CONVERT_TZ()` only during data migration.

## Section 3: PHP Best Practices

### 3.1 Environment
- Ensure `php.ini` has `date.timezone = "UTC"`

### 3.2 Use `DateTimeImmutable` + `DateTimeZone`
- Prefer immutable object to avoid side effects
- Always provide explicit timezone

### 3.3 Code Patterns
- Create UTC: `new DateTimeImmutable('now', new DateTimeZone('UTC'))`
- From input: `DateTimeImmutable::createFromFormat($format, $value, $tz)`
- From DB: `createFromFormat('Y-m-d H:i:s', $value, new DateTimeZone('UTC'))`
- Convert for display: `$utc->setTimezone($userTz)->format(...)`
- Convert for DB: `$local->setTimezone(new DateTimeZone('UTC'))->format('Y-m-d H:i:s')`

### 3.4 Immutability
- Avoid using `DateTime`
- Use `DateTimeImmutable` to prevent hidden side effects

## Section 4: Anti-Patterns and Fixes

### 4.1 Implicit DateTime and `date_default_timezone_set()`
- Forbid use of `date_default_timezone_set()`
- Always instantiate `DateTimeImmutable` with explicit `DateTimeZone`

### 4.2 Storing Dates as Text
- Never use `VARCHAR` to store dates
- Use `DATETIME` for validity and SQL support

### 4.3 Misusing TIME/DATETIME for Durations
- Store durations as `INT` seconds
- Format for display in PHP

## Section 5: Migration Plan

### 5.1 Phase 1: Audit
- Inventory all temporal columns (including string or numeric representations)
- Determine intended timezone
- Identify inconsistencies

### 5.2 Phase 2: Migrate
- Backup
- Add new columns
- Use `CONVERT_TZ()` or PHP for transformation
- Validate by comparing old and new columns
- Rename, deploy, clean up

### 5.3 Phase 3: Refactor PHP
- Replace `DateTime` with `DateTimeImmutable`
- Replace `NOW()` with `UTC_TIMESTAMP()`
- Eliminate `date_default_timezone_set()`

### 5.4 Phase 4: Validate
- Add tests around timezone correctness
- Manual end-to-end testing
- Add linters/static analysis for banned functions

## Section 6: Do’s and Don’ts Checklist

### Do’s
- Store UTC for all historical events
- Use `DATETIME` not `TIMESTAMP`
- Use `DateTimeImmutable` with `DateTimeZone`
- Convert only at presentation layer
- Store future events as civil time + timezone
- Store durations as integers
- Use `UTC_TIMESTAMP()` in SQL

### Don’ts
- Don’t store timestamps in local time
- Don’t use `TIMESTAMP` for app data
- Don’t use `DateTime` or global timezone changes
- Don’t use offsets like `-05:00`
- Don’t store dates as strings
- Don’t calculate timezones manually

## Conclusion

Timezone bugs stem from architectural inconsistency. Standardizing on UTC with IANA identifiers and clearly separating absolute vs. civil time eliminates ambiguity. This guide lays out the strategy, migration, and coding standards necessary to restore predictability, maintainability, and developer confidence in handling time in PHP and MySQL applications.
