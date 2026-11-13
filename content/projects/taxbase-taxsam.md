---
title: "Taxbase Taxsam.co"
summary: "An information tax centre platform with automated data processing, a Vue.js front end, and automated Selenium test coverage."
year: 2025
status: shipped
tags: ["rails", "vuejs", "tax", "testing"]
stack: ["Ruby on Rails", "PostgreSQL", "Redis", "Vue.js", "Selenium", "Bootstrap", "jQuery", "AWS Lightsail"]
links:
  - { label: "Taxsam.co", href: "https://taxsam.co/" }
image: "/projects/taxbase-taxsam.webp"
cover: "/covers/taxbase-taxsam.webp"
accent: "#0ea5e9"
---

The **Taxbase** information tax centre — the data side of Taxsam.co, where
tax information is structured, searched, and kept current.

### What it does

Rather than static pages, Taxbase is a platform: tax references and
announcements are modelled as data, processed automatically, and served
through an interface built for looking things up quickly.

- **Automated data processing** — the reference content is ingested and
  normalised by scheduled jobs rather than being maintained by hand.
- **Vue.js** for the dynamic front-end interactions, with **Bootstrap** and
  **jQuery** carrying the rest of the interface.
- **Selenium** for automated browser testing — the regression suite runs
  against real flows instead of only unit-level checks.

### Hosting

Deployed on **AWS Lightsail**, with **Redis** for caching and session
handling, and **PostgreSQL** as the primary store.

### Background

**Ruby on Rails** · **PostgreSQL** · **Redis** · **Vue.js** · **Selenium** ·
**AWS Lightsail** · **Bootstrap** · **jQuery**
