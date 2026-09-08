# Airbnb, AI-native — interactive prototype

Working demo of the home screen from my take-home design task: *re-imagine Airbnb as an AI-native app*.

**Live:** https://underseamouse.github.io/Viktor/

## The idea in one sentence

Airbnb where AI does two jobs — **understands what you are asking for** (Ask) and **runs errands for trips you already have** (Do) — while the home screen stays the Airbnb you know.

## What you can try

**Ask** — tap the search pill (or the *AI* chip)
1. Describe a trip in plain language, or pick a suggestion.
2. *Analysing your request…* → a brief the AI understood (editable) + 2–3 stays that fit.
3. Refine with one tap (*Something cheaper*, *With saunas*…) or type a follow-up.

**Do** — the agent works on your booked trip
1. The trip card suggests next actions. *Rent a car for that trip* creates a task.
2. *Working on it* shows every task with a status: Running → Needs your attention → Done.
3. *Review* opens the decision screen: the message sent on your behalf, the host's reply verbatim, the AI's summary, and three choices. Money is always a human decision.

Everything else (listings, tabs) shows a "not part of this prototype" toast on purpose.

## Stack

React 19 + Vite, plain CSS, no UI libraries. All "AI" behaviour is simulated with canned data in `src/data.js`, so copy and scenarios can be tuned without touching components.

```bash
npm install
npm run dev      # http://localhost:5173/Viktor/
npm run build    # static site in dist/
```

## Deploy

The live site is served by GitHub Pages from the `gh-pages` branch (built `dist/`, pushed by `npm run deploy`).
Pages was enabled automatically when that branch was first pushed; the source is visible under **Settings → Pages**.

Optional: `deploy/github-pages.yml` is a ready GitHub Actions workflow that builds and deploys on every push to `main`.
Move it to `.github/workflows/` with a token that has the `workflow` scope, and Pages switches to the Actions source automatically.

## Credits

Design and concept: Said Isaev. Implemented from the Figma file with Claude Code and the Figma MCP server; photos and icons are the assets from the design file. Airbnb Cereal is not bundled — Inter is used as the stand-in typeface.
