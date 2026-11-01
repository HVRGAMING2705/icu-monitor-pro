# icu-monitor-pro

Browser-based early deterioration risk estimator for ICU assessment practice.
**Demonstration project — not for clinical use.** No live patient feed is
connected, and no patient data is ever invented here.

Live site: https://icu-monitor-pro.vercel.app

## What actually works (v2.3.0)

- **Risk assessment form** — vitals, labs, comorbidities, interventions.
  Scoring runs against a configurable backend endpoint (default
  `http://localhost:8000/predict`); when no backend answers, a transparent
  rule-based demo score runs locally in the browser and says so.
- **Bed Board** — add beds, assign patient IDs, change bed status
  (Occupied / Vacant / Cleaning / Reserved), load a bed's patient into the
  assessment, remove beds. Starts empty; only holds what you type in.
- **Alerts** — created only from assessments you actually run that score
  MEDIUM or HIGH. Acknowledge stamps the real date/time. Filter by severity.
- **Threshold settings** — high/medium cutoffs that genuinely drive risk
  levels, alert creation, and alert filtering. Saved in your browser.
- **Export / clear** — export the board (beds, alerts, settings) as JSON;
  clear deletes everything stored locally.
- **Persistence** — beds, alerts, settings live in `localStorage` only.
  Nothing is sent to any server by this site. Works without any account.

## What a real live feed would need (not faked)

Real live vitals require hospital IT to provide all of these; until then
this site shows no live vitals and invents none:

1. A FHIR R4 server base URL with Observation read access.
2. OAuth2 / SMART-on-FHIR credentials issued by the hospital.
3. A device gateway or HL7v2 feed mapped to FHIR Observations.
4. That origin added to `connect-src` in `vercel.json`, plus CORS allowed
   for this site. Use "Test live-feed connection" on the Bed Board to check
   item 1 without fabricating data.

## Deploy

Static site, git-connected to Vercel: pushing to `main` deploys
automatically. No manual deploy step, no backend to run for the demo.
