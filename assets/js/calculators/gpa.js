(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;
  const rowsHolder = document.getElementById("course-rows");
  const addBtn = document.getElementById("add-course-btn");

  const GRADE_POINTS = { "A":4.0, "A-":3.7, "B+":3.3, "B":3.0, "B-":2.7, "C+":2.3, "C":2.0, "C-":1.7, "D+":1.3, "D":1.0, "F":0.0 };

  function gradeOptions(selected){
    return Object.keys(GRADE_POINTS).map(g => `<option value="${g}" ${g===selected?"selected":""}>${g}</option>`).join("");
  }

  function addRow(grade, credits){
    const row = document.createElement("div");
    row.className = "field-row";
    row.innerHTML = `
      <div class="field">
        <label>Grade</label>
        <select class="course-grade" aria-label="Course grade">${gradeOptions(grade || "A")}</select>
      </div>
      <div class="field">
        <label>Credit hours</label>
        <input type="number" class="course-credits" aria-label="Course credit hours" min="0" step="0.5" value="${credits || 3}">
      </div>`;
    rowsHolder.appendChild(row);
  }

  addBtn.addEventListener("click", () => addRow());
  addRow("A", 3);
  addRow("B+", 4);
  addRow("B", 3);

  rowsHolder.addEventListener("dblclick", function(e){
    const row = e.target.closest(".field-row");
    if(row && rowsHolder.children.length > 1) row.remove();
  });

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const rows = Array.from(rowsHolder.querySelectorAll(".field-row"));
    let totalPoints = 0, totalCredits = 0;
    const breakdownRows = [];

    rows.forEach((row, i) => {
      const grade = row.querySelector(".course-grade").value;
      const credits = parseFloat(row.querySelector(".course-credits").value) || 0;
      const points = GRADE_POINTS[grade] * credits;
      totalPoints += points;
      totalCredits += credits;
      breakdownRows.push([`Course ${i+1} (${grade}, ${credits} cr)`, UOC_CALC.fmt(points, 2)]);
    });

    if(totalCredits === 0){
      showToast("Add at least one course with credit hours.");
      return;
    }

    const gpa = totalPoints / totalCredits;
    document.getElementById("result-readout").innerHTML = `${UOC_CALC.fmt(gpa, 2)}`;
    document.getElementById("result-breakdown").innerHTML = [
      ["Total credit hours", totalCredits],
      ["Total grade points", UOC_CALC.fmt(totalPoints, 2)],
      ["GPA", UOC_CALC.fmt(gpa, 2)]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `GPA across ${rows.length} courses (${totalCredits} credits) = ${UOC_CALC.fmt(gpa,2)}`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("gpa", "GPA Calculator", summary);
  });
})();
