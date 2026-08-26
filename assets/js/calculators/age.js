(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const dobStr = UOC_CALC.val("dob");
    const asOfStr = UOC_CALC.val("as-of") || new Date().toISOString().slice(0,10);

    if(!dobStr){ UOC_CALC.setError("dob", "Please choose a date of birth."); return; }
    const dob = new Date(dobStr + "T00:00:00");
    const asOf = new Date(asOfStr + "T00:00:00");
    if(isNaN(dob.getTime())){ UOC_CALC.setError("dob", "Enter a valid date."); return; }
    if(dob > asOf){ UOC_CALC.setError("dob", "Date of birth must be before the 'as of' date."); return; }

    let years = asOf.getFullYear() - dob.getFullYear();
    let months = asOf.getMonth() - dob.getMonth();
    let days = asOf.getDate() - dob.getDate();

    if(days < 0){
      months -= 1;
      const prevMonth = new Date(asOf.getFullYear(), asOf.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if(months < 0){
      years -= 1;
      months += 12;
    }

    const totalDays = Math.round((asOf - dob) / (1000*60*60*24));
    const totalWeeks = Math.floor(totalDays / 7);

    document.getElementById("result-readout").innerHTML = `${years}<span class="unit">years</span>`;
    document.getElementById("result-breakdown").innerHTML = [
      ["Years", years],
      ["Months", months],
      ["Days", days],
      ["Full precise age", `${years}y ${months}m ${days}d`],
      ["Total days lived", UOC_CALC.fmt(totalDays, 0)],
      ["Total weeks lived", UOC_CALC.fmt(totalWeeks, 0)]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `Born ${dobStr}: age is ${years}y ${months}m ${days}d as of ${asOfStr}`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("age", "Age Calculator", summary);
  });
})();
