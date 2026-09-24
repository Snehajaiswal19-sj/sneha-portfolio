# Sneha Jaiswal — Premium Developer Portfolio

A frontend-only portfolio built with semantic HTML, CSS and vanilla JavaScript.

## Folder structure

portfolio/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── chargeease.png
    ├── resume-analyzer.png
    ├── design-1.png
    ├── design-2.png
    ├── design-3.png
    └── design-4.png

## Run locally in VS Code

1. Extract the ZIP.
2. Open the `portfolio` folder in VS Code.
3. Install/use the **Live Server** extension.
4. Right-click `index.html` → **Open with Live Server**.
5. The portfolio will open in your browser.

You can also double-click `index.html`; the page is static. Live Server is recommended for the smoothest local development experience.

## Replace project/design images

Open `assets/`.

Replace these files while keeping the exact filenames:
- `chargeease.png` → ChargeEase screenshot
- `resume-analyzer.png` → AI Resume Analyzer screenshot
- `design-1.png` through `design-4.png` → your Canva/PPT screenshots

The HTML already points to those paths, so no code change is required if the filenames stay the same.

Recommended image approach:
- Project screenshots: wide 16:10 or 16:9 images.
- Design screenshots: 4:3 or portrait images are also supported.
- Compress large images before deployment for faster loading.

## GitHub Pages deployment

1. Create a GitHub repository, e.g. `portfolio`.
2. Upload `index.html`, `style.css`, `script.js`, and the `assets` folder.
3. Commit and push the files.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select your main branch and `/ (root)`.
7. Save.
8. GitHub will provide the Pages URL after deployment.

## Notes

- The 3D hero uses Three.js from a CDN. If the CDN is unavailable, the CSS-based hero still works.
- The site respects `prefers-reduced-motion`.
- External links are configured for GitHub, LinkedIn, ChargeEase Live Demo and email.
- No backend is required.
- The visual design intentionally avoids fake stats, testimonials, client logos, awards or work experience.


### Phone number
In `index.html`, search `+91 XXXXX XXXXX` and replace it with your number. Also change the nearby `tel:+91XXXXXXXXXX` to `tel:+91YOURNUMBER`. There is one phone entry in Contact.

### Certificates
Put your real PDF certificates in `assets/certificates/` with filenames `generative-ai-studio.pdf` and `prompt-engineering.pdf`. Clicking the certificate cards opens the PDF.
