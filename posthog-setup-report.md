# PostHog post-wizard report

The wizard has completed a deep integration of the **DevEvent** Next.js App Router project. Client-side analytics are initialized via `instrumentation-client.ts` (the Next.js 15.3+ pattern), which sets up PostHog with a reverse proxy through `/ingest` to avoid ad-blockers. Three key user engagement events are tracked: the homepage Explore CTA click, individual event card clicks with rich metadata (title, slug, location, date), and navbar link clicks with the clicked section label. Error tracking via `capture_exceptions` is also enabled globally. `Navbar.tsx` was converted to a client component to support click tracking.

| Event name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the 'Explore Events' CTA button on the homepage. | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on an event card; captures title, slug, location, and date. | `components/EventCard.tsx` |
| `nav_link_clicked` | User clicks a navbar link; captures the section label. | `components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/484000/dashboard/1758557)
- [Explore Events button clicks](https://us.posthog.com/project/484000/insights/yVXRAzBn)
- [Event card clicks over time](https://us.posthog.com/project/484000/insights/BPI2QsQG)
- [Most clicked events by title](https://us.posthog.com/project/484000/insights/KN5ZXnxi)
- [Event discovery funnel](https://us.posthog.com/project/484000/insights/plOtgWyW)
- [Nav link clicks by section](https://us.posthog.com/project/484000/insights/rgiG7KxI)

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
