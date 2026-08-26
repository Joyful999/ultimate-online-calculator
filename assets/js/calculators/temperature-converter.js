(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;

  function toCelsius(v, unit){
    if(unit === "c") return v;
    if(unit === "f") return (v - 32) * 5/9;
    if(unit === "k") return v - 273.15;
  }
  function fromCelsius(c, unit){
    if(unit === "c") return c;
    if(unit === "f") return (c * 9/5) + 32;
    if(unit === "k") return c + 273.15;
  }
  const LABELS = { c: "°C", f: "°F", k: "K" };

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const value = UOC_CALC.num("temp-value");
    const from = UOC_CALC.val("from-unit");
    const to = UOC_CALC.val("to-unit");
    if(isNaN(value)){ UOC_CALC.setError("temp-value", "Enter a valid number."); return; }
    if(from === "k" && value < 0){ UOC_CALC.setError("temp-value", "Kelvin can't be negative."); return; }

    const c = toCelsius(value, from);
    const result = fromCelsius(c, to);

    document.getElementById("result-readout").innerHTML = `${UOC_CALC.fmt(result, 2)}<span class="unit">${LABELS[to]}</span>`;
    document.getElementById("result-breakdown").innerHTML = [
      ["From", `${UOC_CALC.fmt(value,2)} ${LABELS[from]}`],
      ["To", `${UOC_CALC.fmt(result,2)} ${LABELS[to]}`],
      ["In Celsius (reference)", UOC_CALC.fmt(c,2) + " °C"]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `${value}${LABELS[from]} = ${UOC_CALC.fmt(result,2)}${LABELS[to]}`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("temperature-converter", "Temperature Converter", summary);
  });
})();
