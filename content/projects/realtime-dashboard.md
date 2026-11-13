---
title: "Real-Time Operations Dashboard"
summary: "An internal dashboard that pushed live operational data to the browser over WebSocket instead of polling."
year: 2022
status: shipped
tags: ["realtime", "nodejs", "dashboard", "websocket"]
stack: ["Node.js", "WebSocket", "Redis", "PostgreSQL", "React", "Chart.js"]
cover: "/covers/realtime-dashboard.webp"
image: "/projects/realtime-dashboard.webp"
links:
  - { label: "Company", href: "https://wellcode.io" }
accent: "#8b5cf6"
---

Built at Wellcode.io to replace a dashboard that refreshed every thirty
seconds and still showed stale numbers.

### How it works

1. A Node.js service subscribes to Redis pub/sub channels.
2. On a change, it pushes a compact payload to the browser over WebSocket.
3. The React client applies the patch to local state and re-renders.

```
PostgreSQL → Redis (pub/sub) → WebSocket service → Browser
```

### The part worth remembering

The first version reconnected in a loop and hammered the server every time a
client dropped. The fix was boring: exponential backoff, a heartbeat to
detect dead sockets, and a client-side sequence number to discard anything
that arrived out of order.

> WebSocket is a transport, not a source of truth. The database is.

### Stack

Node.js · WebSocket · Redis Pub/Sub · PostgreSQL · React · Chart.js
