# Selldone Storefront AI Guideline Pack

This folder is the source-derived guide for building a full-function Selldone storefront in any frontend framework. It is intended for AI agents and human developers who need to reproduce the official storefront behavior without being coupled to Vue, Vuetify, Vuex, or Selldone component packages.

## Start Here

Start with `00-ai-agent-entrypoint.md`. It defines the mandatory reading order, implementation sequence, endpoint rules, and completion criteria.

Use `https://xapi.selldone.com` as the default public storefront API base. Do not use backoffice/admin endpoints for customer storefront flows.

## Source Of Truth

| Layer | File or folder | Purpose |
|---|---|---|
| Mandatory entrypoint | `00-ai-agent-entrypoint.md` | Exact first steps for an AI agent building a storefront. |
| Documentation method | `00-documentation-plan.md` | How these docs were extracted and how to keep them updated. |
| Runtime architecture | `01-storefront-architecture.md` | Shop bootstrap, headers, state, auth, guest baskets, layout, overlays, localization, PWA. |
| Build workflow | `02-ai-build-guide.md` | Practical implementation order for a custom storefront. |
| Route model | `03-routing-and-url-patterns.md` | Framework-independent route hierarchy mapped to current Vue route paths. |
| API contract | `04-api-and-data-contracts.md` | XAPI rules, headers, auth, pagination, response/error shape, core endpoint contracts. |
| UI behavior | `05-ui-patterns.md` | Reusable storefront UI and UX patterns. |
| Feature checklist | `06-feature-inventory.md` | No-skip inventory of storefront surfaces and capabilities. |
| Implementation matrix | `07-module-implementation-matrix.md` | Module-by-module build map with routes, endpoints, source traces, and done criteria. |
| Section docs | `storefront/` | Human-readable behavior docs for major storefront sections, including product pricing, marketplace, checkout, payment, login, and account deep-dives. |
| Generated catalogs | `_generated/` | Route, source-module, API usage, full endpoint catalog, and endpoint supplement generated/extracted from source. |

## Primary Sources

| Source | Purpose |
|---|---|
| `src/Applications/Storefront` | Official storefront app entry, app shell, layout, router, pages, store, mixin, local components, languages, styles. |
| `@selldone/sdk-storefront/apis/XAPI.ts` | Source of full storefront XAPI endpoint templates. |
| `@selldone/sdk-storefront` | Typed storefront SDK wrappers and request/response hints. |
| `@selldone/components-vue/storefront` | Source behavior for reusable Vue storefront components used by the official app. |
| `@selldone/page-builder` | Page builder runtime used for landing pages, custom home pages, vendor pages, category pages, and product landing sections. |
| `@selldone/sdk-community` | Community API setup used by `/community` routes. |

## Generated Catalogs

| Catalog | What it provides |
|---|---|
| `_generated/route-index.md` | Current public route patterns, route names, components, behavior, and source lines. |
| `_generated/source-module-index.md` | Source file coverage for `src/Applications/Storefront`. |
| `_generated/api-usage-by-area.md` | XAPI builder usage grouped by storefront area and source file. |
| `_generated/api-url-builders.md` | First-pass generated full `https://xapi.selldone.com/...` endpoints, methods, auth notes, status, and source lines. |
| `_generated/api-url-builders-supplement.md` | Additional URL builders discovered by method-body scan, including basket item, payment, order action, waiting list, chat, and membership endpoints. |

## API Rules

- Runtime code must call full HTTP endpoints such as `GET https://xapi.selldone.com/shops/@{shop}/info`.
- Never invent generic endpoints such as `/api/products` or `/shops/{shop_id}/storefront/products`.
- Never use a builder name as the implementation contract. Resolve it to a full endpoint in `_generated/api-url-builders.md` or `_generated/api-url-builders-supplement.md`.
- For every feature, resolve exact calls through this chain: `06-feature-inventory.md` -> `07-module-implementation-matrix.md` -> `_generated/api-usage-by-area.md` -> `_generated/api-url-builders.md` -> `_generated/api-url-builders-supplement.md`.
- If an endpoint is not found in either endpoint catalog, record a documentation gap and do not fabricate the endpoint.

## Coverage Baseline

The generated baseline includes 63 route patterns, 158 XAPI URL builders: 119 first-pass endpoint rows plus 39 supplement rows, 63 observed API usages, and 185 storefront source files. Full coverage means every module in `06-feature-inventory.md` has a route or reachable UI, every route in `_generated/route-index.md` is handled, and every implemented network call uses a full endpoint from `_generated/api-url-builders.md` or `_generated/api-url-builders-supplement.md`.



