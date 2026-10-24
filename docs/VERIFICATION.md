# Verification record — v0.3.1

123 automated tests pass. Coverage includes galactic command conservation, seeded maps, operations, space and surface save round-trips, command stacks, air/surface combat, pinning, transports, convoy raids, production, bombing, neutral trading, morale, local logistics, linked invasion settlement and compatibility with older campaigns.

Module validation checked 20 JavaScript files and 49 relative imports: no missing files or unversioned module imports. Main application and campaign UI syntax checks pass.

## Published browser checks

- A separate practice save was used; the existing campaign was preserved.
- Embarked eight cohorts, committed a fleet move, resolved a galactic round and launched an invasion through normal controls.
- Opened the linked 127-hex planet; verified the surface roster and initial resource package.
- Completed two operational cycles through economy, planning, movement, combat, refit, morale and production.
- Verified the two-cycle gate, returned to the galaxy, and confirmed operational round three persisted.
- Resolved the next galactic round and verified exactly two further operational cycles opened.
- Observed phone document width 375px and scroll width 375px, with no document overflow. The world map scrolls within its own panel.
- Reloaded the original campaign and confirmed round two, resources (10 credits, 11 science, 19 materials, 11 energy) and its existing invasion remained intact.
- An initial mixed-cache startup error was found and corrected by versioning the full module graph. No subsequent startup error was observed on v0.3.1.

## Limits

Tests do not establish full source-rule parity or overall strategic balance. Four additional all-AI world-map simulations across climates completed with defending victories; they validate execution and saves, not balanced invasions. Physical multitouch, disconnected-network reopening, browser storage eviction and all mobile file-download behaviors remain unverified. Complete combined campaigns with every intended system are unavailable because the full ruleset is unfinished; see IMPLEMENTATION.md.
