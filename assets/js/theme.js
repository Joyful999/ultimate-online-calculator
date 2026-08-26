(function(){
  const KEY = "uoc_theme";
  function apply(theme){
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelectorAll("[data-theme-icon]").forEach(el=>{
      el.innerHTML = theme === "dark" ? ICONS.sun : ICONS.moon;
    });
  }
  function getPreferred(){
    const saved = localStorage.getItem(KEY);
    if(saved) return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  window.UOC_THEME = {
    init(){ apply(getPreferred()); },
    toggle(){
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem(KEY, next);
      apply(next);
    }
  };
  UOC_THEME.init();
})();
