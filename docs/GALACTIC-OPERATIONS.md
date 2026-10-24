# Galactic operational adaptations

These are original adaptations of the approved operational mechanisms. They are available in the main galactic game from v0.2.0. They do not establish complete Eclipse, War Room, or Twilight Imperium rule parity.

## Round and action accounting

Exploration, research, influence/colonization, development, diplomacy, and invasion preparations retain the current galactic game's action budget. A fleet movement or convoy-raid order spends exactly one action and reserves its energy. It executes in the fleet-operations window when the player resolves the round. Each origin fleet accepts one order. Cancelling before resolution refunds that action and its movement energy once.

Energy initiative bids are separate from action costs. Editing a bid exchanges the prior escrow for the new amount. All bids are paid. Highest bidders choose their preferred available initiative slot first; seeded random draws break ties. A higher bidder may choose a later slot. Commands then execute in that empire order. A route that becomes blocked cancels with movement energy refunded; initiative remains paid. Rival destinations are hidden in the UI until execution.

## Infrastructure and deployment

Home shipyards have three production slots; other secure colonies have two. Damage reduces capacity. Occupied worlds cannot commission ships. A vessel is paid for once and deploys at the next upkeep. Damage can defer paid construction; loss of the yard destroys its pending production. Existing vessels plus construction cannot exceed the adapted eighteen-vessel reserve for an empire. This is the current universal-hull game's reserve, not a claim that the full Eclipse hull-class system is implemented.

Relays cost four materials, two credits, and one action. Friendly relays permit direct fleet movement. Allied relay access requires mutual transit. Relay travel never transfers surface ownership.

## Shipping and interdiction

Colonies trace a shortest available route to their home hub, or another secure colony when the home is lost. Shipping can use unowned space, friendly space, mutually accessible allied space, and friendly/allied relays. Enemy fleets block routes. A disconnected or blockaded world retains half of its physical credit/material output, rounded up; science remains available. This local-output floor prevents a shipping blockade from disabling all recovery.

A fleet can commit a one-energy convoy raid against an adjacent enemy-owned destination with an open route. It remains at its origin, represents interdiction projected into the adjacent sector, and uses that fleet's operational order. A surviving force stronger than the escort ships on the route disrupts delivery to half for that upkeep. Route escorts include the destination once. Repeated raids do not stack below the delivery floor. Disruption expires after that upkeep. Orbital access is still required for planetary supply actions.

## War stress and recovery

Space losses add one stress per two vessels lost, rounded up. Lost worlds and failed planetary expeditions add stress. Successful invasions award commendations; they cancel stress one for one. Stress is capped at twelve. Zones occur at four, eight, and twelve stress. Penalties are cumulative: one additional credit of upkeep, then one less energy regenerated, then one less command action. The maximum stress penalty leaves four normal actions. Budget deficits cannot stack an additional command penalty below that floor.

Civilian relief costs three credits, one material, and one action; it removes three stress and is available once per round. A period without losses also permits gradual recovery. These are imperial stability rules, distinct from the detailed homeland rules inside the planetary campaign.

## Coalition behavior

Mutual transit requires an existing nonaggression agreement. It costs two credits transferred to the partner and one action, lasts through the stated round, and enables fleet transit and shipping/relay access. It grants no ownership. Conquering a world originally owned by an active transit ally restores it to that ally. Players cannot transfer ownership by signing transit or by winning an orbital battle.

## UI and solo support

The galaxy view exposes initiative escrow, preferred slot, pending orders, cancellation, stress, relief, convoy routes, relay symbols, and shipyard counters. System inspectors show route status and pending construction. Diplomacy offers mutual transit. AI uses the same commands, budgets, bids, construction delays, and relief rules; it can raid when expansion is unfavorable.

The main map supports touch pinch zoom from 100 to 300 percent, one-finger panning, zoom buttons, reset, and tap selection. Gesture drags suppress accidental sector selection.

## Verification and remaining scope

87 automated tests pass, including twenty-one galactic-operation integration tests and three pinch-geometry tests. They cover action/energy accounting, bid escrow, delayed deployment, damaged/lost yards, shipping floors, escorts, recovery, transit, relays, saves, and solo campaign completion. Browser checks are recorded separately. Physical multi-touch hardware testing is still needed.

The separate province campaign is not yet connected to the main game's invasion resolution. The main game still uses its earlier simplified galactic technology/combat/component systems and existing small-map invasions. Full source-rule catalogs, full planetary integration, and all six expanded political systems remain outstanding. Existing saved campaigns are upgraded with empty operational queues and zero stress; existing forces, resources, ownership, and invasions are preserved.

Browser verification: the deployed interface loaded an existing round-two save, preserved its ongoing invasion and holdings, committed and revised initiative escrow, queued a fleet move without relocating its ships, and cancelled it with exact action/energy refunds. Galaxy, empire, production, and diplomacy views were checked at an observed 375px viewport without document overflow. Transit was unavailable before a treaty. No console warnings or errors were captured. Physical multi-touch gestures were not available in the browser automation environment.

Pinning is checked both when plotting and when executing movement. Each opposing vessel pins one vessel, with formal transit allies supporting friendly fleets. Partial movement leaves pinned vessels behind and respects troop transport capacity. A fully pinned order cancels with movement energy returned.
