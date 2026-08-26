(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;
  const modeEl = document.getElementById("tax-mode");

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const price = UOC_CALC.num("price-input");
    const rate = UOC_CALC.num("tax-rate");
    let ok = true;
    if(isNaN(price) || price < 0){ UOC_CALC.setError("price-input", "Enter a valid price."); ok = false; }
    if(isNaN(rate) || rate < 0){ UOC_CALC.setError("tax-rate", "Enter a valid tax rate."); ok = false; }
    if(!ok) return;

    let net, tax, gross;
    if(modeEl.value === "add"){
      net = price;
      tax = net * (rate/100);
      gross = net + tax;
    } else {
      gross = price;
      net = gross / (1 + rate/100);
      tax = gross - net;
    }

    document.getElementById("result-readout").innerHTML = `$${UOC_CALC.fmtMoney(gross)}`;
    document.getElementById("result-breakdown").innerHTML = [
      ["Price before tax", "$" + UOC_CALC.fmtMoney(net)],
      ["Tax rate", rate + "%"],
      ["Tax amount", "$" + UOC_CALC.fmtMoney(tax)],
      ["Price including tax", "$" + UOC_CALC.fmtMoney(gross)]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `${rate}% tax on $${UOC_CALC.fmtMoney(net)} = $${UOC_CALC.fmtMoney(tax)} tax, $${UOC_CALC.fmtMoney(gross)} total`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("tax", "Sales Tax Calculator", summary);
  });
})();
