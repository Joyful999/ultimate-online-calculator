(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const price = UOC_CALC.num("original-price");
    const discount = UOC_CALC.num("discount-pct");
    let ok = true;
    if(isNaN(price) || price < 0){ UOC_CALC.setError("original-price", "Enter a valid price."); ok = false; }
    if(isNaN(discount) || discount < 0 || discount > 100){ UOC_CALC.setError("discount-pct", "Enter a percentage between 0 and 100."); ok = false; }
    if(!ok) return;

    const saved = price * (discount/100);
    const salePrice = price - saved;

    document.getElementById("result-readout").innerHTML = `$${UOC_CALC.fmtMoney(salePrice)}`;
    document.getElementById("result-breakdown").innerHTML = [
      ["Original price", "$" + UOC_CALC.fmtMoney(price)],
      ["Discount", discount + "%"],
      ["Amount saved", "$" + UOC_CALC.fmtMoney(saved)],
      ["Sale price", "$" + UOC_CALC.fmtMoney(salePrice)]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `${discount}% off $${UOC_CALC.fmtMoney(price)} = $${UOC_CALC.fmtMoney(salePrice)} (save $${UOC_CALC.fmtMoney(saved)})`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("discount", "Discount Calculator", summary);
  });
})();
