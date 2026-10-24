# Galactic Imperium: The Situation Room

A mobile-first, installable, static browser strategy game. Original interface and sci-fi setting, with a playable solo campaign connecting a modular galaxy to persistent planetary invasions.

## Run

Requires Node.js 20 or newer for the development server and tests. The deployed game needs only a modern browser.

```
node server.mjs
```

Open http://127.0.0.1:4173. No package installation, build step, remote API, account, or paid service is required.

```
node --test tests/*.test.mjs
```

## Play

1. Adopt a strategic priority.
2. At Meridian Prime, embark troops. Plot the fleet move to adjacent Pelagos and resolve the galactic round.
3. Launch an invasion. Open Theatres, then Open province campaign.
4. Select command stacks, plot routes on the world map, and seal operational orders.
5. Complete two operational cycles, then return to the galaxy and resolve its round.
6. Continue the campaign, research, reinforce, negotiate, and pursue mandates.
7. Secure opposing regional capitals to win the surface campaign. Galactic resolution then establishes occupation.

Each new round refreshes five galactic actions. Surface orders have a separate per-campaign limit. Research and fleet refits compete with construction and movement for actions. Final prestige includes earned points, secure planets, and technology.

## Saving and offline use

Autosave, a rolling backup, three manual slots, and settings are stored in this browser's localStorage. Export a JSON save to preserve it independently of browser data. Import validates the format before replacing the current campaign. Save files stay on the device unless the player shares them.

The service worker caches the static application for offline reopening after one successful online load. Browsers may evict site storage: exported files are the durable, portable option. Installation depends on browser support. There is no cloud synchronization or telemetry.

## Hosting

The root of this repository is the publish directory. GitHub Pages can serve it directly from the main branch, root folder. All application paths are relative, including worker, manifest, service worker, and icon paths; repository subpaths are supported.

## Scope

This is a playable alpha, not a verified reproduction of every rule in its board-game inspirations. Read docs/IMPLEMENTATION.md for a candid feature inventory and remaining work. No source-game artwork, text, or third-party assets are bundled. The original vector artwork and interface are local assets. The UI direction references TCG Arena's dark navy surfaces, coral accents, compact navigation, and bold hierarchy.

## Galactic operational update · v0.2.0

The main game now includes fleet-order commitment, energy-bid initiative, convoy routes and interdiction, finite shipyard capacity and delayed deployment, transit relays, mutual transit and allied liberation, imperial war stress and recovery, and galactic touch zoom. See [the operational rules](docs/GALACTIC-OPERATIONS.md) for exact costs, timing, and limits. Existing saves preserve their forces, resources, and ongoing invasions.

The separate [world-scale province campaign](full/campaign.html) is playable with device saves. It is not yet connected to the main game's invasion resolution. Complete source-system parity and the remaining expanded political catalogs are still unfinished. This release must not be described as the complete combined game.

