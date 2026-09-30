# Sunny Day Charters — Grok project notes

Source-of-truth note for the Grok project at https://grok.com/project/ca1ee65a-8917-487a-8be9-b64851eb4563, as of about 2026-09-30. Copy or link this file into that project. It covers recent work on sunnydaycharters.com (Netlify, GitHub `tolajimi/sunnyday-charters`).

James Woods is the ultimate override. If a later instruction from James conflicts with this note, follow James.

Work still marked in progress below is not finished. Do not treat it as done, and do not invent a completion.

## Brand split

**What.** Sunny Day Charters is the Netlify site at sunnydaycharters.com. This repository is that site. Sunny Day Adventures is Wix only, at sunnydayadventure.com. The Adventures Netlify project was deleted.

**Why.** The two brands share a family name and must not share a deploy. Charters site work stays in this repo. Wix work goes to the Sunny Day Contacts bot. The deleted Adventures Netlify project must not be redeployed.

## Site / conversion work (late Sep 2026)

**What.** `.html` URLs are forced to clean paths. The `/weeks` and `/nights` 404s are fixed. Sailing-trip photos were pulled into site assets, web-optimized, placed, then deduped so a repeat appears only on the same named card or page. The contact inquiry form now collects trip type, dates, and guests. Netlify Forms emails those inquiries to hello@sunnydaycharters.com. A twice-daily spam triage marks legitimate submissions as ham. On yacht cards, the primary action is Inquire and goes to `/contact`; WhatsApp is the secondary action and sits under the cards. Charters links the 4×4 product to Adventures Wix booking. Adventures links back to Charters on Wix. Offer schema is on `/days` and `/overnight`. Google Search Console indexing was pushed. There is standing permission to use Request indexing on money pages, especially `/contact`. Findability and traffic are watched in Simple Analytics and Search Console.

**Why.** Clean paths and the weeks/nights fixes stop guests and Google from landing on dead URLs. Deduped photos keep each named trip visually distinct. The richer form gives the desk enough to reply, and the ham routine keeps real inquiries out of the spam pile. Inquire-first cards send charter intent into `/contact` instead of straight to chat. The 4×4 mesh sends land trips to the brand that books them, and sends sailing intent back here. Schema and indexing requests exist so the money pages can be found. Analytics and Search Console are how that findability is judged.

## Adventures 4×4 pricing (for cross-links; Adventures owns booking)

**What.** Adults over 12 are $300 USD. Children 12 and under are $200. Maximum 4 guests per Hilux. Parties of 5–8 need two vehicles. Parties of 9 or more are inquire-only on a safari bus and are not bookable online.

**Why.** Charters only cross-links this product. Adventures owns the booking on Wix. These figures are here so Charters copy stays accurate and does not imply an online checkout this site does not run.

## CharterPort partnership

**What.** The partner is Dick Schoonover, CharterPort BVI, Nanny Cay. Broker commission is confirmed at 15%. The live page is `/charterport`, framed as “More yachts” and “More yachts for your week.” A quiet note says the boats are through CharterPort and are not owned by Sunny Day. About 34 partner yachts each have a click-to-lightbox gallery of 5 photos, a Photos cue, and scroll lock while the lightbox is open. There is no shared availability API. Check the public sites (charterportbvi.com, Charter Index, CYA), then option the boat through Dick. Holds run about two weeks, with a 48-hour challenge. A paid MLS (Charter Index or CYA) is optional later and is not required to work with Dick. A Dick onboarding email was drafted and is held for James to edit. It has not been sent. Asking again about paperwork or rate updates was judged redundant. In progress, and not finished: boat vibe profiles (current crew, sample menu, water toys), now that partnership permission exists.

**Why.** The page widens the week fleet without claiming ownership. The quiet note keeps that honest for guests. Galleries let someone see a boat before they inquire. Availability stays a manual check because no API is shared, and the hold and challenge rules are Dick’s. The onboarding email stays unsent until James edits it. Vibe profiles are the next content step on boats already permitted for the page.

## Horizon trip boats (Sunny Day captains)

**What.** Week, overnight, and day cards name boats as model plus year: Lagoon 51 2025, Nautitech 46 Fly 2023, Lagoon 46 2024, Elba 45 2022, Lagoon 40 2024, Nautitech 44 Open 2024, Lagoon 42 2020, FP 44 2026. In progress: click-to-gallery using Horizon media only, matched to the exact boat, with no cross-boat photo mixes. Prefer interiors (saloon, galley, cabin, head). Use boat links from this Grok project when they are available. Horizon contacts James already knows: Courtney Frett, Rhys Warwick, and Kayleigh Starkey. Any follow-up is a continuation, not a cold introduction.

**Why.** Model and year tie each card to a real boat. A gallery that mixes boats shows the guest the wrong interior. Interior shots answer what people ask before they book. The three Horizon contacts are existing relationships, so the tone stays familiar.

## Other partner notes

**What.** Waypoints (Els) is a soft-accept referral: about 10% of her commission, which is about 1.5% of the charter, kept as a warm backup. Do not chase full broker terms soon. Send-as for hello@ on Outlook is still blocked by GoDaddy SSO. Until that is fixed, outbound mail may leave as info@sunnydayadventure.com.

**Why.** Els is a backup, not a second primary broker, so the lighter referral is enough for now. The hello@ block is an identity problem. Do not assume a message was sent as the Charters address.

## Tone / copy rules

**What.** Partner tone is soft and warm. Warmer guest-facing copy is approved on the CharterPort fleet page. Outbound email opens with “Good morning” or “Good afternoon” by the recipient’s local time, uses “Please,” and ends with “Thank you.”

**Why.** Dick, Horizon, and Els are relationship-led. The CharterPort page copy was deliberately warmed for guests and should stay that way. The greeting, “Please,” and “Thank you” are the house style for outbound notes.
