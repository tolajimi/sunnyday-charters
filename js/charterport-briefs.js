(function () {
  if (location.pathname.replace(/\.html$/, "") !== "/charterport") return;

  var briefs = {
    "Aliz\u00e9": ["A 2005 Lagoon 44, refit 2020. Three cabins, three heads. Nanny Cay. Rendezvous diving only \u2014 no compressor aboard.", "Two crew: captain/engineer and chef/mate. The published team is a long-standing pair. We confirm who is aboard your week before a hold."],
    "Annex": ["A 2013 Leopard 58. Five cabins for up to ten. A larger BVI week with space on deck for a full group.", "Typically captain, chef, and a third crew on a ten-guest week. Exact names come with the CharterPort confirmation."],
    "Awatea": ["A 2019 Balance 63. Five cabins. Fast, performance hull \u2014 some listings show eight guests, some ten. We confirm the layout for your dates.", "Captain and chef as a pair on the published listing. Extra stew if the guest count requires it."],
    "Cuan Law": ["The 105-ft custom trimaran. Ten cabins, twenty guests. Built as a dive and family ship. Cabins can also be booked individually.", "About seven crew \u2014 captain, chef, dive staff, and stews. This is a full ship, not a couple-run cat."],
    "DayDream": ["A 2002 Leopard 62. Four cabins, eight guests. Set up for diving as well as a sailing week.", "Captain, chef, and dive-capable crew. We confirm who is teaching if you want tanks in the week."],
    "Emysa": ["A 2019 Leopard 58 kept at six guests in three cabins \u2014 more boat than a packed charter.", "Captain and chef. A third crew if CharterPort staffs the week that way."],
    "High 5": ["A 2023 Bali 55. Four cabins, eight guests. Newer open-plan Bali living, Nanny Cay based.", "Captain and chef as the core. Confirm stew count when we price the week."],
    "Kelea": ["A 1996 Privilege 65. Five cabins, up to ten. Can run fully crewed or captain-only \u2014 say which you want.", "Fully crewed is captain plus chef (and extra hands on a full boat). Captain-only means you provision."],
    "Kismet": ["A 2018 Leopard 50. Four cabins, eight guests. Standard BVI crewed-cat size.", "Captain and chef. Two-crew week unless CharterPort adds a stew for your dates."],
    "Lady Marigot": ["A 2004 Privilege 58. Four cabins, eight guests. Based in St. Lucia for the Windwards \u2014 not a Tortola start.", "Captain and chef for the Windward itinerary. Confirm the base and crew with the dates."],
    "Laurel Lee": ["A 2016 Leopard 58. Five cabins, up to ten. Same family of big Leopards as Annex and Ruby One.", "Captain, chef, and usually a third crew at ten guests."],
    "Liquid Sky": ["A 2024 Fountaine Pajot 67. Four cabins, eight guests. New, large, high weekly rate.", "Captain, chef, and at least one more. Crew list is issued when CharterPort holds the week."],
    "Mimbaw": ["A 1999 Lagoon 41. Three cabins, six guests. Smaller, diving-friendly week.", "Captain and chef. Dive brief is rendezvous or crew-led \u2014 we confirm which."],
    "Nargiza": ["A 2026 Fountaine-Pajot 72. Four cabins, eight guests. New launch. East Mediterranean in summer, not a winter-BVI default.", "Captain, chef, and extra stew on a boat this size. Base and crew follow the season."],
    "Neon Moon": ["A 2016 Lagoon 450. Three cabins, six guests. Classic BVI couple-or-family cat.", "Captain and chef."],
    "One Net": ["An 86-ft Hatteras, 2001. Four cabins, eight guests. Motor yacht. Charters Costa Rica\u2019s Pacific shore \u2014 not the BVI.", "Full motor-yacht crew. Confirm the Pacific base and who is aboard before anyone travels."],
    "Paloma": ["A 2024 Lagoon 65. Four cabins in our listing, up to ten guests. Williams tender. New boat.", "Three crew on the public listing \u2014 captain, chef, and a third. Names are confirmed at hold."],
    "Philotimo": ["A 2018 Lagoon 630 power cat. Three cabins, six guests. Motor, not sail.", "Captain and chef. Power-cat week \u2014 more range, less sail time."],
    "Prime Time": ["An 86-ft Nordlund, 2000. Three cabins, six guests. Motor yacht.", "Captain and chef at minimum; a boat this length usually carries more. We send the crew sheet with the rate."],
    "Resilience": ["A 2020 Leopard 50. Three cabins, six guests. Newer 50 with room left unused rather than packed to eight.", "Captain and chef."],
    "Ruby One": ["A 2020 Leopard 58. Three cabins, six guests \u2014 a large hull run for a smaller party.", "Captain and chef. Third crew if you add guests."],
    "Segundo Viento": ["A 2021 Privilege 64. Three cabins, six guests. Newer Privilege, high weekly rate.", "Captain and chef, often with a third on a Privilege this size."],
    "Serena": ["A 2017 Beneteau 63 monohull. Three cabins, six guests. One hull, not a cat. Catalogue also notes a 2023 launch \u2014 we confirm the year with CharterPort.", "Captain and chef."],
    "Solaire": ["A 2026 Two Oceans 58 power cat. Four cabins, six guests. New power catamaran.", "Captain and chef. Confirm stew and engineer on a new launch."],
    "Somewhere Hot": ["A 2019 Leopard 51 power cat. Three cabins, six guests, or a family of eight if CharterPort allows the layout.", "Captain and chef."],
    "Sun Goddess": ["A 2014 Royal Cape 53. Three cabins, six guests.", "Captain and chef."],
    "SUNNYacht": ["A 2008 Sunreef 62. Three cabins, six guests. Summers in Corsica, Sardinia, and the C\u00f4te d\u2019Azur \u2014 not a year-round BVI boat.", "Captain and chef. Confirm the Mediterranean base if your dates fall in summer."],
    "Tabula Rasa": ["A 2001 Lagoon 570. Three cabins, six guests. Older 57, still a proper crewed week.", "Captain and chef."],
    "The Adventure": ["A 2020 Lagoon 50. Four cabins, eight guests.", "Captain and chef. Third crew possible at eight guests."],
    "Timaiao 2": ["A 2009 Lagoon 40. Three cabins, six guests. Based in the Grenadines \u2014 not a Tortola start.", "Captain and chef for the Grenadine itinerary."],
    "Touch the Sky": ["A 2013 Leopard 58. Five cabins, eight guests.", "Captain, chef, and usually a third at eight."],
    "Tranquility": ["A 2014 Explorer 76. Six cabins, twelve guests. Dive boat.", "Larger crew with dive staff. Count is confirmed with the week \u2014 this is not a two-person boat."],
    "Vision": ["A 1995 Lagoon 57. Four cabins, six guests, or a family of eight.", "Captain and chef."],
    "Zingara": ["A 2006 Silhouette 76. Five cabins, ten guests. Set up for diving, with a 19-ft tender.", "Four crew on the public listing \u2014 captain, chef, stew, and dive instructor. Who is aboard is confirmed at hold."]
  };

  var style = document.createElement("style");
  style.textContent = ".brief-kicker{font-size:.62rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--sand-deep);margin:.55rem 0 .15rem}.card-body p.brief{font-size:.9rem;margin-bottom:.25rem}.card-body p.price{margin-top:.55rem}";
  document.head.appendChild(style);

  var intro = document.querySelector(".section-intro");
  if (intro) {
    intro.textContent = "These crewed yachts sail with CharterPort from Nanny Cay. Each card is the boat, then the crew. From is the published weekly starting rate. We confirm the yacht, the people aboard, and the rate before anyone holds a week.";
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
    var price = (old.textContent.match(/From \$[\\d,]+ \/ week/) || ["Inquire to confirm the week"])[0];
    if (price.indexOf("Inquire") === -1) price += ". Inquire to confirm.";
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
