# Self-hosted fonts

These are vendored deliberately. `next/font/google` fetches from
`fonts.googleapis.com` **at build time**, and when a request fails Turbopack
reports it as:

```
Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'
next/font/google queries have exactly one entry
```

which names a CSS module, not a network problem. It was intermittent — about
one cold build in three — and Vercel builds cold on every deploy, so it made
deploys a coin flip. Builds no longer touch the network for fonts.

| File | Family | Axis | Subset | Licence |
|---|---|---|---|---|
| `inter-latin-var.woff2` | Inter | `wght 100–900` | latin | OFL-1.1 |
| `inter-tight-latin-var.woff2` | Inter Tight | `wght 100–900` | latin | OFL-1.1 |
| `jetbrains-mono-latin-var.woff2` | JetBrains Mono | `wght 100–800` | latin | OFL-1.1 |

All three are variable fonts, so the whole weight range costs one file each —
132 KB in total, less than the separate static instances Google served for the
weights this site uses.

**Subset:** `latin` only. It covers everything on the site, accents included
(`Résumé` — U+00E9 falls inside U+0000–00FF). Adding a language that needs
`latin-ext`, Greek or Cyrillic means re-downloading with that subset.

`OFL.txt` is the SIL Open Font License 1.1, which governs all three families.

## Re-downloading

Wired up in `app/layout.tsx` via `next/font/local`. To refresh, request the
variable axis from the CSS API with a browser User-Agent (without one Google
returns TTF instead of WOFF2), take the `/* latin */` block, and save the URL
it points at:

```bash
curl -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
```
