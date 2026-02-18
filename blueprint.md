# Premium Lotto Pro (v2)

## Overview

A premium, single-page application (SPA) featuring a tabbed interface. Users can switch between a high-performance lotto generator, a professional business inquiry form, and a community discussion thread.

## Project Outline

*   **`index.html`**: Implements a tabbed navigation system and semantic content sections for each feature.
*   **`style.css`**: Features a custom tab design, premium typography (Pretendard), and full dark mode support.
*   **`main.js`**: Manages section visibility via a custom tab controller and handles the lotto generation logic.

## Implementation Details

### Visual Design
- **Tabbed Interface**: Clean, pill-shaped navigation for switching between "번호생성" (Generate), "제휴문의" (Inquiry), and "커뮤니티" (Community).
- **Dark Mode**: Fully themed for both modes with preference persistence.
- **Premium Aesthetics**: Staggered animations, color-coded lotto balls, and linear-gradient accents.

### Features
- **Lotto Generator**: Focuses solely on generating 5 sets of unique, sorted numbers.
- **Inquiry Form**: Separated section for business-related communications via Formspree.
- **Community**: Integrated Disqus thread for user engagement in its own dedicated space.
- **Responsive Layout**: Optimized for mobile and desktop viewing.

## Development History

1.  **Initial Version**: Basic lottery number generator.
2.  **Sophistication Update**: Added dark mode, 5-set generation, and modern styling.
3.  **Expansion Update**: Integrated Formspree for inquiries and Disqus for comments.
4.  **Refactor (Current)**:
    - Implemented **Tabbed Navigation** to separate core functions.
    - Simplified the "번호생성" view to focus exclusively on lotto numbers.
    - Created dedicated spaces for "제휴문의" and "커뮤니티".
