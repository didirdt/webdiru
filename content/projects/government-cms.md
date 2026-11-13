---
title: "Government Web Platform CMS"
summary: "An enterprise content management system built for a government web platform, focused on scale, security, and administrative usability."
year: 2019
status: shipped
tags: ["rails", "cms", "government", "search"]
stack: ["Ruby on Rails", "PostgreSQL", "ElasticSearch", "Redis", "Bootstrap", "jQuery", "JavaScript"]
links:
  - { label: "GitHub", href: "https://github.com/didirdt" }
image: "/projects/government-cms.webp"
cover: "/covers/government-cms.webp"
accent: "#6366f1"
---

A content management system for a **government web platform**, built at
41Studio in Cimahi — my first full role on a production Ruby on Rails
codebase.

### Why a CMS for government

Government sites have a specific problem: the content changes constantly,
the people who publish it are not developers, and the site has to stay up
and stay secure. That rules out hand-edited templates and argues for
something that makes publishing safe and boring.

### What it does

- **Publishing workflow** for non-technical editors — structured content
  types instead of free-form HTML, so a page cannot be broken from the CMS.
- **Search** powered by **ElasticSearch**, because a site with this much
  content is unusable without it.
- **Redis** for caching and session handling, so the front end stays fast
  under traffic.

Enterprise-level scalability, security, and administrative usability were the
three goals the whole design was measured against.

### Background

**Ruby on Rails** · **PostgreSQL** · **ElasticSearch** · **Redis** ·
**Bootstrap** · **jQuery** · **JavaScript**
