---
title: "Cross-Platform Mobile Apps"
summary: "Shipping the same product to iOS and Android from one codebase with Flutter and React Native."
year: 2023
status: shipped
tags: ["mobile", "flutter", "react-native"]
stack: ["Flutter", "Dart", "React Native", "REST API", "MySQL"]
links:
  - { label: "Portfolio", href: "https://github.com/your-handle" }
accent: "#10b981"
---

Mobile work that shares its logic with the web backend — the same REST API,
the same authentication flow, two platforms.

### Flutter

The first app I shipped with Flutter taught me how much of a mobile codebase
is not UI. The interesting work was in offline storage, background sync, and
handling a session that expired mid-request.

### React Native

Later work moved to React Native to share components with the existing React
web app. The win was real but narrower than expected: business logic and API
clients transferred cleanly, the view layer did not.

### What I'd do differently

Set up crash reporting and a proper release pipeline *before* the first
release. Shipping to a store taught me that a build you cannot reproduce is a
build you cannot hotfix.

### Stack

Flutter · Dart · React Native · REST API · MySQL · RESTful API
