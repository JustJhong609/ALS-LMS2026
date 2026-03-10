# ALS-LMS 2026

**Alternative Learning System — Learning Management System**
District I, Manolo Fortich, Bukidnon

---

## Overview

ALS-LMS 2026 is a mobile-first learning management system built for the Alternative Learning System (ALS) program of **District I, Manolo Fortich, Bukidnon**. It supports three roles aligned with the actual ALS implementation structure: learners, volunteer implementers, and the ALS Mobile Teacher.

---

## Tech Stack

- **Framework:** Ionic React 8 + React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Charts:** Recharts
- **Routing:** React Router 5
- **Styling:** Custom CSS with design tokens

---

## Roles

### Student (Learner)
- Dashboard with ALS Learning Strands (LS 1–6) progress
- Functional Literacy Test (FLT) status, score breakdown, and classification
- Guided Learning / Challenge Mode pathway toggle
- Module viewer and strand-based assessments
- Accessibility settings (high contrast mode, adjustable font size)
- Profile with district info

### Implementer (Volunteer)
- Dashboard with assigned learner overview and intervention alerts
- Learner management with per-strand (LS 1–6) progress breakdown
- Resource sharing — supplementary materials and F2F session schedules
- FLT results viewer with classification per learner
- Profile with volunteer stats

### Teacher (ALS Mobile Teacher — District I)
- District-level dashboard with multi-center implementer overview
- Implementer management — view caseload, recommend content
- FLT oversight — district-wide classification distribution and completion by barangay
- Reports — Learning Strand averages, FLT trend charts, audit/compliance log
- Profile showing district stats (implementers, learners, FLT compliance)

---

## ALS Learning Strands

| Code | Strand |
|------|--------|
| LS 1 | Communication Skills in Filipino |
| LS 2 | Communication Skills in English |
| LS 3 | Mathematical and Problem Solving Skills |
| LS 4 | Life and Career Skills |
| LS 5 | Understanding the Self and Society |
| LS 6 | Digital Citizenship |

---

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

---

## Project Scope

- Scoped to **District I — Manolo Fortich, Bukidnon**
- Covers ALS BLP (Basic Literacy Program) and A&E (Accreditation and Equivalency) learners
- Text-to-Speech / Speech-to-Text: not yet included (planned for future release)
- Authentication is currently mock/frontend only

---

## Branch

Active development branch: `aligngment`
