# Implementation status — v0.3.0 development build

The full adaptation is not complete. This release connects the world-scale planetary engine to new galactic invasions. Existing small-map campaigns remain playable under their original rules. Names, map layouts, graphics, and setting are original adaptations.

## Working in this release

- Mobile-first solo galaxy, seeded exploration, three civilizations, resources, fleet construction, research, treaties, assembly votes, objectives, scoring and campaign results.
- Galactic fleet commitments, all-paid initiative bids, delayed shipbuilding, shipping disruption, transit relays, mutual transit, allied liberation and bounded imperial war stress.
- New invasions create persistent 127-hex planets: territorial governments, provinces, sea regions, ports, industry, rail edges, passages, neutral enclaves, convoys and capitals.
- Linked surface campaigns share the galactic autosave and export. Two operational cycles are required per galactic round; AI-only invasions resolve automatically. A human defender commands their regional coalition.
- Seven operational phases, finite command pools, eight-unit stacks, sealed movement plans, initiative preferences, pinning, rail movement, embarkation, air return and differentiated ground/air/naval combat.
- Standard and Quick Battle resolution, stance values, colored dice, damage, repairs, submarine escape, garrisons and force advantage. Quick Battle is distinct from the unimplemented Quick Play variant.
- Convoy targeting and wild-result policy, starting-defense eligibility, coastal/ocean liability, resource losses, once-per-round raids and optional casualty stress.
- Strategic bombing destroys matching queued units, drains resources within current province income limits, or damages infrastructure. Standing priorities select construction/resources/infrastructure and wild results. Bomber batches resolve sequentially.
- Captured queues change ownership; friendly contested industry remains usable. Optional infrastructure repair costs nine alloy, once per government during production. Mobilization requires an icon or industry; nonindustrial mobilization ignores bombs.
- Neutral trade occurs in production, respects offered goods, alignment, allied land adjacency, sea access and disruption restrictions.
- Globally sequenced morale, configurable spending limits, optional one-zone recovery, weighted desertion casualties and end-round collapse. Goods and medals can be banked.
- Orbital resource delivery converts energy/alloy/materiel one-for-one from galactic energy/materials/credits. Embarked cohorts can land at a controlled coast for one energy and one galactic action. No troops are created by landing.
- Device autosave/backup, manual galactic slots, JSON import/export, linked-save revision checks, draft movement-order recovery and offline shell caching.

## Still unfinished

- Full Eclipse-derived influence/action and population tracks, scarce technology market, all hulls and parts, discoveries, reputation/diplomacy, complete space combat and scoring details. The current galaxy still uses eight technologies, a universal blueprint and simplified space combat.
- Complete operational scenario objectives, full Quick Play, postmovement carrier launch decisions, execution-time path/cancellation choices, initiative-selected battle order, per-batch human hit/repair decisions and several optional operational variants.
- Complete exclusive strategy draft, objective catalog, tradable commitments, permanent laws, diplomatic faction powers and intervention effects. Research catalogs are specifications, not implemented mechanics.
- Exact historical component equivalence has not been established. Procedural geography and original values replace historical maps and national setups.
- Campaign balance across map seeds and the combined game remains under development. An expedition needs sufficient force and logistics; local defenders mobilize from their provinces.

## Validation limits

Automated tests cover legal transitions, conservation, invalid saves/actions, combat procedures and linked settlement. Forced victory tests verify settlement only. These checks do not certify source-game parity, strategic balance, physical multitouch behavior or every full-length combined campaign.

The game is a static, dependency-free browser app. No backend, account, API keys or continuous simulation. Local save files use standard browser downloads and file inputs. Browser storage can be cleared by the user or browser; export a file to retain a separate copy.
