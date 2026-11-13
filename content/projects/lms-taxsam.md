---
title: "LMS Taxsam.co"
summary: "A learning management system for tax education, with cloud hosting on AWS, Twilio notifications, and Gmail API communication."
year: 2025
status: shipped
tags: ["rails", "lms", "education", "aws"]
stack: ["Ruby on Rails", "PostgreSQL", "Redis", "Metronic 7", "DataTables", "AWS Lightsail", "Twilio", "Gmail API", "Webpack"]
links:
  - { label: "Taxsam.co", href: "https://taxsam.co/" }
  - { label: "Learning Center", href: "https://learning.taxsam.co/" }
image: "/projects/lms-taxsam.webp"
cover: "/covers/lms-taxsam.webp"
accent: "#f59e0b"
featured: true
---

The learning platform behind **Taxsam Learning Center**, where Indonesian tax
experts publish their courses. Built at Wellcode.io and run for the Taxsam
team.

### What it is

A complete LMS for tax education — course catalogue, video lessons,
enrolment, progress tracking, and the admin tooling to run it all. The
front end uses the **Metronic 7** admin theme with **DataTables** for the
data-heavy screens, and the asset pipeline is **Webpack**.

### The integrations

- **Twilio** for notifications — enrolment confirmations, reminders, and
  course announcements reaching students on their phone.
- **Gmail API** for communication management — bulk course mail and
  instructor replies, handled inside the app instead of through a separate
  third-party mailing service.
- **AWS Lightsail** for hosting — a small, predictable instance rather than
  an over-engineered setup for what is essentially a Rails app with a media
  library.

### Background

**Ruby on Rails** · **PostgreSQL** · **Redis** · **Metronic 7** ·
**DataTables** · **AWS Lightsail** · **Twilio** · **Gmail API** · **Webpack**
