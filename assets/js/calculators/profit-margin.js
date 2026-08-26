(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const cost = UOC_CALC.num("cost-price");
    const revenue = UOC_CALC.num("selling-price");
    let ok = true;
    if(isNaN(cost) || cost < 0){ UOC_CALC.setError("cost-price", "Enter a valid cost."); ok = false; }
    if(isNaN(revenue) || revenue <= 0){ UOC_CALC.setError("selling-price", "Enter a selling price greater than 0."); ok = false; }
    if(!ok) return;

    const profit = revenue - cost;
    const margin = (profit / revenue) * 100;
    const markup = cost > 0 ? (profit / cost) * 100 : NaN;

    document.getElementById("result-readout").innerHTML = `${UOC_CALC.fmt(margin)}<span class="unit">% margin</span>`;
    document.getElementById("result-breakdown").innerHTML = [
      ["Cost price", "$" + UOC_CALC.fmtMoney(cost)],
      ["Selling price", "$" + UOC_CALC.fmtMoney(revenue)],
      ["Gross profit", "$" + UOC_CALC.fmtMoney(profit)],
      ["Profit margin", UOC_CALC.fmt(margin) + "%"],
      ["Markup", isNaN(markup) ? "—" : UOC_CALC.fmt(markup) + "%"]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `Cost $${UOC_CALC.fmtMoney(cost)}, sell $${UOC_CALC.fmtMoney(revenue)} → margin ${UOC_CALC.fmt(margin)}%`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("profit-margin", "Profit Margin Calculator", summary);
  });
})();
