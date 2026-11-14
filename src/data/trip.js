// ─── EDIT THIS FILE to customise the trip ───────────────────────────────────
// You never need to touch any component file; all content lives here.

export const trip = {
  // ── Meta ──────────────────────────────────────────────────────────────────
  title: "Kareri Lake",
  tagline: "3 days. 2,934 m. 1 crew that signed up for this.",
  hookLine: "One lake. One ridge. No signal. Pure chaos.",
  tripDate: "2025-05-24",          // ISO date — drives the countdown
  shareUrl: "https://your-deployed-url.com", // replace after deploy

  // ── Lake gallery photos (public/images/lake/) ─────────────────────────────
  // lake-1.jpg is the full-screen hero cover.
  // The slideshow automatically uses all photos below except lake-1.jpg.
  lakePhotos: [
    { file: "lake-1.jpg", caption: "Still water, loud silence, zero Wi-Fi. Peak 10/10." },
    { file: "lake-2.jpg", caption: "The moment you stop complaining and start staring." },
    { file: "lake-3.jpg", caption: "Altitude: achieved. Dignity: somewhere on Day 1." },
  ],

  // ── People (public/images/people/) ───────────────────────────────────────
  // Supported themes:
  //   - "complaint": Rain cloud, lightning zaps, tiny sad violin, knee-pain alerts
  //   - "motivation": Wind gusts, speed trails, energy bolts, megaphone/whistle
  //   - "tatti": Pine trees, unspooling toilet rolls, funny trail hazard warnings
  //   - "tickets": Railway tracks, Indian Railways tickets (WL/RAC/CNF), train clock
  //   - "planner": Topographic elevation contour lines, spinning compass, clown emoji badges
  //   - "snack": Floating momos, chips, biscuits, aroma steam swirls
  //   - "sleep": Floating moon, starry night clouds, drifting Zzz particles
  //
  // To add a new person:
  // Add an object with { slug, name, role, roast, quote, biggestFear, survivalOdds, photo, theme, focus }
  // "focus" specifies the object-position for head & shoulders crop (e.g. "50% 15%", "top center")
  people: [
    {
      slug: "Agarwal",
      name: "Chodu Agaewal",
      role: "Knee Pain Specialist",
      roast: "More the weight, less the wait.",
      quote: "Bhai bas 5 minute baithne de, ghutne negotiate kar rahe hain.",
      biggestFear: "Running out of protein bars before Day 1 ends",
      survivalOdds: 100,
      photo: "Agarwal.jpeg",
      focus: "50% 15%",
      theme: "complaint",
    },
    {
      slug: "Aviral",
      name: "Aviral Jhatu",
      role: "Motivation Specialist",
      roast: "Need to be held on during heavy winds.",
      quote: "Bhai agla mod aakhri mod hai, bas 200 meter aur!",
      biggestFear: "Mountain gust lifting him like a kite at 2,800m",
      survivalOdds: 100,
      photo: "Aviral.jpeg",
      focus: "50% 15%",
      theme: "motivation",
    },
    {
      slug: "Malik",
      name: "Tatti Malik",
      role: "Tatti Control Specialist",
      roast: "Needs tatti break 6 times a day.",
      quote: "Bro tum aage chalo, main Nyund Nala stream ke peeche milta hoon.",
      biggestFear: "Jungle mein tatti krte time bhalu aa jaye",
      survivalOdds: 100,
      photo: "Malik.jpeg",
      focus: "50% 15%",
      theme: "tatti",
    },
    {
      slug: "Wardhan",
      name: "Wardhan BKL",
      role: "Ticket Confirmation Specialist",
      roast: "We go in General class without bro.",
      quote: "Chart banne do, RAC 100% confirmed ho jayega.",
      biggestFear: "IRCTC cancelling the ticket 4 hours before departure",
      survivalOdds: 100,
      photo: "Wardhan.jpeg",
      focus: "50% 15%",
      theme: "tickets",
    },
    {
      slug: "Bihari",
      name: "Cool Bihari",
      role: "Website & Trip Planning",
      roast: "Plan bnayega lodu.",
      quote: "Maine 14-page PDF checklist banayi hai, koi to padh lo!",
      biggestFear: "No Fear laadle",
      survivalOdds: 0,
      photo: "Bihari.jpeg",
      focus: "50% 15%",
      theme: "planner",
    },
  ],

  // ── Day plan ──────────────────────────────────────────────────────────────
  days: [
    {
      day: 0,
      label: "Day 0",
      title: "The Tatkal Gamble: Jaipur to Pathankot",
      subtitle: "Gandhinagar station assembly · Ticket hua toh AC, warna 13 ghante General dabba",
      trailPhoto: null,
      stats: { km: "~650 km", hours: "13 hrs train", vibe: "Hype & Prayers" },
      slots: [
        { time: "18:00", text: "Assemble at Gandhinagar Station (Jaipur). Wardhan arrives 10 mins before departure, sweating profusely with IRCTC app open." },
        { time: "19:30", text: "Board train. RAC seat negotiations begin. Home-packed aloo parathas and theplas opened before train even crosses Durgapura." },
        { time: "23:00", text: "Late night coach bakchodi. Deep debates on whether mountain bears actually attack campers while pooping." },
        { time: "05:30", text: "Punjab border crossing. Station chai count hits #5. Malik spots first railway toilet of the day." },
      ],
      tip: "Wardhan ko station 1 ghanta pehle ka time do, taaki vo train chhootne se 5 minute pehle pahuche.",
      altitude: "431 m (Jaipur, still on flat earth)",
      difficulty: "Extreme — if ticket is RAC / Waiting List",
    },
    {
      day: 1,
      label: "Day 1",
      title: "Hairpin Bends & Hajmola: Pathankot to Kareri",
      subtitle: "Pathankot Cantt → Dharamshala momos → Kareri Village base camp",
      trailPhoto: "trail-1.jpg",
      stats: { km: "~95 km drive", hours: "4–5 hrs", vibe: "Ulti Rokne Ka Sangharsh" },
      slots: [
        { time: "06:30", text: "De-board at Pathankot Cantt. Chole bhature breakfast to ensure stomach gets tested early." },
        { time: "08:00", text: "Hunt for shared taxi / jeep. Aggressive bargaining with local drivers like we have options." },
        { time: "10:30", text: "Hairpin ghat turns begin. Windows rolled down. Emergency Hajmola, Kachi Kairi candies, and lemon wedges distributed." },
        { time: "13:30", text: "Pitstop in Dharamshala / McLeod Ganj. Mandatory steaming plate of momos and hot Thukpa to reset morale." },
        { time: "16:00", text: "Reach Kareri Village (1,983 m). The air is crisp, pine trees everywhere, and mobile network shows 1 dying bar." },
        { time: "19:00", text: "Base homestay check-in. Local guide briefing: 'Kal jaldi nikalna hai.' Everyone nods, nobody wakes up." },
      ],
      tip: "Window seat pe vo baithega jisko ulti aati hai. Aur cab driver ko 'bhaiya gaadi thoda slow chalao' bolne ki himmat rakho.",
      altitude: "1,983 m (Kareri Village Base)",
      difficulty: "Moderate — fighting motion sickness in the Ghats",
    },
    {
      day: 2,
      label: "Day 2",
      title: "The Ascent: Legs on Fire to Kareri Lake",
      subtitle: "Dense pine forest → Nyund Nala river crossings → Alpine moraine climb",
      trailPhoto: "lake-2.jpg",
      stats: { km: "~13 km trek", hours: "6–7 hrs", vibe: "Ghutne Negotiating" },
      slots: [
        { time: "06:30", text: "Jab jaago tab savera. Garma-garam chai, parathas, and final backpack weight negotiations ('bhai ye tent tu rakh le')." },
        { time: "07:30", text: "Trek starts! Lush deodar forest, Nyund Nala stream gushing alongside, everyone feeling like NatGeo explorers." },
        { time: "10:30", text: "Wooden bridge crossings and slippery boulders. Malik takes his 3rd emergency bush break behind a deodar tree." },
        { time: "12:30", text: "Lunch stop at Gaddi shepherd huts. Maggi at ₹80 tastes like 3-star Michelin dining at 2,400 m." },
        { time: "14:30", text: "Treeline ends, steep rocky moraine begins. Aviral shouts 'Bas agla mod aakhri hai!' for the 18th time. Agarwal's knees enter union strike." },
        { time: "16:45", text: "Kareri Lake summit (2,934 m) reached! Glacial lake opens up beneath snow-clad Dhauladhar peaks. Pure cinematic goosebumps." },
        { time: "19:30", text: "Tent pitching, freezing winds, bonfire under 10 million stars, and 4 kg snack stash wiped out. Zero regrets." },
      ],
      tip: "Pani pite rehna hai continuously, even if freezing cold. Dehydration in mountains = Instant altitude headache and mood ruin.",
      altitude: "1,983 m → 2,934 m (+951 m gain)",
      difficulty: "Strenuous — Bakchodi will be tested",
    },
    {
      day: 3,
      label: "Day 3",
      title: "Sunrise Glory, Descent & Victory Momos",
      subtitle: "Golden hour reflection → downhill knee test → Dharamshala celebration",
      trailPhoto: "lake-3.jpg",
      stats: { km: "~13 km downhill", hours: "4–5 hrs", vibe: "Gravity Doing The Work" },
      slots: [
        { time: "05:45", text: "Subah ka sunrise. Lake turns mirror-like molten gold. Everyone silently staring, too cold to even take selfies." },
        { time: "07:30", text: "Camp pack-up and Leave-No-Trace sweep. Har wrapper aur can wapas bag mein daalo — mountain rule #1." },
        { time: "08:30", text: "Descent begins. Downhill is twice as fast, but gravity punishes toes and kneecaps without mercy." },
        { time: "13:00", text: "Back at Kareri Village base. Legs shaking like jelly, but everyone high on achievement." },
        { time: "15:00", text: "Arrive Dharamshala. Massive celebratory momos, thukpa, and cold beverages. Network returns: 400 WhatsApp messages ding at once." },
        { time: "19:00", text: "Board evening bus/train back towards Jaipur. Everyone sleeps like unconscious logs." },
      ],
      tip: "Descent mein shoes aage se tight bandho, warna pair ke anguthe joote ke aage takra ke blue ho jayenge.",
      altitude: "2,934 m → 1,457 m (Dharamshala descent)",
      difficulty: "Moderate — tough on toes and joints",
    },
  ],

  // ── Packing checklist ─────────────────────────────────────────────────────
  checklist: [
    {
      group: "Clothing",
      items: [
        "Moisture-wicking base layer (top + bottom)",
        "Fleece or down mid-layer",
        "Waterproof outer shell / rain jacket",
        "Trekking pants (avoid jeans)",
        "Warm hat + gloves",
        "Buff / neck gaiter",
        "Comfortable camp sandals",
        "Merino wool socks x3 pairs",
      ],
    },
    {
      group: "Gear",
      items: [
        "35-45 L trekking backpack + rain cover",
        "Headlamp + spare batteries agar jugad ho jaye",
        "Trekking shoes (worn-in, NOT brand new)",
        "Lightweight camp towel",
        "Sunglasses (UV400)",
      ],
    },
    {
      group: "Food & Water",
      items: [
        "Water bottles (2 x 1 L minimum)",
        "Energy bars / trail mix / dry fruits",
        "Electrolyte sachets",
        "Instant noodles or ready meals for camp",
      ],
    },
    {
      group: "Documents",
      items: [
        "Government-issued photo ID (original)",
        "Cash in small denominations (ATMs are not in the mountains)",
      ],
    },
    {
      group: "Medicines",
      items: [
        "Agarwal ka kit bag"
      ],
    },
    {
      group: "Leave No Trace",
      items: [
        "Reusable bags for your trash",
        "Biodegradable soap and shampoo",
        "Solid sunscreen (not aerosol)",
        "Pack out every wrapper — yes, every one",
      ],
    },
  ],

  // ── Trail rules ───────────────────────────────────────────────────────────
  trailRules: [
    "Carry your trash out. Every wrapper. Every time.",
    "No loud music on the trail. Listen to the mountain.",
    "Drink water before you think you need it.",
    "Listen to the lead. No one hikes alone.",
    "Leave every campsite cleaner than you found it.",
    "Wildlife right of way — always.",
  ],

  // ── CTA section ───────────────────────────────────────────────────────────
  ctaHeadline: "The lake isn't going to stare at itself.",
  ctaSubline: "Lock in your dates. Pack your layers. See you at 2,934 m.",

  // ── Audio (public/audio/) ─────────────────────────────────────────────────
  // audioIn: plays when someone clicks "I'm in"
  // audioOut: plays when someone clicks "I'm out"
  audioIn: "audio1.mp3",
  audioOut: "audio2.mp3",
};
