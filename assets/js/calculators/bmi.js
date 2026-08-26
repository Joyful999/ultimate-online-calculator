(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;
  const unitEl = document.getElementById("unit-system");
  const metricFields = document.getElementById("metric-fields");
  const imperialFields = document.getElementById("imperial-fields");

  function toggleUnits(){
    const metric = unitEl.value === "metric";
    metricFields.style.display = metric ? "" : "none";
    imperialFields.style.display = metric ? "none" : "";
  }
  unitEl.addEventListener("change", toggleUnits);
  toggleUnits();

  function classify(bmi){
    if(bmi < 18.5) return ["Underweight", "var(--accent)"];
    if(bmi < 25) return ["Healthy weight", "var(--green)"];
    if(bmi < 30) return ["Overweight", "var(--amber)"];
    return ["Obesity range", "var(--red)"];
  }

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    let heightM, weightKg;

    if(unitEl.value === "metric"){
      const cm = UOC_CALC.num("height-cm");
      const kg = UOC_CALC.num("weight-kg");
      if(isNaN(cm) || cm <= 0){ UOC_CALC.setError("height-cm", "Enter a valid height in cm."); return; }
      if(isNaN(kg) || kg <= 0){ UOC_CALC.setError("weight-kg", "Enter a valid weight in kg."); return; }
      heightM = cm / 100; weightKg = kg;
    } else {
      const ft = UOC_CALC.num("height-ft");
      const inch = UOC_CALC.num("height-in") || 0;
      const lb = UOC_CALC.num("weight-lb");
      if(isNaN(ft) || ft <= 0){ UOC_CALC.setError("height-ft", "Enter a valid height."); return; }
      if(isNaN(lb) || lb <= 0){ UOC_CALC.setError("weight-lb", "Enter a valid weight in lb."); return; }
      const totalInches = (ft * 12) + inch;
      heightM = totalInches * 0.0254;
      weightKg = lb * 0.453592;
    }

    const bmi = weightKg / (heightM * heightM);
    const [label, color] = classify(bmi);

    document.getElementById("result-readout").innerHTML = `${UOC_CALC.fmt(bmi)}`;
    document.getElementById("result-breakdown").innerHTML = [
      ["BMI", UOC_CALC.fmt(bmi)],
      ["Category", `<span style="color:${color}; font-weight:700;">${label}</span>`],
      ["Healthy BMI range", "18.5 – 24.9"]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `BMI ${UOC_CALC.fmt(bmi)} — ${label}`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("bmi", "BMI Calculator", summary);
  });
})();
