export type GuideLink = {
  label: string;
  description: string;
  href: string;
};

export type GuideGroup = {
  title: string;
  marker: string;
  items: GuideLink[];
};

export type UpdateItem = {
  date: string;
  title: string;
  tag: string;
  description: string;
  href: string;
};

export type MediaItem = {
  type: string;
  date: string;
  title: string;
  description: string;
  href: string;
};

export const homeContent = {
  header: {
    brandName: "Field Archive",
    navItems: [
    ["Guides", "#field-index"],
    ["Tools", "#quick-hub"],
    ["Updates", "#updates"],
    ["Media", "#media"],
    ["Shells", "/guides/mortal-shell-ii-new-shells"],
    ["Weapons", "/guides/mortal-shell-ii-guide#weapons"],
    ["Tarstones", "/guides/mortal-shell-ii-tarstone-locations"],
  ],
    releaseLabel: "Advanced Access Live",
    releaseDateLabel: "Releases Aug 20, 2026",
    releaseHref: "/guides/mortal-shell-ii-release-date",
    primaryNavLabel: "Primary navigation",
    mobileNavLabel: "Mobile navigation",
    mobileSummaryLabel: "Open navigation",
    playGameLabel: "Play the game",
    brandAriaLabel: "Mortal Shell II Field Archive home",
  },
  hero: {
    eyebrow: "Independent Field Archive",
    title: "Mortal Shell II",
    description:
      "Possess fallen warriors and master their distinct combat styles across a compact, interconnected open world. Break enemy posture, wield brutal sidearms, and dethrone false gods without a stamina bar holding you back.",
    stats: [
      "Releases Aug 20, 2026",
      "Advanced Access Live",
      "8 Playable Shells",
      "3 Launch Platforms",
      "92% Positive Beta Reviews",
    ],
    primaryCta: { label: "Begin the Guide", href: "/guides/mortal-shell-ii-guide" },
    secondaryCta: { label: "Compare Shells", href: "/guides/mortal-shell-ii-new-shells" },
    tertiaryCta: {
      label: "Find Tarstones",
      href: "/guides/mortal-shell-ii-tarstone-locations",
    },
    trailerUrl: "https://www.youtube.com/watch?v=qHLY7zFhRvg",
    trailerTopline: "Official Media · 2026",
    trailerSmall: "Release Date Trailer",
    trailerStrong: "Witness the ravaged world",
    trailerAriaLabel: "Watch official release date trailer",
    trailerImageAlt: "Mortal Shell II official release date trailer",
    mediaIndex: "01 / FIELD RECORD",
    statsAriaLabel: "Game facts",
  },
  start: {
    eyebrow: "Start Here",
    title: "Choose your path through the ravaged world.",
    intro: "Four records for your first hours as the Harbinger.",
    openLabel: "Open",
    cards: [
      {
        number: "01",
        title: "Beginner Guide",
        description:
          "Learn hardening, healing, exploration, early upgrades, and the combat fundamentals needed to survive your opening hours.",
        href: "/guides/mortal-shell-ii-guide",
        tag: "First steps",
      },
      {
        number: "02",
        title: "Shells & Builds",
        description:
          "Compare all playable Shells, understand their strengths, and choose upgrades that fit your combat style.",
        href: "/guides/mortal-shell-ii-new-shells",
        tag: "Possession",
      },
      {
        number: "03",
        title: "Weapons & Upgrades",
        description:
          "Find weapons and sidearms, understand upgrade paths, and assemble loadouts for difficult encounters.",
        href: "/guides/mortal-shell-ii-guide#weapons",
        tag: "Arsenal",
      },
      {
        number: "04",
        title: "Bosses & Exploration",
        description:
          "Prepare for major bosses, locate Tarstones, uncover hidden routes, and travel efficiently.",
        href: "/guides/mortal-shell-ii-tarstone-locations",
        tag: "The world",
      },
    ],
  },
  guideGroups: [
    {
      title: "Begin",
      marker: "I",
      items: [
        { label: "Release Date", description: "Launch and access times", href: "/guides/mortal-shell-ii-release-date" },
        { label: "Open Beta", description: "Access, rewards, carry-over", href: "/guides/mortal-shell-ii-open-beta" },
        { label: "Demo", description: "Download and system needs", href: "/guides/mortal-shell-ii-demo" },
        { label: "Guide", description: "Essential survival manual", href: "/guides/mortal-shell-ii-guide" },
      ],
    },
    {
      title: "Master",
      marker: "II",
      items: [
        { label: "Achievement Guide", description: "Missables and completion", href: "/guides/mortal-shell-ii-achievement-guide" },
        { label: "Beta Teleport", description: "Marrow Keep travel", href: "/guides/mortal-shell-ii-beta-teleport" },
        { label: "Beta Fast Travel", description: "Beacon travel explained", href: "/guides/mortal-shell-ii-beta-fast-travel" },
        { label: "Tarstone Locations", description: "Find every combat stone", href: "/guides/mortal-shell-ii-tarstone-locations" },
      ],
    },
    {
      title: "Possess",
      marker: "III",
      items: [
        { label: "Characters", description: "Harbinger, allies, enemies", href: "/guides/mortal-shell-ii-characters" },
        { label: "New Shells", description: "Abilities and playstyles", href: "/guides/mortal-shell-ii-new-shells" },
      ],
    },
    {
      title: "Choose",
      marker: "IV",
      items: [
        { label: "Devout Edition", description: "Advanced Access and skins", href: "/guides/mortal-shell-ii-devout-edition" },
        { label: "Revered Edition", description: "Physical collector contents", href: "/guides/mortal-shell-ii-revered-edition" },
        { label: "PS5", description: "Store, features, performance", href: "/guides/mortal-shell-ii-ps5" },
        { label: "PC", description: "Requirements and settings", href: "/guides/mortal-shell-ii-pc" },
        { label: "Xbox", description: "Series X|S launch details", href: "/guides/mortal-shell-ii-xbox" },
        { label: "PSN", description: "Editions and beta access", href: "/guides/mortal-shell-ii-psn" },
      ],
    },
    {
      title: "Watch & Decide",
      marker: "V",
      items: [
        { label: "Review", description: "Combat, world, performance", href: "/guides/mortal-shell-ii-review" },
        { label: "Metacritic", description: "Current score tracking", href: "/guides/mortal-shell-ii-metacritic" },
        { label: "Trailer", description: "Official videos in order", href: "/guides/mortal-shell-ii-trailer" },
        { label: "Trailer Song", description: "Music credit status", href: "/guides/mortal-shell-ii-trailer-song" },
        { label: "Cheat", description: "Official cheat status", href: "/guides/mortal-shell-ii-cheat" },
      ],
    },
  ] satisfies GuideGroup[],
  guideIndex: {
    eyebrow: "Field Index",
    title: "Everything the world refuses to tell you.",
    description: "Verified records, practical routes, and focused answers. No filler.",
  },
  quickHub: {
    eyebrow: "Tools & Map",
    title: "Use the hub before you start your run.",
    description: "Route planning, weapon filtering, and source checks live beside every major first-hour need.",
    cards: [
      {
        label: "Walkthrough hub",
        description: "Beginner flow, prologue checkpoints, and practical boss prep.",
        href: "/guides/mortal-shell-ii-guide",
      },
      {
        label: "Shell roster",
        description: "Compare abilities, passives, and build roles in one quick pass.",
        href: "/guides/mortal-shell-ii-new-shells",
      },
      {
        label: "Tarstone map",
        description: "Find all known Tarstone routes and nearby beacons.",
        href: "/guides/mortal-shell-ii-tarstone-locations",
      },
      {
        label: "Release status",
        description: "Keep beta carry-over, editions, and platform updates in one place.",
        href: "/guides/mortal-shell-ii-release-date",
      },
    ],
  },
  updates: {
    eyebrow: "Updates",
    title: "Recent patch notes and launch tracking.",
    intro: "What changed, what is live, and what to expect next.",
    filters: {
      all: "All Updates",
      last7: "Last 7 Days",
      last30: "Last 30 Days",
    },
    items: [
      {
        date: "2026-08-20",
        title: "Mortal Shell II launch opens",
        tag: "Release",
        description: "Global launch starts for Steam, PS5, and Xbox Series X|S. New boss and map progression gates are now stable.",
        href: "/guides/mortal-shell-ii-release-date",
      },
      {
        date: "2026-08-15",
        title: "Advanced Access status finalized",
        tag: "Access",
        description: "Advanced Access window closes after review; launch rewards table and carry-over rules are now reflected on the official launch guide.",
        href: "/guides/mortal-shell-ii-open-beta",
      },
      {
        date: "2026-08-10",
        title: "Tarstone route quality pass",
        tag: "Map",
        description: "Main Tarstone routes were verified against beacon positions and hidden side paths used by high-level grinders.",
        href: "/guides/mortal-shell-ii-tarstone-locations",
      },
      {
        date: "2026-08-05",
        title: "Shell comparison and build updates",
        tag: "Build",
        description: "Shell passives and role markers are aligned with latest notes for easier build choices during first run planning.",
        href: "/guides/mortal-shell-ii-new-shells",
      },
    ],
  },
  media: {
    eyebrow: "Media",
    title: "Official and community media to speed up your prep.",
    intro: "Short videos and visual references for your first 10 hours.",
    filters: {
      all: "All",
      last7: "Last 7 Days",
      last30: "Last 30 Days",
    },
    items: [
      {
        type: "Trailer",
        date: "2026-07-02",
        title: "Launch Trailer",
        description: "Full cinematic showing the core combat loop and the dark setting.",
        href: "https://www.youtube.com/watch?v=qHLY7zFhRvg",
      },
      {
        type: "Guide Stream",
        date: "2026-08-03",
        title: "Beginner shell progression run",
        description: "Walkthrough clip from base entry fights to first boss pacing.",
        href: "https://www.youtube.com/watch?v=qHLY7zFhRvg",
      },
      {
        type: "Community",
        date: "2026-08-08",
        title: "Tarstone travel breakdown",
        description: "Community route notes on efficient travel and hidden beacon use.",
        href: "https://www.youtube.com/watch?v=qHLY7zFhRvg",
      },
      {
        type: "Patch Clip",
        date: "2026-08-12",
        title: "Advanced access end-screen notes",
        description: "Key build and survivability notes shown during the latest progress checkpoint.",
        href: "https://www.youtube.com/watch?v=qHLY7zFhRvg",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Quick answers.",
    intro: "When the launch window is busy, jump to the highest-confidence answers first.",
    items: [
      {
        question: "When is Mortal Shell II release date?",
        answer:
          "The worldwide Standard Edition release is August 20, 2026 on Steam, PS5, and Xbox Series X|S.",
      },
      {
        question: "How many playable Shells are in the full game?",
        answer: "The official launch list is 8 playable Shells.",
      },
      {
        question: "Does Open Beta progress carry into launch?",
        answer:
          "Most progression does not fully transfer; only a small set of launch rewards and skip conditions may carry forward.",
      },
      {
        question: "Can I confirm beta rewards in this site?",
        answer:
          "Only when official platform pages and community evidence match. The beta section is marked as time-sensitive.",
      },
    ],
  },
  about: {
    title: "What is Mortal Shell II?",
    eyebrow: "Know the enemy",
    ctaLabel: "Explore all guides",
    watermark: "Their flesh is your weapon",
    paragraphs: [
      "Mortal Shell II is a standalone dark-fantasy action RPG developed by Cold Symmetry. Possess distinct warrior Shells and explore a dense, interconnected world filled with hostile creatures, hidden structures, and false gods.",
      "Combat removes the traditional stamina restriction and emphasizes posture breaks, critical strikes, sidearms, and extensive weapon upgrades. Every Shell supports a different approach to surviving the ruins.",
    ],
    stats: [
      { label: "Developer", value: "Cold Symmetry" },
      { label: "Publisher", value: "Playstack" },
      { label: "Platforms", value: "Steam, PS5, Xbox Series X|S" },
      { label: "Genre", value: "Dark Fantasy Action RPG" },
      { label: "Release Date", value: "August 20, 2026" },
      { label: "Playable Shells", value: "8" },
      { label: "World", value: "Interconnected Open World" },
    ],
  },
  finalCta: {
    eyebrow: "Arise, Harbinger",
    title: "Their flesh is your weapon.",
    description:
      "From your first possession to hidden Tarstones and endgame encounters, the field archive is ready when you are.",
    primary: { label: "Read the Beginner Guide", href: "/guides/mortal-shell-ii-guide" },
    secondary: { label: "Play Mortal Shell II", href: "https://mortalshell.com/" },
  },
  footer: {
    brandName: "Field Archive",
    about:
      "Mortal Shell II Wiki is an independent fan-made guide hub covering Shells, weapons, bosses, achievements, exploration, and progression. It is not affiliated with Cold Symmetry or Playstack.",
    officialTitle: "Official",
    officialLinksLabel: "Official links",
    archiveTitle: "Archive",
    archiveLinksLabel: "Archive links",
    allGuidesLabel: "All Guides",
    privacyPolicyLabel: "Privacy Policy",
    termsOfServiceLabel: "Terms of Service",
    copyright: "© 2026 Mortal Shell II Field Archive",
    rights: "Game names and assets belong to their respective owners.",
    official: [
      { label: "Official Website", href: "https://mortalshell.com/" },
      { label: "Discord", href: "https://discord.com/invite/mortalshell" },
      { label: "Official Trailer", href: "https://www.youtube.com/watch?v=qHLY7zFhRvg" },
      { label: "Steam", href: "https://store.steampowered.com/app/2584270/Mortal_Shell_II/" },
    ],
  },
} as const;
