# Calzone Cards — Next.js Site

This is a ready-to-deploy Next.js + Tailwind site for Calzone Cards.
You can deploy from a phone using GitHub + Vercel.

## Quick start
1) Upload this folder to a new GitHub repo (drag & drop in the GitHub UI).
2) In Vercel, click New Project → Import the repo → Deploy.
3) In `app/page.tsx`, paste your Google Sheet CSV link at `SHEET_CSV_URL` and click Redeploy on Vercel.

### Google Sheet format
Headers: `name, condition, price, img, active`
Conditions: GEM, NM, EX, LP, MP, HP, DMG
Publish the sheet to the web as CSV and use that link.
