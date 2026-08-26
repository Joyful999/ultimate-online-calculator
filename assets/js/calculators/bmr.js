(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const age = UOC_CALC.num("age-input");
    const cm = UOC_CALC.num("height-cm");
    const kg = UOC_CALC.num("weight-kg");
    const sex = UOC_CALC.val("sex-input");
    let ok = true;
    if(isNaN(age) || age <= 0 || age > 120){ UOC_CALC.setError("age-input", "Enter a valid age."); ok = false; }
    if(isNaN(cm) || cm <= 0){ UOC_CALC.setError("height-cm", "Enter a valid height in cm."); ok = false; }
    if(isNaN(kg) || kg <= 0){ UOC_CALC.setError("weight-kg", "Enter a valid weight in kg."); ok = false; }
    if(!ok) return;

    // Mifflin-St Jeor Equation
    let bmr = (10 * kg) + (6.25 * cm) - (5 * age);
    bmr += sex === "male" ? 5 : -161;

    document.getElementById("result-readout").innerHTML = `${UOC_CALC.fmt(bmr, 0)}<span class="unit">kcal / day</span>`;
    document.getElementById("result-breakdown").innerHTML = [
      ["Sex", sex === "male" ? "Male" : "Female"],
      ["Age", age],
      ["Height", cm + " cm"],
      ["Weight", kg + " kg"],
      ["BMR (calories at rest)", UOC_CALC.fmt(bmr,0) + " kcal/day"]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `BMR = ${UOC_CALC.fmt(bmr,0)} kcal/day`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("bmr", "BMR Calculator", summary);
  });
})();
