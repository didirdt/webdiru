---
title: "Network Monitor"
summary: "A small Linux service that watches hosts and services with SNMP and reports status changes in real time."
year: 2021
status: shipped
tags: ["python", "networking", "linux", "devops"]
stack: ["Python", "SNMP", "Linux", "MQTT", "Docker", "Grafana"]
links:
  - { label: "Source", href: "https://github.com/your-handle" }
accent: "#14b8a6"
---

A personal project that grew out of my networking background — from
**Teknik Komputer & Jaringan** at SMK Merdeka Bandung through to the Linux and
network administration work that came with the job.

### What it does

- Polls hosts over **SNMP** and checks TCP services
- Publishes state changes to MQTT rather than every reading
- Stores history so outages can be correlated after the fact

### Why MQTT

The first version posted every reading to a webhook. It worked, but it was
noisy and fragile. Switching to MQTT with a topic per host meant subscribers
only saw what they cared about, and the publisher stayed simple.

### Stack

Python · SNMP · MQTT · Linux · Docker · Grafana
