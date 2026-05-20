var assessmentState = {
  level: "",
  questions: [],
  answers: [],
  curQ: 0,
  results: null
};

function shuffleArray(array) {
  var copy = array.slice();

  for (var i = copy.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }

  return copy;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(function (screen) {
    screen.classList.remove("active");
  });

  document.getElementById(screenId).classList.add("active");
  window.scrollTo(0, 0);
}

function setupCareerChips() {
  var chips = document.querySelectorAll("#level-chips .chip");

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (item) {
        item.classList.remove("sel");
      });

      chip.classList.add("sel");
      assessmentState.level = chip.dataset.val || "";
    });
  });
}

function buildSessionQuestions() {
  var randomizedQuestions = shuffleArray(QUESTION_BANK);

  return randomizedQuestions.map(function (question, index) {
    var newQuestion = Object.assign({}, question);
    newQuestion.bankIndex = index;

    if (newQuestion.mode === "likert") {
      newQuestion.renderOptions = SCALE_OPTIONS.map(function (option) {
        return Object.assign({}, option);
      });
    } else {
      newQuestion.renderOptions = shuffleArray(newQuestion.opts).map(function (option) {
        return Object.assign({}, option);
      });
    }

    return newQuestion;
  });
}

function startAssessment() {
  if (!assessmentState.level) {
    assessmentState.level = "not specified";
  }

  assessmentState.questions = buildSessionQuestions();
  assessmentState.answers = new Array(assessmentState.questions.length).fill(null);
  assessmentState.curQ = 0;
  assessmentState.results = null;

  renderQuestion();
  showScreen("assessment");
}

function renderQuestion() {
  var question = assessmentState.questions[assessmentState.curQ];
  var total = assessmentState.questions.length;
  var questionNumber = assessmentState.curQ + 1;
  var progress = Math.round((questionNumber / total) * 100);
  var currentAnswer = assessmentState.answers[assessmentState.curQ];

  document.getElementById("prog-fill").style.width = progress + "%";
  document.getElementById("prog-label").textContent = questionNumber + " / " + total;
  document.getElementById("q-type-badge").textContent = "Q" + questionNumber;
  document.getElementById("q-context").textContent = question.style || "Question";
  document.getElementById("q-text").textContent = question.q;

  if (question.mode === "likert") {
    document.getElementById("q-instruction").textContent =
      "Select how much you like this activity. You will move to the next question automatically.";
  } else {
    document.getElementById("q-instruction").textContent =
      "Choose the option that feels most natural to you. The answer order is randomized.";
  }

  document.getElementById("q-style-label").textContent =
    question.mode === "likert" ? "Rating question" : "Forced-choice question";

  var prevBtn = document.getElementById("prev-btn");
  prevBtn.style.visibility = assessmentState.curQ === 0 ? "hidden" : "visible";

  var optionsGrid = document.getElementById("options-grid");
  optionsGrid.innerHTML = "";

  question.renderOptions.forEach(function (option, index) {
    var optionText = question.mode === "likert" ? option.label : option.text;
    var selected = currentAnswer && currentAnswer.optionIndex === index;

    var card = document.createElement("button");
    card.type = "button";
    card.className = "opt-card" + (selected ? " sel" : "");
    card.innerHTML =
      '<span class="opt-dot">' + (selected ? "✓" : "") + '</span>' +
      '<span class="opt-label">' + escapeHtml(optionText) + '</span>';

    card.addEventListener("click", function () {
      selectOption(index);
    });

    optionsGrid.appendChild(card);
  });
}

function selectOption(optionIndex) {
  var question = assessmentState.questions[assessmentState.curQ];
  var option = question.renderOptions[optionIndex];

  if (question.mode === "likert") {
    assessmentState.answers[assessmentState.curQ] = {
      mode: "likert",
      type: question.type,
      sd: question.sd,
      value: option.value,
      label: option.label,
      optionIndex: optionIndex
    };
  } else {
    assessmentState.answers[assessmentState.curQ] = {
      mode: "forced",
      type: option.type,
      sd: option.sd,
      value: 5,
      label: option.text,
      optionIndex: optionIndex
    };
  }

  document.querySelectorAll(".opt-card").forEach(function (card) {
    card.classList.remove("sel");
    var dot = card.querySelector(".opt-dot");
    if (dot) dot.textContent = "";
  });

  var selectedCard = document.querySelectorAll(".opt-card")[optionIndex];
  if (selectedCard) {
    selectedCard.classList.add("sel");
    var selectedDot = selectedCard.querySelector(".opt-dot");
    if (selectedDot) selectedDot.textContent = "✓";
  }

  setTimeout(function () {
    goNextQuestion();
  }, 220);
}

function goNextQuestion() {
  if (assessmentState.curQ >= assessmentState.questions.length - 1) {
    submitAssessment();
    return;
  }

  assessmentState.curQ++;
  renderQuestion();
}

function prevQuestion() {
  if (assessmentState.curQ === 0) return;

  assessmentState.curQ--;
  renderQuestion();
}

function strengthLabel(percent) {
  if (percent >= 80) return "Very strong preference";
  if (percent >= 65) return "Strong preference";
  if (percent >= 50) return "Moderate preference";
  if (percent >= 35) return "Some interest";
  return "Lower preference";
}

function computeResults() {
  var typeScores = {};
  var typeMax = {};
  var subScores = {};
  var subMax = {};

  Object.keys(TYPES).forEach(function (typeKey) {
    typeScores[typeKey] = 0;
    typeMax[typeKey] = 0;
    subScores[typeKey] = {};
    subMax[typeKey] = {};

    TYPES[typeKey].sub.forEach(function (subName) {
      subScores[typeKey][subName] = 0;
      subMax[typeKey][subName] = 0;
    });
  });

  assessmentState.questions.forEach(function (question, index) {
    var answer = assessmentState.answers[index];

    if (question.mode === "likert") {
      typeMax[question.type] += 5;
      subMax[question.type][question.sd] += 5;

      if (answer) {
        typeScores[question.type] += answer.value;
        subScores[question.type][question.sd] += answer.value;
      }
    }

    if (question.mode === "forced") {
      question.opts.forEach(function (option) {
        typeMax[option.type] += 5;
        subMax[option.type][option.sd] += 5;
      });

      if (answer) {
        typeScores[answer.type] += 5;
        subScores[answer.type][answer.sd] += 5;
      }
    }
  });

  var orderedTypes = Object.keys(TYPES).map(function (typeKey) {
    var percent = typeMax[typeKey] > 0
      ? Math.round((typeScores[typeKey] / typeMax[typeKey]) * 100)
      : 0;

    return {
      key: typeKey,
      name: TYPES[typeKey].name,
      color: TYPES[typeKey].color,
      definition: TYPES[typeKey].definition,
      score: typeScores[typeKey],
      max: typeMax[typeKey],
      percent: percent,
      strength: strengthLabel(percent)
    };
  }).sort(function (a, b) {
    return b.percent - a.percent;
  });

  var subdriverScores = [];

  Object.keys(TYPES).forEach(function (typeKey) {
    TYPES[typeKey].sub.forEach(function (subName) {
      var percent = subMax[typeKey][subName] > 0
        ? Math.round((subScores[typeKey][subName] / subMax[typeKey][subName]) * 100)
        : 0;

      subdriverScores.push({
        type: typeKey,
        typeName: TYPES[typeKey].name,
        name: subName,
        color: TYPES[typeKey].color,
        score: subScores[typeKey][subName],
        max: subMax[typeKey][subName],
        percent: percent,
        desc: SUB_DESC[subName] || ""
      });
    });
  });

  subdriverScores.sort(function (a, b) {
    return b.percent - a.percent;
  });

  var hollandCode = orderedTypes.slice(0, 3).map(function (item) {
    return item.key;
  }).join("");

  return {
    level: assessmentState.level,
    orderedTypes: orderedTypes,
    subdriverScores: subdriverScores,
    topDrivers: subdriverScores.slice(0, 4),
    hollandCode: hollandCode,
    primary: orderedTypes[0],
    secondary: orderedTypes[1],
    tertiary: orderedTypes[2]
  };
}

function submitAssessment() {
  showScreen("loading");

  var steps = ["ls1", "ls2", "ls3", "ls4"];

  steps.forEach(function (id, index) {
    setTimeout(function () {
      var step = document.getElementById(id);
      if (step) step.classList.add("done");
    }, 250 * (index + 1));
  });

  setTimeout(function () {
    assessmentState.results = computeResults();

    if (typeof renderResults === "function") {
      renderResults(assessmentState.results);
      showScreen("results");
    } else {
      console.error("results.js is missing. renderResults() was not found.");
      alert("Results file is missing. Please add results.js.");
    }
  }, 1300);
}

function restartAssessment() {
  assessmentState.level = "";
  assessmentState.questions = [];
  assessmentState.answers = [];
  assessmentState.curQ = 0;
  assessmentState.results = null;

  document.querySelectorAll("#level-chips .chip").forEach(function (chip) {
    chip.classList.remove("sel");
  });

  document.querySelectorAll(".loader-step").forEach(function (step) {
    step.classList.remove("done");
  });

  showScreen("welcome");
}

document.addEventListener("DOMContentLoaded", function () {
  setupCareerChips();

  document.getElementById("beginAssessmentBtn").addEventListener("click", function () {
    showScreen("intake");
  });

  document.getElementById("start-assess").addEventListener("click", startAssessment);
  document.getElementById("prev-btn").addEventListener("click", prevQuestion);
  document.getElementById("restartBtn").addEventListener("click", restartAssessment);
});
