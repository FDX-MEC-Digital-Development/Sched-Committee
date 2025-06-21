# PRD: Fatigue Page Revamp
**Last Updated:** May 30, 2025

## Project Status
* **Started:** May 30, 2025
* **Current Phase:** Initial Implementation
* **Overall Progress:** ~40% Complete

## 1. Introduction
This document outlines the requirements for revamping the Fatigue page within the Sched-Committee application. The goal is to transform the current single-scroll page into a more organized, menu-driven interface, providing pilots with easier access to critical fatigue-related information, checklists, and external resources as specified in the `fatigue-update-request.md` document.

## 2. Goals
*   Improve navigation and usability of the Fatigue page.
*   Provide a clear, structured menu for accessing different fatigue topics.
*   Integrate existing content and new information as per the user request.
*   Allow linking to both internal content sections and external resources.
*   Ensure changes are reflected in the main page navigation and the hamburger menu.

## 3. Target Users
*   Pilots seeking information on fatigue recognition, management, reporting, and related company policies.

## 4. Proposed Changes & Features (Development Tasks)

### Task 1: Design and Implement Main Fatigue Navigation Menu ✅
**Status:** Completed on May 30, 2025
*   **Description:** Create a new primary navigation menu component specifically for the revamped Fatigue page. This menu will be the main way users access different sections of fatigue information.
*   **Requirements:**
    *   The menu should be prominently displayed on the `pages/fatigue.vue` page.
    *   Menu items should be derived from the "Opening Page" list in `fatigue-update-request.md`:
        1.  Recognize Fatigue Checklist (Are you Cognitively Impaired?)
        2.  Ops Self-Assessment Checklist
        3.  IM SAFE Checklist
        4.  How To Call Out Fatigued Checklist (CARMA)
        5.  Trip Removal and Compensation
        6.  Reports (linking to DART and a specific article)
        7.  FRMC Home Page Link
        8.  FRMC Contact Info
        9.  (Placeholder) Link to articles? Or published pilot narrative? Or more data?
    *   Clicking a menu item should display the relevant content section on the page. External links should open in a new tab.
*   **Acceptance Criteria:**
    *   A visible menu is present on `pages/fatigue.vue`.
    *   Menu items correctly reflect the list from `fatigue-update-request.md`.
    *   Basic navigation functionality (to placeholder sections or actual content) is implemented for each menu item.
*   **Files to consider:** `pages/fatigue.vue`, create new component e.g., `components/fatigue/FatigueMainMenu.vue`.
*   **Reference:** `docs/fatigue-update-request.md` (Opening Page section)

### Task 2: Update Hamburger Menu with Fatigue Sub-Navigation ⏳
**Status:** Pending - Awaiting navigation system details
*   **Description:** Modify the existing application's hamburger menu (likely managed by `AppLayoutSidebar.vue` or a similar global component) to include a drop-down or sub-menu for the Fatigue section. This sub-menu should mirror the items in the new Main Fatigue Navigation Menu.
*   **Requirements:**
    *   The hamburger menu should feature a "Fatigue" item.
    *   This item, when activated, should reveal sub-menu links corresponding to the main fatigue navigation items (Task 1).
    *   Links should function identically to their counterparts in the main fatigue menu.
*   **Acceptance Criteria:**
    *   Fatigue sub-menu is present and functional in the hamburger menu.
    *   Sub-menu items match and link correctly like the main fatigue menu.
*   **Files to consider:** `components/AppLayoutSidebar.vue` (or equivalent), potentially `composables/useNavigation.ts`.
*   **Reference:** `docs/fatigue-update-request.md` (General request for hamburger menu update)

### Task 3: Integrate "Recognize Fatigue Checklist" Content ⏳
**Status:** In Progress - Title update needed
*   **Description:** Adapt the existing `FatigueRecognizeList.vue` component to serve as the content for the "Recognize Fatigue Checklist (Are you Cognitively Impaired?)" menu item.
*   **Requirements:**
    *   The content from `FatigueRecognizeList.vue` should be displayed when this menu item is selected.
    *   Ensure the title/caption within the displayed content reflects "Recognize Fatigue Checklist (Are you Cognitively Impaired?)".
    *   The component should be styled consistently with the new page layout.
*   **Acceptance Criteria:**
    *   `FatigueRecognizeList.vue` content is correctly displayed for this menu item.
    *   Title is updated as specified.
*   **Files to consider:** `components/fatigue/FatigueRecognizeList.vue`, `pages/fatigue.vue`.
*   **Reference:** `docs/fatigue-update-request.md` (Page 2, "Recognize Fatigue Checklist"; Page 5-6 for content details).

### Task 4: Create and Integrate "Ops Self-Assessment Checklist" Content ✅
**Status:** Completed on May 30, 2025
*   **Description:** Develop a new component or content section for the "Ops Self-Assessment Checklist".
*   **Requirements:**
    *   Create a new Vue component (e.g., `components/fatigue/FatigueOpsSelfAssessment.vue`).
    *   Populate with content based on "Operational Self-Assessment Checklist. Will you be fatigued during your next operating period?" from `docs/fatigue-update-request.md` (Page 3/Page 6-7).
    *   This content should be displayed when the "Ops Self-Assessment Checklist" menu item is selected.
*   **Acceptance Criteria:**
    *   New content/component for "Ops Self-Assessment Checklist" is created and displayed correctly.
*   **Files to consider:** Create `components/fatigue/FatigueOpsSelfAssessment.vue`, `pages/fatigue.vue`.
*   **Reference:** `docs/fatigue-update-request.md` (Page 2, "Ops Self-Assessment Checklist"; Page 6-7 for content details).

### Task 5: Create and Integrate "IM SAFE Checklist" Content ✅
**Status:** Completed on May 30, 2025
*   **Description:** Develop a new component or content section for the "IM SAFE Checklist".
*   **Requirements:**
    *   Create a new Vue component (e.g., `components/fatigue/FatigueIMSAFEChecklist.vue`).
    *   Populate with the "IM SAFE Checklist" details (Illness, Medication, Stress, Alcohol, Fatigue) from `docs/fatigue-update-request.md` (Page 7-8).
    *   This content should be displayed when the "IM SAFE Checklist" menu item is selected.
*   **Acceptance Criteria:**
    *   New content/component for "IM SAFE Checklist" is created and displayed correctly.
*   **Files to consider:** Create `components/fatigue/FatigueIMSAFEChecklist.vue`, `pages/fatigue.vue`.
*   **Reference:** `docs/fatigue-update-request.md` (Page 2, "IM SAFE Checklist"; Page 7-8 for content details).

### Task 6: Update and Integrate "How To Call Out Fatigued Checklist" (CARMA) ✅
**Status:** Completed on May 30, 2025
*   **Description:** Adapt the existing `FatigueCarmaChecklist.vue` component. This section should also include an external link to the CARMA article.
*   **Requirements:**
    *   The content from `FatigueCarmaChecklist.vue` should be displayed.
    *   Add a clearly visible link to the CARMA article: `https://fdx.alpa.org/Portals/7/Documents/communications/public/2024/10/2024-10-01-frmcpr.html?ver=BdymfIIe5yMZXtVZY5ihlA==`. This link should open in a new tab.
    *   The title should be "How To Call Out Fatigued Checklist" or similar, incorporating "CARMA".
*   **Acceptance Criteria:**
    *   `FatigueCarmaChecklist.vue` content is displayed.
    *   External link to CARMA article is present, functional, and opens in a new tab.
*   **Files to consider:** `components/fatigue/FatigueCarmaChecklist.vue`, `pages/fatigue.vue`.
*   **Reference:** `docs/fatigue-update-request.md` (Page 2, "How To Call Out Fatigued Checklist"; Page 4 for CARMA link).

### Task 7: Update and Integrate "Trip Removal and Compensation" Content ✅
**Status:** Completed on May 30, 2025
*   **Description:** Adapt the existing `FatigueTripRemovalExplanation.vue` component. This section should also include an external link to the Trip Removal PDF.
*   **Requirements:**
    *   The content from `FatigueTripRemovalExplanation.vue` should be displayed.
    *   Add a clearly visible link to the PDF: `https://fdx.alpa.org/Portals/7/Documents/Committees/fatigue/website-docs/2023-frmc-tripremoval.pdf?ver=6uTUizaUgQQuycePYoZdEg==`. This link should open in a new tab.
    *   The title should be "Trip Removal and Compensation".
*   **Acceptance Criteria:**
    *   `FatigueTripRemovalExplanation.vue` content is displayed.
    *   External link to the PDF is present, functional, and opens in a new tab.
*   **Files to consider:** `components/fatigue/FatigueTripRemovalExplanation.vue`, `pages/fatigue.vue`.
*   **Reference:** `docs/fatigue-update-request.md` (Page 2, "Trip Removal and Compensation"; Page 4 for PDF link).

### Task 8: Create "Reports" Section with External Links ✅
**Status:** Completed on May 30, 2025
*   **Description:** Create a new content section titled "Reports". This section will contain external links related to fatigue reporting.
*   **Requirements:**
    *   Create a new Vue component (e.g., `components/fatigue/FatigueReportsSection.vue`) or add directly to `pages/fatigue.vue`.
    *   Include an external link to DART: `https://dart.alpa.org/`.
    *   Include an external link to the reports article (June 2024): `https://fdx.alpa.org/Portals/7/Documents/communications/public/2024/06/2024-06-04-committeemessage-pr.html?ver=k1DPfbYS0PWpKUQh5-siLw==`.
    *   All external links must open in a new tab.
*   **Acceptance Criteria:**
    *   "Reports" section is created and displayed.
    *   Both external links are present, functional, and open in new tabs.
*   **Files to consider:** Create `components/fatigue/FatigueReportsSection.vue` (optional), `pages/fatigue.vue`.
*   **Reference:** `docs/fatigue-update-request.md` (Page 2, "Reports"; Page 4 for DART and article links).

### Task 9: Add "FRMC Home Page Link" ✅
**Status:** Completed on May 30, 2025
*   **Description:** Add an external link to the FRMC Home Page as a menu item that navigates the user to the external site.
*   **Requirements:**
    *   The link should point to `https://fdx.alpa.org/Committees/Fatigue-Risk-Management-Committee`.
    *   The link must open in a new tab.
    *   This should be a distinct item in the main fatigue menu.
*   **Acceptance Criteria:**
    *   FRMC Home Page link is present in the menu and functions correctly, opening in a new tab.
*   **Files to consider:** `pages/fatigue.vue` (for menu integration).
*   **Reference:** `docs/fatigue-update-request.md` (Page 3, "FRMC Home Page Link"; Page 4 for link).

### Task 10: Add "FRMC Contact Info" Section ✅
**Status:** Completed on May 30, 2025
*   **Description:** Create a section or integrate into an existing one the FRMC contact information.
*   **Requirements:**
    *   Display FRMC contact information. The `FatigueCarmaChecklist.vue` currently mentions `FedEx-FRMC@alpa.org`. Confirm if this is the complete contact info or if more is specified in `docs/fatigue-update-request.md` (Page 3).
    *   This should be a distinct item/section accessible from the main fatigue menu.
*   **Acceptance Criteria:**
    *   FRMC contact information is clearly displayed and accessible via the menu.
*   **Files to consider:** Create `components/fatigue/FatigueFRMCContact.vue` (optional), `pages/fatigue.vue`.
*   **Reference:** `docs/fatigue-update-request.md` (Page 3, "FRMC Contact Info").

### Task 11: Placeholder for Future Content ("Articles/Narrative/Data") ✅
**Status:** Completed on May 30, 2025
*   **Description:** Add a placeholder menu item and section for "Link to articles? Or published pilot narrative? Or more data?" as mentioned in `docs/fatigue-update-request.md`.
*   **Requirements:**
    *   Menu item should indicate that content is forthcoming or link to a placeholder section.
    *   Placeholder section should state that content is under development.
*   **Acceptance Criteria:**
    *   Placeholder menu item and section are present.
*   **Files to consider:** `pages/fatigue.vue`.
*   **Reference:** `docs/fatigue-update-request.md` (Page 3).

### Task 12: Refactor `pages/fatigue.vue` Layout ✅
**Status:** Completed on May 30, 2025
*   **Description:** Overhaul `pages/fatigue.vue` to remove the old single-scroll layout and implement a system to display content sections based on the new menu's selections.
*   **Requirements:**
    *   The page should primarily host the new main fatigue navigation menu (from Task 1).
    *   Implement logic (e.g., conditional rendering with `v-if`/`v-show`) to show the relevant content component/section when a menu item is clicked.
    *   Remove or re-purpose existing layout elements like `NavigationVertical` and the `fatigueNavigation` array as they are superseded by the new menu.
    *   Determine the placement or removal of existing components like `FatigueQuotes.vue`, `FatigueAssessmentDescription.vue`, and `FatigueExtensionConsiderations.vue` based on whether they fit into the new menu structure defined by `docs/fatigue-update-request.md`.
*   **Acceptance Criteria:**
    *   `pages/fatigue.vue` uses the new menu for navigation.
    *   Content sections are displayed dynamically based on menu selection.
    *   Old scrolling structure is replaced.
    *   A clear decision on the fate of `FatigueQuotes.vue`, `FatigueAssessmentDescription.vue`, and `FatigueExtensionConsiderations.vue` is implemented.
*   **Files to consider:** `pages/fatigue.vue`.

### Task 13: General Styling and UI Consistency ⏳
**Status:** In Progress - External link styling implemented, responsive design needs testing
*   **Description:** Ensure all new components, sections, and the menu adhere to the existing application's styling and UI/UX guidelines.
*   **Requirements:**
    *   Consistent fonts, colors, spacing.
    *   Responsive design for various screen sizes.
    *   Clear visual distinction for external links (e.g., an icon).
*   **Acceptance Criteria:**
    *   The revamped Fatigue page has a cohesive and professional look and feel, consistent with the rest of the application.

## 5. Technical Considerations
*   **Framework:** Nuxt 3 / Vue 3.
*   **State Management:** Use Vue's reactivity system for showing/hiding content sections.
*   **Component-Based Architecture:** Continue using Vue components for modularity.
*   **External Links:** Ensure all external links use `target="_blank"` and `rel="noopener noreferrer"`.
*   **PDF Handling:** Direct links to PDFs (opening in a new tab) are recommended.

## 6. Open Questions/Decisions from `docs/fatigue-update-request.md`
*   **Embedded PDFs:** The request asks "Is it ok to have embedded pdfs?".
    *   *PRD Recommendation:* Use direct links for simplicity. If embedding is a hard requirement, Task 7 complexity increases.
*   **Content for "Ops Self-Assessment Checklist":** `docs/fatigue-update-request.md` (Page 6-7) provides a title. If more detailed content is available, it should be provided.
*   **Specifics for "FRMC Contact Info":** `docs/fatigue-update-request.md` (Page 3) mentions "FRMC Contact Info". `FatigueCarmaChecklist.vue` has `FedEx-FRMC@alpa.org`. Confirm if this is the sole contact info.
*   **Content for "Articles/Pilot Narrative/More Data":** This is marked as TBD. Task 11 creates a placeholder.
*   **Placement of `FatigueExtensionConsiderations.vue`:** This component is not in the new "Opening Page" menu list.
    *   *PRD Recommendation:* Evaluate if its content can be merged into "Trip Removal and Compensation" or another relevant section. If not, and it's still valuable, it might need to be added as a new menu item.
*   **Placement of `FatigueQuotes.vue` and `FatigueAssessmentDescription.vue`:**
    *   *PRD Recommendation:* Consider creating an "Introduction" or "Overview" menu item if this content is to be retained. Otherwise, they might be removed.
