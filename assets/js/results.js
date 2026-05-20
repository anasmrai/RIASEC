function resultSafeText(value) {
  if (typeof escapeHtml === "function") {
    return escapeHtml(value);
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

  var primary = results.primary;
  var secondary = results.secondary;
  var hollandCode = results.hollandCode;

  document.getElementById("res-name-label").textContent = "Your Profile";

  document.getElementById("res-title").textContent =
    primary.name + "–" + secondary.name + " Interest Profile";

  document.getElementById("res-subtitle").textContent =
    "Primary type: " + primary.name + " · Holland Code: " + hollandCode;

  renderHollandCode(results);
  renderProfileScores(results);
  renderProfileReport(results);
  renderStrongestWorkDrivers(results);
}

function renderHollandCode(results) {
  var codeDisplay = document.getElementById("code-display");
  codeDisplay.innerHTML = "";

  results.hollandCode.split("").forEach(function (letter) {
    var type = TYPES[letter];

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
        '<div class="pr-bar" style="width:' + item.percent + '%; background:' + item.color + '"></div>' +
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
  var tertiary = results.tertiary;

  var primaryTips = TYPE_SUGGESTIONS[primary.key];
  var secondaryTips = TYPE_SUGGESTIONS[secondary.key];

  report.innerHTML =
    '<h3>Your Core Pattern</h3>' +

    '<p>Your strongest pattern points toward work that combines <strong>' +
    resultSafeText(primary.name) +
    '</strong> interests with <strong>' +
    resultSafeText(secondary.name) +
    '</strong> support. This means you are most likely energized by work involving ' +
    resultSafeText(primary.definition) +
    '.</p>' +

    '<p>Your secondary pattern adds a strong support style connected to ' +
    resultSafeText(secondary.definition) +
    '. Your third pattern, <strong>' +
    resultSafeText(tertiary.name) +
    '</strong>, adds another layer connected to ' +
    resultSafeText(tertiary.definition) +
    '.</p>' +

    '<p>Together, your Holland Code is <strong>' +
    resultSafeText(results.hollandCode) +
    '</strong>. This code should be used as a development guide, not as a fixed label. It shows what type of work may feel more natural, motivating, and sustainable.</p>' +

    '<h3>How This May Show Up at Work</h3>' +

    '<p>You may perform best when your role gives you room to use your primary interest while also using your secondary style. This combination can help explain what tasks feel natural, what responsibilities feel draining, and what type of development may fit you best.</p>' +

    '<h3>Suggested Training</h3>' +
    '<p>' + resultSafeText(primaryTips.training) + '</p>' +

    '<h3>Suggested Projects</h3>' +
    '<p>' + resultSafeText(primaryTips.projects) + '</p>' +

    '<h3>Coaching Focus</h3>' +
    '<p>' + resultSafeText(primaryTips.coaching) + '</p>' +

    '<h3>Possible Career Direction</h3>' +
    '<p>' + resultSafeText(primaryTips.career) + '</p>' +

    '<h3>Secondary Development Support</h3>' +
    '<p>Because your secondary type is <strong>' +
    resultSafeText(secondary.name) +
    '</strong>, you may also benefit from development connected to: ' +
    resultSafeText(secondaryTips.training) +
    '</p>';
}

function renderStrongestWorkDrivers(results) {
  var grid = document.getElementById("subdriver-grid");
  grid.innerHTML = "";

  results.topDrivers.forEach(function (driver) {
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
        '<div class="sd-bar" style="width:' + driver.percent + '%; background:' + driver.color + '"></div>' +
      '</div>' +

      '<div class="sd-desc">' +
        resultSafeText(driver.desc) +
      '</div>';

    grid.appendChild(card);
  });
}
