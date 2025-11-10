# University Fee Selector

A minimal web app to determine the university fee amount based on a given JSON structure.

---

## How to Run
1. Clone the repository:
   git clone https://github.com/<your-username>/university-fee-selector.git
   cd university-fee-selector

2. Open `index.html` in any browser.
   No dependencies or setup required.

## Folder Structure

```
university-fee-selector/
├── index.html     # Main UI
├── style.css      # Basic styling
├── script.js      # Core logic
└── README.md
```

---

## Tech Used

* **HTML5** for structure
* **CSS3** for styling
* **Vanilla JavaScript (ES6)** for logic
* JSON data is defined directly inside `script.js`

---

## Logic Overview

* User selects **Fee Type → Nationality → Course → Level** step by step.
* JSON keys `ALL_COURSES​` and `ALL_LEVEL​` expand to:

  * Courses → *Medical, Dental, Ayurveda*
  * Levels → *UG, PG, DIPLOMA, Ph.D*
* Fee amount is shown after all four selections.
* “Clear Selection” resets all dropdowns to the initial state.
* Hidden characters in JSON keys are cleaned before matching.

---


