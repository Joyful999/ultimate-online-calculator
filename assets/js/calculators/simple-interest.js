(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const principal = UOC_CALC.num("principal");
    const rate = UOC_CALC.num("rate");
    const years = UOC_CALC.num("years");
    let ok = true;
    if(isNaN(principal) || principal <= 0){ UOC_CALC.setError("principal", "Enter a principal amount greater than 0."); ok = false; }
    if(isNaN(rate) || rate < 0){ UOC_CALC.setError("rate", "Enter a valid interest rate."); ok = false; }
    if(isNaN(years) || years <= 0){ UOC_CALC.setError("years", "Enter a term greater than 0 years."); ok = false; }
    if(!ok) return;

    const interest = principal * (rate/100) * years;
    const total = principal + interest;

    document.getElementById("result-readout").innerHTML = `$${UOC_CALC.fmtMoney(interest)}`;
    document.getElementById("result-breakdown").innerHTML = [
      ["Principal", "$" + UOC_CALC.fmtMoney(principal)],
      ["Rate", rate + "% / year"],
      ["Term", years + " years"],
      ["Interest earned", "$" + UOC_CALC.fmtMoney(interest)],
      ["Total (principal + interest)", "$" + UOC_CALC.fmtMoney(total)]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `Simple interest on $${UOC_CALC.fmtMoney(principal)} at ${rate}% for ${years}y = $${UOC_CALC.fmtMoney(interest)}`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("simple-interest", "Simple Interest Calculator", summary);
  });
})();
