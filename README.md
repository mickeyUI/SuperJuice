# Solara Press Luxury Juice Landing Page

Premium single-page React/Vite landing page for a luxury juice shop, using TailwindCSS, Framer Motion, Lenis smooth scrolling, React Icons, and custom CSS.

## Commands

```bash
npm install
npm run dev
npm run build
```

## Suggested Structure

```text
public/
  videos/
    hero-juice.mp4
  images/
    menu-01.jpg
    menu-02.jpg
src/
  App.jsx
  index.css
  main.jsx
```

## Replacing Placeholder Assets

- Hero video: add your production video to `public/videos/hero-juice.mp4`, then update the `heroVideo` constant in `src/App.jsx` to `/videos/hero-juice.mp4`.
- Menu and best seller images: add client images to `public/images`, then replace the remote image URLs in the `menuItems` and `bestSellers` arrays.
- Brand content: edit the menu, FAQ, contact details, hours, address, and socials directly in `src/App.jsx`.
