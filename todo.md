# EuroVest Feature Enhancement TODO

## Feature 1: Country-specific deposit methods on deposit page
- [x] Build `EV.depositMethods` module in app.js with per-country deposit options (crypto, SEPA, bank wires with country-specific IBAN/BIC instructions, local payment rails, card, mobile money where relevant)
- [x] Add "Gas fee on us" + "features unlock after first payment/loan fee" messaging to deposit page
- [x] Render each country's deposit methods visibly on the deposit page (cards per method with instructions/addresses)
- [x] Update `onDepositMethodChange`/`loadDeposit` to show country-aware method list

## Feature 2: Read & Print Rules & Regulations on user dashboard
- [x] Add Rules & Regulations page to user dashboard sidebar + page section
- [x] Create full rules & regulations content (printable, styled)
- [x] Add Print button (window.print with print CSS)
- [x] Add print CSS for clean printing

## Feature 3: Admin motivational SMS + email broadcasting with editable templates
- [x] Expand `EV.emailTemplates` with lots of new promotional + investment-advice + "why try investing" messages (43 templates total)
- [x] Make templates editable & saved to EV.store (admin can edit subject/body, persists)
- [x] Add admin "Motivational SMS Broadcast" section to send SMS to all/opted-in users
- [x] Templates delivered to email + dashboard professionally; SMS sent to opted-in users
- [x] Admin can edit all messages; show template editor UI

## Feature 4: Investment plans with term-based ROI (24/48h, weekly, monthly, quarterly, yearly)
- [x] Add `EV.investPlans` module: fast (24h/48h, min $200), weekly, monthly, quarterly, yearly with templated ROI
- [x] Add Investment Plans page to user dashboard (rebuild invest page or new "Plans" section)
- [x] Plan cards: term, min amount, ROI %, maturity, CTA to invest
- [x] Invest flow: choose plan, enter amount (min $200 for fast), creates investment + tx + maturity schedule
- [x] Active investments list with status/maturity/ROI
- [x] Admin can manage/edit plans (ROI %, min amount, description — with Save/Reset per plan)

## Verification & Polish
- [x] Test server runs, static files served (health endpoint OK, all pages HTTP 200)
- [x] Verify all new pages render without JS errors (user dashboard: overview, investment plans, deposit, rules — all OK; admin dashboard: templates, SMS broadcast, investment plans management, deposit bank editor — all OK)
- [x] Browser-verified: country-specific deposit methods render for France (6 methods), gas fee banner, auto-activation messaging, rules & regulations printable, 43 motivational templates with editor, SMS broadcast with {name} personalization, email+dashboard delivery confirmed, investment plan creation works ($200 accepted, $150 rejected for fast plans), admin plan management with editable fields
- [x] Final review & commit notes

## Deployment
- [x] GitHub: feature enhancement commit (a59e15d) pushed to frazierjoseph121112-dev/eurovest-investment
- [x] Emoji fix: replaced broken Python-style \U0001fXXXX escapes with actual emoji characters
- [x] Country flags: added BE and NL to all flags maps
- [x] Railway CLI login + project linked (laudable-kindness / eurovest-investment service)
- [x] railway.json + nixpacks.toml + package.json created
- [x] Deployed to Railway via `railway up --detach --yes` — status: Online
- [x] sync.js serverURL auto-detection fix (was empty string, sync disabled)

## Fix: User dashboard not updating after admin approval (cross-device sync)
- [x] Add a `pollServerStatus()` function to sync.js that re-pulls from server without the `_hydrated` guard
- [x] Add a `refreshUserStatus()` function that fetches `/api/key/users` and updates the current user in localStorage
- [x] Wire user dashboard to poll server every 10 seconds for account status changes
- [x] When status changes from pending → active, hide the pending banner + show toast notification + reload overview
- [x] When status changes from pending → rejected, show rejection banner + toast

## Fix: Real email notifications
- [x] Add `/api/email` endpoint to server.js that sends real emails via Resend API (using https module, zero new dependencies)
- [x] Add `/api/sms` endpoint to server.js that sends real SMS via Twilio (optional, needs env vars)
- [x] Modify `EV.mail.send()` in app.js to POST to `/api/email` endpoint (fire-and-forget, still stores local record)
- [x] Modify `EV.mail.sendSMS()` in app.js to POST to `/api/sms` endpoint
- [x] Server gracefully handles missing API keys (logs warning, returns ok with simulated=true)

## Deploy & Push
- [ ] Redeploy to Railway with all fixes
- [ ] Verify user dashboard auto-updates after admin approval
- [ ] Push all fixes to GitHub
