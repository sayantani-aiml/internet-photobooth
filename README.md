# The Internet Photobooth 📸

A browser-only photobooth experience built with Next.js, TypeScript, Tailwind-style CSS, Framer Motion, the Web Camera API, and Canvas.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000 and allow camera access.

## Notes

- Camera photos are captured locally in the browser.
- The final strip is rendered locally with Canvas and downloaded as a JPEG.
- No backend or account is required.
- For production, serve over HTTPS because camera access requires a secure context (localhost works during development).
