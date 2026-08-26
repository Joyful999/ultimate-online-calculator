(function(){
  const form = document.getElementById("calc-form");
  if(!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();
    UOC_CALC.clearErrors(form);
    const raw = UOC_CALC.val("numbers-input");
    const parts = raw.split(/[,\s]+/).map(s => s.trim()).filter(Boolean);
    const nums = parts.map(Number);

    if(!parts.length || nums.some(isNaN)){
      UOC_CALC.setError("numbers-input", "Enter numbers separated by commas or spaces.");
      return;
    }

    const sum = nums.reduce((a,b) => a+b, 0);
    const avg = sum / nums.length;
    const sorted = [...nums].sort((a,b) => a-b);
    const mid = Math.floor(sorted.length/2);
    const median = sorted.length % 2 ? sorted[mid] : (sorted[mid-1]+sorted[mid])/2;
    const min = Math.min(...nums);
    const max = Math.max(...nums);

    document.getElementById("result-readout").innerHTML = `${UOC_CALC.fmt(avg)}`;
    document.getElementById("result-breakdown").innerHTML = [
      ["Count of numbers", nums.length],
      ["Sum", UOC_CALC.fmt(sum)],
      ["Average (mean)", UOC_CALC.fmt(avg)],
      ["Median", UOC_CALC.fmt(median)],
      ["Minimum", UOC_CALC.fmt(min)],
      ["Maximum", UOC_CALC.fmt(max)]
    ].map(([k,v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join("");

    const summary = `Average of ${nums.length} numbers = ${UOC_CALC.fmt(avg)}`;
    const panel = document.getElementById("result-panel");
    panel.setAttribute("data-result-text", summary);
    UOC_CALC.showResult("result-panel");
    UOC_CALC.logHistory("average", "Average Calculator", summary);
  });
})();
