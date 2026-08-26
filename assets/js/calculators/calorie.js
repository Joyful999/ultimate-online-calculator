(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;

  const ACTIVITY = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryactive: 1.9
  };

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const age = UOC_CALC.num("age-input");
    const cm = UOC_CALC.num("height-cm");
    const kg = UOC_CALC.num("weight-kg");
    const sex = UOC_CALC.val("sex-input");
    const activity = UOC_CALC.val("activity-input");
    let ok = true;
    if(isNaN(age) || age <= 0 || age > 120){ UOC_CALC.setError("age-input", "Enter a valid age."); ok = false; }
    if(isNaN(cm) || cm <= 0){ UOC_CALC.setError("height-cm", "Enter a valid height in cm."); ok = false; }
    if(isNaN(kg) || kg <= 0){ UOC_CALC.setError("weight-kg", "Enter a valid weight in kg."); ok = false; }
    if(!ok) return;

    let bmr = (10 * kg) + (6.25 * cm) - (5 * age);
    bmr += sex === "male" ? 5 : -161;
    const factor = ACTIVITY[activity] || 1.2;
    const maintenance = bmr * factor;

    document.getElementById("result-readout").innerHTML = `${UOC_CALC.fmt(maintenance,0)}<span class="unit">kcal / day</span>`;
    document.getElementById("result-breakdown").innerHTML = [
      ["BMR", UOC_CALC.fmt(bmr,0) + " kcal/day"],
      ["Activity multiplier", factor + "×"],
      ["Maintenance calories", UOC_CALC.fmt(maintenance,0) + " kcal/day"],
      ["Mild weight loss (−15%)", UOC_CALC.fmt(maintenance*0.85,0) + " kcal/day"],
      ["Mild weight gain (+15%)", UOC_CALC.fmt(maintenance*1.15,0) + " kcal/day"]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `Maintenance calories ≈ ${UOC_CALC.fmt(maintenance,0)} kcal/day`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("calorie", "Calorie Calculator", summary);
  });
})();
