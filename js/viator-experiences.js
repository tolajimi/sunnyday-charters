(function () {
  var grid = document.getElementById("viator-grid");
  var note = document.getElementById("viator-note");
  if (!grid) return;

  fetch("/.netlify/functions/viator-experiences")
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (!data || !data.configured) {
        if (note) {
          note.textContent =
            "Share a date on WhatsApp if you do not see a trip that fits.";
        }
        return;
      }
      if (!data.products || !data.products.length) {
        if (note) {
          note.textContent = "Choose a day below, or send a question if you need a different trip.";
        }
        return;
      }
      var topic = "";
      try {
        topic = (new URLSearchParams(window.location.search).get("topic") || "").toLowerCase();
      } catch (e) {}
      var words = {
        sail: ["sail", "daysail", "catamaran", "jost", "soggy", "norman", "anne"],
        baths: ["baths", "virgin gorda", "gorda"],
        land: ["jeep", "land", "trolley", "cultural", "tortola tour", "beach trip", "smuggler"],
        scuba: ["scuba", "dive"]
      };
      var keys = words[topic] || null;
      var products = data.products;
      if (keys) {
        var filtered = products.filter(function (p) {
          var blob = ((p.title || "") + " " + (p.description || "")).toLowerCase();
          return keys.some(function (k) { return blob.indexOf(k) !== -1; });
        });
        if (filtered.length) products = filtered;
      }
      grid.innerHTML = "";
      products.slice(0, 12).forEach(function (p) {
        var article = document.createElement("article");
        article.className = "card exp-card";
        var src = p.image ? p.image.replace(/210x118/g, "674x446") : "/media/cove-beach.jpg";
        var price = p.price
          ? "<p class=\"price\">From " +
            (p.currency === "USD" ? "$" : p.currency + " ") +
            Number(p.price).toLocaleString() +
            "</p>"
          : "";
        var referral = referralLine(p);
        var rating =
          p.rating && p.reviewCount
            ? "<p class=\"meta\">Viator experience · " +
              Number(p.rating).toFixed(1) +
              " · " +
              p.reviewCount +
              " reviews</p>"
            : "<p class=\"meta\">Viator experience</p>";
        var href = p.url || "/contact";
        var cta = p.url ? "View on Viator" : "Ask a question";
        var title = String(p.title || "Day trip");
        if (title.length > 52) title = title.slice(0, 49) + "…";
        article.innerHTML =
          "<div class=\"card-img\"><img class=\"exp-thumb\" src=\"" +
          escapeHtml(src) +
          "\" alt=\"" +
          escapeHtml(title) +
          "\" width=\"674\" height=\"446\" loading=\"lazy\" /></div><div class=\"card-body\">" +
          "<span class=\"badge partner\">Viator</span>" +
          "<h3>" +
          escapeHtml(title) +
          "</h3>" +
          rating +
          "<p class=\"blurb\">" +
          escapeHtml(referral ? referral + " " : "") +
          escapeHtml(p.description || "") +
          "</p>" +
          price +
          "<div class=\"card-actions\"><a class=\"btn btn-primary btn-sm\" href=\"" +
          href +
          "\" target=\"_blank\" rel=\"noopener\">" +
          cta +
          "</a></div></div>";
        grid.appendChild(article);
      });
      if (note) {
        note.textContent =
          "Viator experiences. A referral — not a Sunny Day boat, and not the 4×4 SUV tour.";
      }
    })
    .catch(function () {
      if (note) {
        note.textContent =
          "Live listings are unavailable just now. The cards below are Viator referrals, not trips Sunny Day operates.";
      }
    });

  function referralLine(p) {
    var blob = ((p.title || "") + " " + (p.description || "")).toLowerCase();
    if (
      blob.indexOf("daysail") !== -1 ||
      blob.indexOf("day sail") !== -1 ||
      blob.indexOf("anne bonny") !== -1
    ) {
      return "A referral, not our boat.";
    }
    if (
      blob.indexOf("beach tour") !== -1 ||
      blob.indexOf("beach day") !== -1 ||
      blob.indexOf("tortola beach") !== -1
    ) {
      return "A referral, not our 4×4 SUV tour.";
    }
    return "";
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
