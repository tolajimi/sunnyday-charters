/**
 * Viator Partner API (Affiliate) proxy for Experiences we recommend.
 * Set Netlify env VIATOR_API_KEY from partner dashboard → Tools → Affiliate API.
 * Optional: VIATOR_DESTINATION_IDS=50314 (Tortola). Do not commit the key.
 */
const VIATOR = "https://api.viator.com/partner";
const DEFAULT_DEST = (process.env.VIATOR_DESTINATION_IDS || "50314")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const EXCLUDE = new Set(
  (process.env.VIATOR_EXCLUDE_CODES || "339497P2")
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean)
);

exports.handler = async function () {
  const key = process.env.VIATOR_API_KEY || "";
  if (!key) {
    return json(200, { configured: false, products: [], reason: "missing_key" });
  }

  const headers = {
    "exp-api-key": key,
    Accept: "application/json;version=2.0",
    "Content-Type": "application/json",
    "Accept-Language": "en-US",
  };

  try {
    const products = [];
    for (const dest of DEFAULT_DEST) {
      const res = await fetch(`${VIATOR}/products/search`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          filtering: { destination: Number(dest) || dest },
          currency: "USD",
          sorting: { sort: "TRAVELER_RATING", order: "DESCENDING" },
          pagination: { start: 1, count: 24 },
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        return json(200, {
          configured: true,
          products: [],
          reason: "viator_error",
          status: res.status,
          detail: text.slice(0, 240),
        });
      }
      const data = await res.json();
      const list = data.products || data.data || [];
      list.forEach((p) => {
        const code = String(p.productCode || p.code || "").toUpperCase();
        if (!code || EXCLUDE.has(code)) return;
        const minutes =
          (p.duration && (p.duration.fixedDurationInMinutes || p.duration.from)) ||
          p.durationMinutes ||
          0;
        if (minutes > 12 * 60) return;
        products.push(shape(p));
      });
    }

    const seen = new Set();
    const unique = products.filter((p) => {
      if (seen.has(p.code)) return false;
      seen.add(p.code);
      return true;
    });

    return json(200, {
      configured: true,
      destinationIds: DEFAULT_DEST,
      products: unique.slice(0, 18),
    });
  } catch (err) {
    return json(200, {
      configured: true,
      products: [],
      reason: "proxy_error",
      detail: String(err.message || err).slice(0, 240),
    });
  }
};

function shape(p) {
  const img =
    (p.images && p.images[0] && pickImage(p.images[0])) ||
    (p.image && (p.image.url || p.image)) ||
    "";
  const price =
    (p.pricing &&
      p.pricing.summary &&
      (p.pricing.summary.fromPrice || p.pricing.summary.fromPriceBeforeDiscount)) ||
    (p.price && (p.price.from || p.price.retail)) ||
    null;
  const currency =
    (p.pricing && p.pricing.currency) ||
    (p.price && p.price.currency) ||
    "USD";
  return {
    code: p.productCode || p.code || "",
    title: p.title || p.productTitle || "Experience",
    description: clip(p.description || p.shortDescription || "", 180),
    url: p.productUrl || p.url || "",
    image: img,
    rating: (p.reviews && (p.reviews.combinedAverageRating || p.reviews.averageRating)) || null,
    reviewCount: (p.reviews && (p.reviews.totalReviews || p.reviews.totalCount)) || 0,
    price,
    currency,
  };
}

function pickImage(img) {
  if (!img) return "";
  if (typeof img === "string") {
    return img.replace("/attractions-splice-spp-210x118/", "/attractions-splice-spp-674x446/");
  }
  const variants = img.variants || img.images || [];
  const ranked = variants
    .slice()
    .sort((a, b) => (b.width || 0) - (a.width || 0));
  const mid =
    ranked.find((v) => (v.width || 0) >= 600 && (v.width || 0) <= 900) ||
    ranked.find((v) => (v.width || 0) >= 400) ||
    ranked[0];
  const url = (mid && (mid.url || mid.src)) || img.url || "";
  return String(url).replace(
    "/attractions-splice-spp-210x118/",
    "/attractions-splice-spp-674x446/"
  );
}

function clip(s, n) {
  const t = String(s).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return t.length > n ? t.slice(0, n - 1) + "…" : t;
}

function json(status, body) {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=900",
    },
    body: JSON.stringify(body),
  };
}
