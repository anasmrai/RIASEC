
function safeText(value) {
  if (typeof escapeHtml === "function") {
    return escapeHtml(value);
  }

  return String(value)
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
  var tertiary = results.tertiary;
  var hollandCode = results.hollandCode;

  document.getElementById("res-name-label").textContent = "Your Profile";

  document.getElementById("res-title").textContent =
    primary.name + "–" + secondary.name + " Interest Profile";

  document.getElementById("res-subtitle").textContent =
    "Primary type: " + primary.name + " · Holland Code: " + hollandCode;

  renderHollandCode(hollandCode);
  renderProfileScores(results.orderedTypes);
  renderProfileReport(results);
  renderTopDrivers(results.topDrivers);
}

function renderHollandCode(code) {
  var codeDisplay = document.getElementById("code-display");
  codeDisplay.innerHTML = "";

  code.split("").forEach(function (letter) {
    var type = TYPES[letter];

    var div = document.createElement("div");
    div.className = "code-letter";
    div.style.background = type.color;
    div.textContent = letter;

    codeDisplay.appendChild(div);
  });
}

function renderProfileScores(orderedTypes) {
  var profileGrid = document.getElementById("profile-grid");
  profileGrid.innerHTML = "";

  orderedTypes.forEach(function (item) {
    var row = document.createElement("div");
    row.className = "profile-row";

    row.innerHTML =
      '<div class="pr-label">' +
        '<span class="pr-dot" style="background:' + item.color + '"></span>' +
        safeText(item.name) +
      '</div>' +

      '<div class="pr-bar-wrap">' +
        '<div class="pr-bar" style="width:' + item.percent + '%; background:' + item.color + '"></div>' +
      '</div>' +

      '<div class="pr-pct">' + item.percent + '%</div>' +

      '<div class="pr-strength">' +
        safeText(item.strength + " for " + item.definition + ".") +
      '</div>';

    profileGrid.appendChild(row);
  });
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
    '<p>Your strongest pattern is <strong>' + safeText(primary.name) + '</strong>. This means you are most likely energized by work involving ' + safeText(primary.definition) + '.</p>' +
    '<p>Your secondary pattern is <strong>' + safeText(secondary.name) + '</strong>. This adds a strong support style related to ' + safeText(secondary.definition) + '.</p>' +
    '<p>Your third pattern is <strong>' + safeText(tertiary.name) + '</strong>. Together, your Holland Code is <strong>' + safeText(results.hollandCode) + '</strong>.</p>' +

    '<h3>How This May Show Up at Work</h3>' +
    '<p>You may perform best when your role gives you room to use your primary interest while also using your secondary style. This combination can help explain what tasks feel natural, what responsibilities feel draining, and what type of development may fit you best.</p>' +

    '<h3>Suggested Training</h3>' +
    '<p>' + safeText(primaryTips.training) + '</p>' +

    '<h3>Suggested Projects</h3>' +
    '<p>' + safeText(primaryTips.projects) + '</p>' +

    '<h3>Coaching Focus</h3>' +
    '<p>' + safeText(primaryTips.coaching) + '</p>' +

    '<h3>Possible Career Direction</h3>' +
    '<p>' + safeText(primaryTips.career) + '</p>' +

    '<h3>Secondary Development Support</h3>' +
    '<p>Because your secondary type is ' + safeText(secondary.name) + ', you may also benefit from development connected to: ' + safeText(secondaryTips.training) + '</p>';
}

function renderTopDrivers(topDrivers) {
  var grid = document.getElementById("subdriver-grid");
  grid.innerHTML = "";

  topDrivers.forEach(function (driver) {
    var card = document.createElement("div");
    card.className = "sd-card";

    card.innerHTML =
      '<div class="sd-head">' +
        '<div class="sd-name">' + safeText(driver.name) + '</div>' +
        '<div class="sd-type" style="background:' + driver.color + '">' + safeText(driver.typeName) + '</div>' +
      '</div>' +

      '<div class="sd-bar-wrap">' +
        '<div class="sd-bar" style="width:' + driver.percent + '%; background:' + driver.color + '"></div>' +
      '</div>' +

      '<div class="sd-desc">' +
        safeText(driver.desc) +
      '</div>';

    grid.appendChild(card);
  });
}
