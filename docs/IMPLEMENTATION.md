# Implementation status — v0.1 playable alpha

This document distinguishes working mechanics from the longer-term full-preservation requirement. A runnable first build is not evidence that every Eclipse or War Room rule has been implemented. Exact source-rule completeness has not been audited or achieved.

## Working

- Responsive mobile-first interface; five main workspaces; touch and keyboard hex selection.
- Seeded 37-sector modular axial hex galaxy; frontier discovery; inhabited and uninhabited worlds.
- Three civilizations: human-controlled Meridian Accord and two AI rivals.
- Money, science, materials, fuel, reserves, command actions, upkeep, and production.
- Eight technologies; five-slot fleet blueprint with weapons, shielding, transport, and research prerequisites.
- Fleet construction, embarkation, range limits, transport loss, fuel costs, and seeded space encounters.
- Defended worlds cannot be colonized directly. Orbital access and transported ground forces are required for invasion.
- Persistent 19-region planetary campaigns, simultaneous committed orders, ground command limits, ports, capital, industry, defense positions, strategic strikes, supply raids, morale, reinforcement, withdrawal, and occupation.
- Nine purchasable surface unit identities. Combat currently uses an abstract formation system rather than the full differentiated unit rules.
- Two surface operations per galactic round; ground wars continue over multiple rounds.
- Three assembly proposals, votes, expiring laws, nonaggression agreements, reparations, trade, and four strategic priorities.
- Four one-time public mandates, two bounded interventions, prestige scoring, campaign-length settings, and final results.
- Background-worker AI planning with a main-thread fallback.
- Autosaves, rolling backup, three manual slots, file export/import, version and shape validation, settings, and tutorial.
- Dependency-free static hosting, relative URLs, offline service-worker cache, and install manifest.

## Partial or awaiting full design implementation

- Full rule-by-rule and component-by-component preservation audit for both base games and included variants.
- Eclipse-derived action economy, influence/population tracks, technology-market scarcity, every hull and ship component, complete space-combat timing, discovery effects, diplomacy/reputation systems, and source-equivalent scenarios.
- War Room-derived complete phase sequence, resource trading and initiative bidding, national command structures, full unit-specific targeting and postures, air and maritime resolution, detailed transport rules, convoy routes, stress thresholds, recovery and civilian spending, industrial damage procedures, and original-equivalent optional rules.
- Physical component functions need individual traceability records. The alpha's original maps and rosters are not evidence that all functions have equivalents.
- Supply is a campaign stockpile affected by port and industrial control; it is not yet a path-traced network.
- Unit assets are represented, but domain restrictions and differentiated combat remain incomplete.
- Formal agreements are limited to nonaggression and material trades; transit, basing, settlements, and transferable commitments are planned.
- Priorities grant immediate benefits; exclusive drafting and human choices about secondary participation are planned.
- Private objectives, deeper faction powers, full intelligence systems, and expanded intervention content are planned.
- AI is a deterministic heuristic opponent, not yet a fully coordinated strategic planner. No trained models or online inference are used.
- Narrative scenario campaigns, achievements, replay scrubbing, larger configurable galaxies, and multiplayer are planned.

## Architecture and browser limits

- engine.js: serializable game state and pure command/round transitions.
- ai-worker.js: off-main-thread planning; app retains authority over state commits.
- app.js: event delegation, original SVG maps, accessible dialogs, local persistence, file operations.
- styles.css: mobile layout first; tablet/desktop enhance the same controls.
- sw.js: same-origin offline app shell. Network-first updates; cached fallback.
- No WebGL, continuous rendering loop, external fonts, analytics, backend, or API keys.
- Maps and histories are bounded to keep rendering, saves, and AI work small.
- Export/import uses standard Blob downloads and file inputs for mobile compatibility. Browser sandboxing means a website cannot silently choose arbitrary device folders.

## Release acceptance still outstanding

Full-mechanism fidelity requires a source audit and a much larger rules/content release. Public multiplayer would additionally require authoritative hosting, authentication choices, reconnects, and hidden-state isolation. The current static release is solo only.
