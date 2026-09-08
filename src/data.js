// All content for the prototype lives here so copy can be tuned without touching components.

export const asset = (file) => `${import.meta.env.BASE_URL}img/${file}`

export const categories = [
  { id: 'all', label: 'All', icon: 'icon-all.png', selected: true },
  { id: 'homes', label: 'Homes', icon: 'icon-homes.png' },
  { id: 'experiences', label: 'Experiences', icon: 'icon-experiences.png' },
  { id: 'ai', label: 'AI', icon: 'ai-icon.png', action: 'ask' },
  { id: 'services', label: 'Services', icon: 'icon-services.png' },
]

export const trip = {
  title: ['View details of your ', 'Como trip'],
  dates: '9-11 Sept - 2 guests',
  actions: [
    { id: 'car', label: 'Rent a car for that trip' },
    { id: 'checkin', label: 'Ask host about early check-in' },
  ],
}

// Agent task states: running → attention → done | closed
export const initialTasks = [
  {
    id: 'checkin',
    title: 'Asked Mark about early check-in',
    desc: 'Sent Tuesday · Mark usually replies within 2 hours',
    state: 'attention',
  },
  {
    id: 'transfer',
    title: 'Book an airport transfer',
    desc: '2 options that fit your 11:20 plane landing. Available from €38',
    state: 'running',
  },
]

export const stateLabel = {
  running: 'Running',
  attention: 'Needs your attention',
  done: 'Done',
}

export const popularExperiences = [
  { title: 'Jasi Comi Lake Boat Tours', kind: 'Individual tour', price: 'From €34 / guest', rating: '4.89', badge: 'Guest favorite', img: 'exp-boat-1.jpg' },
  { title: 'Lake Como Private Cruise', kind: 'Private tour', price: 'From €14 / guest', rating: '4.89', badge: 'Recommended', img: 'exp-boat-2.jpg' },
  { title: 'Sunset Sailing Como', kind: 'Group tour', price: 'From €51 / guest', rating: '4.89', badge: 'Guest favorite', img: 'exp-boat-3.jpg' },
]

export const exploreCategories = [
  { title: 'Water sports', img: 'cat-water.jpg' },
  { title: 'Outdoors', img: 'cat-outdoors.jpg' },
  { title: 'Cooking', img: 'cat-cooking.jpg' },
  { title: 'Cultural tours', img: 'cat-cultural.jpg' },
]

export const popularHomes = [
  { title: 'Protolongo', meta: '4 beds', rating: '4.89', img: 'home-protolongo.jpg' },
  { title: 'Tignale', meta: '4 beds', rating: '4.89', img: 'home-tignale.jpg' },
  { title: 'Brenzone Garda', meta: '3 beds', rating: '4.89', img: 'home-brenzone-1.jpg' },
  { title: 'Brenzone Garda', meta: '3 beds', rating: '4.89', img: 'home-brenzone-2.jpg' },
]

export const askSuggestions = [
  'Iceland trip next May',
  'Weekend on Lake Como for 2',
  'Somewhere warm in November, under €1,000',
]

// Canned "AI" answers. The matcher picks a set from the request text.
const iceland = {
  brief: 'Iceland, May 2027, 1 week, 2 Adults',
  results: [
    { title: 'Treehouse in Hella', lines: ['May 10 - 16 · 2 Adults ·', 'wine tasting + horse ride'], price: '€1,240 total', img: 'iceland-treehouse.jpg' },
    { title: 'Cabin in Akranes', lines: ['May 10 - 16 · 2 Adults ·', 'sauna therapy + horse ride'], price: '€1,380 total', img: 'iceland-cabin.jpg' },
  ],
  refine: ['Something cheaper', 'With beautiful view', 'With saunas'],
  refined: {
    'Something cheaper': {
      note: 'Moved to May 12 – 18: same places, €180–260 less.',
      results: [
        { title: 'Treehouse in Hella', lines: ['May 12 - 18 · 2 Adults ·', 'wine tasting + horse ride'], price: '€1,060 total', img: 'iceland-treehouse.jpg' },
        { title: 'Cabin in Akranes', lines: ['May 12 - 18 · 2 Adults ·', 'sauna therapy + horse ride'], price: '€1,120 total', img: 'iceland-cabin.jpg' },
      ],
    },
    'With beautiful view': {
      note: 'Kept only stays with a glacier or fjord view.',
      results: [
        { title: 'Cabin in Akranes', lines: ['May 10 - 16 · 2 Adults ·', 'fjord view · sauna + horse ride'], price: '€1,380 total', img: 'iceland-cabin.jpg' },
        { title: 'Treehouse in Hella', lines: ['May 10 - 16 · 2 Adults ·', 'Hekla view · wine tasting'], price: '€1,240 total', img: 'iceland-treehouse.jpg' },
      ],
    },
    'With saunas': {
      note: 'Both have a private sauna. Added a hot-spring day.',
      results: [
        { title: 'Cabin in Akranes', lines: ['May 10 - 16 · 2 Adults ·', 'private sauna + hot springs'], price: '€1,420 total', img: 'iceland-cabin.jpg' },
        { title: 'Treehouse in Hella', lines: ['May 10 - 16 · 2 Adults ·', 'barrel sauna + horse ride'], price: '€1,290 total', img: 'iceland-treehouse.jpg' },
      ],
    },
  },
}

const como = {
  brief: 'Lake Como, next weekend, 2 nights, 2 Adults',
  results: [
    { title: 'Lake house in Tignale', lines: ['Sat - Mon · 2 Adults ·', 'boat tour + cooking class'], price: '€520 total', img: 'home-tignale.jpg' },
    { title: 'Apartment in Brenzone', lines: ['Sat - Mon · 2 Adults ·', 'sunset sailing'], price: '€410 total', img: 'home-brenzone-1.jpg' },
  ],
  refine: ['Something cheaper', 'Closer to the water', 'With a pool'],
  refined: {
    'Something cheaper': { note: 'Shifted to Fri – Sun: €90 less.', results: [
      { title: 'Apartment in Brenzone', lines: ['Fri - Sun · 2 Adults ·', 'sunset sailing'], price: '€320 total', img: 'home-brenzone-2.jpg' },
      { title: 'Lake house in Tignale', lines: ['Fri - Sun · 2 Adults ·', 'boat tour'], price: '€440 total', img: 'home-tignale.jpg' },
    ] },
    'Closer to the water': { note: 'Both are under 3 minutes from a jetty.', results: [
      { title: 'Lake house in Tignale', lines: ['Sat - Mon · 2 Adults ·', 'private jetty · boat tour'], price: '€560 total', img: 'home-tignale.jpg' },
      { title: 'Apartment in Brenzone', lines: ['Sat - Mon · 2 Adults ·', 'lakefront · sailing'], price: '€430 total', img: 'home-brenzone-1.jpg' },
    ] },
    'With a pool': { note: 'One match with a pool; kept the best lakefront as a backup.', results: [
      { title: 'Villa in Protolongo', lines: ['Sat - Mon · 2 Adults ·', 'pool · boat tour'], price: '€690 total', img: 'home-protolongo.jpg' },
      { title: 'Lake house in Tignale', lines: ['Sat - Mon · 2 Adults ·', 'boat tour'], price: '€520 total', img: 'home-tignale.jpg' },
    ] },
  },
}

const warm = {
  brief: 'Warm in November, 5 nights, 2 Adults, under €1,000',
  results: [
    { title: 'Riad near the medina', lines: ['Nov 6 - 11 · 2 Adults ·', 'cooking class + desert day'], price: '€780 total', img: 'cat-cooking.jpg' },
    { title: 'Beach house, Algarve', lines: ['Nov 6 - 11 · 2 Adults ·', 'surf lesson + boat trip'], price: '€910 total', img: 'cat-water.jpg' },
  ],
  refine: ['Something cheaper', 'Direct flights only', 'Quieter'],
  refined: {
    'Something cheaper': { note: 'Dropped the desert day and moved to mid-week.', results: [
      { title: 'Riad near the medina', lines: ['Nov 8 - 13 · 2 Adults ·', 'cooking class'], price: '€640 total', img: 'cat-cooking.jpg' },
      { title: 'Beach house, Algarve', lines: ['Nov 8 - 13 · 2 Adults ·', 'surf lesson'], price: '€790 total', img: 'cat-water.jpg' },
    ] },
    'Direct flights only': { note: 'Kept places with a direct flight from Wrocław or Kraków.', results: [
      { title: 'Beach house, Algarve', lines: ['Nov 6 - 11 · 2 Adults ·', 'surf lesson + boat trip'], price: '€910 total', img: 'cat-water.jpg' },
      { title: 'Finca in Málaga hills', lines: ['Nov 6 - 11 · 2 Adults ·', 'hiking + tapas tour'], price: '€860 total', img: 'cat-outdoors.jpg' },
    ] },
    'Quieter': { note: 'Swapped city stays for countryside ones.', results: [
      { title: 'Finca in Málaga hills', lines: ['Nov 6 - 11 · 2 Adults ·', 'hiking + tapas tour'], price: '€860 total', img: 'cat-outdoors.jpg' },
      { title: 'Beach house, Algarve', lines: ['Nov 6 - 11 · 2 Adults ·', 'surf lesson'], price: '€880 total', img: 'cat-water.jpg' },
    ] },
  },
}

export function answerFor(query) {
  const q = query.toLowerCase()
  if (/como|garda|italy|lake/.test(q)) return como
  if (/warm|sun|beach|november|winter/.test(q)) return warm
  return iceland
}

// Decision screens for agent tasks that reached "Needs your attention".
export const decisions = {
  checkin: {
    title: 'Asked Mark about early check-in',
    sub: 'Sent on your behalf, Tue 14:05',
    thread: [
      { from: 'you', text: 'Hi Mark! We land in Milan at 11:20 on Sept 9 and could reach the apartment around 13:30. Would an earlier check-in work? Thanks, Marta' },
      { from: 'host', initial: 'M', meta: 'Mark · Tue 15:12', text: 'Hi Marta, 14:00 is possible. There is a €20 early check-in fee because the cleaner comes earlier. Let me know!' },
      { from: 'agent', text: 'Mark can do 14:00 for a €20 fee. You land at 11:20, so 14:00 leaves time for the train from Milan. Accept?' },
    ],
    primary: 'Accept for €20',
    accept: { toast: 'Confirmed with Mark · check-in at 14:00', task: { state: 'done', title: 'Early check-in confirmed', desc: 'Mark confirmed 14:00 · €20 added to your trip' } },
    alt: { label: 'Ask for 15:00 instead', toast: 'Sent to Mark', task: { state: 'running', desc: 'Asked Mark about 15:00 · usually replies within 2 hours' } },
    decline: { label: 'Decline', toast: 'Declined · Mark was told you will arrive at 15:00' },
    followUp: (text) => `Sure — I'll ask Mark: “${text}”. I'll ping you when he answers.`,
  },
  car: {
    title: 'Rent a car for Sept 9–11',
    sub: 'Compared 3 rentals at Milan Malpensa',
    thread: [
      { from: 'agent', text: 'Cheapest that fits your 11:20 landing: Sixt at Malpensa T1, compact automatic, €41/day, free cancellation until Sept 8. €123 total. Book it?' },
    ],
    primary: 'Book for €123',
    accept: { toast: 'Booked · Sixt at Malpensa T1', task: { state: 'done', title: 'Car rented for Sept 9–11', desc: 'Sixt at Malpensa T1 · €123 total · free cancellation' } },
    alt: { label: 'Show the other options', toast: 'Looking again', task: { state: 'running', desc: 'Checking 2 more rentals near Malpensa · a few minutes' } },
    decline: { label: 'Decline', toast: 'Declined · nothing booked' },
    followUp: (text) => `Got it: “${text}”. I'll re-check the options with that in mind.`,
  },
}

export const newCarTask = {
  id: 'car',
  title: 'Rent a car for Sept 9–11',
  desc: 'Comparing 3 rentals at Milan Malpensa · usually takes a few minutes',
  state: 'running',
}
