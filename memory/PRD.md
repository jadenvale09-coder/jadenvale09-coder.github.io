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
