---
title: "Inventory & Sales System"
summary: "An internal inventory and sales platform for a business client — designed with DFDs, then built on CodeIgniter."
year: 2018
status: shipped
tags: ["php", "codeigniter", "enterprise", "mysql"]
stack: ["PHP", "CodeIgniter", "MySQL", "jQuery", "AJAX", "Bootstrap"]
cover: "/covers/inventory-system.webp"
image: "/projects/inventory-system.webp"
links:
  - { label: "Studio", href: "https://41studio.co" }
accent: "#f59e0b"
---

A back-office system for a business client: stock levels, purchase orders,
sales records, and reports.

### The design work came first

Before writing code I mapped the system with **Data Flow Diagrams** and
**UML** class diagrams, and got them signed off. That was a habit from the
studio, and on this project it saved weeks — the first draft of the data
model had no clean way to represent a returned item, and it surfaced in the
diagram rather than in production.

### Features

- Product catalogue with stock tracking across multiple locations
- Purchase and sales workflows with printable reports
- Role-based access for staff and administrators
- Search and filtering that stayed fast as the catalogue grew

### Stack

PHP · CodeIgniter · MySQL · jQuery · AJAX · Bootstrap · UML · DFD
