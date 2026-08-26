(function(){
  function score(calc, termLower){
    let s = 0;
    const name = calc.name.toLowerCase();
    if(name === termLower) s += 100;
    if(name.startsWith(termLower)) s += 50;
    if(name.includes(termLower)) s += 30;
    if((calc.keywords||"").toLowerCase().includes(termLower)) s += 20;
    if((calc.desc||"").toLowerCase().includes(termLower)) s += 8;
    const cat = getCategory(calc.category);
    if(cat && cat.name.toLowerCase().includes(termLower)) s += 12;
    return s;
  }

  function search(term){
    const t = term.trim().toLowerCase();
    if(!t) return [];
    return CALCULATORS
      .map(c => ({ calc: c, s: score(c, t) }))
      .filter(r => r.s > 0)
      .sort((a,b) => b.s - a.s)
      .map(r => r.calc);
  }

  function renderResultsInto(container, results, emptyMsg){
    if(!results.length){
      container.innerHTML = `<div class="no-results">${emptyMsg || "No calculators found. Try another term."}</div>`;
      container.classList.add("open");
      return;
    }
    container.innerHTML = results.slice(0, 8).map(c => {
      const cat = getCategory(c.category);
      return `<a href="${calcUrl(c)}"><strong>${c.name}</strong><small>${cat ? cat.name : ""} · ${c.desc}</small></a>`;
    }).join("");
    container.classList.add("open");
  }

  window.UOC_SEARCH = { search, renderResultsInto };

  document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll("[data-search-input]").forEach(input=>{
      const wrap = input.closest("[data-search-widget]");
      const results = wrap ? wrap.querySelector("[data-search-results]") : null;
      if(!results) return;

      input.addEventListener("input", function(){
        const val = input.value.trim();
        if(!val){ results.classList.remove("open"); results.innerHTML=""; return; }
        renderResultsInto(results, search(val));
      });
      input.addEventListener("keydown", function(e){
        if(e.key === "Enter"){
          e.preventDefault();
          const matches = search(input.value);
          if(matches[0]) window.location.href = calcUrl(matches[0]);
          else window.location.href = "/calculators/?q=" + encodeURIComponent(input.value);
        }
        if(e.key === "Escape"){ results.classList.remove("open"); input.blur(); }
      });
      document.addEventListener("click", function(e){
        if(!wrap.contains(e.target)){ results.classList.remove("open"); }
      });
    });
  });
})();
