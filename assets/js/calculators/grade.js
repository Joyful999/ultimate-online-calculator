(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const current = UOC_CALC.num("current-grade");
    const target = UOC_CALC.num("target-grade");
    const weight = UOC_CALC.num("final-weight");
    let ok = true;
    if(isNaN(current) || current < 0 || current > 100){ UOC_CALC.setError("current-grade", "Enter a grade between 0 and 100."); ok = false; }
    if(isNaN(target) || target < 0 || target > 100){ UOC_CALC.setError("target-grade", "Enter a target between 0 and 100."); ok = false; }
    if(isNaN(weight) || weight <= 0 || weight > 100){ UOC_CALC.setError("final-weight", "Enter a weight between 1 and 100."); ok = false; }
    if(!ok) return;

    const w = weight / 100;
    const needed = (target - current * (1 - w)) / w;

    let message;
    if(needed > 100) message = "Not achievable — even a perfect score won't reach this target.";
    else if(needed < 0) message = "Already secured — you'll hit this target even with a 0.";
    else message = "Achievable with the score below.";

    document.getElementById("result-readout").innerHTML = `${UOC_CALC.fmt(Math.max(0, Math.min(100, needed)))}<span class="unit">% needed</span>`;
    document.getElementById("result-breakdown").innerHTML = [
      ["Current grade", current + "%"],
      ["Target final grade", target + "%"],
      ["Final exam weight", weight + "%"],
      ["Score needed on final", UOC_CALC.fmt(needed) + "%"],
      ["Status", message]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `Need ${UOC_CALC.fmt(needed)}% on the final to reach ${target}%`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("grade", "Grade Calculator", summary);
  });
})();
