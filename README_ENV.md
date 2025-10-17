Environment variables (Vercel)
=================================

Which variables to set
- Server-only (Production & Preview):
  - DATABASE_URL: Postgres connection string (keep secret)
  - BETTER_AUTH_SECRET: Better Auth secret (keep secret)
  - BETTER_AUTH_URL: Full URL to auth server (https://...)
  - POLAR_ACCESS_TOKEN: Polar API token (keep secret)
  - POLAR_WEBHOOK_SECRET: Polar webhook secret (keep secret)
  - IMAGEKIT_PRIVATE_KEY: ImageKit private key (keep secret)
  - IMAGEKIT_URL_ENDPOINT: ImageKit URL endpoint (https://ik.imagekit.io/<id>)
  - IMAGEKIT_PUBLIC_KEY: ImageKit public key (server)

- Client (Public) (Production & Preview):
  - NEXT_PUBLIC_BETTER_AUTH_URL: public auth URL used in browser
  - NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: ImageKit endpoint (public)
  - NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: ImageKit public key (public)

Notes and gotchas
- Don't include inline comments on the same line as the value in Vercel (they will be part of the value). For example:
  - BAD: POLAR_ACCESS_TOKEN=abc123  # comment
  - GOOD: POLAR_ACCESS_TOKEN=abc123

- Our code accepts either `NEXT_PUBLIC_*` variants or server variants in many places. However the validator expects the listed names to exist; set both server and NEXT_PUBLIC variants where indicated to be safe.

Quick copy/paste for Vercel (replace the <> placeholders)

-- Copy each NAME=VALUE pair into Vercel's Environment Variables --
DATABASE_URL=postgresql://<user>:<pass>@<host>:5432/<db>
BETTER_AUTH_SECRET=<better_auth_secret>
BETTER_AUTH_URL=https://your-auth.example.com
POLAR_ACCESS_TOKEN=polar_oat_<token>
POLAR_WEBHOOK_SECRET=polar_whs_<secret>
IMAGEKIT_PRIVATE_KEY=private_<key>
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/<your_id>
IMAGEKIT_PUBLIC_KEY=public_<key>
NEXT_PUBLIC_BETTER_AUTH_URL=https://your-auth.example.com
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/<your_id>
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=public_<key>

Set Environment to: Production (and Preview if you want Preview deploys to work).
