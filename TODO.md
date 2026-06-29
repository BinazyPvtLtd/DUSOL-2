# TODO

## SEO fixes (Home page App Router)
- [x] Convert `app/page.jsx` to a **Server Component**.
- [x] Implement `export async function generateMetadata()` in `app/page.jsx` using `getHomePageDataAPI()` + `generateSEOMetadata()`.
- [x] Fetch home data once in `app/page.jsx` and pass as `initialData` to `app/HomeClient.jsx`.
- [x] Update `app/HomeClient.jsx` to remove homepage fetching from `useEffect` and rely on `initialData`.
- [ ] Keep course fetching in `useEffect` / tab handlers only (client-side interactivity).
- [x] Run `npm run build` (fails during prerender due to TLS cert altname mismatch when calling external API from `generateMetadata`).



