/* Shared helpers for individual calculator scripts. */
const UOC_CALC = {
  num(id){
    const el = document.getElementById(id);
    if(!el) return NaN;
    return el.value === "" ? NaN : parseFloat(el.value);
  },
  val(id){
    const el = document.getElementById(id);
    return el ? el.value : "";
  },
  setError(fieldId, msg){
    const field = document.getElementById(fieldId)?.closest(".field");
    if(!field) return;
    field.classList.add("error");
    const msgEl = field.querySelector(".field-error-msg");
    if(msgEl) msgEl.textContent = msg || "Please enter a valid number.";
  },
  clearErrors(formEl){
    formEl.querySelectorAll(".field.error").forEach(f => f.classList.remove("error"));
  },
  fmt(n, digits){
    if(!isFinite(n)) return "—";
    const d = digits === undefined ? 2 : digits;
    return Number(n).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
  },
  fmtMoney(n, digits){
    if(!isFinite(n)) return "—";
    const d = digits === undefined ? 2 : digits;
    return Number(n).toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d });
  },
  showResult(panelId){
    const panel = document.getElementById(panelId);
    if(panel){ panel.classList.add("show"); panel.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
  },
  hideResult(panelId){
    document.getElementById(panelId)?.classList.remove("show");
  },
  logHistory(slug, name, summary){
    if(window.UOC_HISTORY) UOC_HISTORY.addHistoryEntry(slug, name, summary);
    renderHistoryBlock(slug);
  },
  copyText(text){
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(() => showToast("Result copied to clipboard"))
        .catch(() => showToast("Couldn't copy — please copy manually"));
    } else {
      showToast("Clipboard not supported in this browser");
    }
  },
  shareText(title, text){
    if(navigator.share){
      navigator.share({ title, text }).catch(()=>{});
    } else {
      UOC_CALC.copyText(text);
      showToast("Link copied — sharing isn't supported here");
    }
  }
};

function renderHistoryBlock(slug){
  const holder = document.querySelector("[data-calc-history]");
  if(!holder || !window.UOC_HISTORY) return;
  const entries = UOC_HISTORY.historyForCalc(slug);
  const block = holder.closest(".history-block");
  if(!entries.length){ block?.classList.add("visually-hidden"); return; }
  block?.classList.remove("visually-hidden");
  holder.innerHTML = entries.slice(0,8).map(h => `
    <div class="row">
      <span class="mono">${h.summary}</span>
      <button class="btn-ghost btn-sm" data-del-history="${h.id}" aria-label="Delete this history entry">${icon("trash")}</button>
    </div>`).join("");
}

document.addEventListener("DOMContentLoaded", function(){
  const slug = document.body.getAttribute("data-calc-slug");
  if(slug) renderHistoryBlock(slug);

  document.addEventListener("click", function(e){
    const del = e.target.closest("[data-del-history]");
    if(del){ UOC_HISTORY.deleteHistoryEntry(del.getAttribute("data-del-history")); if(slug) renderHistoryBlock(slug); }
    const clearBtn = e.target.closest("[data-clear-history]");
    if(clearBtn){ UOC_HISTORY.clearHistory(); if(slug) renderHistoryBlock(slug); showToast("History cleared"); }

    const copyBtn = e.target.closest("[data-copy-btn]");
    if(copyBtn){
      const panel = copyBtn.closest(".result-panel");
      const text = panel ? panel.getAttribute("data-result-text") : "";
      if(text) UOC_CALC.copyText(text);
    }
    const shareBtn = e.target.closest("[data-share-btn]");
    if(shareBtn){
      const panel = shareBtn.closest(".result-panel");
      const text = panel ? panel.getAttribute("data-result-text") : "";
      if(text) UOC_CALC.shareText(document.title, text);
    }
    const resetBtn = e.target.closest("[data-reset-btn]");
    if(resetBtn){
      const form = resetBtn.closest("form");
      if(form){
        form.reset();
        UOC_CALC.clearErrors(form);
        const panel = form.parentElement.querySelector(".result-panel") || document.querySelector(".result-panel");
        panel?.classList.remove("show");
      }
    }
  });
});
