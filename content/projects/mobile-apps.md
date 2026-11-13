---
title: "Cross-Platform Mobile Apps"
summary: "Shipping the same product to iOS and Android from one codebase with Flutter, sharing logic with the web backend."
year: 2023
status: shipped
tags: ["mobile", "flutter", "frontend"]
stack: ["Flutter", "Dart", "RESTful API", "MySQL", "MongoDB"]
links:
  - { label: "GitHub", href: "https://github.com/didirdt" }
image: "/projects/mobile-apps.webp"
cover: "/covers/mobile-apps.webp"
accent: "#8b5cf6"
---

Mobile work that shares its logic with the web backend — the same REST API,
the same authentication flow, two platforms.

### Flutter

The first app I shipped with Flutter taught me how much of a mobile codebase
is not UI. The interesting work was in offline storage, background sync, and
handling a session that expired mid-request.

### What I'd do differently

Set up crash reporting and a proper release pipeline *before* the first
release. Shipping to a store taught me that a build you cannot reproduce is a
build you cannot hotfix.

### Background

**Flutter** · **Dart** · **RESTful API** · **MySQL** · **MongoDB**
