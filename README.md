# 🏦 EuroVest — Investment Platform

**France 🇫🇷 & Italy 🇮🇹** — A multi-region investment platform built for European and global investors.

![EuroVest](https://img.shields.io/badge/EuroVest-Investment_Platform-0055A4)
![Languages](https://img.shields.io/badge/Languages-10-008C45)
![Loans](https://img.shields.io/badge/Loan_Types-12-blue)
![Portfolios](https://img.shields.io/badge/Portfolios-8-0A1A3F)

---

## 📋 Overview

EuroVest is a fully responsive, multi-language investment platform serving French and Italian markets with European and global investment opportunities. The platform includes a complete loan service, bank account verification, email/SMS notification system, motivational email templates, and admin/user dashboards.

## ✨ Features

### 🏦 Loans & Financing (12 Loan Types)
- Personal, Mortgage, Auto, Business, Student, Debt Consolidation
- Home Equity, Bridge, Equipment Financing, Credit Line, Green Energy, Medical
- Interactive loan detail page with specs, features, FAQ, and application process
- Full loan management in admin dashboard

### 📋 Registration & Bank Verification
- 5-step registration: Account → Identity → Bank Verification → Profile → Compliance
- Bank account verification with IBAN, BIC/SWIFT, bank name, account holder
- Country-specific bank details (France, Italy, Germany, EU)
- New accounts under **pending** status until admin approval
- Email acknowledgment on submission

### 📧 Email & SMS Notifications
- All user activities notify user email AND dashboard inbox
- All user activities also notify admin email log
- SMS notifications for key events (account approval)
- Admin Email & SMS Log section

### 🚀 Motivational Email Templates
- 10 pre-built motivational email templates
- Admin can send to single, multiple, or all users
- Personalized with {name} placeholders
- Delivered to user email AND dashboard in official EuroVest template

### 💼 Investment Portfolios (8 Portfolios)
- France: Conservative, Balanced, Growth
- Italy: Conservative, Balanced, Growth
- Euro Growth (Balanced + Growth)
- Global Growth
- Transaction generation includes all portfolio types

### 🌍 Multi-Language Support (10 Languages)
- English, Français, Italiano, Español, Deutsch, Português
- العربية, 中文, Русский, हिन्दी
- Admin always sees English; users see their selected native language

### 📱 Responsive Design
- Mobile hamburger menu on all public pages
- Dashboard sidebar toggle for mobile
- All service cards clickable with full detail pages
- Responsive CSS at 968px and 600px breakpoints

## 🗂️ Project Structure

```
invest-platform/
├── index.html              # Landing page
├── markets.html            # Markets & all services overview
├── loans.html              # Full loans service page (12 loan types)
├── portfolios.html         # Investment portfolios
├── about.html              # About EuroVest
├── register.html           # 5-step registration with bank verification
├── login.html              # User login
├── reset.html              # Password reset
├── receipt.html            # Transaction receipt
├── admin/
│   ├── dashboard.html      # Admin dashboard
│   └── login.html          # Admin login
├── user/
│   └── dashboard.html      # User dashboard
├── legal/
│   ├── terms.html          # Terms & Conditions
│   ├── privacy.html        # Privacy Policy
│   ├── risk.html           # Risk Disclosure
│   ├── aml.html            # AML / KYC
│   ├── cookies.html        # Cookie Policy
│   ├── fees.html           # Fee Schedule
│   ├── regulatory.html     # Regulatory Info
│   └── complaints.html     # Complaints Procedure
├── assets/
│   ├── css/
│   │   ├── style.css       # Main stylesheet
│   │   └── legal.css       # Legal pages stylesheet
│   ├── js/
│   │   ├── app.js          # Core application logic
│   │   └── translations.js # 10-language translation engine
│   └── images/             # Platform images
└── data/                   # Data files
```

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/frazierjoseph121112-dev/eurovest-investment.git
   ```
2. Navigate to the project directory:
   ```bash
   cd eurovest-investment
   ```
3. Open `index.html` in your browser, or serve locally:
   ```bash
   python3 -m http.server 8080
   ```
4. Visit `http://localhost:8080`

### Admin Access
- **URL:** `admin/dashboard.html` (or `admin/login.html`)
- **Email:** `admin@eurovest.eu`
- **Password:** `admin123`

## 🛠️ Technology Stack

- **Frontend:** Pure HTML5, CSS3, JavaScript (Vanilla)
- **Data Storage:** localStorage with `ev_` prefix
- **No backend framework** — fully static, deployable anywhere
- **Translation Engine:** Custom JS-based i18n with 10 languages

## 🎨 Design System

| Token | Color | Usage |
|-------|-------|-------|
| `--brand-blue` | `#0055A4` | French blue, primary actions |
| `--brand-green` | `#008C45` | Italian green, success states |
| `--brand-navy` | `#0A1A3F` | Deep navy, headers & hero |

## 📄 License

This project is proprietary. All rights reserved.

---

**EuroVest** — Invest Across Global Markets 🌍
