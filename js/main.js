(function () {
  var deskBrief = [
    "Hi Sunny Day Charters BVI",
    "I want: our captain week / overnight / private day / a crewed house / not sure",
    "Dates:",
    "Guests + ages:",
    "Fly-in (EIS / STT) or pickup:"
  ].join("\n");
  var deskUrl = "https://wa.me/13073818011?text=" + encodeURIComponent(deskBrief);
  document.querySelectorAll("a.whatsapp-float").forEach(function (a) {
    if (!a.getAttribute("href") || a.getAttribute("href").indexOf("?text=") === -1) {
      a.setAttribute("href", deskUrl);
    }
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  });
  document.querySelectorAll("a.header-whatsapp").forEach(function (a) {
    a.setAttribute("href", "/contact");
    a.removeAttribute("target");
    a.removeAttribute("rel");
    a.textContent = "Inquire";
  });

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav");
  if (nav) {
    var path = (location.pathname || "/").replace(/\.html$/, "") || "/";
    if (path === "/index") path = "/";
    var items = [
      ["/", "Home"],
      ["/week", "Multiday"],
      ["/days", "Days"],
      ["/charterport", "Crewed yachts"],
      ["/experiences", "Experiences"],
      ["/guides", "Journal"],
      ["/plan", "Plan"],
      ["/waters", "Waters"],
      ["/contact", "Inquire"]
    ];
    nav.innerHTML = items.map(function (it) {
      var active = path === it[0] || (it[0] !== "/" && path.indexOf(it[0]) === 0);
      if (it[0] === "/week" && (path === "/overnight" || path === "/nights")) active = true;
      return '<a href="' + it[0] + '"' + (active ? ' class="active"' : '') + '>' + it[1] + '</a>';
    }).join("");
  }
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

(function () {
  var box = document.getElementById("mustsee");
  if (!box) return;
  var yacht = "";
  try { yacht = (new URLSearchParams(window.location.search).get("yacht") || "").trim(); } catch (e) { return; }
  if (!yacht || box.value) return;
  box.value = "CharterPort BVI: " + yacht;
})();
