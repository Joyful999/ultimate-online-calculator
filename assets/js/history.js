(function(){
  const HIST_KEY = "uoc_calc_history";
  const RECENT_KEY = "uoc_recent_calculators";
  const MAX_HISTORY = 50;
  const MAX_RECENT = 8;

  function getHistory(){ try{ return JSON.parse(localStorage.getItem(HIST_KEY)) || []; }catch(e){ return []; } }
  function saveHistory(list){ localStorage.setItem(HIST_KEY, JSON.stringify(list)); }

  function addHistoryEntry(calcSlug, calcName, summary){
    const list = getHistory();
    list.unshift({ id: Date.now() + Math.random().toString(16).slice(2), slug: calcSlug, name: calcName, summary, ts: Date.now() });
    saveHistory(list.slice(0, MAX_HISTORY));
    document.dispatchEvent(new CustomEvent("uoc:history-changed"));
  }
  function deleteHistoryEntry(id){
    saveHistory(getHistory().filter(h => h.id !== id));
    document.dispatchEvent(new CustomEvent("uoc:history-changed"));
  }
  function clearHistory(){ saveHistory([]); document.dispatchEvent(new CustomEvent("uoc:history-changed")); }
  function historyForCalc(slug){ return getHistory().filter(h => h.slug === slug); }

  function getRecent(){ try{ return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; }catch(e){ return []; } }
  function trackRecent(slug){
    let list = getRecent().filter(s => s !== slug);
    list.unshift(slug);
    localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, MAX_RECENT)));
  }
  function clearRecent(){ localStorage.removeItem(RECENT_KEY); }

  window.UOC_HISTORY = { getHistory, addHistoryEntry, deleteHistoryEntry, clearHistory, historyForCalc };
  window.UOC_RECENT = { getRecent, trackRecent, clearRecent };
})();
