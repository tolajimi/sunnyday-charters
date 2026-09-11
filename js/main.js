(function () {
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
})();
