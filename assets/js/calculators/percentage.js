(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;
  const modeEl = document.getElementById("mode");
  const label1 = document.getElementById("label1");
  const label2 = document.getElementById("label2");

  function updateLabels(){
    if(modeEl.value === "of"){ label1.textContent = "Percentage"; label2.textContent = "Of number"; }
    else { label1.textContent = "Part value"; label2.textContent = "Whole value"; }
  }
  modeEl.addEventListener("change", updateLabels);
  updateLabels();

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const a = UOC_CALC.num("val1");
    const b = UOC_CALC.num("val2");
    let ok = true;
    if(isNaN(a)){ UOC_CALC.setError("val1"); ok = false; }
    if(isNaN(b)){ UOC_CALC.setError("val2"); ok = false; }
    if(modeEl.value === "isWhat" && b === 0){ UOC_CALC.setError("val2", "Whole value can't be zero."); ok = false; }
    if(!ok) return;

    let readout, summary, breakdown;
    if(modeEl.value === "of"){
      const result = (a / 100) * b;
      readout = `${UOC_CALC.fmt(result)}`;
      breakdown = [["Percentage", a + "%"], ["Of number", UOC_CALC.fmt(b)], ["Result", UOC_CALC.fmt(result)]];
      summary = `${a}% of ${b} = ${UOC_CALC.fmt(result)}`;
    } else {
      const result = (a / b) * 100;
      readout = `${UOC_CALC.fmt(result)}<span class="unit">%</span>`;
      breakdown = [["Part", UOC_CALC.fmt(a)], ["Whole", UOC_CALC.fmt(b)], ["Percentage", UOC_CALC.fmt(result) + "%"]];
      summary = `${a} is ${UOC_CALC.fmt(result)}% of ${b}`;
    }

    document.getElementById("result-readout").innerHTML = readout;
    document.getElementById("result-breakdown").innerHTML = breakdown.map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("percentage", "Percentage Calculator", summary);
  });
})();
