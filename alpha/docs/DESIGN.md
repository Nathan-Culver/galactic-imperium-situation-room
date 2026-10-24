# Browser-first design decisions

Title: Galactic Imperium: The Situation Room

## Presentation

An original navy-and-coral command interface, informed by the visual hierarchy of tcg-arena.fr. Original SVG symbols, spacecraft art, procedural planets, and hex maps are bundled locally. No source-site artwork or third-party game assets are copied.

## Mobile interaction

The mobile layout is the default CSS. Bottom navigation exposes Galaxy, Theatres, Empire, Diplomacy, and Journal. Tablet and desktop progressively add a side rail and side-by-side map inspection. Core buttons use touch-sized controls; map regions support keyboard Enter/Space selection. Detailed maps scroll within their panels rather than widening the page. Modal forms fit small screens and preserve native file controls.

## Browser constraints

The published application has no build dependency or backend. It runs from a GitHub Pages repository subpath. No constant rendering loop, large textures, external fonts, or WebGL context is required. AI planning runs in a module worker, with a bounded timeout and fallback. Maps, logs, and campaign durations are bounded. Turn-based play means leaving the app does not advance time.

## Device storage

Autosave and three manual slots use localStorage with a rolling backup. JSON export creates a real file through the browser download system. JSON import uses a standard file picker, size limits, version checks, and nested shape validation. The website cannot silently write to arbitrary folders. A service worker caches the application for offline reopening once downloaded; browser storage eviction remains possible, so portable exports are supported.

## Gameplay architecture

The pure rules engine owns state transitions. Fleet combat, planetary wars, AI choices, production, politics, and score updates use recorded campaign state and seeded randomness. A saved campaign resumes without rerolling already committed outcomes. There is no remote AI service, telemetry, or credential requirement.

## Full design vs first release

This release is a playable solo alpha. The design goal of preserving every mechanical function from both board-game inspirations remains larger than this implementation. IMPLEMENTATION.md lists omissions explicitly. Complete unit-specific combat, source-rule traceability, and broader diplomatic contracts require further development rather than being implied by the presence of similarly named controls.
