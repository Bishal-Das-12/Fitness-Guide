import { useState } from "react";

const C = {
  bg: "#07100a", surface: "#0d1810", card: "#111f15",
  border: "#1c2e1f", accent: "#4ade80", accentDim: "#22c55e",
  accentBg: "#4ade8012", textPrimary: "#edfaef",
  textSecondary: "#7fb889", textMuted: "#3d6645",
  red: "#f87171", amber: "#fbbf24", blue: "#60a5fa",
  cyan: "#22d3ee", purple: "#a78bfa", orange: "#fb923c", teal: "#2dd4bf",
};

const Pill = ({ children, color = C.accent }) => (
  <span className="pill" style={{
    background: color + "1a", color,
    border: `1px solid ${color}33`,
    borderRadius: 99, padding: "2px 9px",
    fontSize: 10, fontWeight: 700, letterSpacing: 1,
    textTransform: "uppercase", whiteSpace: "nowrap",
  }}>{children}</span>
);

const Divider = () => <div style={{ height: 1, background: C.border, margin: "18px 0" }} />;

const StatBox = ({ label, value, unit, color = C.accent }) => (
  <div className="stat-box" style={{
    background: C.card, border: `1px solid ${C.border}`,
    borderRadius: 12, padding: "12px 14px", flex: "1 1 90px", minWidth: 80, textAlign: "center",
  }}>
    <div style={{ color, fontSize: 22, fontWeight: 900, fontFamily: "monospace", lineHeight: 1 }}>{value}</div>
    {unit && <div style={{ color: C.textMuted, fontSize: 9, marginTop: 2, textTransform: "uppercase", letterSpacing: 1 }}>{unit}</div>}
    <div style={{ color: C.textSecondary, fontSize: 10, marginTop: 3 }}>{label}</div>
  </div>
);

const WEEK = [
  {
    day: "Monday", short: "Mon", type: "Push", emoji: "💪",
    color: C.purple, timing: "Gym 10:00–11:30 AM", activities: ["Gym — Push"], isVeg: false,
    exercises: [
      { name: "Barbell Bench Press", sets: "4", reps: "8–10", rest: "90s", note: "Main chest strength movement" },
      { name: "Incline Dumbbell Press", sets: "3", reps: "10–12", rest: "75s", note: "" },
      { name: "Seated Chest Press Machine", sets: "3", reps: "12–15", rest: "60s", note: "Pump finisher, squeeze at peak" },
      { name: "Seated Shoulder Press Machine", sets: "4", reps: "10–12", rest: "75s", note: "" },
      { name: "Dumbbell Lateral Raise", sets: "3", reps: "15–20", rest: "45s", note: "Slow & controlled, no swinging" },
      { name: "Cable Lateral Raise", sets: "2", reps: "15–20", rest: "45s", note: "" },
      { name: "Tricep Rope Pushdown", sets: "3", reps: "12–15", rest: "60s", note: "Elbows pinned to sides" },
      { name: "Overhead Tricep Extension (Cable)", sets: "3", reps: "12–15", rest: "60s", note: "" },
    ],
    notes: ["10-min warm up: band pull-aparts + arm circles + light plate presses", "Track bench press weight — progressive overload is how you grow"],
    breakfast: "bfast_standard", snack: "snack_a", dinner: "dinner_mon",
  },
  {
    day: "Tuesday", short: "Tue", type: "Pull", emoji: "🏋️",
    color: C.blue, timing: "Gym 10:00–11:30 AM", activities: ["Gym — Pull"], isVeg: false,
    exercises: [
      { name: "Barbell Deadlift", sets: "4", reps: "5–6", rest: "2 min", note: "First — CNS is fresh. Treat it like an event." },
      { name: "Lat Pulldown (Wide Grip)", sets: "4", reps: "10–12", rest: "75s", note: "Full hang at top, pull to chest" },
      { name: "Seated Cable Row", sets: "4", reps: "10–12", rest: "75s", note: "2-second hold at peak contraction" },
      { name: "Dumbbell Single-Arm Row", sets: "3", reps: "12–15 each", rest: "60s", note: "" },
      { name: "Face Pulls (Cable)", sets: "3", reps: "15–20", rest: "45s", note: "Rear delt + rotator health — never skip" },
      { name: "Barbell / EZ-Bar Curl", sets: "3", reps: "10–12", rest: "60s", note: "" },
      { name: "Hammer Curl (Dumbbell)", sets: "3", reps: "12–15", rest: "60s", note: "" },
    ],
    notes: ["Reset every deadlift rep — don't bounce the bar", "2-sec negative on lat pulldowns for max engagement"],
    breakfast: "bfast_standard", snack: "snack_b", dinner: "dinner_tue",
  },
  {
    day: "Wednesday", short: "Wed", type: "Legs", emoji: "🦵",
    color: C.amber, timing: "Gym 10:00–11:30 AM", activities: ["Gym — Legs"], isVeg: false,
    exercises: [
      { name: "Barbell Back Squat", sets: "4", reps: "8–10", rest: "2 min", note: "Quad-dominant day — break parallel" },
      { name: "Leg Press", sets: "3", reps: "12–15", rest: "90s", note: "Feet shoulder-width, heels on platform" },
      { name: "Leg Extension Machine", sets: "3", reps: "15–20", rest: "60s", note: "Full extension, 1s squeeze" },
      { name: "Hamstring Curl Machine", sets: "4", reps: "12–15", rest: "60s", note: "" },
      { name: "Romanian Deadlift (Barbell)", sets: "3", reps: "10–12", rest: "75s", note: "Hinge, don't squat — feel the stretch" },
      { name: "Calf Raises (Smith Machine)", sets: "4", reps: "20–25", rest: "45s", note: "Full ROM, pause at bottom" },
    ],
    notes: ["Warm up: 10 bodyweight squats + leg swings + hip circles", "Calves respond to high reps — slow and squeeze every rep"],
    breakfast: "bfast_standard", snack: "snack_c", dinner: "dinner_wed",
  },
  {
    day: "Thursday", short: "Thu", type: "Swim + Push", emoji: "🏊",
    color: C.cyan, timing: "Swim 8:00–8:50 AM → Gym 10:00–11:30 AM",
    activities: ["Swimming (mandatory)", "Gym — Push (variation)"], isVeg: false,
    exercises: [
      { name: "🏊 SWIMMING — Beginner Protocol", sets: "—", reps: "50 min", rest: "as needed", note: "See swim notes below" },
      { name: "── GYM BEGINS ──", sets: "", reps: "", rest: "" },
      { name: "Smith Machine Incline Press", sets: "4", reps: "10–12", rest: "75s", note: "Smith used — stabilisers pre-fatigued from swim" },
      { name: "Dumbbell Flat Press", sets: "3", reps: "10–12", rest: "75s", note: "" },
      { name: "Cable Chest Fly (Low to High)", sets: "3", reps: "15", rest: "60s", note: "Squeeze hard at centre" },
      { name: "Dumbbell Shoulder Press (seated)", sets: "3", reps: "10–12", rest: "75s", note: "" },
      { name: "Rear Delt Fly (Dumbbell, incline)", sets: "3", reps: "15", rest: "45s", note: "" },
      { name: "Tricep Bench Dips", sets: "3", reps: "12–15", rest: "60s", note: "" },
      { name: "Cable Pushdown (Straight Bar)", sets: "3", reps: "15", rest: "45s", note: "" },
    ],
    notes: [
      "Swim Protocol (Wk 1–2): 10 min water comfort → 5×2 laps freestyle, 90s rest → kickboard 10 min → backstroke attempts → float/breathe 5 min",
      "Target: 8–10 laps. Zero ego, 100% technique.",
      "Eat 1 banana between swim & gym — never enter gym on empty after swimming",
    ],
    breakfast: "bfast_standard", snack: "snack_d", dinner: "dinner_thu",
  },
  {
    day: "Friday", short: "Fri", type: "Pull", emoji: "🏋️",
    color: C.blue, timing: "Gym 10:00–11:30 AM", activities: ["Gym — Pull (variation)"], isVeg: false,
    exercises: [
      { name: "Lat Pulldown (Close Grip)", sets: "4", reps: "10–12", rest: "75s", note: "" },
      { name: "Barbell Row (Pendlay style)", sets: "4", reps: "8–10", rest: "90s", note: "Bar starts on floor each rep" },
      { name: "Seated Row (Wide Grip)", sets: "3", reps: "12–15", rest: "60s", note: "" },
      { name: "Straight-Arm Cable Pulldown", sets: "3", reps: "15", rest: "60s", note: "Arms straight throughout" },
      { name: "Incline Dumbbell Curl", sets: "3", reps: "12", rest: "60s", note: "Full stretch at bottom" },
      { name: "Cable Curl", sets: "3", reps: "15", rest: "45s", note: "" },
    ],
    notes: ["Pure gym day — no swim fatigue. Push heavier rows.", "Second pull of the week — aim to beat Tuesday's weights."],
    breakfast: "bfast_standard", snack: "snack_a", dinner: "dinner_fri",
  },
  {
    day: "Saturday", short: "Sat", type: "Cycling + Swim?", emoji: "🚴",
    color: C.orange, timing: "Cycling 6:30–8:30 AM · Swim evening (optional)",
    activities: ["Cycling 30–40km (morning)", "Swimming — optional (evening)"], isVeg: true,
    exercises: [
      { name: "🚴 Cycling — 30–40 km", sets: "—", reps: "~90 min", rest: "—", note: "Zone 2 — you can hold a conversation" },
      { name: "🏊 Swimming (Evening — OPTIONAL)", sets: "—", reps: "50 min", rest: "as needed", note: "Only if not tired from cycling. Skip = swim Sunday instead." },
    ],
    notes: [
      "No gym today. Active cardio + recovery day.",
      "Swim is optional — if legs feel heavy, skip and swim Sunday instead.",
      "Cycling burns 600–800 kcal — eat more today.",
      "Full vegetarian day — all meals are plant-based.",
    ],
    breakfast: "bfast_sat", snack: "snack_veg", dinner: "dinner_sat",
  },
  {
    day: "Sunday", short: "Sun", type: "Rest + Swim?", emoji: "😴",
    color: C.teal, timing: "Full rest · Swim only if missed Saturday",
    activities: ["Complete Rest", "Swimming — only if missed Saturday"], isVeg: false,
    exercises: [
      { name: "🏊 Swimming (ONLY if Saturday was skipped)", sets: "—", reps: "50 min", rest: "as needed", note: "Don't swim both days — pick one." },
    ],
    notes: [
      "Rest day. No gym. Muscles grow today.",
      "Swam Saturday? → total rest, no swimming today.",
      "Skipped Saturday swim? → swim today, then rest.",
      "Non-veg day. Two full cooked meals (lunch + dinner). No breakfast needed.",
      "Use the afternoon to meal-prep the week: marinate chicken, boil eggs, do groceries.",
    ],
    breakfast: null, snack: null, dinner: "dinner_sun",
  },
];

const BREAKFASTS = {
  bfast_standard: [
    {
      name: "Post-Gym Lunch", time: "1:00–2:00 PM", emoji: "🥣", tag: "Recovery", tagColor: C.accent,
      cal: 610, protein: 50,
      items: ["80g rolled oats (dry weight)", "1 tbsp chia seeds", "1 tbsp mixed seeds", "240ml water", "1 medium fruit (that day's scheduled fruit)", "1 scoop whey protein (~25g protein) + 5g creatine", "2 whole eggs"],
      recipe: [
        "PREP THE NIGHT BEFORE: Measure 80g rolled oats into a jar or airtight container (a measuring cup or kitchen scale works — eyeball it as roughly 1 cup if you don't have one).",
        "Add 1 tablespoon chia seeds and 1 tablespoon mixed seeds directly into the oats.",
        "Pour in 240ml (roughly 1 cup) of room-temperature water — no milk needed, the chia and oats absorb it and turn creamy on their own.",
        "Optional: add a pinch of cinnamon powder for flavour with zero added calories.",
        "Stir thoroughly so no dry oats are clumped at the bottom. Cover with a lid and place in the fridge overnight (minimum 6 hours).",
        "AT LUNCH (1–2 PM): Take the jar out of the fridge. The oats should be thick and creamy — if too thick, stir in 1–2 tbsp more water.",
        "WHEY + CREATINE: Scoop 1 serving of whey protein (~25g protein) and 5g creatine directly into the oats jar. Stir thoroughly until fully dissolved and no powder clumps remain — alternatively, mix the whey separately in a shaker with a splash of water and pour over the oats.",
        "Slice your scheduled fruit for the day (banana, papaya, mango, guava, or apple) and layer on top of the oats.",
        "EGGS: In a non-stick pan on medium-low heat, add a light spray or ¼ tsp oil. Crack 2 whole eggs into the pan.",
        "Add a pinch of salt, black pepper, and optional turmeric for colour. Whisk lightly in the pan, scramble gently using a spatula, folding every 20–30 seconds.",
        "Cook until just set but still moist (about 2–3 minutes total) — don't overcook or they turn rubbery and dry.",
        "Eat the whey-mixed oats and the eggs together. This is your biggest meal of the day — don't rush it.",
      ],
      tip: "Whey + 2 eggs replaces the old 3 whole + 2 whites combo and actually nets you more total protein (50g vs 42g) for similar or lower effort. Make oats every single night before bed — takes 3 minutes and means zero decision-making in the morning.",
    },
  ],
  bfast_sat: [
    {
      name: "Post-Cycling Veg Brunch", time: "9:30–10:00 AM", emoji: "🌿", tag: "Veg Day", tagColor: C.teal,
      cal: 560, protein: 48,
      items: ["80g rolled oats (prepped Friday night)", "1 tbsp chia seeds", "1 tbsp mixed seeds", "1 medium fruit (scheduled)", "1 scoop whey protein (~25g protein) + 5g creatine", "1 cup moong sprouts", "½ cucumber, diced", "1 small tomato, diced", "Lemon juice, chaat masala, chilli powder, salt"],
      recipe: [
        "OVERNIGHT OATS: Already prepped Friday night using the standard recipe — 80g oats + chia + mixed seeds + 240ml water, refrigerated overnight. Pull from the fridge.",
        "WHEY + CREATINE: Scoop 1 serving of whey protein and 5g creatine directly into the oats jar. Stir thoroughly until fully dissolved.",
        "Top the oats with your scheduled fruit for the day.",
        "MOONG SPROUTS CHAAT (make fresh this morning): Rinse 1 cup moong sprouts thoroughly under running water in a sieve.",
        "Optional: steam the sprouts for 2 minutes in a covered pan with 2 tbsp water — this makes them easier to digest, though raw is fine too if you're used to it.",
        "Dice ½ cucumber and 1 small tomato into small, even pieces.",
        "In a bowl, combine the sprouts, cucumber, and tomato.",
        "Squeeze the juice of half a lemon over the mix. Add ½ tsp chaat masala, a pinch of red chilli powder, and salt to taste.",
        "Toss everything together until well coated. Eat fresh — don't let it sit too long or the cucumber releases water and makes it soggy.",
        "Eat the whey-mixed oats bowl and the sprouts chaat side by side — together this covers your post-workout protein and carb needs without any animal protein, and whey already does most of the heavy lifting on protein today.",
      ],
      tip: "Most whey protein is vegetarian (check your label — whey isolate/concentrate from milk is veg-friendly) so it fits perfectly into your Saturday veg day without breaking the rule.",
    },
  ],
};

const SNACKS = {
  snack_a: {
    name: "Spiced Soya Chaat", cal: 210, protein: 22, emoji: "🫙", tag: "High Protein", tagColor: C.cyan,
    items: ["50g dry soya chunks", "½ medium onion, finely diced", "1 medium tomato, finely diced", "1 green chilli, finely chopped (optional)", "Juice of ½ lemon", "½ tsp chaat masala", "Salt to taste"],
    recipe: [
      "Bring 2 cups of water to a boil in a small pan. Add a pinch of salt.",
      "Add 50g dry soya chunks to the boiling water. Boil for 7–8 minutes until they puff up and turn soft.",
      "Drain the soya chunks into a sieve and run under cold water for 30 seconds to stop cooking and cool them down.",
      "Squeeze each soya chunk firmly between your palms or in a clean kitchen towel to remove all excess water — this step matters, soggy chaat is unappetising.",
      "Roughly chop or tear the squeezed soya chunks into bite-sized pieces if they're large.",
      "In a mixing bowl, combine the soya chunks with finely diced onion, tomato, and green chilli (if using).",
      "Squeeze the juice of half a lemon over the mixture.",
      "Add ½ tsp chaat masala and salt to taste. Toss everything together until evenly coated.",
      "Optional: add a small handful of sprouts on top for extra crunch and protein.",
      "Eat fresh within 30 minutes for best texture — the onion and tomato release water over time.",
    ],
    tip: "Batch-boil and squeeze a larger batch of soya chunks (150–200g) once and store dry in the fridge for 3–4 days — just chop fresh veg and dress when you want to eat.",
  },
  snack_b: {
    name: "Moong Sprouts Chaat", cal: 180, protein: 14, emoji: "🌱", tag: "Budget Pick", tagColor: C.accent,
    items: ["1 cup moong sprouts (homemade or store-bought)", "½ cucumber, finely diced", "1 small tomato, finely diced", "Juice of ½ lemon", "¼ tsp red chilli powder", "Salt to taste", "1 tsp chia seeds"],
    recipe: [
      "HOW TO SPROUT MOONG AT HOME (do this 2 days ahead): Take ¼ cup dry whole moong (green gram), rinse well, and soak in water overnight (8–10 hours).",
      "Next morning, drain the water completely. Wrap the soaked moong in a clean, damp cotton cloth or place in a sieve covered with a damp cloth.",
      "Leave at room temperature for 24–36 hours, sprinkling a little water on the cloth if it dries out. You'll see small white sprout tails appear — that's when they're ready.",
      "Rinse the sprouts once more and refrigerate in an airtight container — they keep for 3–4 days.",
      "TO MAKE THE CHAAT: Rinse 1 cup of sprouts under running water. If you prefer them softer, steam for 2 minutes in a covered pan with 2 tbsp water, then cool.",
      "Finely dice the cucumber and tomato into small, even pieces.",
      "Combine sprouts, cucumber, and tomato in a bowl.",
      "Squeeze the juice of half a lemon over everything. Add red chilli powder and salt to taste.",
      "Toss well, then sprinkle 1 tsp chia seeds on top and mix in lightly — they'll soften slightly and add a nice texture along with omega-3s.",
    ],
    tip: "Sprouting moong at home costs roughly ₹10 for a full week's supply — far cheaper than buying ready sprouts.",
  },
  snack_c: {
    name: "Boiled Egg Chaat", cal: 200, protein: 20, emoji: "🥚", tag: "Quick & Easy", tagColor: C.amber,
    items: ["3 boiled eggs (2 whole + 1 white only)", "¼ tsp chaat masala", "¼ tsp roasted jeera (cumin) powder", "Salt and black pepper to taste", "½ cucumber, sliced, for serving"],
    recipe: [
      "If you don't already have boiled eggs ready: place eggs in a pan, cover with cold water by an inch, bring to a boil, then cover, turn off heat, and let sit 10–11 minutes.",
      "Drain and run under cold water for a minute, then peel.",
      "For this snack: peel 3 eggs. Separate one of them and discard (or save) one yolk — you want 2 whole eggs and 1 egg white only for this snack to control fat intake.",
      "Slice the eggs in half lengthwise using a sharp knife for clean cuts.",
      "Arrange on a plate, cut-side up.",
      "Dust evenly with chaat masala, roasted jeera powder, a pinch of salt, and a few cracks of black pepper.",
      "Slice cucumber into rounds or sticks and serve alongside — the freshness balances the richness of the egg.",
    ],
    tip: "Boil a batch of 6 eggs every 2 days and store unpeeled in the fridge — peel only what you need, right before eating, to keep them fresh.",
  },
  snack_d: {
    name: "Fruit + Seed Bowl", cal: 190, protein: 8, emoji: "🍎", tag: "Recovery", tagColor: C.purple,
    items: ["1 medium fruit (that day's scheduled fruit)", "1 tbsp chia seeds", "1 tbsp mixed seeds", "Pinch of cinnamon powder (optional)"],
    recipe: [
      "Wash your scheduled fruit for the day thoroughly under running water.",
      "If using banana, papaya, mango, or guava — peel and slice into bite-sized cubes or rounds and place in a bowl.",
      "If using apple — wash well, slice into thin wedges (skin on is fine, it has fibre), and arrange in a bowl.",
      "Sprinkle 1 tablespoon of chia seeds evenly over the fruit.",
      "Add 1 tablespoon of mixed seeds on top for crunch.",
      "Dust lightly with cinnamon powder if you like the flavour — it also has a mild blood-sugar stabilising effect.",
      "Eat immediately — no soaking or waiting required, this is meant to be quick and fresh.",
    ],
    tip: "This is your best option on swim days — the natural sugars in fruit replenish glycogen quickly after a swim session without spiking insulin too hard.",
  },
  snack_veg: {
    name: "Air-Fried Soya + Fruit (Veg Day)", cal: 200, protein: 18, emoji: "🌿", tag: "Veg Day", tagColor: C.teal,
    items: ["50g dry soya chunks", "1 tsp oil", "¼ tsp red chilli powder", "¼ tsp cumin powder", "Salt to taste", "1 medium fruit (that day's scheduled fruit)"],
    recipe: [
      "Soak 50g dry soya chunks in hot water for 10 minutes until they expand and soften.",
      "Drain and squeeze the soya chunks firmly between your palms to remove as much water as possible — the drier they are, the crispier they'll get in the air fryer.",
      "In a bowl, toss the squeezed soya chunks with 1 tsp oil, red chilli powder, cumin powder, and salt until evenly coated.",
      "Preheat your air fryer to 180°C for 2–3 minutes.",
      "Spread the soya chunks in a single layer in the air fryer basket — don't overcrowd, cook in two batches if needed for even crisping.",
      "Air fry at 180°C for 12–15 minutes, shaking the basket halfway through (around the 7 minute mark) for even browning.",
      "They're done when golden brown and crispy on the outside — let cool for 2 minutes before eating, they'll crisp up further as they cool.",
      "Serve alongside your scheduled fruit for the day.",
    ],
    tip: "Air-fried soya is genuinely addictive — make a double batch and portion it out for snacking through the evening too, it holds its crunch for a few hours.",
  },
};

const DINNERS = {
  dinner_mon: {
    name: "Air Fryer Spiced Chicken + Rice + Veggies", cal: 650, protein: 52, emoji: "🍗", tag: "Air Fryer", tagColor: C.orange, isVeg: false,
    items: ["200g chicken breast", "75g dry rice", "1 cup mixed veg (capsicum, broccoli, onion)", "1 tsp olive oil", "½ tsp garlic powder, cumin, coriander powder, chilli powder", "Salt and pepper to taste", "½ lemon"],
    recipe: [
      "MARINATE (minimum 30 min, ideally overnight): Pat 200g chicken breast dry with a paper towel. Cut into 2–3 even pieces so it cooks uniformly.",
      "In a bowl, mix 1 tsp olive oil, ½ tsp each of garlic powder, cumin powder, coriander powder, and chilli powder, plus salt and pepper.",
      "Coat the chicken pieces thoroughly in this marinade, massaging it in with your hands. Cover and refrigerate for at least 30 minutes, or overnight for deeper flavour.",
      "AIR FRY: Preheat air fryer to 200°C for 3 minutes. Place chicken pieces in a single layer in the basket, not touching.",
      "Air fry at 200°C for 18–20 minutes total, flipping the pieces at the 10 minute mark for even browning.",
      "Check doneness by cutting into the thickest piece — it should be opaque white throughout with no pink, and juices should run clear.",
      "RICE: While chicken cooks, rinse 75g dry rice under water until it runs clear. Cook using your usual method (absorption or boil-and-drain) until tender.",
      "VEGGIES: Heat a small pan, add a few drops of oil, and sauté 1 cup mixed capsicum, broccoli, and onion on medium-high heat for 5 minutes until just tender but still crisp. Season with salt and pepper.",
      "ASSEMBLE: Plate the rice as a base, top with sautéed veggies, then slice the rested chicken (let it rest 5 minutes off heat before cutting) and place on top.",
      "Finish with a generous squeeze of lemon juice over the whole plate just before eating.",
    ],
    tip: "Batch-marinate 4 chicken breasts on Sunday night and refrigerate — each night you just pull one out and air fry, 20 minutes fridge to plate.",
  },
  dinner_tue: {
    name: "Egg Fried Rice (High Protein)", cal: 600, protein: 38, emoji: "🍳", tag: "Budget Meal", tagColor: C.accentDim, isVeg: false,
    items: ["75g dry rice, cooked and cooled (ideally a day old)", "3 whole eggs + 2 egg whites", "½ cup mixed veg (carrot, peas, capsicum), finely diced", "2 cloves garlic, minced", "½ inch ginger, minced", "1 tsp oil", "Soy sauce (optional)", "Salt and pepper to taste"],
    recipe: [
      "If you don't have day-old rice, cook 75g dry rice and spread it on a plate to cool completely — even 30 minutes in the fridge helps it separate properly during frying, instead of turning mushy.",
      "Crack 3 whole eggs and add 2 egg whites into a bowl, whisk lightly with a pinch of salt.",
      "Heat ½ tsp oil in a wok or wide pan on medium-high heat. Pour in the eggs and scramble quickly, breaking into small curds. Cook just until set (about 1–2 minutes), then remove to a plate and set aside.",
      "In the same pan, add the remaining ½ tsp oil. Add minced garlic and ginger, stir-fry for 30 seconds until fragrant — don't let it burn.",
      "Add the diced mixed vegetables and stir-fry on high heat for 3 minutes until just tender.",
      "Add the cold rice to the pan, breaking up any clumps with your spatula. Toss continuously on high heat for 2–3 minutes so the rice gets slightly crisp and heated through.",
      "Return the scrambled eggs to the pan. Add 1–2 tsp soy sauce if you have it, plus salt and pepper to taste. Toss everything together for another minute.",
      "Taste and adjust seasoning before serving hot.",
    ],
    tip: "Cook extra rice during lunch and refrigerate the leftover portion — using it for tonight's fried rice means zero food waste and better texture.",
  },
  dinner_wed: {
    name: "Soya Chunks Masala Curry + Rice", cal: 630, protein: 44, emoji: "🍲", tag: "Budget High-Protein", tagColor: C.purple, isVeg: false,
    items: ["60g dry soya chunks", "75g dry rice", "1 medium onion, finely chopped", "1 medium tomato, pureed or finely chopped", "2 cloves garlic + ½ inch ginger, paste", "½ tsp turmeric", "1 tsp cumin powder", "1 tsp coriander powder", "½ tsp garam masala", "1 tsp oil", "½ cup spinach, peas, or capsicum", "Salt to taste", "Fresh coriander and lemon for garnish"],
    recipe: [
      "Bring 2 cups water to a boil with a pinch of salt. Add 60g dry soya chunks and boil for 7–8 minutes until soft and puffed up.",
      "Drain and rinse under cold water, then squeeze out excess water firmly between your palms. Set aside.",
      "Heat 1 tsp oil in a pan on medium heat. Add the chopped onion and sauté for 5–6 minutes, stirring occasionally, until golden brown — this step builds the base flavour, don't rush it.",
      "Add the ginger-garlic paste and cook for 1 minute until the raw smell disappears.",
      "Add the pureed tomato, turmeric, cumin powder, coriander powder, and a splash of water if it's sticking. Cook on medium heat for 5–6 minutes, stirring occasionally, until the oil starts to separate at the edges — this means the masala base is properly cooked.",
      "Add the squeezed soya chunks and toss to coat in the masala. Add your chosen vegetable (spinach, peas, or capsicum).",
      "Pour in ½ cup water, add garam masala and salt to taste. Cover and simmer on low heat for 10 minutes, stirring once or twice.",
      "MEANWHILE: rinse and cook 75g dry rice using your usual method.",
      "Once the curry has thickened slightly and the soya has absorbed flavour, switch off heat. Garnish with chopped fresh coriander.",
      "Serve hot over rice with a squeeze of lemon juice.",
    ],
    tip: "This is your cheapest high-protein dinner — soya chunks cost roughly ₹50 for 500g. Make a double batch of the curry and refrigerate half for an easy meal later in the week.",
  },
  dinner_thu: {
    name: "Air Fryer Chicken Strips + Veggie Rice", cal: 640, protein: 50, emoji: "🥗", tag: "Air Fryer", tagColor: C.orange, isVeg: false,
    items: ["200g chicken breast, cut into strips", "75g dry rice", "1 cup mixed veg", "1 egg white", "3 tbsp rolled oats, blended to a coarse powder", "½ tsp garlic powder, chilli powder", "Salt to taste"],
    recipe: [
      "Cut 200g chicken breast into even strips, roughly finger-width, so they cook at the same rate.",
      "Blend 3 tbsp rolled oats in a small grinder or blender until you get a coarse, breadcrumb-like powder — don't over-blend into flour, some texture is good.",
      "In one bowl, whisk 1 egg white until slightly frothy. In another shallow bowl or plate, mix the oat powder with garlic powder, chilli powder, and salt.",
      "Dip each chicken strip into the egg white first, letting excess drip off, then coat thoroughly in the oat mixture, pressing gently so it sticks.",
      "Preheat air fryer to 190°C for 3 minutes. Arrange coated strips in a single layer in the basket, leaving small gaps between each for air circulation — this is key for crispiness.",
      "Air fry at 190°C for 15 minutes total, flipping each strip carefully at the 8 minute mark using tongs.",
      "They're done when golden brown on the outside and the chicken inside is fully white and opaque — cut one open to confirm if unsure.",
      "MEANWHILE: rinse 75g dry rice and cook in a pot along with 1 cup of mixed vegetables added directly to the cooking water — this infuses flavour and saves washing an extra pan.",
      "Plate the veggie rice and arrange the crispy chicken strips on top or alongside. Finish with a squeeze of lemon.",
    ],
    tip: "The oat coating gives more protein than regular breadcrumbs and crisps up beautifully in the air fryer — a genuinely good swap.",
  },
  dinner_fri: {
    name: "Masala Omelette + Rice", cal: 620, protein: 42, emoji: "🍳", tag: "Egg Night", tagColor: C.amber, isVeg: false,
    items: ["75g dry rice", "4 whole eggs + 2 egg whites", "1 small onion, finely diced", "1 small tomato, finely diced", "1 green chilli, finely chopped", "2 tbsp fresh coriander, chopped", "¼ tsp turmeric", "¼ tsp cumin powder", "Salt and black pepper to taste", "Lemon wedge or cucumber slices, for serving"],
    recipe: [
      "RICE: Rinse 75g dry rice under running water until the water runs mostly clear. Cook using your usual absorption or boil-and-drain method until tender.",
      "While the rice cooks, finely dice the onion, tomato, green chilli, and coriander so the omelette comes together quickly.",
      "OMELETTE: In a bowl, crack 4 whole eggs and add 2 egg whites. Whisk well with a pinch of salt.",
      "Add the diced onion, tomato, green chilli, chopped coriander, turmeric, cumin powder, black pepper, and salt directly into the egg mixture. Whisk lightly to combine.",
      "Heat a non-stick pan on medium heat with a few drops of oil. Pour in the egg mixture and swirl gently to spread it evenly.",
      "Let it cook undisturbed for 2–3 minutes until the edges set and the bottom is golden, then fold it in half using a spatula and cook another minute on each folded side.",
      "Plate the hot rice and serve the masala omelette on top or alongside it. Finish with lemon, cucumber, or any leftover sautéed vegetables if you have them.",
    ],
    tip: "This keeps Friday simple and filling without the oat pancake step. If you already have cooked rice in the fridge, the whole meal comes together in about 10 minutes.",
  },
  dinner_sat: {
    name: "Full Veg Dinner — Soya Curry + Sabzi + Rice", cal: 700, protein: 32, emoji: "🥦", tag: "Veg Day", tagColor: C.teal, isVeg: true,
    items: ["75g dry rice (or 2 chapatis)", "60g dry soya chunks", "1 cup dal if available (moong or chana)", "1 cup mixed veg for sabzi (potato, okra, spinach, or whatever's available)", "Onion, tomato, ginger-garlic for base", "Turmeric, cumin, coriander powder, garam masala", "1–2 tsp oil", "Curd, for serving (if available)"],
    recipe: [
      "SOYA CURRY: Follow the exact recipe from Wednesday's Soya Chunks Masala Curry — boil and squeeze 60g soya chunks, build an onion-tomato-spice base, simmer with the soya for 10 minutes. Make a slightly bigger portion today since you're eating more.",
      "VEG SABZI: Heat 1 tsp oil in a separate pan. Add ½ tsp cumin seeds and let them splutter.",
      "Add finely chopped onion and sauté until translucent, about 4 minutes. Add ginger-garlic paste, cook 1 minute.",
      "Add your chosen vegetables (diced potato takes longest, so add first; spinach or okra can go in after 5 minutes). Add turmeric, coriander powder, and salt.",
      "Cover and cook on low-medium heat for 10–15 minutes, stirring occasionally, until vegetables are tender. Add a splash of water if it's sticking.",
      "Finish with a pinch of garam masala stirred in at the end for aroma.",
      "RICE: Rinse and cook 75g dry rice using your usual method, or make 2 chapatis if you prefer roti tonight.",
      "Plate the rice or chapati with both the soya curry and the sabzi on the side. Add a dollop of curd if available — it balances the meal and aids digestion.",
      "This is a bigger-than-usual dinner intentionally, since today's cycling burns significantly more calories than a normal gym day.",
    ],
    tip: "Saturday is your veg day, so lean fully into it — the combination of soya + dal + rice together forms a nutritionally complete protein profile even without any animal product.",
  },
  dinner_sun_lunch: {
    name: "Sunday Lunch — Chicken Curry + Rice", cal: 650, protein: 50, emoji: "🍛", tag: "Non-Veg", tagColor: C.red, isVeg: false,
    items: ["200g chicken (bone-in or breast, cut into curry pieces)", "75g dry rice", "1 large onion, finely sliced", "1 large tomato, pureed", "1 tbsp ginger-garlic paste", "1 tsp coriander powder", "1 tsp cumin powder", "½ tsp turmeric", "½ tsp red chilli powder", "1 tsp oil", "Fresh coriander, lemon, for garnish", "Whole spices (optional): 1 bay leaf, 2 cloves, 1 small cinnamon stick"],
    recipe: [
      "Heat 1 tsp oil in a heavy-bottomed pan on medium heat. If using whole spices, add bay leaf, cloves, and cinnamon first and let them sizzle for 20 seconds.",
      "Add the finely sliced onion and cook on medium heat, stirring frequently, for 10–12 minutes until deeply golden brown — this slow browning is what gives the curry its depth, don't rush or raise the heat too high or it'll burn instead of caramelizing.",
      "Add the ginger-garlic paste and cook for 1–2 minutes until the raw smell fades.",
      "Add the pureed tomato along with coriander powder, cumin powder, turmeric, and red chilli powder. Cook this masala base on medium heat for 6–8 minutes, stirring occasionally, until the oil visibly separates at the edges of the pan — this is the key sign the base is properly cooked.",
      "Add the chicken pieces and stir to coat thoroughly in the masala. Cook for 4–5 minutes on medium-high heat, stirring, until the chicken changes colour on the outside.",
      "Add ½ to ¾ cup water depending on how thick or thin you like your curry. Bring to a boil, then reduce heat to low, cover, and simmer for 20–25 minutes, stirring occasionally, until the chicken is fully cooked through and tender.",
      "Check seasoning and adjust salt if needed. Switch off heat and stir in freshly chopped coriander.",
      "MEANWHILE: rinse and cook 75g dry rice using your usual method.",
      "Serve the curry hot over rice with a final squeeze of fresh lemon juice.",
    ],
    tip: "Since you have time to cook properly today, this curry develops much better flavour than a rushed weekday version — and leftovers reheat beautifully for Monday's lunch if you make extra.",
  },
  dinner_sun: {
    name: "Sunday Dinner — Air Fryer Chicken Leg/Thigh", cal: 600, protein: 48, emoji: "🍗", tag: "Non-Veg", tagColor: C.red, isVeg: false,
    items: ["300g chicken leg or thigh pieces, skin removed", "3 tbsp curd (yogurt)", "1 tbsp ginger-garlic paste", "1 tsp red chilli powder", "1 tsp garam masala", "Juice of ½ lemon", "Salt to taste", "Side salad: ½ cucumber, ½ onion, 1 tomato, sliced", "Small portion of leftover rice or 1 chapati"],
    recipe: [
      "MARINATE (this is the key step — start at least 2 hours ahead, ideally the night before): In a bowl, whisk 3 tbsp curd until smooth.",
      "Add ginger-garlic paste, red chilli powder, garam masala, lemon juice, and salt to the curd. Mix into a smooth marinade.",
      "Make 2–3 deep cuts into each chicken piece with a knife — this helps the marinade penetrate and flavours the meat all the way through, not just the surface.",
      "Coat the chicken pieces thoroughly in the marinade, massaging it into the cuts. Cover and refrigerate for a minimum of 2 hours, though overnight (8+ hours) gives noticeably more tender, flavourful results.",
      "AIR FRY: Remove chicken from the fridge 15 minutes before cooking to take the chill off. Preheat air fryer to 200°C for 3 minutes.",
      "Place chicken pieces in the basket in a single layer, skin-side down if applicable, leaving space between pieces.",
      "Air fry at 200°C for 22–25 minutes total, flipping the pieces at the 12 minute mark.",
      "Check doneness with a fork or knife at the thickest part — juices should run clear with no pink, and ideally the internal temperature should reach 75°C if you have a thermometer.",
      "Let the chicken rest for 5 minutes after cooking — this redistributes the juices and keeps it tender when you cut into it.",
      "SALAD: While chicken rests, slice cucumber, onion, and tomato. Squeeze lemon juice over and add a pinch of salt.",
      "Serve the chicken with the fresh salad and a small portion of leftover rice or a single chapati on the side.",
    ],
    tip: "The curd-based marinade is the secret to genuinely tender, flavourful chicken — don't skip the marination time even if you're tempted to rush.",
  },
};

const NIGHT_PREP = {
  Sun: { title: "Sunday Night → Prepping for Monday", tasks: [
    { icon: "🥣", task: "Overnight oats", detail: "80g oats + 1 tbsp chia + 1 tbsp mix seeds + 240ml water in a jar. Refrigerate." },
    { icon: "🥚", task: "Boil 6 eggs", detail: "Batch boil. Refrigerate. Use 5 in tomorrow's post-gym lunch (3 whole + 2 whites)." },
    { icon: "🍗", task: "Marinate chicken (Mon + Tue)", detail: "Marinate 400g chicken breast tonight — air fry Monday's portion tomorrow, fridge the rest." },
    { icon: "🧄", task: "Prep veggies", detail: "Wash and chop the week's veggies. Store in airtight container." },
  ]},
  Mon: { title: "Monday Night → Prepping for Tuesday", tasks: [
    { icon: "🥣", task: "Overnight oats", detail: "80g oats + 1 tbsp chia + 1 tbsp mix seeds + 240ml water. Refrigerate." },
    { icon: "🥚", task: "Check egg stock", detail: "If fewer than 4 eggs left, boil a fresh batch of 6." },
    { icon: "🍗", task: "Tuesday chicken sorted", detail: "Already marinated from Sunday — just store properly." },
    { icon: "🫙", task: "Soak soya chunks", detail: "Soak 50g soya for Tuesday's snack. Squeeze dry, refrigerate." },
  ]},
  Tue: { title: "Tuesday Night → Prepping for Wednesday", tasks: [
    { icon: "🥣", task: "Overnight oats", detail: "80g oats + 1 tbsp chia + 1 tbsp mix seeds + 240ml water. Refrigerate." },
    { icon: "🥚", task: "Boil eggs if needed", detail: "Check stock. Boil 6 if running low." },
    { icon: "🍚", task: "Cook extra rice", detail: "Cook 150g dry rice tonight — eat 75g, save 75g cold for Thursday's egg fried rice." },
    { icon: "🫙", task: "Pre-cook soya curry base", detail: "Optionally make the onion-tomato gravy base now — saves 10 min tomorrow." },
  ]},
  Wed: { title: "Wednesday Night → Prepping for Thursday (Swim Day)", tasks: [
    { icon: "🥣", task: "Overnight oats", detail: "80g oats + 1 tbsp chia + 1 tbsp mix seeds + 240ml water. Refrigerate." },
    { icon: "🥚", task: "Boil eggs", detail: "5 needed for post-gym lunch (3 whole + 2 whites). Boil a batch of 6." },
    { icon: "🍌", task: "Keep banana ready", detail: "Keep 1 banana on the counter for between swim and gym." },
    { icon: "🏊", task: "Pack swim bag", detail: "Towel, goggles, extra clothes. Pack tonight — mornings get tight." },
    { icon: "🍗", task: "Marinate chicken strips", detail: "Marinate 200g chicken strips for Thursday's air fryer dinner." },
  ]},
  Thu: { title: "Thursday Night → Prepping for Friday", tasks: [
    { icon: "🥣", task: "Overnight oats", detail: "80g oats + 1 tbsp chia + 1 tbsp mix seeds + 240ml water. Refrigerate." },
    { icon: "🥚", task: "Check eggs", detail: "Need 4+2 whites for lunch. Boil if stock is low." },
    { icon: "🫙", task: "Soya for snack", detail: "Soak 50g soya for Friday's snack. Squeeze and refrigerate." },
    { icon: "🍳", task: "Blend oats for dinner", detail: "Blend 40g oats to powder tonight — needed for Friday's omelette pancake." },
  ]},
  Fri: { title: "Friday Night → Prepping for Saturday (Veg + Cycling Day)", tasks: [
    { icon: "🥣", task: "Overnight oats", detail: "80g oats + 1 tbsp chia + 1 tbsp mix seeds + 240ml water — same recipe, veg friendly." },
    { icon: "🌱", task: "Rinse moong sprouts", detail: "Rinse Saturday's sprouts — should be ready if started Wed/Thu." },
    { icon: "🚴", task: "Prep cycling kit", detail: "Water bottles filled, cycling clothes out, banana ready for 6 AM." },
    { icon: "🫙", task: "Soak soya for Saturday snack", detail: "50g soya soaked in hot water. Squeeze dry, refrigerate." },
    { icon: "🧘", task: "Plan the swim call", detail: "Decide tomorrow: if cycling wrecks you, skip swim and do it Sunday instead." },
  ]},
  Sat: { title: "Saturday Night → Prepping for Sunday (Shopping + Rest Day)", tasks: [
    { icon: "🍗", task: "Marinate Sunday's chicken", detail: "Curd + ginger-garlic + spices + lemon, minimum 8 hours = incredible flavour by dinner." },
    { icon: "🛒", task: "Shopping list ready", detail: "Sunday is grocery day — write down what's low: chicken, eggs, oats, soya, fruits, veggies." },
    { icon: "🥚", task: "Plan to boil eggs Sunday", detail: "Sunday batch-boil 10–12 eggs for the week ahead — good for 5–6 days." },
    { icon: "📝", task: "No oats prep tonight", detail: "Sunday has no breakfast — skip tonight's oat jar. Resume Sunday night for Monday." },
  ]},
};

const FRUIT_PLAN = [
  { day: "Mon", fruit: "Banana 🍌", reason: "Ripens & spoils fastest — use first" },
  { day: "Tue", fruit: "Papaya 🍈", reason: "Goes soft quickly once cut — use early" },
  { day: "Wed", fruit: "Mango (seasonal) 🥭", reason: "Best used fresh, mid-week" },
  { day: "Thu", fruit: "Guava 🍐", reason: "Slightly more durable — fine by midweek" },
  { day: "Fri", fruit: "Apple 🍎", reason: "Lasts longest — safe for end of week" },
  { day: "Sat", fruit: "Apple 🍎 or Orange 🍊", reason: "Citrus keeps well — perfect for Saturday" },
  { day: "Sun", fruit: "No fruit needed", reason: "No breakfast on Sunday — two cooked meals only" },
];

export default function App() {
  const [tab, setTab] = useState("today");
  const [openDay, setOpenDay] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [openMeal, setOpenMeal] = useState(null);
  const [prepDay, setPrepDay] = useState("Sun");

  const DAY_SHORT_MAP = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayShort = DAY_SHORT_MAP[new Date().getDay()];
  const todayFull = WEEK.find(w => w.short === todayShort) || WEEK[0];
  const todayDateStr = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

  const tabs = [
    { id: "today", label: "📅 Today" },
    { id: "overview", label: "📊 Overview" },
    { id: "workout", label: "🏋️ Workout" },
    { id: "nutrition", label: "🥗 Nutrition" },
    { id: "nightprep", label: "🌙 Prep" },
  ];

  const toggle = (key, val, setter) => setter(val === key ? null : key);

  const MealBlock = ({ id, data, label }) => {
    if (!data) return null;
    const isOpen = openMeal === id;
    const accentColor = data.tagColor || C.accent;
    return (
      <div className="meal-card" style={{
        background: C.card, border: `1px solid ${isOpen ? accentColor + "55" : C.border}`,
        borderRadius: 13, overflow: "hidden", marginBottom: 10,
      }}>
        <div className="meal-card-toggle" onClick={() => toggle(id, openMeal, setOpenMeal)} style={{
          padding: "13px 16px", display: "flex", alignItems: "center",
          gap: 11, cursor: "pointer",
          background: isOpen ? accentColor + "0a" : "transparent",
        }}>
          <span style={{ fontSize: 20 }}>{data.emoji || "🍽️"}</span>
          <div className="min-zero" style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 3 }}>
              {label && <span style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{label} ·</span>}
              <span style={{ color: C.textPrimary, fontWeight: 700, fontSize: 13 }}>{data.name}</span>
              {data.tag && <Pill color={accentColor}>{data.tag}</Pill>}
            </div>
            {data.cal && <div style={{ color: C.textMuted, fontSize: 11 }}>{data.cal} kcal · {data.protein}g protein</div>}
          </div>
          <div style={{ color: C.textMuted, fontSize: 14, flexShrink: 0 }}>{isOpen ? "▲" : "▼"}</div>
        </div>
        {isOpen && (
          <div className="meal-card-body" style={{ borderTop: `1px solid ${C.border}`, padding: "14px 16px" }}>
            {data.items && (
              <>
                <div style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>What to eat</div>
                {data.items.map((item, i) => (
                  <div key={i} style={{ color: C.textSecondary, fontSize: 12, marginBottom: 5, display: "flex", gap: 8 }}>
                    <span style={{ color: accentColor, flexShrink: 0 }}>→</span><span>{item}</span>
                  </div>
                ))}
                <Divider />
              </>
            )}
            {data.recipe && (
              <>
                <div style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Recipe</div>
                {data.recipe.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, alignItems: "flex-start" }}>
                    <div style={{
                      background: accentColor + "22", color: accentColor,
                      borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 9, fontWeight: 700, flexShrink: 0, marginTop: 1,
                    }}>{i + 1}</div>
                    <div style={{ color: C.textSecondary, fontSize: 12, lineHeight: 1.6 }}>{step}</div>
                  </div>
                ))}
              </>
            )}
            {data.tip && (
              <div className="responsive-card" style={{
                background: C.accentBg, border: `1px solid ${C.accent}22`,
                borderRadius: 8, padding: "8px 12px", marginTop: 10,
                color: C.textSecondary, fontSize: 11,
              }}>💡 {data.tip}</div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{
      background: C.bg, minHeight: "100vh",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: C.textPrimary, width: "100%",
    }}>
      <style>{`
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; overflow-x: hidden; }
        body { background: ${C.bg}; }
        ::-webkit-scrollbar { height: 6px; width: 6px; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 99px; }
        ::-webkit-scrollbar-track { background: transparent; }
        button { font-family: inherit; touch-action: manipulation; }
        .app-shell { max-width: 1120px !important; }
        .min-zero, .min-zero * { min-width: 0; }
        .text-wrap, .meal-card, .responsive-card, .ex-grid, .grocery-row, .pairing-row, .fruit-row, .schedule-row {
          overflow-wrap: anywhere;
          word-break: normal;
        }
        .tab-bar {
          scrollbar-width: thin;
          position: sticky;
          top: 0;
          z-index: 10;
          backdrop-filter: blur(10px);
        }
        .tab-button { min-height: 42px; }
        .stat-box { min-width: 132px !important; }
        .desktop-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          align-items: start;
        }
        @media (max-width: 760px) {
          .app-shell {
            max-width: 100% !important;
            padding: 16px clamp(12px, 4vw, 18px) 64px !important;
          }
          .tab-bar {
            margin-left: -12px;
            margin-right: -12px;
            border-left: 0 !important;
            border-right: 0 !important;
            border-radius: 0 !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
          .tab-button {
            flex: 0 0 auto !important;
            padding: 10px 12px !important;
            font-size: 12px !important;
          }
          .stat-box {
            flex-basis: calc(50% - 6px) !important;
            min-width: 0 !important;
          }
          .desktop-grid {
            display: block;
          }
          .meal-card-toggle {
            align-items: flex-start !important;
          }
          .meal-card-body {
            padding: 13px !important;
          }
          .schedule-row {
            grid-template-columns: 36px 26px minmax(0, 1fr) !important;
          }
          .schedule-row .schedule-pill {
            grid-column: 3;
            justify-self: start;
            margin-top: 4px;
          }
          .fruit-row {
            grid-template-columns: 40px minmax(0, 1fr) !important;
          }
          .fruit-reason {
            grid-column: 2;
          }
          .pairing-row {
            grid-template-columns: 32px 24px minmax(0, 1fr) !important;
          }
          .pairing-dinner {
            grid-column: 3;
          }
        }
        @media (max-width: 420px) {
          h1 { font-size: 24px !important; }
          .ex-grid {
            grid-template-columns: 1fr 32px 58px 48px !important;
            gap: 4px !important;
            padding-left: 10px !important;
            padding-right: 10px !important;
          }
          .ex-grid > div { font-size: 10px !important; }
          .grocery-row {
            grid-template-columns: minmax(0, 1fr) minmax(58px, 76px) minmax(48px, 64px) !important;
            gap: 6px !important;
          }
          .pill {
            max-width: 100%;
            white-space: normal !important;
            line-height: 1.25;
          }
        }
        @media (min-width: 900px) {
          .app-shell { padding-top: 40px !important; padding-bottom: 96px !important; }
          .tab-button { font-size: 13px !important; }
          .responsive-card { padding: 18px 20px !important; }
        }
      `}</style>
      <div className="app-shell" style={{ maxWidth: 880, margin: "0 auto", padding: "20px clamp(12px, 4vw, 28px) 80px", boxSizing: "border-box" }}>

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, letterSpacing: 0, margin: "10px 0 6px", lineHeight: 1.08 }}>
            Bishal<br />
            <span style={{
              background: `linear-gradient(90deg, ${C.accent}, ${C.cyan})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Fitness Blueprint</span>
          </h1>
          <p className="text-wrap" style={{ color: C.textSecondary, fontSize: 12, margin: 0, lineHeight: 1.7, maxWidth: 760 }}>
            23 yo · 85kg → 77kg · Mon–Fri Gym · Thu Swim (mandatory) · Sat Cycling + Swim (optional) · Sun Rest + Swim (if missed Sat)
          </p>
        </div>

        <div className="tab-bar" style={{
          display: "flex", gap: 4, marginBottom: 20,
          background: C.surface, borderRadius: 12, padding: 4,
          border: `1px solid ${C.border}`,
          overflowX: "auto", WebkitOverflowScrolling: "touch",
        }}>
          {tabs.map(t => (
            <button className="tab-button" key={t.id} onClick={() => setTab(t.id)} style={{
              flex: "1 1 auto", flexShrink: 0, padding: "9px 10px", borderRadius: 9, border: "none",
              background: tab === t.id ? C.accent : "transparent",
              color: tab === t.id ? "#071008" : C.textSecondary,
              fontWeight: tab === t.id ? 800 : 500,
              fontSize: 12, cursor: "pointer", transition: "all 0.15s",
              whiteSpace: "nowrap", minWidth: "fit-content",
            }}>{t.label}</button>
          ))}
        </div>

        {tab === "today" && (() => {
          const w = todayFull;
          const isSun = w.day === "Sunday";
          const bfast = w.breakfast ? BREAKFASTS[w.breakfast] : null;
          const snack = w.snack ? SNACKS[w.snack] : null;
          const dinner = w.dinner ? DINNERS[w.dinner] : null;
          const tonightPrep = NIGHT_PREP[w.short];

          return (
            <div>
              <div style={{
                background: `linear-gradient(135deg, ${w.color}1a, transparent)`,
                border: `1px solid ${w.color}44`,
                borderRadius: 16, padding: "18px 20px", marginBottom: 22,
              }}>
                <div style={{ color: C.textMuted, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{todayDateStr}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 26 }}>{w.emoji}</span>
                  <span style={{ color: C.textPrimary, fontSize: 22, fontWeight: 900 }}>{w.day}</span>
                  <Pill color={w.color}>{w.type}</Pill>
                  {w.isVeg && <Pill color={C.teal}>🌿 Veg Day</Pill>}
                </div>
                <div style={{ color: C.textSecondary, fontSize: 12, marginTop: 8 }}>⏰ {w.timing}</div>
              </div>

              {/* Today's Workout */}
              <div style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>🏋️ Today's Workout</div>
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 13, overflow: "hidden", marginBottom: 22 }}>
                {w.exercises.length === 0 && (
                  <div style={{ padding: "16px", color: C.textSecondary, fontSize: 13 }}>
                    No scheduled gym work today.
                  </div>
                )}
                {w.exercises.map((ex, i) => (
                  ex.name.startsWith("──") ? (
                    <div key={i} style={{
                      padding: "6px 14px", background: C.surface,
                      color: C.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
                    }}>{ex.name}</div>
                  ) : (
                    <div key={i} className="ex-grid" style={{
                      display: "grid", gridTemplateColumns: "1fr 40px 70px 56px",
                      padding: "10px 14px", gap: 4,
                      borderBottom: i < w.exercises.length - 1 ? `1px solid ${C.border}` : "none",
                      alignItems: "center",
                    }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ color: C.textPrimary, fontSize: 12, fontWeight: 600 }}>{ex.name}</div>
                        {ex.note && <div style={{ color: C.textMuted, fontSize: 10, marginTop: 1 }}>{ex.note}</div>}
                      </div>
                      <div style={{ color: C.accent, fontWeight: 700, fontSize: 13, textAlign: "center" }}>{ex.sets}</div>
                      <div style={{ color: C.textSecondary, fontSize: 11, textAlign: "center" }}>{ex.reps}</div>
                      <div style={{ color: C.textMuted, fontSize: 10, textAlign: "center" }}>{ex.rest}</div>
                    </div>
                  )
                ))}
                {w.notes.length > 0 && (
                  <div style={{ padding: "11px 14px", background: C.surface, borderTop: `1px solid ${C.border}` }}>
                    {w.notes.map((n, i) => (
                      <div key={i} style={{ color: C.textSecondary, fontSize: 11, marginBottom: i < w.notes.length - 1 ? 6 : 0, display: "flex", gap: 7 }}>
                        <span style={{ color: w.color }}>›</span><span>{n}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Today's Meals */}
              <div style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>🍽️ Today's Meals</div>
              <div style={{ marginBottom: 22 }}>
                {!isSun && bfast && bfast.map((meal, idx) => (
                  <MealBlock key={idx} id={`today-bfast-${idx}`} label={meal.time} data={meal} />
                ))}
                {isSun && (
                  <MealBlock id="today-lunch" label="Lunch" data={DINNERS.dinner_sun_lunch} />
                )}
                {snack && !isSun && (
                  <MealBlock id="today-snack" label="Snack ~5 PM" data={snack} />
                )}
                {dinner && (
                  <MealBlock id="today-dinner" label={isSun ? "Dinner" : "Dinner ~9:00–10:00 PM"} data={dinner} />
                )}
              </div>

              {/* Tonight's Prep */}
              <div style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>🌙 Prep Tonight (For Tomorrow)</div>
              {tonightPrep && (
                <div style={{ marginBottom: 10 }}>
              <div className="responsive-card" style={{
                    background: C.accentBg, border: `1px solid ${C.accent}33`,
                    borderRadius: 12, padding: "11px 14px", marginBottom: 12,
                  }}>
                    <div style={{ color: C.accent, fontWeight: 700, fontSize: 13 }}>{tonightPrep.title}</div>
                  </div>
                  {tonightPrep.tasks.map((task, i) => (
                    <div key={i} style={{
                      background: C.card, border: `1px solid ${C.border}`,
                      borderRadius: 12, padding: "12px 16px", marginBottom: 9,
                      display: "flex", gap: 12, alignItems: "flex-start",
                    }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 8, background: C.accent + "18",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 16, flexShrink: 0,
                      }}>{task.icon}</div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ color: C.textPrimary, fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{task.task}</div>
                        <div style={{ color: C.textSecondary, fontSize: 12, lineHeight: 1.6 }}>{task.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })()}

        {tab === "overview" && (
          <div>
            <div style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Targets</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 22 }}>
              <StatBox label="Current" value="85" unit="kg" />
              <StatBox label="Goal" value="77" unit="kg" color={C.cyan} />
              <StatBox label="Daily Cals" value="1750" unit="kcal" color={C.amber} />
              <StatBox label="Protein" value="150" unit="g/day" color={C.purple} />
              <StatBox label="Timeline" value="10–12" unit="weeks" color={C.orange} />
            </div>

            <div className="responsive-card" style={{
              background: C.accentBg, border: `1px solid ${C.accent}33`,
              borderRadius: 12, padding: "13px 16px", marginBottom: 22, fontSize: 12, lineHeight: 1.85,
            }}>
              <div style={{ color: C.accent, fontWeight: 700, marginBottom: 5 }}>📐 How the numbers work</div>
              <div style={{ color: C.textSecondary }}>
                <b style={{ color: C.textPrimary }}>TDEE:</b> ~2,250 kcal/day &nbsp;·&nbsp; <b style={{ color: C.textPrimary }}>Target:</b> 1,750 kcal = ~500 deficit<br />
                <b style={{ color: C.textPrimary }}>Saturday (cycling):</b> ~1,900 kcal — eat more &nbsp;·&nbsp; <b style={{ color: C.textPrimary }}>Sunday (rest):</b> ~1,600 kcal<br />
                <b style={{ color: C.textPrimary }}>Expected loss:</b> 0.4–0.6 kg/week sustainably
              </div>
            </div>

            <div style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Weekly Schedule</div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 22 }}>
              {WEEK.map((w, i) => (
                <div key={w.day} className="schedule-row" style={{
                  display: "grid", gridTemplateColumns: "40px auto 1fr auto",
                  padding: "10px 12px", alignItems: "center", gap: 8,
                  borderBottom: i < WEEK.length - 1 ? `1px solid ${C.border}` : "none",
                  background: w.isVeg ? "#0a1f0e" : w.short === "Sun" ? "#0a1010" : "transparent",
                }}>
                  <div style={{ color: C.accent, fontWeight: 800, fontSize: 12 }}>{w.short}</div>
                  <div style={{ fontSize: 16 }}>{w.emoji}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ color: C.textPrimary, fontSize: 12, fontWeight: 600 }}>{w.type}</div>
                    <div style={{ color: C.textMuted, fontSize: 10, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{w.activities.join(" · ")}</div>
                  </div>
                  {w.isVeg && <span className="schedule-pill"><Pill color={C.teal}>Veg</Pill></span>}
                </div>
              ))}
            </div>

            <div className="responsive-card" style={{
              background: C.cyan + "0e", border: `1px solid ${C.cyan}33`,
              borderRadius: 12, padding: "13px 16px", marginBottom: 22,
            }}>
              <div style={{ color: C.cyan, fontWeight: 700, marginBottom: 8, fontSize: 13 }}>🏊 Swimming — 2×/week Policy</div>
              {[
                ["Thursday", "Mandatory. Every week. No exceptions."],
                ["Saturday", "Optional. Swim if legs aren't wrecked from cycling."],
                ["Sunday", "Swim ONLY if you skipped Saturday. Never both Sat + Sun."],
              ].map(([d, r]) => (
                <div key={d} style={{ display: "flex", gap: 10, marginBottom: 7, alignItems: "flex-start", flexWrap: "wrap" }}>
                  <span style={{ color: C.cyan, fontWeight: 700, fontSize: 11, minWidth: 72 }}>{d}</span>
                  <span style={{ color: C.textSecondary, fontSize: 12 }}>{r}</span>
                </div>
              ))}
            </div>

            <div style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Fruit Schedule (Freshness Order)</div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
              {FRUIT_PLAN.map((f, i) => (
                <div key={f.day} className="fruit-row" style={{
                  display: "grid", gridTemplateColumns: "40px 1fr 1fr",
                  padding: "9px 12px", gap: 8,
                  borderBottom: i < FRUIT_PLAN.length - 1 ? `1px solid ${C.border}` : "none",
                  alignItems: "center",
                }}>
                  <div style={{ color: C.accent, fontWeight: 800, fontSize: 12 }}>{f.day}</div>
                  <div style={{ color: C.textPrimary, fontSize: 12 }}>{f.fruit}</div>
                  <div className="fruit-reason" style={{ color: C.textMuted, fontSize: 10 }}>{f.reason}</div>
                </div>
              ))}
            </div>
            <div className="responsive-card" style={{
              background: C.amber + "0e", border: `1px solid ${C.amber}33`,
              borderRadius: 10, padding: "10px 14px", marginBottom: 22, fontSize: 12, color: C.textSecondary,
            }}>
              🛒 <b style={{ color: C.amber }}>Shopping tip:</b> Buy bananas, papaya, mango fresh each Sunday — they spoil fast. Apples, oranges, guavas last all week in the fridge.
            </div>

            <div style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Non-Negotiables</div>
            {[
              [C.cyan, "💧", "Water", "3–4 litres daily. One full glass before every meal."],
              [C.purple, "😴", "Sleep", "1–2 AM bedtime. Protect 7 hrs. Sleep = muscle repair + fat regulation."],
              [C.accent, "📈", "Progressive Overload", "Add 2.5kg or 1 rep every 1–2 weeks. Log every session."],
              [C.amber, "🍱", "Meal Prep", "Sunday = marinate chicken, boil eggs, prep veggies. 90 min saves the week."],
              [C.orange, "📸", "Track Progress", "Weekly photo, same lighting, same time. Scale lies. Photos don't."],
            ].map(([color, icon, title, desc]) => (
              <div key={title} className="responsive-card" style={{
                display: "flex", gap: 12, padding: "11px 14px", marginBottom: 7,
                background: C.card, border: `1px solid ${C.border}`, borderRadius: 11, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 8, background: color + "18",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, flexShrink: 0,
                }}>{icon}</div>
                <div>
                  <div style={{ color: C.textPrimary, fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{title}</div>
                  <div style={{ color: C.textSecondary, fontSize: 11, lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "workout" && (
          <div>
            <div style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>PPL Split · 5 Gym Days + Cardio</div>
            <div style={{ color: C.textPrimary, fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Weekly Workout Plan</div>
            <div style={{
              color: C.textSecondary, fontSize: 11, marginBottom: 18, lineHeight: 1.6,
              background: C.surface, borderRadius: 10, padding: "9px 13px", border: `1px solid ${C.border}`,
            }}>Tap any day to expand exercises, sets, reps, rest times and coaching notes.</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {WEEK.map((w) => {
                const isOpen = openDay === w.day;
                return (
                  <div key={w.day} className="responsive-card" style={{
                    background: C.card,
                    border: `1px solid ${isOpen ? w.color + "66" : C.border}`,
                    borderRadius: 13, overflow: "hidden", transition: "border-color 0.2s",
                  }}>
                    <div className="meal-card-toggle" onClick={() => toggle(w.day, openDay, setOpenDay)} style={{
                      padding: "13px 16px", display: "flex", alignItems: "center", gap: 11, cursor: "pointer",
                      background: isOpen ? w.color + "0d" : w.isVeg ? "#0a1f0e" : "transparent",
                    }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 9, background: w.color + "1e",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0,
                      }}>{w.emoji}</div>
                      <div className="min-zero" style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 3 }}>
                          <span style={{ color: C.textPrimary, fontWeight: 800, fontSize: 14 }}>{w.day}</span>
                          <Pill color={w.color}>{w.type}</Pill>
                          {w.isVeg && <Pill color={C.teal}>🌿 Veg Day</Pill>}
                        </div>
                        <div style={{ color: C.textMuted, fontSize: 10 }}>⏰ {w.timing}</div>
                      </div>
                      <div style={{ color: C.textMuted, fontSize: 14, flexShrink: 0 }}>{isOpen ? "▲" : "▼"}</div>
                    </div>

                    {isOpen && (
                      <div style={{ borderTop: `1px solid ${C.border}` }}>
                        {w.exercises.length > 0 && (
                          <>
                            <div className="ex-grid ex-head" style={{
                              display: "grid", gridTemplateColumns: "1fr 40px 70px 56px",
                              padding: "6px 13px", background: C.surface, gap: 4,
                            }}>
                              {["Exercise", "Sets", "Reps", "Rest"].map((h, i) => (
                                <div key={h} style={{
                                  color: C.textMuted, fontSize: 8, fontWeight: 700,
                                  textTransform: "uppercase", letterSpacing: 1,
                                  textAlign: i > 0 ? "center" : "left",
                                }}>{h}</div>
                              ))}
                            </div>
                            {w.exercises.map((ex, i) => (
                              ex.name.startsWith("──") ? (
                                <div key={i} style={{
                                  padding: "5px 13px", background: C.bg,
                                  color: C.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
                                }}>{ex.name}</div>
                              ) : (
                                <div key={i} className="ex-grid" style={{
                                  display: "grid", gridTemplateColumns: "1fr 40px 70px 56px",
                                  padding: "9px 13px", gap: 4, borderBottom: `1px solid ${C.border}`, alignItems: "center",
                                }}>
                                  <div style={{ minWidth: 0 }}>
                                    <div style={{ color: C.textPrimary, fontSize: 12, fontWeight: 600 }}>{ex.name}</div>
                                    {ex.note && <div style={{ color: C.textMuted, fontSize: 10, marginTop: 1 }}>{ex.note}</div>}
                                  </div>
                                  <div style={{ color: C.accent, fontWeight: 700, fontSize: 13, textAlign: "center" }}>{ex.sets}</div>
                                  <div style={{ color: C.textSecondary, fontSize: 11, textAlign: "center" }}>{ex.reps}</div>
                                  <div style={{ color: C.textMuted, fontSize: 10, textAlign: "center" }}>{ex.rest}</div>
                                </div>
                              )
                            ))}
                          </>
                        )}
                        {w.notes.length > 0 && (
                          <div style={{ padding: "11px 14px", background: C.surface, borderTop: `1px solid ${C.border}` }}>
                            {w.notes.map((n, i) => (
                              <div key={i} style={{ color: C.textSecondary, fontSize: 11, marginBottom: i < w.notes.length - 1 ? 6 : 0, display: "flex", gap: 7 }}>
                                <span style={{ color: w.color }}>›</span><span>{n}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="responsive-card" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 13, padding: "16px", marginTop: 18 }}>
              <div style={{ color: C.cyan, fontWeight: 700, marginBottom: 12, fontSize: 13 }}>🏊 Swimming Progression (Beginner → Competent)</div>
              {[
                ["Wk 1–2", C.cyan, "8–10 laps/session · Long rests OK · Focus: breathing, floating, comfort"],
                ["Wk 3–4", C.blue, "12–14 laps · Reduce rest · Kickboard drills · Freestyle breathing"],
                ["Wk 5–6", C.purple, "16 laps · 200m non-stop target · Start timing yourself"],
                ["Wk 7–8", C.accent, "20 laps · Mix strokes · Now burning 400+ kcal a session"],
              ].map(([wk, color, desc]) => (
                <div key={wk} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start", flexWrap: "wrap" }}>
                  <Pill color={color}>{wk}</Pill>
                  <div style={{ color: C.textSecondary, fontSize: 11, paddingTop: 2 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "nutrition" && (
          <div>
            <div style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Daily Plan</div>
            <div style={{ color: C.textPrimary, fontSize: 20, fontWeight: 800, marginBottom: 14 }}>Nutrition Blueprint</div>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
              <StatBox label="Calories" value="1750" unit="kcal" />
              <StatBox label="Protein" value="150" unit="g" color={C.cyan} />
              <StatBox label="Carbs" value="~175" unit="g" color={C.amber} />
              <StatBox label="Fat" value="~48" unit="g" color={C.orange} />
            </div>

            <div style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Full Week — Meals by Day</div>

            {WEEK.map((w) => {
              const bfast = w.breakfast ? BREAKFASTS[w.breakfast] : null;
              const snack = w.snack ? SNACKS[w.snack] : null;
              const dinner = w.dinner ? DINNERS[w.dinner] : null;
              const isSun = w.day === "Sunday";
              const secId = `day-${w.day}`;
              const isOpen = openSection === secId;

              return (
                <div key={w.day} className="responsive-card" style={{
                  background: C.card,
                  border: `1px solid ${isOpen ? w.color + "55" : C.border}`,
                  borderRadius: 13, overflow: "hidden", marginBottom: 10,
                }}>
                  <div className="meal-card-toggle" onClick={() => toggle(secId, openSection, setOpenSection)} style={{
                    padding: "13px 16px", display: "flex", alignItems: "center",
                    gap: 11, cursor: "pointer",
                    background: isOpen ? w.color + "0a" : w.isVeg ? "#0a1f0e" : "transparent",
                  }}>
                    <span style={{ fontSize: 18 }}>{w.emoji}</span>
                    <div className="min-zero" style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap", marginBottom: 2 }}>
                        <span style={{ color: C.textPrimary, fontWeight: 800, fontSize: 14 }}>{w.day}</span>
                        <Pill color={w.color}>{w.type}</Pill>
                        {w.isVeg && <Pill color={C.teal}>🌿 Veg</Pill>}
                      </div>
                      <div style={{ color: C.textMuted, fontSize: 10 }}>
                        {isSun ? "Lunch + Dinner only (no breakfast)" : "Post-Gym Lunch · Snack · Dinner"}
                      </div>
                    </div>
                    <div style={{ color: C.textMuted, fontSize: 14, flexShrink: 0 }}>{isOpen ? "▲" : "▼"}</div>
                  </div>

                  {isOpen && (
                    <div style={{ borderTop: `1px solid ${C.border}`, padding: "14px" }}>
                      {!isSun && bfast && bfast.map((meal, idx) => (
                        <MealBlock key={idx} id={`${w.day}-bfast-${idx}`} label={meal.time} data={meal} />
                      ))}
                      {isSun && (
                        <MealBlock id={`${w.day}-lunch`} label="Lunch" data={DINNERS.dinner_sun_lunch} />
                      )}
                      {snack && !isSun && (
                        <MealBlock id={`${w.day}-snack`} label="Snack ~5 PM" data={snack} />
                      )}
                      {dinner && (
                        <MealBlock id={`${w.day}-dinner`} label={isSun ? "Dinner" : "Dinner ~9:00–10:00 PM"} data={dinner} />
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <Divider />

            <div className="responsive-card" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 13, padding: "16px", marginBottom: 18 }}>
              <div style={{ color: C.accent, fontWeight: 700, marginBottom: 12, fontSize: 13 }}>🛒 Weekly Grocery List</div>
              {[
                ["Chicken breast", "700–800g", "~₹350–400"],
                ["Chicken leg/thigh (Sunday)", "300g", "~₹80"],
                ["Eggs", "20–22", "~₹170"],
                ["Rolled oats", "600g", "~₹80"],
                ["Soya chunks", "250g dry", "~₹30"],
                ["Chia seeds", "100g", "~₹60"],
                ["Mix seeds", "100g", "~₹70"],
                ["Rice", "500g dry", "~₹40"],
                ["Moong (for sprouts)", "200g", "~₹25"],
                ["Banana, Papaya, Mango (use early)", "4–5 total", "~₹70"],
                ["Apples, Guava, Orange (use late)", "4–5 total", "~₹80"],
                ["Vegetables (mixed seasonal)", "600g+", "~₹70"],
                ["Coffee", "Your usual", "—"],
                ["Whey protein", "7 scoops/week", "Your existing supply"],
                ["Creatine", "35g/week (5g/day)", "Your existing supply"],
              ].map(([item, qty, cost]) => (
                <div key={item} className="grocery-row" style={{
                  display: "grid", gridTemplateColumns: "1fr minmax(60px, 90px) minmax(50px, 70px)",
                  padding: "8px 0", borderBottom: `1px solid ${C.border}`, fontSize: 12, gap: 4,
                }}>
                  <span style={{ color: C.textPrimary }}>{item}</span>
                  <span style={{ color: C.textSecondary, fontSize: 11 }}>{qty}</span>
                  <span style={{ color: C.textMuted, textAlign: "right", fontSize: 11 }}>{cost}</span>
                </div>
              ))}
              <div style={{ color: C.textMuted, fontSize: 10, marginTop: 10 }}>
                Estimated weekly: <span style={{ color: C.accent, fontWeight: 700 }}>₹950–1,100</span>
              </div>
            </div>

            <div className="responsive-card" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 13, padding: "16px" }}>
              <div style={{ color: C.accent, fontWeight: 700, marginBottom: 12, fontSize: 13 }}>📅 At-a-Glance Meal Pairing</div>
              {[
                ["Mon", false, "Oats + eggs", "Air Fryer Chicken + Rice"],
                ["Tue", false, "Oats + eggs", "Egg Fried Rice"],
                ["Wed", false, "Oats + eggs", "Soya Masala Curry + Rice"],
                ["Thu", false, "Oats + eggs", "Air Fryer Chicken Strips"],
                ["Fri", false, "Oats + eggs", "Masala Omelette + Oat Pancake"],
                ["Sat", true, "Oats + sprouts (veg)", "Full Veg Soya Curry + Rice"],
                ["Sun", false, "—", "Chicken Curry (lunch) + Air Fryer Chicken (dinner)"],
              ].map(([day, isVeg, bfast, din]) => (
                <div key={day} className="pairing-row" style={{
                  display: "grid", gridTemplateColumns: "32px 24px 1fr 1fr",
                  padding: "8px 0", borderBottom: `1px solid ${C.border}`, fontSize: 11, gap: 6, alignItems: "center",
                }}>
                  <span style={{ color: C.accent, fontWeight: 800 }}>{day}</span>
                  <span>{isVeg ? "🌿" : "🍗"}</span>
                  <span style={{ color: C.textMuted }}>{bfast}</span>
                  <span className="pairing-dinner" style={{ color: C.textSecondary }}>{din}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "nightprep" && (
          <div>
            <div style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Every Night</div>
            <div style={{ color: C.textPrimary, fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Prep for Tomorrow</div>
            <div style={{ color: C.textSecondary, fontSize: 12, marginBottom: 18, lineHeight: 1.6 }}>
              Do these tasks every night before sleeping — 10–15 minutes of prep makes mornings smooth and stress-free.
            </div>

            <div style={{
              display: "flex", gap: 5, marginBottom: 20,
              overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 4,
            }}>
              {Object.keys(NIGHT_PREP).map(d => (
                <button key={d} onClick={() => setPrepDay(d)} style={{
                  flexShrink: 0, padding: "8px 14px", borderRadius: 10, border: `1px solid ${prepDay === d ? C.accent : C.border}`,
                  background: prepDay === d ? C.accent : C.card,
                  color: prepDay === d ? "#071008" : C.textSecondary,
                  fontWeight: prepDay === d ? 800 : 500,
                  fontSize: 13, cursor: "pointer",
                }}>{d}</button>
              ))}
            </div>

            {NIGHT_PREP[prepDay] && (
              <div>
                <div style={{
                  background: C.accentBg, border: `1px solid ${C.accent}33`,
                  borderRadius: 12, padding: "11px 14px", marginBottom: 16,
                }}>
                  <div style={{ color: C.accent, fontWeight: 700, fontSize: 13 }}>🌙 {NIGHT_PREP[prepDay].title}</div>
                </div>
                {NIGHT_PREP[prepDay].tasks.map((task, i) => (
                  <div key={i} style={{
                    background: C.card, border: `1px solid ${C.border}`,
                    borderRadius: 12, padding: "13px 16px", marginBottom: 10,
                    display: "flex", gap: 13, alignItems: "flex-start",
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 9,
                      background: C.accent + "18",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, flexShrink: 0,
                    }}>{task.icon}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color: C.textPrimary, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{task.task}</div>
                      <div style={{ color: C.textSecondary, fontSize: 12, lineHeight: 1.6 }}>{task.detail}</div>
                    </div>
                  </div>
                ))}

                <div style={{
                  background: C.surface, border: `1px solid ${C.border}`,
                  borderRadius: 11, padding: "11px 14px", marginTop: 6,
                }}>
                  <div style={{ color: C.textMuted, fontSize: 11 }}>
                    {prepDay === "Sun" && "📅 Tomorrow is Monday — gym Push day. You need energy. Prep everything tonight."}
                    {prepDay === "Mon" && "📅 Tomorrow is Tuesday — heaviest pull day (deadlifts). Sleep early if possible."}
                    {prepDay === "Tue" && "📅 Tomorrow is Wednesday — leg day. Save the cold rice from tonight's dinner."}
                    {prepDay === "Wed" && "📅 Tomorrow is Thursday — mandatory swim + gym. Your biggest prep day. Pack the bag tonight."}
                    {prepDay === "Thu" && "📅 Tomorrow is Friday — gym Pull. Easier day. Blend the oats tonight for Friday's pancake."}
                    {prepDay === "Fri" && "📅 Tomorrow is Saturday — cycling + possible swim, all-veg day. Early start, everything must be ready."}
                    {prepDay === "Sat" && "📅 Tomorrow is Sunday — rest, shopping, and cooking day. Marinate chicken tonight for incredible flavour."}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{
          textAlign: "center", marginTop: 36, paddingTop: 18,
          borderTop: `1px solid ${C.border}`, color: C.textMuted, fontSize: 10,
        }}>
          Review every 4 weeks · Adjust as weight drops · Built for 85kg → 77kg
        </div>
      </div>
    </div>
  );
}
