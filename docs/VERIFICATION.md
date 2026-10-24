# Verification record

## Automated rules checks

28 Node.js tests pass. Coverage includes seeded galaxy generation, unique sector names, immutable failed commands, defended-world invasion requirements, transport conservation and capacity, persistent campaigns, secret order commitment, order replacement, successful planetary conquest, withdrawal, research prerequisites, blueprint limits, strategic priorities, optional secondary participation, resource-conserving trade, treaty restrictions and expiry, nonrepeatable public and private scoring, validated save round-trips, deterministic resolution, malformed save rejection, AI development, difficulty settings, and campaign completion.

Syntax checks pass for app.js, engine.js, ai-worker.js, and sw.js.

## Browser interaction checks

Tested on the published GitHub Pages origin through the browser interface:

- Initial command screen renders.
- Strategic priority selection changes campaign resources.
- Troops embark, fleet moves, invasion launches, and planetary workspace opens.
- A ground order is queued and a complete round resolves, including AI actions and two surface operations.
- Local save slot creation succeeds.
- Export creates a JSON file on the device.
- The exported file imports successfully and the restored campaign survives a page reload.
- All five workspaces fit a 320 px viewport without document-level horizontal overflow.
- The 390 px phone layout provides bottom navigation and stacked panels.
- No console errors or warnings were reported during these interactions.

## Limits

Offline reopening is implemented by a service worker but has not been verified through an actual disconnected-network session. Long-term browser eviction, all mobile operating-system download behaviors, installation on every browser, and full source-board-game rule fidelity have not been verified. See IMPLEMENTATION.md for the larger mechanics backlog.

## v0.2.0 verification

87 automated tests pass. New coverage includes operation commitments and cancellation refunds, initiative escrow, delayed construction, yard damage and capture, shipping floors, escort protection, relief, transit, relays, save hardening, and solo campaign completion with the new rules. The phone interface was checked at an observed 375px document width without overflow; deployed browser checks verified bid edits, movement queuing, and cancellation refunds. Physical multi-touch testing remains outstanding.
