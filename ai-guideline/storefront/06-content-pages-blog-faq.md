# Content Pages, Blog, And FAQ

Storefront content is dynamic. Do not implement these pages as static placeholders only.

## Routes

| Route | Purpose |
|---|---|
| `/pages/:page_name` | Page-builder page. |
| `/in/:path-:include_id` | Include/profile page. |
| `/blog` | Blog list. |
| `/team/:author-:author_id` | Author/team blog filter. |
| `/blog/:slug-:blog_id` | Blog detail by slug. |
| `/blog/:blog_id` | Legacy blog detail. |
| `/about-us` | Official about profile. |
| `/terms` | Terms profile. |
| `/privacy` | Privacy profile. |
| `/contact-us` | Contact profile and form. |
| `/faq/:tag?` | FAQ list by optional tag. |

## Page Builder

| Action | Endpoint |
|---|---|
| Page data | `GET https://xapi.selldone.com/shops/@{shop}/pages/{page_name}` |
| Include data | `GET https://xapi.selldone.com/shops/@{shop}/includes/{include_id}` |
| Page view stats | `POST https://xapi.selldone.com/shops/@{shop}/pages/{page_id}/view` |

Renderer requirements:

- Render sections/blocks from backend data.
- Apply page-specific styles safely.
- Support media from Selldone CDN fields.
- Preserve SEO metadata.
- Avoid unsafe arbitrary script unless environment explicitly supports it.

## Blog

| Action | Endpoint |
|---|---|
| Blog list | `GET https://xapi.selldone.com/shops/@{shop}/blogs` |
| Blog detail | `GET https://xapi.selldone.com/shops/@{shop}/blogs/{blog_id}` |

Blog requirements:

- List posts with pagination/load-more where supported.
- Support author/team route filter.
- Support slug detail and legacy id detail.
- Render article content, cover, author, publish date, tags/categories where present.
- Set SEO metadata from blog data.

## Official Profiles

| Page | Endpoint |
|---|---|
| About | `GET https://xapi.selldone.com/shops/@{shop}/profiles/{type}` |
| Terms | `GET https://xapi.selldone.com/shops/@{shop}/profiles/{type}` |
| Privacy | `GET https://xapi.selldone.com/shops/@{shop}/profiles/{type}` |
| Contact | `GET https://xapi.selldone.com/shops/@{shop}/profiles/{type}` |

Use the correct backend `{type}` for each official page.

## Contact

| Action | Endpoint |
|---|---|
| Submit contact message | `POST https://xapi.selldone.com/shops/@{shop}/contact-us` |

Validate required fields, show success/failure, and avoid duplicate submissions.

## FAQ

| Action | Endpoint |
|---|---|
| FAQ tags | `GET https://xapi.selldone.com/shops/@{shop}/faq/tags` |
| FAQ list | `GET https://xapi.selldone.com/shops/@{shop}/faq` |
| Ask question | `POST https://xapi.selldone.com/shops/@{shop}/faq/question` |

FAQ requirements:

- Optional tag route `/faq/:tag?`.
- Tags navigation.
- Question list/search/filter if response supports it.
- Ask-question form.
- Empty state for no entries.

## Article Interactions

| Action | Endpoint |
|---|---|
| Like | `POST https://xapi.selldone.com/articles/{article_id}/like` |
| Star | `POST https://xapi.selldone.com/articles/{article_id}/star` |
| Claps | `POST https://xapi.selldone.com/articles/{article_id}/claps` |
| Report | `POST https://xapi.selldone.com/articles/{article_id}/report/{category}` |
| Add comment | `POST https://xapi.selldone.com/article/{article_id}/comment` |

Use these only when rendered content exposes article interaction features.

## Link Preview

`GET https://xapi.selldone.com/link-preview`

