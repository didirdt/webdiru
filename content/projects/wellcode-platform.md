---
title: "Wellcode.io Platform"
summary: "Full-stack product engineering at Wellcode.io — Node.js APIs, React interfaces, and the realtime layer that held it together."
year: 2023
status: shipped
tags: ["nodejs", "react", "realtime", "aws"]
stack: ["Node.js", "React", "PostgreSQL", "Redis", "WebSocket", "AWS"]
links:
  - { label: "Company", href: "https://wellcode.io" }
accent: "#0ea5e9"
featured: true
---

Four years as a full-stack software engineer at **Wellcode.io**, working across
the whole product surface — from PostgreSQL schema design and REST APIs up to
the React screens customers actually used.

### What I owned

- **Backend services** in Node.js, with PostgreSQL for transactional data and
  Redis for caching, sessions, and queues.
- **Realtime updates** over WebSocket, so dashboards reflected live data
  instead of polling every few seconds.
- **The React front end**, including the shared component library and the
  form-heavy screens that every internal tool needed.
- **Deployment** on AWS — environments, releases, and the monitoring that
  tells you something broke before a customer does.

### The lesson I kept

Most of the real work was in the seams. The database was fine. The UI was
fine. What broke was the bit in between: a WebSocket that silently stopped
reconnecting, an N+1 query that only showed up at scale, an API that changed
shape and broke three screens nobody tested.

> After that, "does this fail loudly?" became a question I asked of every
> piece of code I wrote.

### Stack

Node.js · React · PostgreSQL · Redis · WebSocket · REST API · AWS · Git
