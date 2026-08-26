(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const total = UOC_CALC.num("total-amount");
    const people = UOC_CALC.num("people-count");
    const extra = UOC_CALC.num("extra-fee") || 0;
    let ok = true;
    if(isNaN(total) || total <= 0){ UOC_CALC.setError("total-amount", "Enter a total greater than 0."); ok = false; }
    if(isNaN(people) || people < 1){ UOC_CALC.setError("people-count", "Enter at least 1 person."); ok = false; }
    if(!ok) return;

    const grand = total + extra;
    const perPerson = grand / people;

    document.getElementById("result-readout").innerHTML = `$${UOC_CALC.fmtMoney(perPerson)}<span class="unit">/ person</span>`;
    document.getElementById("result-breakdown").innerHTML = [
      ["Bill total", "$" + UOC_CALC.fmtMoney(total)],
      ["Extra fee / tip", "$" + UOC_CALC.fmtMoney(extra)],
      ["Grand total", "$" + UOC_CALC.fmtMoney(grand)],
      ["Number of people", people],
      ["Each person pays", "$" + UOC_CALC.fmtMoney(perPerson)]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `$${UOC_CALC.fmtMoney(grand)} split between ${people} = $${UOC_CALC.fmtMoney(perPerson)} each`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("split-bill", "Split Bill Calculator", summary);
  });
})();
