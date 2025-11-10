// ===== Original JSON =====
const feeStructure = {
    "Exam Fee": {
      INDIAN: { "ALL_COURSES​": { "ALL_LEVEL​": { amount: 400 } } },
      FOREIGN: { "ALL_COURSES​": { "ALL_LEVEL​": { amount: 100 } } },
      NRI: { "ALL_COURSES​": { "ALL_LEVEL​": { amount: 600 } } },
      SAARC: { "ALL_COURSES​": { "ALL_LEVEL​": { amount: 600 } } },
    },
    "Application Fee": {
      INDIAN: {
        "ALL_COURSES​": {
          UG: { amount: 200 },
          "UG-DIPLOMA": { amount: 300 },
          PG: { amount: 500 },
        },
      },
      FOREIGN: {
        "ALL_COURSES​": {
          UG: { amount: 400 },
          "UG-DIPLOMA": { amount: 400 },
          PG: { amount: 700 },
        },
      },
    },
  };
  
  // ===== Constants =====
  const COURSES = ["Medical", "Dental", "Ayurveda"];
  const LEVELS = ["UG", "PG", "DIPLOMA", "Ph.D"];
  
  // ===== DOM Elements =====
  const feeType = document.getElementById("feeType");
  const nationality = document.getElementById("nationality");
  const course = document.getElementById("course");
  const level = document.getElementById("level");
  const showBtn = document.getElementById("showFee");
  const clearBtn = document.getElementById("clearSelection");
  const result = document.getElementById("result");
  
  // ===== Utility Functions =====
  const clean = (str) => str.replace(/[^\x20-\x7E]/g, "");
  
  const reset = (select, label, disable = true) => {
    select.innerHTML = `<option value="">-- ${label} --</option>`;
    select.disabled = disable;
  };
  
  const fill = (select, items, label) => {
    select.innerHTML = `<option value="">-- ${label} --</option>`;
    items.forEach((i) => select.add(new Option(i, i)));
    select.disabled = false;
  };
  
  // ===== Initialize Fee Types =====
  function initialize() {
    reset(feeType, "Select Fee Type", false); 
    reset(nationality, "Select Nationality");
    reset(course, "Select Course");
    reset(level, "Select Level");
    result.textContent = "";
    showBtn.disabled = true;
  
    Object.keys(feeStructure).forEach((type) => feeType.add(new Option(type, type)));
  }
  initialize();
  
  // ===== Event Handlers =====
  feeType.onchange = () => {
    reset(nationality, "Select Nationality");
    reset(course, "Select Course");
    reset(level, "Select Level");
    result.textContent = "";
    showBtn.disabled = true;
  
    if (feeType.value) {
      const nations = Object.keys(feeStructure[feeType.value]);
      fill(nationality, nations, "Select Nationality");
    }
  };
  
  nationality.onchange = () => {
    reset(course, "Select Course");
    reset(level, "Select Level");
    result.textContent = "";
    showBtn.disabled = true;
  
    if (nationality.value) {
      const keys = Object.keys(feeStructure[feeType.value][nationality.value]).map(clean);
      fill(course, keys.includes("ALL_COURSES") ? COURSES : keys, "Select Course");
    }
  };
  
  course.onchange = () => {
    reset(level, "Select Level");
    result.textContent = "";
    showBtn.disabled = true;
  
    if (course.value) {
      const courses = Object.keys(feeStructure[feeType.value][nationality.value]);
      const matched =
        courses.find((k) => clean(k) === "ALL_COURSES") ||
        courses.find((k) => clean(k) === course.value) ||
        courses[0];
      course.dataset.key = matched;
  
      const levels = Object.keys(feeStructure[feeType.value][nationality.value][matched]).map(clean);
      fill(level, levels.includes("ALL_LEVEL") ? LEVELS : levels, "Select Level");
    }
  };
  
  level.onchange = () => {
    result.textContent = "";
    showBtn.disabled = !level.value;
  };
  
  showBtn.onclick = () => {
    const f = feeType.value,
      n = nationality.value,
      c = course.dataset.key,
      l = level.value;
  
    const levelKeys = Object.keys(feeStructure[f][n][c]);
    const match =
      levelKeys.find((k) => clean(k) === "ALL_LEVEL") ||
      levelKeys.find((k) => clean(k) === l) ||
      levelKeys[0];
  
    const amount = feeStructure[f][n][c][match]?.amount;
    result.textContent = amount ? `Fee Amount: ₹${amount}` : "Fee not found.";
  };
  
  // ===== Clear Selection =====
  clearBtn.onclick = () => {
    initialize();
  };
  