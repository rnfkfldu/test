# Premium Lotto Generator

## Overview

A sophisticated, high-performance web application for generating Lotto 6/45 numbers. It provides 5 sets of unique, sorted numbers with a modern UI, color-coded balls, and full dark mode support.

## Project Outline

*   **`index.html`**: Structured with semantic HTML5, featuring a theme toggle and dynamic set container. Uses Pretendard font for premium typography.
*   **`style.css`**: Implements a robust CSS variable system for theming. Uses modern CSS features like gradients, transitions, and responsive design (media queries).
*   **`main.js`**: Handles complex logic for number generation, theme persistence via `localStorage`, and staggered UI animations for a polished feel.

## Implementation Details

### Visual Design
- **Typography**: Uses the Pretendard font family for a clean and professional look.
- **Color Palette**: 
    - 1-10: Yellow (`#facc15`)
    - 11-20: Blue (`#60a5fa`)
    - 21-30: Red (`#f87171`)
    - 31-40: Gray (`#94a3b8`)
    - 41-45: Green (`#4ade80`)
- **Themes**:
    - **Light Mode**: Clean, high-contrast Slate/Zinc palette.
    - **Dark Mode**: Deep Navy (`#0f172a`) theme with subtle glows.
- **Micro-interactions**: Ball hover animations, staggered set loading, and button feedback.

### Features
- **5-Set Generation**: Generates five sets (A through E) of 6 unique numbers (1-45) simultaneously.
- **Sorted Numbers**: Automatically sorts numbers in ascending order for standard lotto display.
- **Dark Mode Persistence**: Remembers user's theme preference across sessions using `localStorage`.
- **System Theme Integration**: Respects system-level dark/light mode preferences on first load.
- **Business Inquiry Form**: Integrated Formspree endpoint for professional partnership inquiries.
- **Community Interaction**: Integrated Disqus commenting system for user feedback and discussion.
- **Responsive Layout**: Adapts gracefully from mobile to desktop.

## Development History

1.  **Initial Version**: Simple single-set generator with basic styling.
2.  **Sophistication Update**:
    - Redesigned UI with modern CSS variables.
    - Added dark mode support with toggle and persistence.
    - Expanded generation to 5 sets with A-E labeling.
    - Implemented color coding for number ranges.
    - Added staggered entry animations for sets.
3.  **Inquiry Feature**:
    - Added a "Business Inquiry" section integrated with Formspree.
    - Designed seamless form inputs matching the premium theme.
4.  **Community Feature**:
    - Integrated Disqus comment thread for user engagement.
    - Styled for consistent layout spacing.
