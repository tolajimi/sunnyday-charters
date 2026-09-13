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
})();
