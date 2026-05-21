function resultSafeText(value) {
  if (typeof escapeHtml === "function") {
    return escapeHtml(value || "");
  }

  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderResults(results) {
  if (!results || !results.primary) {
    console.error("No results found.");
    return;
  }

  buildLatestResultLayout();

  document.getElementById("res-name-label").textContent = "Your Profile";
  document.getElementById("res-title").textContent =
    results.primary.name + "–" + results.secondary.name + " Interest Profile";
  document.getElementById("res-subtitle").textContent =
    "Primary type: " + results.primary.name + " · Holland Code: " + results.hollandCode;

  renderHollandCode(results);
  renderProfileScores(results);
  renderProfileReport(results);
  renderStrongestWorkDrivers(results);
}

function buildLatestResultLayout() {
  var resultsScreen = document.getElementById("results");

  resultsScreen.innerHTML = `
    <div class="res-header">
      <p id="res-name-label" class="res-label">Your Profile</p>
      <h1 id="res-title">Interest Profile</h1>
      <p id="res-subtitle">Primary type · Holland Code</p>
      <div id="code-display" class="code-display"></div>
    </div>

    <div class="res-body">
      <p class="section-title">RIASEC Profile Scores</p>
      <div id="profile-grid" class="profile-grid"></div>

      <p class="section-title">RIASEC Profile Report</p>
      <div id="report-content" class="report"></div>

      <p class="section-title">Strongest Work Drivers</p>
      <div id="subdriver-grid" class="subdriver-grid"></div>

      <div class="action-row">
        <button class="pdf-btn" id="openPdfModalBtn" type="button" onclick="openPdfModal()">
          Generate this report in PDF
        </button>

        <button class="restart-btn" id="restartBtn" type="button" onclick="restartAssessment()">
          Start New Assessment
        </button>
      </div>

      <div style="height:2rem"></div>
    </div>
  `;
}

function renderHollandCode(results) {
  var codeDisplay = document.getElementById("code-display");
  codeDisplay.innerHTML = "";

  String(results.hollandCode || "").split("").forEach(function (letter) {
    var type = TYPES[letter];
    if (!type) return;

    var box = document.createElement("div");
    box.className = "code-letter";
    box.style.background = type.color;
    box.textContent = letter;

    codeDisplay.appendChild(box);
  });
}

function renderProfileScores(results) {
  var profileGrid = document.getElementById("profile-grid");
  profileGrid.innerHTML = "";

  results.orderedTypes.forEach(function (item) {
    var row = document.createElement("div");
    row.className = "profile-row";

    row.innerHTML =
      '<div class="pr-label">' +
        '<span class="pr-dot" style="background:' + item.color + '"></span>' +
        resultSafeText(item.name) +
      '</div>' +

      '<div class="pr-bar-wrap">' +
        '<div class="pr-bar" style="width:' + item.percent + '%;background:' + item.color + '"></div>' +
      '</div>' +

      '<div class="pr-pct">' + item.percent + '%</div>' +

      '<div class="pr-strength">' +
        resultSafeText(getScoreDescription(item)) +
      '</div>';

    profileGrid.appendChild(row);
  });
}

function getScoreDescription(item) {
  if (item.percent >= 80) {
    return "Very strong preference for " + item.definition + ".";
  }

  if (item.percent >= 65) {
    return "Strong preference for " + item.definition + ".";
  }

  if (item.percent >= 50) {
    return "Moderate preference for " + item.definition + ".";
  }

  if (item.percent >= 35) {
    return "Some interest in " + item.definition + ".";
  }

  return "Lower preference for " + item.definition + ".";
}

function renderProfileReport(results) {
  var report = document.getElementById("report-content");
  var primary = results.primary;
  var secondary = results.secondary;

  report.innerHTML =
    '<h3>Your Core Pattern</h3>' +
    '<p>' +
      'Your strongest pattern points toward work that combines ' +
      resultSafeText(primary.definition) +
      ' with ' +
      resultSafeText(secondary.definition) +
      '. You are likely energized by roles where your main interest area is supported by your secondary style. This profile should be used as a development guide, not as a fixed label.' +
    '</p>';
}

function renderStrongestWorkDrivers(results) {
  var grid = document.getElementById("subdriver-grid");
  grid.innerHTML = "";

  var drivers = [];

  if (results.topDrivers && results.topDrivers.length) {
    drivers = results.topDrivers;
  } else if (results.subdriverScores && results.subdriverScores.length) {
    drivers = results.subdriverScores.slice(0, 4);
  }

  drivers.forEach(function (driver) {
    var card = document.createElement("div");
    card.className = "sd-card";

    card.innerHTML =
      '<div class="sd-head">' +
        '<div class="sd-name">' + resultSafeText(driver.name) + '</div>' +
        '<div class="sd-type" style="background:' + driver.color + '">' +
          resultSafeText(driver.typeName) +
        '</div>' +
      '</div>' +

      '<div class="sd-bar-wrap">' +
        '<div class="sd-bar" style="width:' + driver.percent + '%;background:' + driver.color + '"></div>' +
      '</div>' +

      '<div class="sd-desc">' +
        resultSafeText(driver.desc) +
      '</div>';

    grid.appendChild(card);
  });
}
