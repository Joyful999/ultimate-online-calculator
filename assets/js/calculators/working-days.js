(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const startStr = UOC_CALC.val("start-date");
    const endStr = UOC_CALC.val("end-date");
    if(!startStr){ UOC_CALC.setError("start-date", "Choose a start date."); return; }
    if(!endStr){ UOC_CALC.setError("end-date", "Choose an end date."); return; }

    const start = new Date(startStr + "T00:00:00");
    const end = new Date(endStr + "T00:00:00");
    if(isNaN(start.getTime()) || isNaN(end.getTime())){ UOC_CALC.setError("end-date", "Enter valid dates."); return; }
    if(end < start){ UOC_CALC.setError("end-date", "End date must be on or after the start date."); return; }

    let totalDays = 0, workingDays = 0, weekendDays = 0;
    const cursor = new Date(start);
    while(cursor <= end){
      totalDays++;
      const day = cursor.getDay();
      if(day === 0 || day === 6) weekendDays++; else workingDays++;
      cursor.setDate(cursor.getDate() + 1);
    }

    document.getElementById("result-readout").innerHTML = `${workingDays}<span class="unit">working days</span>`;
    document.getElementById("result-breakdown").innerHTML = [
      ["Start date", startStr],
      ["End date", endStr],
      ["Total calendar days", totalDays],
      ["Weekend days excluded", weekendDays],
      ["Working days", workingDays]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `${startStr} to ${endStr} = ${workingDays} working days`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("working-days", "Working Days Calculator", summary);
  });
})();
