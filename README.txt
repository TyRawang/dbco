Deboski & Co. website (static)

Open index.html in a browser to preview, or upload the whole folder to any
static host. Keep the folders together so styles, photographs, and menus load.

Pages: 18, including the three service details and eight team profiles,
plus 404.html, robots.txt, and sitemap.xml.

Files you may edit:
  brand.css   Deboski colours and layout adjustments over the template styles
  site.js     Mobile menu accessibility (keyboard, Escape, focus handling)
  images/     Photographs, logos, favicon.png, og-image.jpg (social share image)

Before launch:
  - Canonical URLs, social tags, robots.txt, and sitemap.xml assume the site
    lives at https://deboski.com/. Update them if the domain differs.
  - 404.html uses root-relative links, so it only works when served from the
    site root. Point the host's "not found" page at it.
  - The contact page links to the form at https://deboski.com/contact/.
    Replace it with a working form if this site replaces deboski.com.

Stock photography (Pexels License: free for commercial use, no attribution
required). Each service photo has -800, default (1600), and -2400 versions:
  your-vision-secured              https://www.pexels.com/photo/8470031/
  protecting-those-who-protect-us  https://www.pexels.com/photo/8460371/
  legacy-beyond-wealth             https://www.pexels.com/photo/7477698/
  rockies-hero (Home, -1200/-3000; also og-image.jpg)
                                   https://www.pexels.com/photo/18777248/
  edmonton-office (Contact, -1200)  https://www.pexels.com/photo/9660884/
  calgary-office (Contact, -1200)   https://www.pexels.com/photo/31228635/
The stock photos share one colour grade so they feel like
a set: warm-neutral white balance, matched brightness, muted saturation,
shadows lifted toward the brand charcoal, and whites settling on the brand
cream (#fbf8f4). Grade any new photo the same way before adding it.

Team photos and collages are the client's own images,
re-exported from the originals on deboski.com. The client's old combined
city banner (images/edmonton-calgary.webp) is no longer used. The client's original home
photo is kept as images/deboski-mountain-hero.webp (1800x2122): to switch
back, point the home-hero_image in index.html at it and remove its srcset.

Layout based on the Ordway Webflow template (ordway-template.webflow.io).
Brand assets and content: https://deboski.com/
