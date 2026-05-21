# PashuDrishti (पशु दृष्टि)

AI-powered image-based breed recognition system for Indian cattle and buffaloes — where ancient agricultural heritage meets cutting-edge AI.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/pashu-drishti run dev` — run the frontend (port 21907)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, TailwindCSS, shadcn/ui, Framer Motion
- Fonts: Playfair Display (headings), DM Sans (body), Cinzel (breed labels)
- API: Express 5
- AI: Anthropic Claude (claude-sonnet-4-6) via Replit AI Integrations — no API key needed
- File uploads: multer (memory storage, 10MB limit)
- Validation: Zod (zod/v4), drizzle-zod
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- No database — breed data is hardcoded in `artifacts/api-server/src/lib/breeds-data.ts`

## Where things live

- `lib/api-spec/openapi.yaml` — API contract (source of truth)
- `lib/api-client-react/src/generated/` — generated React Query hooks
- `lib/api-zod/src/generated/` — generated Zod schemas (used by server)
- `artifacts/api-server/src/lib/breeds-data.ts` — hardcoded database of 25 Indian breeds
- `artifacts/api-server/src/routes/breeds.ts` — GET /breeds, GET /breeds/:id, GET /stats
- `artifacts/api-server/src/routes/analyze.ts` — POST /analyze (Claude vision AI)
- `artifacts/pashu-drishti/src/` — React frontend

## Architecture decisions

- No database: breed data is stateless hardcoded JSON — easier to maintain and deploy
- Anthropic Claude via Replit AI Integrations: no user API key required, billed to Replit credits
- OpenAPI-first: all types generated from `lib/api-spec/openapi.yaml`
- File uploads via multer (memory storage) converted to base64 for Claude vision API
- Single-page app: all sections on one page with smooth scroll navigation

## Product

PashuDrishti lets users upload a photo of a cow or buffalo and instantly receive:
- Breed name (English + Hindi) with confidence score
- Origin state, species, purpose (dairy/draft/dual)
- Key physical traits, milk yield, conservation status
- Alternate breed suggestions
- Full breed profile from a database of 25 Indian breeds
- Filterable breed gallery with all 25 breeds

## Breeds Database (25 breeds)

**Cattle (15):** Gir, Sahiwal, Tharparkar, Red Sindhi, Kankrej, Ongole, Hallikar, Hariana, Deoni, Khillari, Amrit Mahal, Punganur (Endangered), Vechur (Endangered), Kangayam, Bargur (Endangered)

**Buffalo (10):** Murrah, Surti, Jaffarabadi, Bhadawari, Nili-Ravi, Pandharpuri, Nagpuri, Toda (Endangered), Mehsana, Marathwadi

## Gotchas

- `pnpm --filter @workspace/api-spec run codegen` must be run after any OpenAPI spec changes before the frontend can use new types
- The analyze route uses multer for multipart file uploads — Express JSON middleware does NOT parse multipart
- After adding new routes, restart the api-server workflow to rebuild and reload
- AI_INTEGRATIONS_ANTHROPIC_BASE_URL and AI_INTEGRATIONS_ANTHROPIC_API_KEY are auto-set via Replit AI Integrations — do not touch them
- The frontend sends FormData to /api/analyze with field name "image"

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See the `ai-integrations-anthropic` skill for Anthropic integration details
