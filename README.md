# AI Detective Treasure 

A browser based Media & Information Literacy (MIL) party game, built for UNESCO MIL Hackathon. Spin the wheel, land on a topic, and answer a multiple-choice question with instant feedback and an explanation.


## How it works

- **Cover → Menu** a tap-anywhere splash screen leads into the main menu (Play / Multi Player / Tutorial / Policy).
- **Play (single player)** goes straight to the spin wheel.
- **Multi Player** choose 2–4 players, then everyone places a finger on the "Tap together!" pad at once. Each touch is randomly assigned one of four colours, and one player is randomly chosen to go next.
- **Spin wheel** a four-colour prize wheel (Red · Green · Orange · Blue) spins with real deceleration physics and lands on a uniformly random slice.
- **Quiz card** an interactive multiple-choice question for that colour's topic (Ice Breaking · AI Language · AI Deepfake · Misinformation). Tap an option and get instant feedback:
  - the option you picked turns **green** (correct) or **red** (incorrect)
  - the correct option is always revealed in green
  - all four options lock immediately so the answer can't be changed
  - a short explanation fades in underneath
  
  Questions are dealt from a shuffle-bag per topic, so nothing repeats until every question in that topic has been asked.
- **Next Turn** loops back to the spin wheel (single player) or back to the "tap together" chooser (multiplayer), per round.
- **Tutorial / Policy** static reference screens, reachable from the menu or the home button on any screen.

## Project structure

```
ai-detective-treasure/
├── index.html              # single-page app shell (all screens)
├── css/
│   └── style.css           # full design system (palette, type, layout, animation)
└── js/
    ├── app.js               # screen navigation + game state machine + quiz interaction
    ├── wheel.js              # spin wheel physics/randomness
    ├── playerChance.js       # multi-touch "tap together" chooser
    ├── cards.js               # topic metadata + no-repeat deck logic
    └── questions.js            # the actual quiz question bank (22 questions)
```

All four scripts are **plain, dependency-free JavaScript** (no ES modules, no bundler) — each wraps its internals in an IIFE and shares state through a single `window.MIL` namespace. This means the game runs correctly both from a real web server *and* by simply double-clicking `index.html` on your own computer.

The screens themselves (cover, wheel, player-chance, tutorial, quiz card, etc.) are built directly in HTML/CSS no card images. Earlier versions of this project used flattened question images; those were replaced with real, clickable text so answers could be interactive.

## Running locally

**Step 1 fully extract the ZIP first.** Don't open `index.html` by double-clicking it *inside* the zip preview (Windows Explorer / Edge will silently extract only that one file to a temp folder, and the game will load with no styling or interactivity because `css/` and `js/` never came along).

Right-click the `.zip` → **Extract All…** (Windows) or double-click it (Mac) to get a real, standalone `ai-detective-treasure` folder on disk, *then* open `index.html` from inside that folder.

**Step 2 open it.** Once properly extracted, you can just double-click `index.html` and it will run directly in your browser — no server required.

If you'd rather serve it locally (e.g. while developing), any static file server works too:

```bash
cd ai-detective-treasure
python3 -m http.server 8000
# open http://localhost:8000
```

