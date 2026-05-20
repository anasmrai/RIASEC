function openPdfModal() {
  var modal = document.getElementById("pdfModal");
  var status = document.getElementById("downloadStatus");

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  status.style.display = "none";
  status.textContent = "";

  document.getElementById("pdfFirstName").focus();
}

function closePdfModal() {
  var modal = document.getElementById("pdfModal");

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

function getCleanValue(id) {
  return document.getElementById(id).value.trim();
}

function generatePdfReport() {
  var firstName = getCleanValue("pdfFirstName");
  var lastName = getCleanValue("pdfLastName");
  var title = getCleanValue("pdfTitle");
  var status = document.getElementById("downloadStatus");

  if (!firstName || !lastName || !title) {
    status.style.display = "block";
    status.textContent = "Please complete First Name, Last Name, and Title before generating the PDF.";
    return;
  }

  var results = document.getElementById("results").cloneNode(true);

  var actionRow = results.querySelector(".action-row");
  if (actionRow) {
    actionRow.remove();
  }

  var personHeader = document.createElement("div");
  personHeader.className = "report-person-header";
  personHeader.innerHTML =
    "<h2>" + firstName + " " + lastName + "</h2>" +
    "<p><strong>Title:</strong> " + title + "</p>" +
    "<p><strong>Report Date:</strong> " + new Date().toLocaleDateString() + "</p>";

  var resultBody = results.querySelector(".res-body");
  if (resultBody) {
    resultBody.insertBefore(personHeader, resultBody.firstChild);
  }

  var printWindow = window.open("", "_blank");

  if (!printWindow) {
    status.style.display = "block";
    status.textContent = "Popup was blocked. Please allow popups, then try again.";
    return;
  }

  printWindow.document.open();

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>RIASEC Profile Report</title>

      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: 'DM Sans', sans-serif;
          background: #F7F5F0;
          color: #1a1a1a;
        }

        .res-header {
          background: #2C3E50;
          color: #fff;
          padding: 3rem 2rem 2rem;
          text-align: center;
        }

        .res-header h1 {
          font-family: 'DM Serif Display', serif;
          font-size: 2.4rem;
          margin-bottom: .5rem;
        }

        .res-header p {
          color: rgba(255,255,255,.72);
        }

        .code-display {
          display: inline-flex;
          gap: 5px;
          margin-top: 1.5rem;
        }

        .code-letter {
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          font-size: 1.6rem;
          font-weight: 800;
          color: #fff;
        }

        .res-body {
          max-width: 880px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem;
        }

        .report-person-header,
        .profile-row,
        .sd-card,
        .report {
          background: #fff;
          border: 1px solid #E8E4DC;
          border-radius: 10px;
        }

        .report-person-header {
          padding: 18px 20px;
          margin-bottom: 1.4rem;
        }

        .report-person-header h2 {
          font-family: 'DM Serif Display', serif;
          color: #2C3E50;
          margin-bottom: .45rem;
        }

        .section-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.55rem;
          margin: 1.5rem 0 1.1rem;
        }

        .profile-grid,
        .subdriver-grid {
          display: grid;
          gap: 12px;
          margin-bottom: 2rem;
        }

        .profile-row {
          padding: 14px 18px;
          display: grid;
          grid-template-columns: 130px 1fr 68px;
          align-items: center;
          gap: 12px;
        }

        .pr-label {
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pr-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .pr-bar-wrap {
          height: 8px;
          background: #E8E4DC;
          border-radius: 4px;
          overflow: hidden;
        }

        .pr-bar {
          height: 100%;
        }

        .pr-pct {
          font-weight: 800;
          text-align: right;
        }

        .pr-strength {
          font-size: .85rem;
          color: #6b6b6b;
          grid-column: 1 / -1;
        }

        .report {
          padding: 2rem;
        }

        .report h3 {
          font-family: 'DM Serif Display', serif;
          color: #2C3E50;
          margin-top: 1.2rem;
        }

        .report h3:first-child {
          margin-top: 0;
        }

        .report p {
          line-height: 1.75;
        }

        .sd-card {
          padding: 16px 18px;
        }

        .sd-head {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 10px;
        }

        .sd-name {
          font-weight: 800;
        }

        .sd-type {
          color: #fff;
          padding: 4px 14px;
          border-radius: 10px;
          font-weight: 800;
          font-size: .75rem;
        }

        .sd-bar-wrap {
          height: 6px;
          background: #E8E4DC;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 6px;
        }

        .sd-bar {
          height: 100%;
        }

        .sd-desc {
          font-size: .85rem;
          color: #6b6b6b;
          line-height: 1.55;
        }

        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .res-header {
            page-break-after: avoid;
          }
        }
      </style>
    </head>

    <body>
      ${results.innerHTML}

      <script>
        window.onload = function () {
          window.print();
        };
      <\/script>
    </body>
    </html>
  `);

  printWindow.document.close();

  status.style.display = "block";
  status.textContent = "PDF window opened. Choose Save as PDF in the print window.";
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("openPdfModalBtn").addEventListener("click", openPdfModal);
  document.getElementById("cancelPdfBtn").addEventListener("click", closePdfModal);
  document.getElementById("closePdfModalBtn").addEventListener("click", closePdfModal);
  document.getElementById("generatePdfBtn").addEventListener("click", generatePdfReport);

  document.getElementById("pdfModal").addEventListener("click", function (event) {
    if (event.target.id === "pdfModal") {
      closePdfModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closePdfModal();
    }
  });
});
