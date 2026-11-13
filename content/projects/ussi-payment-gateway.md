---
title: "USSI Payment Gateway Microservice"
summary: "A Go microservice that connects USSI's core banking platform to external payment gateways for e-money, game top-ups, and other services."
year: 2025
status: shipped
tags: ["golang", "microservice", "payment-gateway", "api"]
stack: ["Go", "MySQL", "REST API", "Postman", "Microservices"]
cover: "/covers/ussi-payment-gateway.webp"
image: "/projects/ussi-payment-gateway.webp"
links:
  - { label: "USSI Holding", href: "https://ussi.co.id/" }
  - { label: "Products", href: "https://www.ussi-software.com/" }
accent: "#0ea5e9"
featured: true
---

Work at **PT USSI Pinbuk Prima Software** in Bandung — an IT company that has been
digitalising Indonesian microfinance institutions since 1994. Their core product,
**IBS** (Integrated microBanking System), is the system of record for more than
1,700 BPR, BPRS, LPD, LKM, BMT, and cooperative offices across the country.

### The problem

IBS is a core banking system, not a consumer app. But customers wanted to pay
for things — e-money top-ups, game vouchers, utility bills — and none of those
merchants wanted to integrate with a core banking platform directly.

So the company app and the payment gateway had to meet somewhere. That
"somewhere" was this service.

### What I built

A **Go microservice** sitting between the two systems:

- **REST API** in front, with every endpoint documented and exercised through
  **Postman** collections so the integrations could be tested without a live
  gateway.
- **MySQL** for transaction records, reconciliation data, and the audit trail
  that a payment flow always needs.
- A single normalised vocabulary for transactions, so an e-money purchase and a
  game top-up look the same to the core system even though the upstream
  gateways disagree completely about status codes, error shapes, and what
  "pending" means.
- **Idempotency** on every write, because payment gateways retry. A customer
  must never be charged twice for one request.

### Why microservices

Each external gateway is a different beast with a different release cycle.
Keeping the gateway-specific parts in separate services meant a change at one
provider could never take down the others — and the core banking side stayed
completely unaware of how many providers were plugged in.

### The company

USSI Holding builds and supports software for the Indonesian microfinance
sector: IBS Core, IBS Mobile, IBS Branchless, mobile banking, virtual accounts,
merchant QRIS, disbursement, and e-payment services. The group is registered as
a PSE with Kominfo, supervised by OJK, and encrypts with AES 256 — which is the
baseline for anything touching customer money in that market.

### Stack

Go · MySQL · REST API · Postman · Microservices
