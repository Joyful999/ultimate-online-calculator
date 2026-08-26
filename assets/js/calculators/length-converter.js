(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;

  // base unit: metres
  const UNITS = {
    mm: 0.001, cm: 0.01, m: 1, km: 1000,
    inch: 0.0254, ft: 0.3048, yd: 0.9144, mile: 1609.344
  };
  const LABELS = { mm:"Millimetres", cm:"Centimetres", m:"Metres", km:"Kilometres", inch:"Inches", ft:"Feet", yd:"Yards", mile:"Miles" };

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const value = UOC_CALC.num("length-value");
    const from = UOC_CALC.val("from-unit");
    const to = UOC_CALC.val("to-unit");
    if(isNaN(value)){ UOC_CALC.setError("length-value", "Enter a valid number."); return; }

    const metres = value * UNITS[from];
    const result = metres / UNITS[to];

    document.getElementById("result-readout").innerHTML = `${UOC_CALC.fmt(result, 4)}<span class="unit">${LABELS[to]}</span>`;
    document.getElementById("result-breakdown").innerHTML = [
      ["From", `${UOC_CALC.fmt(value,4)} ${LABELS[from]}`],
      ["To", `${UOC_CALC.fmt(result,4)} ${LABELS[to]}`],
      ["In metres (reference)", UOC_CALC.fmt(metres, 4) + " m"]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `${value} ${LABELS[from]} = ${UOC_CALC.fmt(result,4)} ${LABELS[to]}`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("length-converter", "Length Converter", summary);
  });
})();
