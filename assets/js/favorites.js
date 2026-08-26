(function(){
  const KEY = "uoc_favorites";
  function getAll(){
    try{ return JSON.parse(localStorage.getItem(KEY)) || []; }catch(e){ return []; }
  }
  function save(list){ localStorage.setItem(KEY, JSON.stringify(list)); }
  function isFav(slug){ return getAll().includes(slug); }
  function toggle(slug){
    let list = getAll();
    if(list.includes(slug)){ list = list.filter(s => s !== slug); }
    else{ list.push(slug); }
    save(list);
    document.dispatchEvent(new CustomEvent("uoc:favorites-changed"));
    return list.includes(slug);
  }
  function clearAll(){ save([]); document.dispatchEvent(new CustomEvent("uoc:favorites-changed")); }

  window.UOC_FAVORITES = { getAll, isFav, toggle, clearAll };

  function paintButtons(){
    document.querySelectorAll("[data-fav-toggle]").forEach(btn=>{
      const slug = btn.getAttribute("data-fav-toggle");
      const active = isFav(slug);
      btn.classList.toggle("active", active);
      btn.innerHTML = active ? icon("star") + " Favorited" : icon("starOutline") + " Add to Favorites";
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  document.addEventListener("click", function(e){
    const btn = e.target.closest("[data-fav-toggle]");
    if(!btn) return;
    toggle(btn.getAttribute("data-fav-toggle"));
    paintButtons();
  });
  document.addEventListener("uoc:favorites-changed", paintButtons);
  document.addEventListener("DOMContentLoaded", paintButtons);
})();
