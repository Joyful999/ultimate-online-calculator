(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const n = UOC_CALC.num("number-input");
    let root = UOC_CALC.num("root-input");
    if(isNaN(root) || root === 0) root = 2;

    if(isNaN(n)){ UOC_CALC.setError("number-input"); return; }
    if(n < 0 && root % 2 === 0){
      UOC_CALC.setError("number-input", "Even roots of negative numbers aren't real numbers.");
      return;
    }

    let result;
    if(n < 0){
      result = -Math.pow(-n, 1/root);
    } else {
      result = Math.pow(n, 1/root);
    }

    const rootLabel = root === 2 ? "Square root" : (root === 3 ? "Cube root" : `${root}th root`);
    document.getElementById("result-readout").innerHTML = `${UOC_CALC.fmt(result, 6)}`;
    document.getElementById("result-breakdown").innerHTML = [
      ["Number", UOC_CALC.fmt(n)],
      ["Root", root],
      [rootLabel, UOC_CALC.fmt(result, 6)],
      ["Check", `${UOC_CALC.fmt(result,6)}^${root} ≈ ${UOC_CALC.fmt(Math.pow(result, root), 4)}`]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `${rootLabel} of ${n} = ${UOC_CALC.fmt(result, 6)}`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("square-root", "Square Root Calculator", summary);
  });
})();
