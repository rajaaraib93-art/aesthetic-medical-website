# Aesthetic Medical — Next.js + Sanity starter

A clean, mobile-responsive aesthetic medicine website inspired by the information architecture of AAAM (navigation, education/training, course listings, resources, trust signals and contact flows), but designed from scratch with a different visual system and component layout.

AAAM reference reviewed: https://www.aaamed.org/

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Sanity Studio 6
- next-sanity 13
- Plain CSS for a lightweight, dependency-minimal UI

## Run locally

Node 22.12+ is recommended by current Sanity Studio installation guidance.

```bash
npm install
cp .env.example .env.local
# Fill in your Sanity project id/dataset/token
npm run dev
```

Open http://localhost:3000.

The Sanity Studio is embedded at:

http://localhost:3000/studio

## Create/link the Sanity project

The quickest route is to run:

```bash
npx sanity@latest init
```

Or create a new Studio separately, then copy its project id/dataset into `.env.local`.

## Seed content

Create content in Studio for:

- Site Settings
- Services
- Courses
- Doctors / Faculty
- Testimonials
- Articles

The frontend contains polished fallback content so it still looks complete before Sanity is connected.

## Contact form

The contact form POSTs to `/api/contact`. With `SANITY_WRITE_TOKEN` configured it stores inquiries as `inquiry` documents in Sanity. Without a token the UI still responds safely with a configuration message.

## Sanity data model

The schemas live under `sanity/schemaTypes/` and are wired into `sanity.config.ts`.

## Production

1. Create your Sanity project and dataset.
2. Add the environment variables to Vercel/your host.
3. Add your frontend origin under Sanity CORS settings.
4. Deploy the app.
5. Deploy Sanity Studio with `npm run studio:deploy` if you want a separate `*.sanity.studio` editor URL; the embedded `/studio` route can also be used.

## Content architecture

Homepage
→ Hero → trust stats → services → featured courses → why choose us → faculty → testimonials → CTA

Primary pages
→ Services → service detail pages
→ Training & Courses → course detail pages (starter structure can be expanded)
→ About
→ Resources/Articles (schema included)
→ Contact

## Notes

This project intentionally does not copy AAAM's branding, wording, assets, or source code. It follows similar high-level information architecture patterns while using original styling and component structure.
