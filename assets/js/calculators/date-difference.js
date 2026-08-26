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

    const diffMs = end - start;
    const totalDays = Math.round(Math.abs(diffMs) / (1000*60*60*24));
    const weeks = Math.floor(totalDays / 7);
    const remDays = totalDays % 7;
    const months = Math.abs((end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()));

    document.getElementById("result-readout").innerHTML = `${UOC_CALC.fmt(totalDays,0)}<span class="unit">days</span>`;
    document.getElementById("result-breakdown").innerHTML = [
      ["Start date", startStr],
      ["End date", endStr],
      ["Total days", UOC_CALC.fmt(totalDays,0)],
      ["Weeks + days", `${weeks}w ${remDays}d`],
      ["Approx. months", months],
      ["Direction", diffMs < 0 ? "End date is before start date" : "End date is after start date"]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `${startStr} to ${endStr} = ${totalDays} days`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("date-difference", "Date Difference Calculator", summary);
  });
})();
