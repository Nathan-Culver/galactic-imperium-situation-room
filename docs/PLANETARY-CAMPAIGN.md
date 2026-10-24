# Planetary campaign development build

The world-scale operational campaign is available at `full/campaign.html`. It has a separate version 2 save format and local storage key; the galactic alpha remains at the site root.

## Implemented and reachable

- Seeded 61, 91, and 127-hex worlds, land provinces, sea regions, up to six regional governments plus an expedition, capitals, resource incomes, industry, rail networks, ports, neutral enclaves, convoy markers, and controlled passages.
- Finite category command pools, eight-unit command stacks, splitting/merging, individual combat stances, sealed movement plans, initiative preferences, all-paid fuel bids, and seeded tie breaks.
- Adjacent land movement, continuous friendly rail movement, two-region aircraft/naval movement, transports, passage restrictions, category pinning, and forced command splits.
- Seven operational phases. Color-dice air and surface combat, once-per-round hotspot battles, force advantage, escort protection, submersible escape, garrisons, strategic raids, port advantage, and repair costs. Standard and Quick Battle resolution are available at campaign creation.
- Ground-only territorial captures, allied liberation, strategic-value stress, medals, homeland disruption, delayed paid production, industry and capacity constraints, aircraft return, infrastructure repair, civilian goods, and collapse.
- Solo opponents issue legal orders and commission units. Campaign victory checks opposing capitals and surviving coalitions.
- Device autosave, previous-state backup, JSON export/import, persistent battle logs, mobile map pan/zoom, keyboard province selection.

## Still required for the complete game

This is an operational development build, not the complete combined ruleset. The planetary engine is not yet connected to galaxy invasions. The root galactic alpha retains its earlier simplified mechanics. Pending work includes the full galactic engine and component catalogs, all six approved political additions, convoy-raid target controls and resolution, scenario-specific armistice/mobilization rules, the separate Quick Play variant, human-selectable per-batch hit/repair policies, carrier launch destination controls, full save validation hardening, and source-component coverage audits.

Original map geography, government names, unit names, and finite command allocations are adaptation values. The project does not bundle source artwork or rulebook files.

## Verification

66 engine tests pass: 28 prior alpha tests, 5 atlas tests, 12 combat tests, 17 campaign tests, 3 touch-zoom geometry tests, and a simulation test that runs three seeded solo campaigns for up to twenty rounds or victory. Automated checks are evidence for those tested behaviors, not proof of complete source-rule parity.
