# AJ Webworks Landing Page PRD

## Original Problem Statement
Build a landing page for a website-selling business. Make it modern and simple, include gray and blue colors, implement the provided logo, place an immediate call to action at the top, avoid too much text, use a good amount of stock images, optimize for conversion rate, and include sections like About Us and Services. The name should be a placeholder while the business name is still being decided.

## User Choices
- Main CTA: Book a free consultation
- Lead capture: Name, email, and message form
- Current services: New Website Builds and Website Redesigns
- Tone: Premium and polished
- Final business name: AJ Webworks
- Logo: User-uploaded logo asset integrated in header and footer

## Architecture Decisions
- Frontend: React landing page using Tailwind CSS and existing Shadcn UI primitives for the lead form.
- Backend: FastAPI endpoint for lead capture at `/api/leads`.
- Database: MongoDB via existing `MONGO_URL`; lead responses exclude MongoDB `_id` to avoid serialization issues.
- API usage: Frontend posts to `${REACT_APP_BACKEND_URL}/api/leads` only.

## Implemented
- Premium gray/blue landing page with sticky header, logo, immediate CTA, hero lead form, social proof, services, about section, final CTA, and footer.
- Conversion-focused lead capture form with validation, success/error toast feedback, and field reset after submission.
- Lead persistence API with create/list endpoints and automated backend regression tests.
- Responsive behavior verified on desktop and mobile with no horizontal overflow.

## Validation
- Python and JavaScript lint checks passed.
- Backend curl/API tests passed.
- Playwright page, form, CTA, toast, and section navigation checks passed.
- Independent testing agent confirmed 100% backend/frontend pass rate.
- Regression suite: `/app/backend/tests/test_leads_api.py` passed 4/4.

## Prioritized Backlog
### P0
- Replace placeholder name once final business name is selected.
- Connect the lead form to the real sales/contact workflow if needed.

### P1
- Add testimonials or real client proof for stronger conversion.
- Add package/pricing preview cards if the business wants qualified leads.
- Add analytics tracking for CTA clicks and form submissions.

### P2
- Add FAQ section to handle buyer objections.
- Add case-study gallery when portfolio examples are available.
- Add richer page copy once brand positioning is final.

## Recent Update
- Final business name updated to AJ Webworks across the landing page header, footer, logo alt text, about copy, and product documentation.

## Recent Update - Web3Forms
- Connected the AJ Webworks consultation form to Web3Forms using the provided access key.
- The form now sends submissions through Web3Forms from the browser and also stores a backup lead in MongoDB through `/api/leads`.
- Server-side Web3Forms forwarding was tested and blocked by Web3Forms because their API requires client-side usage unless server IP whitelisting is enabled.

## Recent Update - Phone Field
- Added a phone number field to the AJ Webworks consultation form.
- Phone is included in Web3Forms submissions and stored with backup leads through `/api/leads`.
- Verified frontend visibility/fill behavior and backend regression tests.

## Recent Update - Services Focus
- Removed SEO / Google visibility from the Services section and related page copy.
- Services now focus only on website design/builds and website redesigns.
- Verified the live Services section shows only the two remaining service cards.

## Recent Update - Service Names and Comparison
- Renamed services to New Website Builds and Website Redesigns.
- Added a New Build vs. Redesign comparison section to help visitors choose the right path.
- Verified the services and comparison section on the live page.

## Recent Update - Hero Social Proof
- Added a compact social proof card inside the hero area so credibility appears near the top of the page.
- Reused the brand proof names in the main social proof band for consistency.
- Verified the hero social proof displays correctly on the live page.

## Recent Update - Star Review Social Proof
- Replaced brand-name social proof with 4.5 and 5.0 star review-style proof near the hero.
- Updated the lower proof band to show review cards with ratings, quotes, and reviewer roles.
- Verified the hero review proof displays correctly on the live page.

## Recent Update - Review Names
- Updated review cards to use human names: Amanda Brooks, Marcus Lee, and Priya Shah.
- Verified the review cards display the names correctly on the live page.

## Recent Update - Review Business Types
- Added short business types under each review name: Home services owner, Consulting founder, and Local retail operator.
- Verified the review cards display the business types correctly on the live page.

## Recent Update - Dual Web3Forms Recipients
- Added the second Web3Forms access key so each form submission is sent to both configured Web3Forms inboxes.
- Updated the success message to confirm delivery to both business inboxes.
- Verified a live dual Web3Forms submission and confirmed backup lead storage still works.

## Recent Update - Review Box Label
- Removed the “Social proof” label from the hero review box while keeping the star review text and ratings.
- Verified the hero review box no longer includes that label on the live page.

## Recent Update - SEO Keyword
- Added the keyword “website design and redesign services for small businesses” to the hero copy.
- Updated page title, meta description, meta keywords, and Open Graph metadata around the same keyword.
- Verified the keyword appears in the live page title and visible hero copy.

## Recent Update - FAQ Section
- Added a concise FAQ section covering timeline, redesigns, new build vs. redesign, and consultation-focused website goals.
- Included the keyword theme “website design and redesign services for small businesses” naturally in the FAQ copy.
- Verified the FAQ section displays correctly on the live page.

## Recent Update - GitHub Pages Static Version
- Created a separate GitHub Pages-friendly static site at the project root: `index.html`, `css/styles.css`, `js/main.js`, and `media/` subfolders.
- Preserved the existing React/FastAPI app files while adding the static export structure.
- Removed backend/Web3Forms dependency from the static version; consultation CTAs use `FORM_LINK_HERE` placeholders with HTML comments for adding a Google Form or other external form URL.
- Downloaded key media into local static folders under `media/images/`; `media/video/` and `media/icons/` folders are present for future assets.
- Verified the static page loads locally with the hero and services sections.

## Recent Update - Static Site Graphics
- Added more visual graphics to the GitHub Pages static site: hero decorative shapes, browser preview graphic, service icons, comparison accents, and a visual strategy showcase section.
- Kept graphics CSS-based and GitHub Pages-friendly with no extra platform dependency.
- Verified the static hero and new showcase graphics render correctly in browser.
