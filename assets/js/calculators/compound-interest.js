(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const principal = UOC_CALC.num("principal");
    const rate = UOC_CALC.num("rate");
    const years = UOC_CALC.num("years");
    const n = UOC_CALC.num("compounds");
    const monthlyContribution = UOC_CALC.num("contribution") || 0;
    let ok = true;
    if(isNaN(principal) || principal < 0){ UOC_CALC.setError("principal", "Enter a starting amount of 0 or more."); ok = false; }
    if(isNaN(rate) || rate < 0){ UOC_CALC.setError("rate", "Enter a valid interest rate."); ok = false; }
    if(isNaN(years) || years <= 0){ UOC_CALC.setError("years", "Enter a term greater than 0 years."); ok = false; }
    if(isNaN(n) || n <= 0){ UOC_CALC.setError("compounds", "Choose a compounding frequency."); ok = false; }
    if(!ok) return;

    const r = rate / 100;
    const t = years;
    let amount = principal * Math.pow(1 + r/n, n*t);

    // Add monthly contributions with monthly compounding approximation
    let contributionsTotal = 0;
    if(monthlyContribution > 0){
      const monthlyRate = r / 12;
      const months = years * 12;
      let futureValueContrib;
      if(monthlyRate === 0){
        futureValueContrib = monthlyContribution * months;
      } else {
        futureValueContrib = monthlyContribution * ((Math.pow(1+monthlyRate, months) - 1) / monthlyRate);
      }
      amount += futureValueContrib;
      contributionsTotal = monthlyContribution * months;
    }

    const totalContributed = principal + contributionsTotal;
    const totalInterest = amount - totalContributed;

    document.getElementById("result-readout").innerHTML = `$${UOC_CALC.fmtMoney(amount)}`;
    document.getElementById("result-breakdown").innerHTML = [
      ["Starting amount", "$" + UOC_CALC.fmtMoney(principal)],
      ["Total contributed", "$" + UOC_CALC.fmtMoney(totalContributed)],
      ["Interest earned", "$" + UOC_CALC.fmtMoney(totalInterest)],
      ["Final balance", "$" + UOC_CALC.fmtMoney(amount)]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `$${UOC_CALC.fmtMoney(principal)} at ${rate}% for ${years}y = $${UOC_CALC.fmtMoney(amount)}`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("compound-interest", "Compound Interest Calculator", summary);
  });
})();
