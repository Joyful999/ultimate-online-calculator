(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const principal = UOC_CALC.num("loan-amount");
    const annualRate = UOC_CALC.num("interest-rate");
    const years = UOC_CALC.num("loan-term");
    let ok = true;
    if(isNaN(principal) || principal <= 0){ UOC_CALC.setError("loan-amount", "Enter a loan amount greater than 0."); ok = false; }
    if(isNaN(annualRate) || annualRate < 0){ UOC_CALC.setError("interest-rate", "Enter a valid interest rate."); ok = false; }
    if(isNaN(years) || years <= 0){ UOC_CALC.setError("loan-term", "Enter a term greater than 0 years."); ok = false; }
    if(!ok) return;

    const n = years * 12;
    const r = (annualRate / 100) / 12;
    let monthly;
    if(r === 0){
      monthly = principal / n;
    } else {
      monthly = principal * (r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1);
    }
    const totalPaid = monthly * n;
    const totalInterest = totalPaid - principal;

    document.getElementById("result-readout").innerHTML = `${UOC_CALC.fmtMoney(monthly)}<span class="unit">/ month</span>`;
    document.getElementById("result-breakdown").innerHTML = [
      ["Loan amount", "$" + UOC_CALC.fmtMoney(principal)],
      ["Loan term", `${years} years (${n} payments)`],
      ["Interest rate", annualRate + "% APR"],
      ["Total paid", "$" + UOC_CALC.fmtMoney(totalPaid)],
      ["Total interest", "$" + UOC_CALC.fmtMoney(totalInterest)]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `Loan of $${UOC_CALC.fmtMoney(principal)} at ${annualRate}% for ${years}y = $${UOC_CALC.fmtMoney(monthly)}/mo`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("loan", "Loan Calculator", summary);
  });
})();
