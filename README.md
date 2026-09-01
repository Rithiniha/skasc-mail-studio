# SKASC Mail Studio

I already have a working SKASC Mail student email generator application.

IMPORTANT:
Do NOT rebuild the project from scratch.
Do NOT remove or break any existing functionality.
Inspect the current project first and upgrade the existing UI.

The current application works correctly, but the design feels too basic.

I want a major VISUAL upgrade while keeping the application relatively simple so performance and maintainability remain good.

The goal is:

"Simple functionality underneath, premium modern UI on top."

==================================================
1. VISUAL STYLE
==================================================

Transform the current design into a modern academic-tech product.

Use a sophisticated color palette:

- White
- Dark navy
- Indigo
- Blue
- Violet
- Soft gray

Use subtle blue/indigo/violet gradients.

Do not make the website overly colorful.

The design should feel:

- Premium
- Modern
- Clean
- Professional
- Academic
- Technology-focused

Avoid:
- Excessive neon
- Gaming-style UI
- Excessive glassmorphism
- Huge animations
- Clutter

==================================================
2. ANIMATED HOMEPAGE
==================================================

Upgrade the existing homepage.

Create a strong hero section:

"Your College Email,
Ready in Seconds."

Subtitle:

"Generate your SKASC student email using your name, initial and roll number."

Primary button:

"Generate Email"

Secondary button:

"View Accounts"

Add subtle animated background elements:

- Floating email icons
- Small particles/dots
- Soft gradient shapes
- Very subtle movement

Do not make the animation distracting.

Add smooth scroll-reveal animations throughout the homepage.

==================================================
3. NAVBAR
==================================================

Keep navigation simple.

Logo:

SKASC MAIL

Navigation:

Home
Generate
Accounts

Add a dark/light mode toggle.

On mobile use a hamburger menu.

Add smooth active-link animations.

==================================================
4. EMAIL GENERATOR
==================================================

KEEP THE EXISTING EMAIL GENERATION FUNCTIONALITY.

The user enters:

Full Name
Initial
College Roll Number

Generate:

name + initial + rollNumber + @skasc.ac.in

Example:

Rithu Kamal
K
23CS101

↓

rithuk23cs101@skasc.ac.in

Do not change the underlying generation logic unless necessary.

==================================================
5. LIVE EMAIL PREVIEW
==================================================

While the user types their information, display:

"Email Preview"

and dynamically show:

rithuk23cs101@skasc.ac.in

Animate the preview smoothly when it changes.

==================================================
6. GENERATION ANIMATION
==================================================

When the user clicks Generate Email, introduce a short 1–2 second animation.

Show:

Checking details...
Formatting email...
Creating email...
✓ Email ready

Then reveal the generated result card with a smooth fade/scale animation.

Do not make this animation long.

==================================================
7. GENERATED EMAIL CARD
==================================================

Create a visually impressive result card.

Heading:

"Your Email Is Ready"

Display:

Student Name
Roll Number
Email
Default Password

Add buttons:

Copy Email
Copy Password
Customize Email

When copied:

Change button to:

✓ Copied

Show a small toast notification.

Add a subtle success animation after generation.

==================================================
8. CUSTOM EMAIL
==================================================

KEEP THE EXISTING CUSTOMIZATION FUNCTIONALITY.

Allow the student to customize only the username.

Keep:

@skasc.ac.in

fixed.

Show live preview:

customusername@skasc.ac.in

Validate the username.

Allowed characters:

letters
numbers
.
_
-

Update the saved account when customization is completed.

==================================================
9. NEW FEATURE — DIGITAL EMAIL CARD
==================================================

Add one major new feature:

"Email Identity Card"

After generating an email, show a beautiful digital card.

Card should contain:

SKASC MAIL

STUDENT EMAIL ID

Student Name
Roll Number

studentemail@skasc.ac.in

Add a QR code containing the generated email address.

Buttons:

Copy Email
Download Card

The card should have a subtle premium gradient and clean design.

Animate the card into view after email generation.

Keep this feature simple and lightweight.

==================================================
10. QUICK STATISTICS
==================================================

Add a small statistics section.

Do NOT create a complex analytics dashboard.

Display only three cards:

Total Emails Generated
Customized Emails
Today's Emails

Calculate these values from the existing stored account data/localStorage.

Use animated number counters when the section becomes visible.

==================================================
11. HOW IT WORKS
==================================================

Add a simple animated section:

"How It Works"

Four steps:

01 Enter Details
02 Generate Email
03 Customize
04 Save

Use a clean timeline.

Desktop:
Horizontal

Mobile:
Vertical

Animate each step as it enters the viewport.

==================================================
12. FEATURES
==================================================

Add a compact feature section with 4–6 cards.

Use icons and short descriptions.

Features:

Fast Generation
Smart Formatting
Custom Email IDs
Secure Password
Digital Email Card
Easy Account Management

Use subtle hover animations.

==================================================
13. ACCOUNTS PAGE
==================================================

KEEP THE EXISTING ACCOUNTS PAGE AND DATA.

Do not rebuild its functionality.

Only improve its visual design.

Add:

- Better table styling
- Better cards on mobile
- Search if already available
- Hover effects
- Smooth row animations
- Clean empty state

Do not add complicated filters, charts or admin features.

==================================================
14. DARK MODE
==================================================

Add a polished dark mode.

Light:

White background
Dark text
Indigo/blue accents

Dark:

Deep navy/black background
White text
Dark cards
Indigo/blue accents

Save the user's theme preference.

Animate the theme transition.

==================================================
15. FOOTER
==================================================

Create a clean footer:

SKASC MAIL

"Student Email Management"

Navigation:

Home
Generate
Accounts

Keep it minimal.

==================================================
16. RESPONSIVE DESIGN
==================================================

Make everything fully responsive.

Test layouts conceptually for:

320px
375px
425px
768px
1024px
1440px

Mobile must have:

- No horizontal scrolling
- Touch-friendly buttons
- Stacked cards
- Responsive identity card
- Responsive navigation
- Proper typography
- Proper spacing

==================================================
17. ANIMATION RULES
==================================================

Use animations strategically.

Include:

- Hero entrance animation
- Scroll reveal
- Button hover
- Card hover
- Input focus
- Generation animation
- Result-card reveal
- Identity-card reveal
- Number counters
- Toast animations
- Theme transition

Keep animations smooth and professional.

Avoid excessive bouncing or distracting motion.

==================================================
18. IMPORTANT
==================================================

Preserve all existing working functionality.

Do not replace working email generation logic.

Do not replace the existing storage mechanism unnecessarily.

Do not introduce unnecessary new dependencies.

Do not create multiple complicated pages.

Keep the application lightweight.

Focus on making the EXISTING application look dramatically better.

The final result should feel like a polished modern student email platform rather than a basic form.

Prioritize visual quality, spacing, typography, animation and responsive design over adding lots of functionality.

Before finishing, check for:

- Console errors
- Broken buttons
- Broken routes
- Mobile overflow
- Animation glitches
- Incorrect email generation
- Data persistence issues
- Dark mode issues

Make sure the final application feels cohesive and production-quality.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d07f1b9c-458c-4cbd-854e-3924116bb832).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
