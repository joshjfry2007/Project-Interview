# Project Interview

An interactive interview preparation web application migrated to Next.js using the App Router, Tailwind CSS, and React client components.

## Status

Migrated from Vite + React to Next.js (App Router) with full support for client-side state management, Tailwind CSS styling, and structured routing.

## What Works

- **Interactive Interview Route (`/interview`)**:
  - Displays questions across Behavioral, Technical Depth, and Communication categories.
  - Submits answers with simulated AI feedback, scoring (clarity, correctness, confidence), and quote evidence.
  - Dynamically presents follow-up questions when returned by the API.
  - Expandable history drawer for reviewing previous answers, feedback, and scores in the session.
  - Comprehensive session summary screen displaying overall and per-category score averages once the interview is completed.
- **Routing & Navigation**:
  - Automatic redirect from root (`/`) to `/interview`.
  - Placeholder routes ready for `/history` and `/heatmap`.
  - Responsive global navigation bar in `app/layout.js`.
- **Styling**:
  - Tailwind CSS combined with custom CSS animations (including glowing rotating button border gradients).

## Planned Work

- Persistent history storage (localStorage or backend database) for interview sessions.
- Full activity heatmap on `/heatmap` to visualize daily interview practice consistency.
- Real LLM integration for dynamic feedback and evaluation.
- Timer mode and mock interview recording options.

## Project Structure

```
app/
  layout.js          # Root layout with global navigation & metadata
  globals.css        # Tailwind directives + custom application styles
  page.js            # Redirects to /interview
  interview/page.js  # Main interview page
  history/page.js    # History placeholder route
  heatmap/page.js    # Heatmap placeholder route
components/
  QuestionScreen.jsx # Client component managing interview flow & state
  HistoryEntry.jsx   # Collapsible details entry for past answers
  Summary.jsx        # Overall & category average score summary
data/
  question.js        # Question bank categorized by topic
lib/
  interviewApi.js    # Simulated answer scoring & evaluation API
  summary.js         # Score calculation & aggregation utilities
```

## How to Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Lint code**:
   ```bash
   npm run lint
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Start production server**:
   ```bash
   npm run start
   ```
