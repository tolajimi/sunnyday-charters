(function () {
  window.sa_event = window.sa_event || function () {
    var a = [].slice.call(arguments);
    window.sa_event.q ? window.sa_event.q.push(a) : (window.sa_event.q = [a]);
  };

  function fire(name, meta) {
    try { window.sa_event(name, meta || {}); } catch (e) {}
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", name, meta || {});
      }
    } catch (e) {}
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest("a");
    if (!a || !a.href) return;
    var href = a.href;
    var meta = { link_url: href };
    if (href.indexOf("wa.me") !== -1) {
      if (a.classList.contains("whatsapp-float")) fire("click_whatsapp_float", meta);
      else if (a.classList.contains("header-whatsapp")) fire("click_whatsapp_header", meta);
      else fire("click_whatsapp", meta);
      return;
    }
    if (/\.pdf(\?|#|$)/i.test(href)) { fire("click_brochure", meta); return; }
    if (href.indexOf("viator.com") !== -1) { fire("click_viator", meta); return; }
    if (href.indexOf("sunnydayadventure.com") !== -1) { fire("click_adventures", meta); return; }
    if (href.indexOf("share.google") !== -1) { fire("click_google_reviews", meta); return; }
    if (href.indexOf("tripadvisor.com") !== -1) { fire("click_tripadvisor", meta); return; }
    if (/\/contact(?:\.html)?(?:$|[?#])/.test(href)) fire("click_inquire", meta);
  }, true);

  document.addEventListener("submit", function (e) {
    var form = e.target;
    if (!form || !form.getAttribute) return;
    if (form.getAttribute("name") === "charter-brief" || form.classList.contains("brief")) {
      fire("submit_charter_brief");
    }
  });

  if (/\/thanks(?:\.html)?(?:$|[?#])/.test(window.location.pathname)) {
    fire("view_thanks");
  }
})();
