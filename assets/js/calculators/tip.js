(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const bill = UOC_CALC.num("bill-amount");
    const tipPct = UOC_CALC.num("tip-pct");
    const people = UOC_CALC.num("people-count") || 1;
    let ok = true;
    if(isNaN(bill) || bill <= 0){ UOC_CALC.setError("bill-amount", "Enter a bill amount greater than 0."); ok = false; }
    if(isNaN(tipPct) || tipPct < 0){ UOC_CALC.setError("tip-pct", "Enter a valid tip percentage."); ok = false; }
    if(people < 1){ UOC_CALC.setError("people-count", "Enter at least 1 person."); ok = false; }
    if(!ok) return;

    const tip = bill * (tipPct/100);
    const total = bill + tip;
    const perPerson = total / people;

    document.getElementById("result-readout").innerHTML = `$${UOC_CALC.fmtMoney(perPerson)}<span class="unit">/ person</span>`;
    document.getElementById("result-breakdown").innerHTML = [
      ["Bill amount", "$" + UOC_CALC.fmtMoney(bill)],
      ["Tip (" + tipPct + "%)", "$" + UOC_CALC.fmtMoney(tip)],
      ["Total with tip", "$" + UOC_CALC.fmtMoney(total)],
      ["Split between", people + " people"],
      ["Each person pays", "$" + UOC_CALC.fmtMoney(perPerson)]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `$${UOC_CALC.fmtMoney(bill)} bill, ${tipPct}% tip, ${people} people = $${UOC_CALC.fmtMoney(perPerson)} each`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("tip", "Tip Calculator", summary);
  });
})();
