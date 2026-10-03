# Sunny Day Charters — Grok project notes

Source-of-truth note for the Grok project at https://grok.com/project/ca1ee65a-8917-487a-8be9-b64851eb4563. It covers sunnydaycharters.com (Netlify, GitHub `tolajimi/sunnyday-charters`). Checked against the live site and `main` on 2026-10-03.

James Woods is the ultimate override. If a later instruction from James conflicts with this note, follow James.

Work still marked in progress below is not finished. Do not treat it as done, and do not invent a completion.

This file is an internal note. CharterPort and Horizon are partnership names for the desk. They are not guest-facing words. Do not put CharterPort, Horizon, or Island Time into copy a guest reads.

## Brand split

**What.** Sunny Day Charters is the Netlify site at sunnydaycharters.com. This repository is that site. Sunny Day Adventures is Wix only, at sunnydayadventure.com. The Adventures Netlify project was deleted.

**Why.** The two brands share a family name and must not share a deploy. Charters site work stays in this repo. Wix work goes to the Sunny Day Contacts bot. The deleted Adventures Netlify project must not be redeployed.

## Site / conversion work (late Sep 2026)

**What.** `.html` URLs are forced to clean paths. The `/weeks` and `/nights` 404s are fixed. Sailing-trip photos were pulled into site assets, web-optimized, placed, then deduped so a repeat appears only on the same named card or page. The contact inquiry form now collects trip type, dates, and guests. Netlify Forms emails those inquiries to hello@sunnydaycharters.com. A twice-daily spam triage marks legitimate submissions as ham. On yacht cards, the primary action is Inquire and goes to `/contact`; WhatsApp is the secondary action and sits under the cards. Charters links the 4×4 SUV tour to Adventures Wix booking. Adventures links back to Charters on Wix. Offer schema is on `/days` and `/overnight`. Google Search Console indexing was pushed. There is standing permission to use Request indexing on money pages, especially `/contact`. Findability and traffic are watched in Simple Analytics and Search Console.

**Why.** Clean paths and the weeks/nights fixes stop guests and Google from landing on dead URLs. Deduped photos keep each named trip visually distinct. The richer form gives the desk enough to reply, and the ham routine keeps real inquiries out of the spam pile. Inquire-first cards send charter intent into `/contact` instead of straight to chat. The 4×4 link sends land trips to the brand that books them, and sends sailing intent back here. Schema and indexing requests exist so the money pages can be found. Analytics and Search Console are how that findability is judged.

## Private day rates (October 2026, on /days)

**What.** Live private day prices on `/days`: Couples Special is $995 (4 hours, Contender 21, 2–3 plus captain). Essentials is $1,250 (4 hours, Cobia 239, up to 6 plus captain). Contender 21 is $1,150 for 6 hours and $1,400 for 8 hours (up to 3 plus captain). Cobia 239 is $1,650 for 6 hours and $1,900 for 8 hours. Cobia 279 is $1,850 for 6 hours and $2,100 for 8 hours. Couples Special and Essentials are marked as operated by Adventures. The 4×4 SUV tour on the same page is adult $300 and child $200 (12 and under).

**Why.** `/days` is the rate card. These are the October 2026 figures guests see. Adventures books the private boat days and the land day. Charters must quote these numbers, not an older day price.

## Adventures 4×4 SUV tour (for cross-links; Adventures owns booking)

**What.** The land day is a 4×4 SUV tour. Adults are $300 USD. Children 12 and under are $200. One vehicle holds 1–4 guests. Parties of 5–8 need two vehicles. Parties of 9 or more are inquire-only on a safari bus and are not bookable online.

**Why.** Charters only cross-links this product. Adventures owns the booking on Wix. The guest name is 4×4 SUV tour. These figures keep Charters copy aligned with that booking page.

## CharterPort partnership

**What.** The partner is Dick Schoonover, CharterPort BVI, Nanny Cay. Broker commission is confirmed at 15%. Guests see this fleet as Crewed yachts. The page heading is “Crewed yachts, with a captain and chef.” The path is still `/charterport`, so older links keep working. Guest copy on that page does not name CharterPort. About 34 partner yachts each have a click-to-lightbox gallery of 5 photos, a Photos cue, and scroll lock while the lightbox is open. Each card shows a published week rate as “from,” and the guest is told to inquire so the dates can be confirmed before a boat is held. There is no shared availability API. Check the public sites (charterportbvi.com, Charter Index, CYA), then option the boat through Dick. Holds run about two weeks, with a 48-hour challenge. A paid MLS (Charter Index or CYA) is optional later and is not required to work with Dick. A Dick onboarding email was drafted and is held for James to edit. It has not been sent. Asking again about paperwork or rate updates was judged redundant. In progress, and not finished: boat vibe profiles (current crew, sample menu, water toys), now that partnership permission exists.

As of this check, home, week, overnight, and most navigation links still say “More yachts,” and home, week, and overnight still name CharterPort in the body. Those lines are still live. They are not the fleet-page title.

**Why.** The guest label is Crewed yachts so the fleet page reads as a Sunny Day offer. The path `/charterport` keeps old links alive. CharterPort stays the internal name for who Dick is, the 15% commission, and how availability is checked. Galleries and “from” week rates let a guest see a boat and a starting price before they inquire. Availability stays a manual check because no API is shared, and the hold and challenge rules are Dick’s. The onboarding email stays unsent until James edits it. Vibe profiles are the next content step, not a completed feature.

## Horizon trip boats (Sunny Day captains)

**What.** Horizon is an internal name. Guest cards do not say Horizon. Week, overnight, and day cards name boats as model plus year: Lagoon 51 2025, Nautitech 46 Fly 2023, Lagoon 46 2024, Fountaine Pajot Elba 45 2022, Lagoon 40 2024, Nautitech 44 Open 2024, Lagoon 42 2020, Fountaine Pajot 44 2026. In progress, and not finished: click-to-gallery using Horizon media only, matched to the exact boat, with no cross-boat photo mixes. Prefer interiors (saloon, galley, cabin, head). Use boat links from this Grok project when they are available. Horizon contacts James already knows: Courtney Frett, Rhys Warwick, and Kayleigh Starkey. Any follow-up is a continuation, not a cold introduction.

**Why.** Model and year are what a guest should see, and they tie each card to a real boat. A gallery that mixes boats shows the wrong interior. Interior shots answer what people ask before they book. The three Horizon contacts are existing relationships, so the tone stays familiar.

## Other partner notes

**What.** Waypoints (Els) is a soft-accept referral: about 10% of her commission, which is about 1.5% of the charter, kept as a warm backup. Do not chase full broker terms soon. Send-as for hello@ on Outlook is still blocked by GoDaddy SSO. Until that is fixed, outbound mail may leave as info@sunnydayadventure.com.

**Why.** Els is a backup, not a second primary broker, so the lighter referral is enough for now. The hello@ block is an identity problem. Do not assume a message was sent as the Charters address.

## Tone / copy rules

**What.** Partner tone is soft and warm. Guest copy on the crewed yachts page stays warm and does not name CharterPort or Horizon. Outbound email opens with “Good morning” or “Good afternoon” by the recipient’s local time, uses “Please,” and ends with “Thank you.”

**Why.** Dick, the Horizon contacts, and Els are relationship-led, and those names stay in this note. The greeting, “Please,” and “Thank you” are the house style for outbound notes.
