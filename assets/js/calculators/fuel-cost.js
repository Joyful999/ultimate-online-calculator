(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const distance = UOC_CALC.num("distance-input");
    const efficiency = UOC_CALC.num("efficiency-input");
    const price = UOC_CALC.num("fuel-price");
    let ok = true;
    if(isNaN(distance) || distance <= 0){ UOC_CALC.setError("distance-input", "Enter a distance greater than 0."); ok = false; }
    if(isNaN(efficiency) || efficiency <= 0){ UOC_CALC.setError("efficiency-input", "Enter fuel efficiency greater than 0."); ok = false; }
    if(isNaN(price) || price <= 0){ UOC_CALC.setError("fuel-price", "Enter a fuel price greater than 0."); ok = false; }
    if(!ok) return;

    // efficiency assumed as distance-units per fuel-unit (e.g. miles per gallon or km per litre)
    const fuelNeeded = distance / efficiency;
    const cost = fuelNeeded * price;

    document.getElementById("result-readout").innerHTML = `$${UOC_CALC.fmtMoney(cost)}`;
    document.getElementById("result-breakdown").innerHTML = [
      ["Trip distance", UOC_CALC.fmt(distance)],
      ["Fuel efficiency", UOC_CALC.fmt(efficiency)],
      ["Fuel needed", UOC_CALC.fmt(fuelNeeded, 2)],
      ["Fuel price", "$" + UOC_CALC.fmtMoney(price)],
      ["Estimated trip cost", "$" + UOC_CALC.fmtMoney(cost)]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `Trip of ${distance} at ${efficiency} eff, $${UOC_CALC.fmtMoney(price)}/unit = $${UOC_CALC.fmtMoney(cost)}`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("fuel-cost", "Fuel Cost Calculator", summary);
  });
})();
