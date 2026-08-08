# Shelton Hotels Website v2.0

A premium, modern, and highly interactive static web application built for **Shelton Hotels Pakistan**. The website is designed to showcase the brand's portfolio of 24 properties across 10 signature destinations, offering direct communication, seamless browsing, and zero-fee bookings.

---

## 🛠️ Technology Stack
* **Markup**: Semantic HTML5 (SEO-optimized)
* **Styling**: Vanilla CSS3 (curated elegant color system, glassmorphism, responsive grid layout)
* **Logic**: Modern Vanilla JavaScript (ES6+, DOM-driven page compilation, event interception)
* **Animations**: CSS custom keyframes, scroll-triggered fade-ups via `IntersectionObserver`
* **Performance**: Lightweight client-side directory compilation, pre-populated direct booking generators

---

## ✨ Features
1. **Interactive Hotels Directory (`branches.html`)**:
   - Filterable directory matching cities (Islamabad, Rawalpindi, Peshawar, Lahore, Swat, Mardan, Bannu, Buner, Dera Ismail Khan, etc.).
   - Smart city group scrolling that automatically handles complex CSS ID selectors (e.g. D.I. Khan dots matching `#d.i.-khan`).
2. **Dynamic Hotel Details Page (`branch.html`)**:
   - Compiles hotel data dynamically on the fly based on query parameters.
   - Elegant hero area, room details, and feature icons.
   - **Tabbed Gallery**: Categorized photo gallery (Exterior, Lobby, Standard/Deluxe Rooms, Suites, Bathrooms, Dining, Conferences) with an integrated media lightbox preview.
3. **Resilient LocalStorage Fallback**:
   - Prevents blank page errors caused by server-side query parameter stripping (common in local dev servers clean URL rewrites).
   - Click tracking captures selected hotel IDs in `localStorage` and automatically restores `?id=<branchId>` to the address bar upon load using `window.history.replaceState`.
4. **Direct Booking Modal**:
   - Fully automated WhatsApp message template compiler and direct email composer. Allows guests to book directly with the front desk of each branch.

---

## 📸 Media Status (Missing/Pending Images)

The following properties currently **do not have photo assets** added or are pending further branch specifications from the client:

| City | Property Name | Status / Reason |
| :--- | :--- | :--- |
| **Lahore** | Shelton Boulevard Lahore | Photo assets missing in database |
| **Lahore** | Shelton Hotel Lahore | Photo assets missing in database |
| **Swat & Dir** | Shelton Kumrat Valley | Photo assets missing in database |
| **Swat & Dir** | Shelton Timergara | Photo assets missing in database |
| **Swat & Dir** | Shelton's TBD Upper Dir | **Pending** client details & photo assets |
| **Mardan** | Shelton Restaurant Mardan | Photo assets missing in database |
| **Bannu** | Shelton House Bannu | Photo assets missing in database |
| **Dera Ismail Khan** | Shelton Rezidor Hotel Dera Ismail Khan | Photo assets missing in database |
| **Buner** | Shelton Restaurant Buner | Photo assets missing in database |

All other properties are fully configured with complete multi-category photo galleries.

---

## ⚖️ License & Copyright

© 2026 Shelton Hotels. All rights reserved. 

No part of this website, code assets, designs, or image layouts may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the copyright owners.
