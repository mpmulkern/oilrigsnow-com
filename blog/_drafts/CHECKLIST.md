# Market Watch Sanitization Checklist

Before any `market-watch` tagged post moves from draft to review, confirm
every line below. This is a hard gate — if any box can't be checked, the
post is not ready for Mike's review.

- [ ] No specific company, seller, broker, or yard name appears anywhere
      in the post (headline, body, image alt text, meta description).
- [ ] No specific town/city/facility location appears. Broad region only
      (e.g. "Permian Basin", "Gulf Coast", "West Texas") — never an exact
      yard address or town.
- [ ] Rig type and spec class are present and accurate (e.g. "1500 HP SCR
      land rig", "jackup, 350' water depth").
- [ ] Market context included (pricing trend, demand signal, or
      comparable recent activity) — enough to be useful, not enough to
      identify the specific unit or seller.
- [ ] **Re-identification check (k >= 3 rule, per Market Monitor's Task 2
      findings):** the category x broad-region bucket this post describes
      contains at least 3 comparable units in current inventory. A
      correctly-redacted sentence can still narrow down to exactly one
      listing if the bucket is too small (e.g. "Workover rig, Middle
      East" was an n=1 bucket as of the 2026-08 scan). If the bucket has
      fewer than 3 comparable units, widen the region/category
      description until it does, or hold the post.
- [ ] **No fleet/hull identifiers.** Rig names carrying seller fleet
      numbering ("Rig 90", "#209", "Unit 12") or offshore hull names
      (e.g. "Ocean Onyx") must be replaced with class/generation
      descriptors only — hull names resolve to registered owners via
      public maritime registries.
- [ ] **No lifted description text.** Never copy phrasing verbatim from
      internal scan data, CRM `description`/`specs` fields, or seller
      materials — some contain embedded company tokens (LLC/Inc/Ltd) even
      when the visible fields look clean. Write the post copy fresh.
- [ ] **Source framing correct.** Public copy refers to "the inventory we
      track", never "the market" — the scan covers a specific, limited
      set of sources, not the whole market.
- [ ] Post ends with a clear call to action: contact ORN or check
      2tds.us for the listing — never a direct link to a seller's own
      site or a specific yard's contact info.
- [ ] Content reflects genuinely new availability (not a repost or
      re-teaser of something already covered in a prior Market Watch
      post). See Market Monitor's Task 2 findings on why a naive
      inventory-count delta is NOT reliable for this (bulk-import
      artifacts can look like new availability).

If sourcing from Market Monitor's weekly scan/CRM diff output, treat the
raw scan data as internal-only — none of the seller/location/fleet-number
detail in that raw output should survive into the sanitized post.

**Residual risk:** even when each individual post passes every check
above, cumulative disclosure across many posts over time can rebuild a
picture of the book. Review the full Market Watch post archive quarterly
against current inventory to catch this drift — see Market Monitor's
Task 2 findings for detail.
