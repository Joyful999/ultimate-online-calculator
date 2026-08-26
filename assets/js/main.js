(function(){
  document.addEventListener("DOMContentLoaded", function(){

    // Mobile nav toggle
    const menuBtn = document.querySelector("[data-menu-toggle]");
    const mobileNav = document.querySelector("[data-mobile-nav]");
    if(menuBtn && mobileNav){
      menuBtn.addEventListener("click", function(){
        const open = mobileNav.classList.toggle("open");
        menuBtn.innerHTML = open ? icon("close") : icon("menu");
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.style.overflow = open ? "hidden" : "";
      });
      mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuBtn.innerHTML = icon("menu");
        document.body.style.overflow = "";
      }));
    }

    // Theme toggle buttons
    document.querySelectorAll("[data-theme-toggle]").forEach(btn=>{
      btn.addEventListener("click", () => UOC_THEME.toggle());
    });

    // FAQ accordions
    document.querySelectorAll(".faq-item").forEach(item=>{
      const q = item.querySelector(".faq-q");
      if(!q) return;
      q.addEventListener("click", () => {
        const wasOpen = item.classList.contains("open");
        item.closest(".faq-list")?.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
        if(!wasOpen) item.classList.add("open");
      });
    });

    // Footer year
    document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

    // Track recently used calculator (pages set data-calc-slug on <body>)
    const calcSlug = document.body.getAttribute("data-calc-slug");
    if(calcSlug && window.UOC_RECENT) UOC_RECENT.trackRecent(calcSlug);

    renderRecentlyUsed();
    renderFooterFavoritesHint();
  });

  window.showToast = function(msg){
    let toast = document.querySelector(".toast");
    if(!toast){
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  };

  function renderRecentlyUsed(){
    const holder = document.querySelector("[data-recently-used]");
    if(!holder || !window.UOC_RECENT) return;
    const slugs = UOC_RECENT.getRecent().filter(s => s !== document.body.getAttribute("data-calc-slug"));
    if(!slugs.length){ holder.closest(".recently-used-block")?.classList.add("visually-hidden"); return; }
    holder.innerHTML = slugs.slice(0,6).map(slug=>{
      const c = getCalculator(slug);
      if(!c) return "";
      return `<a href="${calcUrl(c)}" class="pill">${c.name}</a>`;
    }).join("");
  }

  function renderFooterFavoritesHint(){
    // no-op placeholder retained for future footer personalization
  }
})();
