(function () {
  var deskBrief = [
    "Hi Sunny Day Charters BVI",
    "I want: Hilux land day / private boat / overnight / week / not sure",
    "Dates:",
    "Guests + ages:",
    "Pickup or fly-in (EIS / STT / villa):"
  ].join("\n");
  var deskUrl = "https://wa.me/13073818011?text=" + encodeURIComponent(deskBrief);
  document.querySelectorAll("a.whatsapp-float, a.header-whatsapp").forEach(function (a) {
    if (!a.getAttribute("href") || a.getAttribute("href").indexOf("?text=") === -1) {
      a.setAttribute("href", deskUrl);
    }
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  });

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("open") ? "true" : "false");
    });
  }

  var form = document.querySelector("form.brief");
  if (form) {
    form.addEventListener("submit", function () {
      var parts = [];
      ["dates", "nights", "pax", "waters", "style", "hull", "budget", "arrive", "mustsee"].forEach(function (name) {
        var el = form.querySelector("[name='" + name + "']");
        if (el && el.value) parts.push(name + ": " + el.value);
      });
      try { sessionStorage.setItem("sdc-brief", parts.join(" | ")); } catch (e) {}
    });
  }

  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.addEventListener("click", function () {
      if (a.getAttribute("href") && a.getAttribute("href").indexOf("wa.me") !== -1) return;
    });
  });
})();

(function () {
  var start = document.getElementById('date_start');
  var end = document.getElementById('date_end');
  if (!start || !end) return;
  function syncMin() {
    if (start.value) end.min = start.value;
    if (end.value && start.value && end.value < start.value) end.value = start.value;
  }
  start.addEventListener('change', syncMin);
  syncMin();
})();

(function () {
  var sel = document.getElementById("trip_type");
  if (!sel) return;
  var raw = "";
  try { raw = (new URLSearchParams(window.location.search).get("trip") || "").toLowerCase().trim(); } catch (e) { return; }
  if (!raw) return;
  var map = {
    day: "Private day (powerboat or sail)",
    "private-day": "Private day (powerboat or sail)",
    overnight: "Overnight (1 night)",
    night: "Overnight (1 night)",
    "short-week": "Short week (2–6 nights)",
    short: "Short week (2–6 nights)",
    week: "Full week (7 nights)",
    "full-week": "Full week (7 nights)",
    shared: "Shared day trip / Viator",
    viator: "Shared day trip / Viator",
    advise: "Not sure — advise",
    unsure: "Not sure — advise"
  };
  var label = map[raw];
  if (!label) return;
  for (var i = 0; i < sel.options.length; i++) {
    if (sel.options[i].textContent === label) {
      sel.selectedIndex = i;
      break;
    }
  }
})();
