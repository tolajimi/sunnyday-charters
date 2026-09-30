(function () {
  if (location.pathname.replace(/\.html$/, "") !== "/charterport") return;

  var briefs = {
    "Aliz\u00e9": ["A 2005 Lagoon 44, refit 2020. Three cabins, three heads. Nanny Cay. Rendezvous diving only.", "Owner-operated by Captain Carlos Andrade and Chef Maribel Ramirez \u2014 a long-standing pair who previously ran Sea Chateau in the BVI. English and Spanish."],
    "Annex": ["A 2013 Leopard 58. Five cabins for up to ten. A larger BVI week with space on deck for a full group.", "Captain, chef, and a third crew on a ten-guest week."],
    "Awatea": ["A 2019 Balance 63. Five cabins. Fast expedition hull for eight to ten guests.", "Owner-run by Captain Fraser Cameron and Chef Olivia Cameron, a New Zealand pair now based in the BVI."],
    "Cuan Law": ["The 105-ft custom trimaran. Ten cabins, twenty guests. A dive and family ship. Cabins can also be booked one at a time.", "A house crew of about seven \u2014 captain, chef, dive staff, and stews. Captain Scott Ferris has been the long-standing lead; the rest of the team rotates."],
    "DayDream": ["A 2002 Leopard 62. Four cabins, eight guests. Set up for diving as well as a sailing week.", "Captain, chef, and dive-capable crew."],
    "Emysa": ["A 2019 Leopard 58 kept at six guests in three cabins \u2014 more boat than a packed charter.", "Captain and chef."],
    "High 5": ["A 2023 Bali 55. Four cabins, eight guests. Newer open-plan Bali living, Nanny Cay based.", "Captain and chef."],
    "Kelea": ["A 1996 Privilege 65. Five cabins, up to ten. Sails fully crewed or captain-only.", "Fully crewed is captain and chef, with extra hands on a full boat. Captain-only means you provision."],
    "Kismet": ["A 2018 Leopard 50. Four cabins, eight guests.", "Captain and chef."],
    "Lady Marigot": ["A 2004 Privilege 58. Four cabins, eight guests. Based in St. Lucia for the Windwards \u2014 not a Tortola start.", "Captain and chef."],
    "Laurel Lee": ["A 2016 Leopard 58. Five cabins, up to ten.", "Captain, chef, and usually a third crew at ten guests."],
    "Liquid Sky": ["A 2024 Fountaine Pajot 67. Four cabins, eight guests. New, large boat.", "Captain, chef, and at least one more."],
    "Mimbaw": ["A 1999 Lagoon 41. Three cabins, six guests. A smaller, diving-friendly week.", "Captain and chef."],
    "Nargiza": ["A 2026 Fountaine-Pajot 72. Four cabins, eight guests. New launch. East Mediterranean in summer.", "Captain, chef, and extra stew on a boat this size."],
    "Neon Moon": ["A 2016 Lagoon 450. Three cabins, six guests.", "Captain and chef."],
    "One Net": ["An 86-ft Hatteras, 2001. Four cabins, eight guests. Motor yacht on Costa Rica\u2019s Pacific shore \u2014 not the BVI.", "Full motor-yacht crew."],
    "Paloma": ["A 2024 Lagoon 65. Up to ten guests. Williams tender.", "Captain, chef, and a third."],
    "Philotimo": ["A 2018 Lagoon 630 power cat. Three cabins, six guests. Motor, not sail.", "Captain and chef."],
    "Prime Time": ["An 86-ft Nordlund, 2000. Three cabins, six guests. Motor yacht.", "Captain and chef, usually with more hands on a boat this length."],
    "Resilience": ["A 2020 Leopard 50. Three cabins, six guests.", "Captain and chef."],
    "Ruby One": ["A 2020 Leopard 58. Three cabins, six guests \u2014 a large hull for a smaller party.", "Captain and chef."],
    "Segundo Viento": ["A 2021 Privilege 64. Three cabins, six guests.", "Captain and chef, often with a third."],
    "Serena": ["A 2017 Beneteau 63 monohull. Three cabins, six guests. One hull, not a cat.", "Captain and chef."],
    "Solaire": ["A 2026 Two Oceans 58 power cat. Four cabins, six guests.", "Captain and chef."],
    "Somewhere Hot": ["A 2019 Leopard 51 power cat. Three cabins, six guests, or a family of eight.", "Captain and chef."],
    "Sun Goddess": ["A 2014 Royal Cape 53. Three cabins, six guests.", "Captain and chef."],
    "SUNNYacht": ["A 2008 Sunreef 62. Three cabins, six guests. Summers in Corsica, Sardinia, and the C\u00f4te d\u2019Azur.", "Captain and chef."],
    "Tabula Rasa": ["A 2001 Lagoon 570. Three cabins, six guests.", "Captain and chef."],
    "The Adventure": ["A 2020 Lagoon 50. Four cabins, eight guests.", "Captain and chef."],
    "Timaiao 2": ["A 2009 Lagoon 40. Three cabins, six guests. Based in the Grenadines \u2014 not a Tortola start.", "Captain and chef."],
    "Touch the Sky": ["A 2013 Leopard 58. Five cabins, eight guests.", "Captain, chef, and usually a third at eight."],
    "Tranquility": ["A 2014 Explorer 76. Six cabins, twelve guests. Dive boat.", "A larger crew with dive staff."],
    "Vision": ["A 1995 Lagoon 57. Four cabins, six guests, or a family of eight.", "Captain and chef."],
    "Zingara": ["A 2006 Silhouette 76. Five cabins, ten guests. Set up for diving, with a 19-ft tender.", "Four crew \u2014 captain, chef, stew, and dive instructor."]
  };

  var style = document.createElement("style");
  style.textContent = ".brief-kicker{font-size:.62rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--sand-deep);margin:.55rem 0 .15rem}.card-body p.brief{font-size:.9rem;margin-bottom:.25rem}.card-body p.price{margin-top:.55rem}";
  document.head.appendChild(style);

  var intro = document.querySelector(".section-intro");
  if (intro) {
    intro.textContent = "These crewed yachts sail with CharterPort from Nanny Cay. Each card is the boat, then the crew. From-rates are the published weekly start.";
  }

  document.querySelectorAll("article.card").forEach(function (card) {
    var h3 = card.querySelector("h3");
    if (!h3) return;
    var pair = briefs[h3.textContent.trim()];
    if (!pair) return;
    var meta = card.querySelector("p.meta");
    var old = meta ? meta.nextElementSibling : null;
    if (!old || old.tagName !== "P") return;
    if (old.classList.contains("brief") || old.classList.contains("brief-kicker")) return;
    var price = (old.textContent.match(/From \$[\\d,]+ \/ week/) || ["Rate on request"])[0];
    function p(cls, text) {
      var el = document.createElement("p");
      el.className = cls;
      el.textContent = text;
      return el;
    }
    var frag = document.createDocumentFragment();
    frag.appendChild(p("brief-kicker", "The boat"));
    frag.appendChild(p("brief", pair[0]));
    frag.appendChild(p("brief-kicker", "The crew"));
    frag.appendChild(p("brief", pair[1]));
    frag.appendChild(p("price", price));
    old.parentNode.replaceChild(frag, old);
  });
})();
