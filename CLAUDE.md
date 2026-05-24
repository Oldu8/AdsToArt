# AdsToArt — Project Reference for AI Assistants

## What This Project Is

**AdsToArt** is a Chrome extension (Manifest v3) that replaces detected advertisement elements on web pages with curated artwork images. Users choose a visual theme (Space, Cats, Flowers, Pixel Art, Paintings, Movies, Animals, Night City) and can whitelist domains where ads should be left alone.

The extension operates entirely client-side. No external API calls. No telemetry. The only remote I/O is Chrome's built-in `storage.sync` (user settings across devices) and `storage.local` (whitelist).

---

## Repository Layout

```
src/
  content.js                     # Content script entry point — injected into every page
  background.js                  # Service worker (minimal; logs install event)
  content_script/
    adSelectors.js               # ~60 CSS selectors for detecting ad elements
    replaceAd.js                 # Core replacement algorithm (dedup, sizing, DOM swap)
    getImageName.js              # Maps ad dimensions → image variant name
    functions.js                 # Small helpers: shadow DOM search, URL builder, random picker
    defaultWhiteList.js          # Hard-coded domains always excluded
  popup/
    popup.html                   # Extension popup UI
    popup.js                     # Toggle + set selection → chrome.storage.sync
    popupWhitelist.js            # Whitelist CRUD UI → chrome.storage.local
    index.css                    # Popup styles (Lora font, flexbox, #007acc palette)
  fonts/                         # Lora variable font files

images/
  set_animals/ set_cats/ set_city/ set_flower/
  set_movies/ set_painting/ set_pixel/ set_space/
                                 # Each set contains files named like ratio_4_3_v2.png

build/                           # Webpack output — DO NOT edit directly
manifest.json                    # Extension manifest (v3) — version 1.1.3
package.json                     # npm scripts and devDeps — version 1.1.6 (mismatch; harmless)
webpack.config.js                # Bundles src/content.js → build/content.bundle.js
```

---

## How the Extension Executes on a Page

```
manifest.json
  └─ content_scripts: matches <all_urls>
       └─ loads build/content.bundle.js on every page

src/content.js (entry)
  1. chrome.storage.sync.get(['enabled', 'selectedSet'])
  2. isWhitelisted(hostname)
       ├─ check defaultWhiteList (docs.google.com, ads.google.com, …)
       └─ check chrome.storage.local['whitelist']
  3. If enabled AND not whitelisted:
       a. findAndReplaceAds(selectedSet)      ← immediate DOM scan
       b. new MutationObserver(...)           ← watch for dynamically added ads
```

The MutationObserver fires on `childList` changes to `document.body`. For each added node it checks whether the node itself matches an ad selector, then recursively searches any `shadowRoot`, then queries descendants.

---

## Core Algorithm: `replaceAd(adElement, setName)`

Located in [src/content_script/replaceAd.js](src/content_script/replaceAd.js).

### 1. Deduplication (skip if any check fails)

| Check | Function | What it does |
|---|---|---|
| Sibling | `isSiblingAlreadyReplaced(node)` | Any direct sibling has `data-replaced` attribute |
| Parent | `isParentAlreadyReplaced(node, depth=3)` | Ancestor within 3 levels already replaced |
| Proximity | `isNodeTooClose(node, 50px)` | Center coords within 50 × 50 px of any prior replacement |

### 2. Dimension clamping

```js
adWidth  = Math.min(ad.offsetWidth,   970)
adHeight = Math.min(ad.offsetHeight,  600)
```

If the parent is too narrow (`parentWidth < adWidth / 2`) or `adWidth === 0`, insert an invisible 0×0 placeholder and bail.

### 3. Image selection

```
getImageName(adWidth, adHeight)
  → getRatio(w, h)           // exact match on common IAB sizes first,
                             // then ±5% ratio tolerance
  → getRandomImageName(ratio, 4)   // picks v1–v4 at random
  → returns e.g. "ratio_4_3_v2"

chrome.runtime.getURL(`images/${setName}/ratio_4_3_v2.png`)
```

Ratio categories: `ratio_1_1`, `ratio_4_3`, `ratio_6_5`, `ratio_1_3`, `ratio_2_1`, `ratio_10_1`, `ratio_8_1`, `default`.

### 4. DOM replacement

1. Create `<img>` with `object-fit: contain`.
2. Wrap in a `<div>` (`position: relative`, `margin: 0 auto`, `data-replaced="true"`).
3. Add a close `<button>` (absolute top-right) that hides the parent.
4. `ad.remove()` + `parent.appendChild(wrapper)`.
5. Push `{ node: wrapper, rect: getBoundingClientRect() }` to `replacedNodes[]` for future proximity checks.

---

## Ad Selector Strategy

[src/content_script/adSelectors.js](src/content_script/adSelectors.js) contains ~60 selectors:

- **ID prefixes**: `#dclk-studio-creative`, `[id^="google_ads_iframe_"]`, `[id^="yandex_rtb"]`
- **Class names**: `.adsbygoogle`, `.advertisement-block`, `.bannerAd`
- **Data attributes**: `[data-google-query-id]`, `[data-ad-client]`
- **Iframe src patterns**: `googlesyndication.com`, `trafmag`, `adtelligent.com`

Add new selectors to this array — the rest of the pipeline picks them up automatically.

---

## Image Sets

Each set lives in `images/set_<name>/` and must contain images named by ratio + variant:

```
ratio_1_1_v1.png … ratio_1_1_v4.png
ratio_4_3_v1.png … ratio_4_3_v4.png
ratio_6_5_v1.png … ratio_6_5_v4.png
ratio_1_3_v1.png … ratio_1_3_v4.png
ratio_2_1_v1.png … ratio_2_1_v4.png
ratio_10_1_v1.png … ratio_10_1_v4.png
ratio_8_1_v1.png … ratio_8_1_v4.png
default_v1.png … default_v4.png
```

`manifest.json` must list the set folder under `web_accessible_resources` for `chrome.runtime.getURL` to work.

---

## Popup UI

Two tabs managed entirely in memory with class toggling — no routing library.

- **Select Set tab**: `popup.js` reads/writes `chrome.storage.sync` for `enabled` (bool) and `selectedSet` (string).
- **Whitelist tab**: `popupWhitelist.js` reads/writes `chrome.storage.local` for `whitelist` (string array of domains).

Settings changes take effect on the **next page load** — the content script reads storage only once at injection time.

---

## Build System

```bash
npm run build         # development build (source maps)
npm run build:prod    # production build (minified)
npm run release:patch # bumps patch version + prod build
```

Webpack entry: `src/content.js` → `build/content.bundle.js`.  
Popup files, background.js, and CSS are copied verbatim by `CopyWebpackPlugin`.

Load unpacked from the `build/` directory in `chrome://extensions`.

---

## Key Invariants to Preserve

1. **`replacedNodes` array** in `replaceAd.js` is module-level state. The proximity dedup depends on it being accurate. Don't clear or reset it between observer callbacks.
2. **`data-replaced="true"`** on the wrapper div is the sentinel for sibling/parent checks. Keep this attribute consistent.
3. **Image file naming** must follow `<ratio>_v<1-4>.png` exactly — `getImageName.js` generates names; the files must match.
4. **`web_accessible_resources`** in `manifest.json` must include every image folder — otherwise `chrome.runtime.getURL` returns a blocked URL.
5. **`chrome.storage.sync`** is for settings; **`chrome.storage.local`** is for the whitelist. Don't cross these.

---

## Known Issues / Tech Debt

| Issue | Location | Notes |
|---|---|---|
| Version mismatch | `manifest.json` (1.1.3) vs `package.json` (1.1.6) | Cosmetic; fix by bumping manifest to match |
| Whitelist regex may misparse some URLs | `popupWhitelist.js:61` | Uses regex instead of `URL` constructor; edge cases with ports, IP addresses |
| Settings require page reload | `content.js:58` | By design; document for users |
| Twitch whitelisted by default | `defaultWhiteList.js` | Video-ad replacement breaks player; intentional |

---

## Common Tasks

**Add a new ad selector**: append to the array in [src/content_script/adSelectors.js](src/content_script/adSelectors.js).

**Add a new image set**:
1. Create `images/set_<name>/` with all ratio/variant files.
2. Add a radio button in [src/popup/popup.html](src/popup/popup.html).
3. Add the folder to `web_accessible_resources` in `manifest.json`.

**Adjust proximity threshold**: change `maxDistance` default in `isNodeTooClose` ([src/content_script/replaceAd.js:20](src/content_script/replaceAd.js)).

**Adjust dimension caps**: `970` and `600` constants near line 85 of [src/content_script/replaceAd.js](src/content_script/replaceAd.js).

**Adjust ratio tolerance**: `±5%` tolerance in `getRatio` ([src/content_script/getImageName.js:3](src/content_script/getImageName.js)).
