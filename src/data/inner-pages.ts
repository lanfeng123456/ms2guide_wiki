import type { Locale } from "@/data/locales";

export type PageStatus = "Verified" | "Beta evidence" | "Update watch";

export type InnerPageSection = {
  title: string;
  intro: string;
  bullets: string[];
};

export type InnerPageSource = {
  label: string;
  href: string;
};

type LocaleAwareInnerPage = Partial<
  Pick<InnerPageRecord, "keyword" | "title" | "description" | "eyebrow" | "quickAnswer" | "updateWatch">
> & {
  sections?: InnerPageSection[];
};

type InnerPageLocaleMap = Partial<Record<Exclude<Locale, "en">, LocaleAwareInnerPage>>;

export type InnerPageRecord = {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  eyebrow: string;
  status: PageStatus;
  checked: string;
  quickAnswer: string;
  sections: InnerPageSection[];
  sources: InnerPageSource[];
  updateWatch: string;
  related: string[];
};

const official = "https://mortalshell.com/";
const steam = "https://store.steampowered.com/app/2584270/Mortal_Shell_II/";
const betaSteam = "https://store.steampowered.com/app/4711740/Mortal_Shell_II/";
const discord = "https://discord.com/invite/mortalshell";
const releaseTrailer = "https://www.youtube.com/watch?v=qHLY7zFhRvg";
const gameplay = "https://www.youtube.com/watch?v=cPSE1yrooT4";
const playstackRelease = "https://www.playstack.com/news/mortal-shell-ii-release-date/";
const localeEyebrows: Record<Locale, string> = {
  en: "Mortal Shell II Field Guide",
  de: "Mortal Shell II Leitfaden",
  fr: "Guide de Mortal Shell II",
  "pt-br": "Guia de Mortal Shell II",
};

function page(input: Omit<InnerPageRecord, "checked" | "eyebrow" | "related">): InnerPageRecord {
  return {
    ...input,
    eyebrow: localeEyebrows.en,
    checked: "Checked Aug 19, 2026",
    related: ["mortal-shell-ii-guide", "mortal-shell-ii-new-shells", "mortal-shell-ii-release-date"],
  };
}

export const innerPages: Record<string, InnerPageRecord> = {
  "mortal-shell-ii-release-date": page({
    slug: "mortal-shell-ii-release-date", keyword: "Mortal Shell II release date", title: "Mortal Shell II Release Date", description: "Mortal Shell II launches worldwide on August 20, 2026. Compare the Standard and Devout editions, Advanced Access timing, platforms, and launch-day questions.", status: "Verified", quickAnswer: "The global digital release date is August 20, 2026. Devout Edition owners receive up to 72 hours of Advanced Access from August 17, 2026; the Standard Edition does not share that early-access date.", updateWatch: "Recheck regional unlock times, preload size, and the day-one patch after platform stores publish their final schedules.", sources: [{ label: "Playstack release announcement", href: playstackRelease }, { label: "Mortal Shell II official website", href: official }, { label: "Release Date Trailer", href: releaseTrailer }], sections: [
      { title: "Release date at a glance", intro: "Use the edition and platform together when planning your launch time.", bullets: ["Worldwide digital release: August 20, 2026.", "Launch platforms: Steam, PlayStation 5, and Xbox Series X|S.", "There is no confirmed PS4, Xbox One, or Nintendo Switch version."] },
      { title: "Advanced Access versus launch day", intro: "Advanced Access is an edition benefit, not an earlier release date for every player.", bullets: ["Devout Edition Advanced Access begins August 17, 2026.", "The benefit can provide up to 72 hours of early play depending on platform and region.", "Keep the August 20 date for Standard Edition owners and general launch coverage."] },
      { title: "Edition and platform checklist", intro: "Before buying, check both the edition contents and the hardware store page.", bullets: ["Standard Edition is the base game.", "Devout Edition adds the Obsidian skin set and Advanced Access.", "Revered Edition is a separate physical PS5 collector release."] },
    ],
  }),
  "mortal-shell-ii-open-beta": page({
    slug: "mortal-shell-ii-open-beta", keyword: "Mortal Shell II open beta", title: "Mortal Shell II Open Beta", description: "Find the Mortal Shell II Open Beta download details, playable content, platforms, rewards, achievements, and what carries into the full game.", status: "Beta evidence", quickAnswer: "The Open Beta covered the prologue through the first open area, roughly the first three hours. It launched on Steam on June 5, 2026 and later reached PS5 and Xbox Series X|S.", updateWatch: "Confirm whether the beta remains downloadable after launch and whether the reward claim path is still open.", sources: [{ label: "Steam Open Beta", href: betaSteam }, { label: "Official website", href: official }, { label: "Official Discord", href: discord }], sections: [
      { title: "What the beta contains", intro: "The beta is a focused slice rather than the complete campaign.", bullets: ["Play through the prologue and first open region for about three hours.", "Explore dungeons, clear Beacons, and challenge a hidden mini-boss.", "Progress toward Magdalena, the Lady of the Woods."] },
      { title: "Rewards and carry-over", intro: "The beta reward and skip benefit are separate from normal progression transfer.", bullets: ["Playing on console for more than 30 minutes can unlock the Flayed Harbinger appearance.", "Progress beyond Marrow Keep can unlock a full-game option to skip the prologue.", "Currencies, weapons, Shells, and collectibles do not fully carry into the release build."] },
      { title: "Beta status", intro: "Treat all beta rules as time-stamped evidence.", bullets: ["Steam listed nine beta achievements and a Very Positive public rating.", "Beta feedback is useful for route and usability notes, not proof of permanent launch restrictions.", "Use the full product page to check platform availability instead of third-party downloads."] },
    ],
  }),
  "mortal-shell-ii-demo": page({
    slug: "mortal-shell-ii-demo", keyword: "Mortal Shell II demo", title: "Mortal Shell II Demo Download", description: "Mortal Shell II uses the official Open Beta name rather than a separate permanent demo. Check the download route, size, duration, platforms, and progress rules.", status: "Beta evidence", quickAnswer: "Search for Mortal Shell II - Open Beta. It is the official playable trial name, covers about three hours, and lists 30 GB of available storage on Steam. Do not treat historical download-size reports as a fixed install size.", updateWatch: "Confirm the post-launch replacement for the Open Beta and whether its reward and skip-prologue claims remain available.", sources: [{ label: "Steam Open Beta page", href: betaSteam }, { label: "Mortal Shell II official website", href: official }, { label: "PS5 product concept", href: "https://store.playstation.com/en-us/concept/10010058/" }], sections: [
      { title: "Is there a Mortal Shell II demo?", intro: "The official naming matters when searching platform stores.", bullets: ["The product is named Mortal Shell II - Open Beta.", "It is not marketed as a permanent standalone Demo product.", "Use the official Steam, PlayStation, or Xbox listing rather than unknown download mirrors."] },
      { title: "Download and trial content", intro: "The playable slice is designed to show the opening systems and first region.", bullets: ["The beta contains the prologue and first open area.", "Expected playtime is about three hours depending on exploration and combat attempts.", "Steam lists 30 GB of available storage; historical download sizes can vary by build."] },
      { title: "Progress and platform support", intro: "The trial provides rewards but not a full save transfer.", bullets: ["Beta rewards and a prologue-skip qualification can carry into the full game.", "Weapons, Shells, currencies, and collectibles do not fully transfer.", "The confirmed launch platforms are PC, PS5, and Xbox Series X|S."] },
    ],
  }),
  "mortal-shell-ii-guide": page({
    slug: "mortal-shell-ii-guide", keyword: "Mortal Shell II guide", title: "Mortal Shell II Beginner Guide", description: "Start Mortal Shell II with a practical beginner guide covering Harden, Guard, Parry, Dodge, Shells, weapons, upgrades, Beacons, Tarstones, and the first three hours.", status: "Beta evidence", quickAnswer: "Mortal Shell II removes the traditional stamina bar. Prioritize learning Harden timing, posture breaks, Resolve use, Shell possession, and a safe route between Beacons and Marrow Keep before chasing optional loot.", updateWatch: "Replace beta route timings, keybinds, upgrade costs, and death-penalty details with formal-release testing.", sources: [{ label: "Official Gameplay Reveal", href: gameplay }, { label: "Steam Open Beta", href: betaSteam }, { label: "Official Discord", href: discord }], sections: [
      { title: "Your first combat loop", intro: "The opening hours reward patience more than repeated light attacks.", bullets: ["Use Harden to absorb a hit, then punish the recovery window.", "Break enemy posture before committing to a long attack string.", "Save Resolve for the weapon or sidearm effect that matches your Shell build."] },
      { title: "Choose a Shell and weapon", intro: "Shell identity is the foundation of your build.", bullets: ["Find a fallen body to possess a Shell and open a new ability path.", "Tiel is an early discovery in the beta and favors dodge and stealth play.", "Pair a reliable primary weapon with a sidearm that does not drain Resolve faster than you can build it."] },
      { title: "Explore without losing the run", intro: "A short route is often better than a greedy one when resources are at risk.", bullets: ["Use Beacons and Marrow Keep as landmarks in the exploration loop.", "Mark optional dungeons and Tarstone routes before committing to a boss attempt.", "Return to upgrade Shell Points or Glimpses when a new ability meaningfully changes your survivability."] },
    ],
  }),
  "mortal-shell-ii-achievement-guide": page({
    slug: "mortal-shell-ii-achievement-guide", keyword: "Mortal Shell II achievement guide", title: "Mortal Shell II Achievement Guide", description: "Track Mortal Shell II achievements, beta-only objectives, missable exploration tasks, Shell and weapon unlocks, and the safest route toward 100% completion.", status: "Beta evidence", quickAnswer: "The Open Beta lists nine achievements. Keep beta achievements separate from the full release list, and watch Beacon, hidden-area, Tar Golem, and collection objectives for easy-to-miss progress.", updateWatch: "Add the formal achievement names, hidden conditions, trophy grades, and cross-platform synchronization rules after launch testing.", sources: [{ label: "Steam Open Beta achievements", href: betaSteam }, { label: "SteamDB beta data", href: "https://steamdb.info/app/4711740/stats/" }, { label: "Community 100% discussion", href: "https://www.reddit.com/r/MortalShell/comments/1ty6vrz/i_100_mortal_shell_2/" }], sections: [
      { title: "Beta and full-game tracking", intro: "The safest checklist starts by separating build-specific objectives.", bullets: ["Open Beta contains nine listed achievements.", "Do not assume beta achievement progress transfers to the formal release list.", "Record the build and date beside every achievement checklist."] },
      { title: "Missable-looking objectives", intro: "Exploration achievements are the most likely to be delayed by a rushed route.", bullets: ["Search Beacons and hidden areas before leaving each region.", "Check Tar Golem and collection-related objectives against your route.", "Revisit Shell, weapon, and trial locations before the final boss push."] },
      { title: "100% route planning", intro: "A low-spoiler route keeps completion work manageable.", bullets: ["Finish automatic story objectives first, then clean up Shell and weapon tasks.", "Use a save checkpoint before optional boss attempts when the release rules are confirmed.", "Beta community estimates of about four hours are not a formal-game completion promise."] },
    ],
  }),
  "mortal-shell-ii-beta-teleport": page({
    slug: "mortal-shell-ii-beta-teleport", keyword: "Mortal Shell II beta teleport", title: "Mortal Shell II Beta Teleport", description: "Learn how Mortal Shell II beta teleport works, how to return to Marrow Keep, why Beacon-to-Beacon travel is unavailable, and how to troubleshoot inactive platforms.", status: "Beta evidence", quickAnswer: "Beta teleport is tied to Marrow Keep and specific platforms, with a long transition. Players generally cannot jump directly from any Beacon to another Beacon, but that is beta feedback rather than a confirmed permanent launch rule.", updateWatch: "Confirm the exact interaction button, unlock prerequisites, destination list, and any formal-release changes.", sources: [{ label: "Beta teleport feedback", href: "https://www.reddit.com/r/MortalShell/comments/1u3rr89/mortal_shell_2_beta_feedback/" }, { label: "Marrow Keep Beacon discussion", href: "https://www.reddit.com/r/MortalShell/comments/1vgn25q/why_cant_we_teleport_from_the_marrow_keep_beacon/" }, { label: "Beta experience discussion", href: "https://www.reddit.com/r/MortalShell/comments/1tzf02i/my_thoughts_after_finishing_the_ms_2_beta/" }], sections: [
      { title: "Teleport quick answer", intro: "First identify whether you need a region return or a fast-travel jump.", bullets: ["Returning to Marrow Keep and Beacon-to-Beacon travel are separate use cases.", "Beta transitions involve specific platforms and a long scene.", "A Beacon that does not respond may not be an unlocked destination."] },
      { title: "When the platform does nothing", intro: "Use a short checklist before assuming the save is broken.", bullets: ["Confirm the area objective and nearby interaction prompt are complete.", "Move fully onto the platform and wait for the interaction state to appear.", "If the destination list is empty, continue the local route rather than forcing a Beacon jump."] },
      { title: "Beta limitation or launch rule?", intro: "The page keeps this answer intentionally time-stamped.", bullets: ["Community reports do not prove the formal version has the same limitation.", "Check official patch notes and the launch build before calling Beacon travel permanently unavailable.", "Record the exact build whenever a teleport rule changes."] },
    ],
  }),
  "mortal-shell-ii-beta-fast-travel": page({
    slug: "mortal-shell-ii-beta-fast-travel", keyword: "Mortal Shell II beta fast travel", title: "Mortal Shell II Beta Fast Travel", description: "Does Mortal Shell II have fast travel? Separate Beacon travel from Marrow Keep returns, learn the beta route, and track formal-release changes.", status: "Beta evidence", quickAnswer: "The beta supports movement between regions and Marrow Keep, but community testing did not confirm free Beacon-to-Beacon fast travel. Plan the shortest walking route and treat any late-game unlock as unverified until tested.", updateWatch: "Check whether a formal-release item similar to the previous game's Ornate Mask unlocks fast travel and document its conditions.", sources: [{ label: "Beta fast-travel feedback", href: "https://www.reddit.com/r/MortalShell/comments/1u0jega/feedback_for_the_beta/" }, { label: "Beacon-to-Beacon discussion", href: "https://www.reddit.com/r/MortalShell/comments/1u3rr89/mortal_shell_2_beta_feedback/" }, { label: "Marrow Keep discussion", href: "https://www.reddit.com/r/MortalShell/comments/1vgn25q/why_cant_we_teleport_from_the_marrow_keep_beacon/" }], sections: [
      { title: "Does the beta have fast travel?", intro: "The short answer depends on what players call fast travel.", bullets: ["Region-to-Marrow Keep movement exists in the beta.", "Free Beacon-to-Beacon travel was not confirmed by community testing.", "A long transition or required return point should be treated as the current beta route."] },
      { title: "Efficient backtracking", intro: "Until a direct jump is unlocked, route planning saves more time than repeated tests.", bullets: ["Clear a Beacon and nearby side path before returning to the main route.", "Use Marrow Keep as the upgrade and resupply hub.", "Note the shortest walk from each Beacon to a boss or dungeon entrance."] },
      { title: "Common misunderstanding", intro: "Teleport and fast travel are related but not identical keywords.", bullets: ["Teleport can mean returning to Marrow Keep through a platform.", "Fast travel usually means choosing one unlocked Beacon from another.", "Keep both answers separate in patch notes and reader updates."] },
    ],
  }),
  "mortal-shell-ii-devout-edition": page({
    slug: "mortal-shell-ii-devout-edition", keyword: "Mortal Shell II devout edition", title: "Mortal Shell II Devout Edition", description: "Compare Mortal Shell II Devout Edition with Standard: price examples, Obsidian Shell skins, Advanced Access, pre-order rewards, and upgrade options.", status: "Verified", quickAnswer: "The Devout Edition includes the game and an Obsidian skin set for all eight playable Shells. The US example price is $59.99 versus $49.99 for Standard, and Advanced Access begins August 17, 2026.", updateWatch: "Recheck regional prices, Devout Upgrade availability, and whether pre-order rewards remain claimable after launch.", sources: [{ label: "PlayStation Devout Edition", href: "https://store.playstation.com/en-us/product/EP3495-PPSA34008_00-0281085410214617" }, { label: "Xbox Devout Edition", href: "https://www.xbox.com/en-us/games/store/mortal-shell-ii-devout-edition-pre-order/9nq97ndcwshd" }, { label: "Xbox Devout Upgrade", href: "https://www.xbox.com/en-US/games/store/mortal-shell-ii-devout-edition-upgrade/9MWC321H6FHS/0010" }], sections: [
      { title: "Edition comparison", intro: "The premium is primarily about cosmetics and earlier access.", bullets: ["Standard example: $49.99 in the US store.", "Devout example: $59.99 in the US store.", "Prices vary by region and store, so use the local listing at checkout."] },
      { title: "What Devout includes", intro: "Keep permanent included content separate from pre-order bonuses.", bullets: ["The base game is included.", "All eight playable Shells receive an Obsidian skin set.", "Skeletal and Obsidian Harbinger skins are pre-order rewards, not the same as the Shell skin set."] },
      { title: "Is the upgrade worth it?", intro: "Devout does not change the combat rules or unlock a stronger Shell.", bullets: ["Choose it for Advanced Access and cosmetic collection value.", "On Xbox, the Devout Upgrade requires ownership of the base game.", "Players who only want gameplay content can stay with Standard without losing the campaign."] },
    ],
  }),
  "mortal-shell-ii-revered-edition": page({
    slug: "mortal-shell-ii-revered-edition", keyword: "Mortal Shell II revered edition", title: "Mortal Shell II Revered Edition", description: "See what the Mortal Shell II Revered Edition includes: PS5 physical collector items, digital extras, pre-order skins, and current stock guidance.", status: "Verified", quickAnswer: "Revered Edition is a PS5 physical collector release with a physical artbook, steelcase, fine art prints, and digital extras. The official site warns that it is sold out in most regions, so do not promise availability.", updateWatch: "Track regional retailer stock, the final digital-extra list, and any official restock announcement.", sources: [{ label: "Official Revered Edition section", href: official }, { label: "Playstack release announcement", href: playstackRelease }, { label: "PlayStation Store", href: "https://store.playstation.com/en-us/concept/10010058/" }], sections: [
      { title: "Collector contents", intro: "Revered is built around physical memorabilia rather than gameplay power.", bullets: ["Physical artbook.", "Steelcase.", "Fine art prints and digital additional content."] },
      { title: "Platform and availability", intro: "Check the edition type before comparing it with digital stores.", bullets: ["The confirmed physical collector platform is PS5.", "It is distinct from the digital Devout Edition.", "The official site indicates that most regions are sold out."] },
      { title: "Pre-order rewards", intro: "Cosmetic rewards should be listed separately from the box contents.", bullets: ["Pre-order buyers can receive two exclusive Harbinger skins.", "Stock status is not a guarantee that pre-order rewards are still available.", "Use official retailer pages for current inventory rather than unverified resale claims."] },
    ],
  }),
  "mortal-shell-ii-characters": page({
    slug: "mortal-shell-ii-characters", keyword: "Mortal Shell II characters", title: "Mortal Shell II Characters", description: "Learn about Harbinger, the eight main playable Shells, key NPCs, known factions, and the story roles revealed in Mortal Shell II.", status: "Verified", quickAnswer: "You play as Harbinger, who seeks to reclaim the Ova of the Undermether from its guardians. The release has eight main playable Shells; Harros appears in the prologue and should be counted separately.", updateWatch: "Add the complete eight-Shell roster, final NPC factions, official boss names, and spoiler-safe relationship map after formal-release testing.", sources: [{ label: "Steam Open Beta story page", href: betaSteam }, { label: "Mortal Shell II official website", href: official }, { label: "Official Gameplay Reveal", href: gameplay }], sections: [
      { title: "Harbinger and the central conflict", intro: "The player character is the anchor for the game's possession system and world journey.", bullets: ["Harbinger seeks to reclaim the Ova of the Undermether.", "The opposing force is connected to the guardians of the Ova.", "Story spoilers should stay behind a disclosure block on the finished page."] },
      { title: "Known Shells and Shellkeepers", intro: "Shell names mix character identity with combat role.", bullets: ["Tiel, the Acolyte favors evasive and stealth-oriented play.", "Eredrim, the Venerable is one of the publicly shown Shells.", "Proxima, the Broodseeker is also officially shown; Zhirelle, the Shellkeeper is tied to ability upgrades."] },
      { title: "Beta characters and bosses", intro: "Beta progression reveals only part of the final cast.", bullets: ["Magdalena, the Lady of the Woods is a beta progression target.", "Do not turn a beta encounter into a complete formal boss list.", "Keep returning-character claims distinct from newly revealed characters."] },
    ],
  }),
  "mortal-shell-ii-new-shells": page({
    slug: "mortal-shell-ii-new-shells", keyword: "Mortal Shell II new shells", title: "Mortal Shell II New Shells", description: "Compare the eight main playable Mortal Shell II Shells, the prologue Harros count, known abilities, locations, weapons, and upgrade priorities.", status: "Beta evidence", quickAnswer: "The official game count is eight main playable Shells. Harros appears in the prologue, which explains why some community posts say nine total. Tiel, Eredrim, and Proxima are publicly shown.", updateWatch: "Add unrevealed Shell names, exact stats, skill trees, body locations, and best weapon combinations after release testing.", sources: [{ label: "Mortal Shell II official website", href: official }, { label: "Steam Open Beta", href: betaSteam }, { label: "Official Gameplay Reveal", href: gameplay }], sections: [
      { title: "Why players see eight or nine", intro: "Both numbers can appear without describing the same roster.", bullets: ["Eight is the official main playable Shell count.", "Harros appears in the prologue and is tracked separately in this guide.", "Do not add Harros to the official eight without explaining the counting rule."] },
      { title: "Known Shell roles", intro: "Use role descriptions as starting points until final numbers are available.", bullets: ["Tiel leans toward dodge, stealth, and sudden attacks after a Perfect Dodge.", "Eredrim and Proxima are publicly revealed but need final ability details.", "Each Shell can be upgraded at Marrow Keep through Zhirelle."] },
      { title: "Unlock and build planning", intro: "A good Shell guide should connect location, weapon, and upgrade priority.", bullets: ["Record the earliest body location for each Shell.", "Recommend a weapon and sidearm only after their formal stats are tested.", "Separate confirmed abilities from community guesses about the unrevealed tree."] },
    ],
  }),
  "mortal-shell-ii-tarstone-locations": page({
    slug: "mortal-shell-ii-tarstone-locations", keyword: "Mortal Shell II tarstone locations", title: "Mortal Shell II Tarstone Locations", description: "Track Mortal Shell II Tarstone locations, effects, routes, support chests, trials, and the differences between beta positions and the formal release map.", status: "Beta evidence", quickAnswer: "Tarstones combine with Shell, weapon, sidearm, and Resolve builds. Known beta clues include Deadman's Stone, Shattering Stone, Shrike Stone, and Siegebreaker Stone, but names, totals, effects, and coordinates require formal UI verification.", updateWatch: "Add screenshots, exact effects, prerequisites, region coordinates, and the final total after the release map is tested.", sources: [{ label: "Missing Tarstone discussion", href: "https://www.reddit.com/r/MortalShell/comments/1u05o4j/missing_1_tarstone_any_ideas_where_it_is/" }, { label: "Formal map discussion", href: "https://www.reddit.com/r/MortalShell/comments/1vqw0xn/mortal_shell_2_interactive_map_complete_100_guide/" }, { label: "Official Gameplay Reveal", href: gameplay }], sections: [
      { title: "Tarstone system", intro: "Treat Tarstones as build components, not isolated collectibles.", bullets: ["Pair a Tarstone with the Shell's defensive and offensive identity.", "Check how the effect changes Resolve generation or spending.", "Record the weapon and sidearm used when testing a combination."] },
      { title: "Known beta route clues", intro: "These are useful leads, not final coordinates.", bullets: ["Shrike Stone is associated with an alternate path in the second swamp-region area.", "Follow the explosive green stick totems as a route clue.", "Support Tarstones can appear behind buildings, in three-offering chests, or after trials."] },
      { title: "Avoiding false certainty", intro: "Beta map changes are expected during launch preparation.", bullets: ["Serpent Stone appears in a Gameplay Reveal but was reported absent from the beta.", "Do not publish beta coordinates as formal-release coordinates without retesting.", "A missing chest can indicate an offering, trial, or progression condition rather than a bug."] },
    ],
  }),
  "mortal-shell-ii-pc": page({
    slug: "mortal-shell-ii-pc", keyword: "Mortal Shell II pc", title: "Mortal Shell II PC Requirements", description: "Check Mortal Shell II PC release details, Steam system requirements, optimization settings, controller support, troubleshooting, and Steam Deck questions.", status: "Beta evidence", quickAnswer: "Mortal Shell II launches on Steam August 20, 2026. The listed minimum is Windows 10/11, i7-10700K or Ryzen 5 3600, 16 GB RAM, RTX 2060 SUPER or RX 6600, DirectX 12, SSD, and 30 GB available space.", updateWatch: "Verify recommended specs, DLSS/FSR/XeSS, ray tracing, frame generation, ultrawide support, and Steam Deck/Linux compatibility on the formal build.", sources: [{ label: "Steam release page", href: steam }, { label: "Steam Open Beta", href: betaSteam }, { label: "Playstack release announcement", href: playstackRelease }], sections: [
      { title: "Minimum requirements", intro: "Use the store listing as the baseline, then leave headroom for modern effects.", bullets: ["OS: Windows 10/11.", "CPU: Intel i7-10700K or Ryzen 5 3600.", "Memory: 16 GB RAM; GPU: RTX 2060 SUPER 8 GB or RX 6600 8 GB; DirectX 12; 30 GB free storage; SSD required."] },
      { title: "First settings to test", intro: "Beta reports point to useful settings, but formal labels can change.", bullets: ["Compare native resolution/DLAA with any available upscaler.", "Test frame generation only after base frame pacing is stable.", "Lower shadows, effects, and post-processing before reducing texture quality."] },
      { title: "Troubleshooting checklist", intro: "Start with reversible fixes before changing files or downloading third-party tools.", bullets: ["Update GPU drivers and verify Steam files.", "Try a clean shader rebuild after a major patch.", "Record crash logs and settings when reporting black screens, UI prompts, or hit-detection issues."] },
    ],
  }),
  "mortal-shell-ii-ps5": page({
    slug: "mortal-shell-ii-ps5", keyword: "Mortal Shell II ps5", title: "Mortal Shell II PS5 Guide", description: "Find Mortal Shell II PS5 release date, editions, price examples, Open Beta access, DualSense features, PS5 Pro support, and performance questions.", status: "Verified", quickAnswer: "The PS5 Standard Edition releases August 20, 2026; Devout Advanced Access begins August 17. The store page lists single-player, offline play, DualSense vibration, PS5 Pro Enhanced, and power-saver support.", updateWatch: "Test resolution, frame rate, VRR/HDR, DualSense details, install size, and the day-one patch on retail hardware.", sources: [{ label: "PlayStation game page", href: "https://www.playstation.com/en-us/games/mortal-shell-2/" }, { label: "PlayStation Store", href: "https://store.playstation.com/en-us/concept/10010058/" }, { label: "PlayStation Gameplay Reveal", href: "https://www.youtube.com/watch?v=yI9Zp5NWAbg" }], sections: [
      { title: "Release and edition choices", intro: "The PS5 store concept page groups several products together.", bullets: ["Standard Edition releases August 20, 2026.", "Devout Edition Advanced Access begins August 17, 2026.", "Open Beta can appear under Editions or the three-dot menu on the concept page."] },
      { title: "PS5 features", intro: "Store badges describe supported features, not exact performance targets.", bullets: ["Single-player and offline play are listed.", "DualSense vibration and PS5 Pro Enhanced are listed.", "There is no confirmed PS4 version; do not promise backward-generation support."] },
      { title: "If the beta is missing", intro: "The listing hierarchy is the most common source of confusion.", bullets: ["Open the product concept page rather than only searching the full-game title.", "Check Editions and the three-dot menu for the free beta entry.", "Confirm the account region and store age requirements before assuming the listing is gone."] },
    ],
  }),
  "mortal-shell-ii-psn": page({
    slug: "mortal-shell-ii-psn", keyword: "Mortal Shell II psn", title: "Mortal Shell II PSN Store Guide", description: "Use the PlayStation Network listing to switch between Standard, Devout Edition, and Open Beta, troubleshoot regional access, and understand PS Plus requirements.", status: "Beta evidence", quickAnswer: "The PSN concept page contains Standard, Devout Edition, and Open Beta entries. Select Editions or the three-dot menu to switch products; the beta is a free PS5-only listing, with some age-rating and PS Plus rules varying by region.", updateWatch: "Recheck store hierarchy, regional prices, preload state, error codes, and whether Open Beta remains listed after release.", sources: [{ label: "PlayStation Store product page", href: "https://store.playstation.com/en-us/concept/10010058/" }, { label: "PlayStation game page", href: "https://www.playstation.com/en-us/games/mortal-shell-2/" }, { label: "Beta access discussion", href: "https://www.reddit.com/r/PS5/comments/1vdavfe/please_try_mortal_shell_2_this_weekend_ive_tried/" }], sections: [
      { title: "Switch products on PSN", intro: "The beta may not appear as the default product card.", bullets: ["Open the official product concept page.", "Use Editions or the three-dot menu to select Open Beta.", "Standard and Devout are paid products with different release timing."] },
      { title: "Region and PS Plus notes", intro: "Store access can be region-specific rather than a game-wide rule.", bullets: ["Open Beta is a free entry.", "Some regions, including Germany reports, may ask for PS Plus because of local age-rating rules.", "The PSN listing is PS5 only; do not write PS4 compatibility without an official update."] },
      { title: "When the listing is missing", intro: "Work through account and product context before reinstalling the console.", bullets: ["Check the account region and age settings.", "Search the complete name Mortal Shell II Open Beta.", "Reopen the concept page and inspect Editions after the store refreshes."] },
    ],
  }),
  "mortal-shell-ii-xbox": page({
    slug: "mortal-shell-ii-xbox", keyword: "Mortal Shell II xbox", title: "Mortal Shell II Xbox Guide", description: "Check Mortal Shell II Xbox Series X|S release timing, editions, Open Beta download, performance questions, controller features, and Game Pass status.", status: "Verified", quickAnswer: "Mortal Shell II supports Xbox Series X|S and is marked Optimized for Xbox Series X|S and single-player. Standard launches August 20, 2026; Devout Advanced Access begins August 17. No official Game Pass launch has been confirmed.", updateWatch: "Test Series X/S resolution and frame rate, install size, Quick Resume, cloud saves, and any future Game Pass announcement.", sources: [{ label: "Xbox Devout Edition", href: "https://www.xbox.com/en-us/games/store/mortal-shell-ii-devout-edition-pre-order/9nq97ndcwshd" }, { label: "Playstack release announcement", href: playstackRelease }, { label: "Xbox beta discussion", href: "https://www.reddit.com/r/xbox/comments/1vbqn6y/mortal_shell_ii_xbox_beta_now_available/" }], sections: [
      { title: "Xbox release and editions", intro: "The base release date and the premium early-access date are different.", bullets: ["Standard Edition releases August 20, 2026.", "Devout Advanced Access begins August 17, 2026.", "The supported hardware family is Xbox Series X|S."] },
      { title: "Finding Open Beta", intro: "A full-name search is more reliable than a generic beta query.", bullets: ["Search Mortal Shell II Open Beta in the Xbox store or Xbox app.", "If the card is missing, open the product's editions and related entries.", "The Xbox beta matches the core Steam beta slice and reward structure."] },
      { title: "Game Pass and performance", intro: "Keep confirmed store badges separate from unannounced subscription status.", bullets: ["No official source confirms a day-one Game Pass launch.", "Check Series X and Series S separately when reporting performance.", "Test controller behavior, Quick Resume, cloud saves, and install size after launch."] },
    ],
  }),
  "mortal-shell-ii-review": page({
    slug: "mortal-shell-ii-review", keyword: "Mortal Shell II review", title: "Mortal Shell II Review", description: "Is Mortal Shell II worth buying? Review the faster combat, Shell and Tarstone builds, exploration, bosses, story, performance, strengths, and launch caveats.", status: "Update watch", quickAnswer: "Early coverage is broadly positive, highlighting faster combat, richer Shell/Tarstone builds, clearer landmarks, and a more active stamina-free rhythm. Caveats include occasional hit detection, execution exposure, UI prompts, camera issues, and the need to separate beta reviews from formal reviews.", updateWatch: "Add platform, version, playtime, final-boss quality, endgame repetition, formal performance, and day-one patch notes to the scored review.", sources: [{ label: "Steam Open Beta reviews", href: betaSteam }, { label: "Metacritic details", href: "https://www.metacritic.com/game/mortal-shell-ii/details/" }, { label: "Review thread", href: "https://www.reddit.com/r/Games/comments/1vqrpud/mortal_shell_ii_review_thread/" }], sections: [
      { title: "What the game does well", intro: "The strongest early consensus is about combat agency and build variety.", bullets: ["Combat speed and weapon choice are more expressive than in the first game.", "Shell and Tarstone combinations create more build routes.", "Landmarks and exploration are easier to read in the interconnected world."] },
      { title: "What to watch before buying", intro: "A fair review should distinguish friction from deal-breaking bugs.", bullets: ["Occasional hit-detection and camera issues are reported.", "Execution animations can expose the player to a second threat.", "Tutorial and UI prompts may need polish depending on the final patch."] },
      { title: "Who should play it", intro: "The recommendation depends on tolerance for demanding action combat.", bullets: ["Good fit for players who enjoy build experimentation and deliberate boss learning.", "Less ideal for players wanting a conventional stamina-based action RPG.", "Always disclose platform, build, review code status, and playtime."] },
    ],
  }),
  "mortal-shell-ii-metacritic": page({
    slug: "mortal-shell-ii-metacritic", keyword: "Mortal Shell II metacritic", title: "Mortal Shell II Metacritic Score", description: "Track Mortal Shell II Metascore, PC, PS5, and Xbox score cards, critic versus user scores, review counts, and the comparison with Mortal Shell's 76.", status: "Update watch", quickAnswer: "A stable, verifiable Mortal Shell II Metascore was not available in the checked details page. Do not turn OpenCritic figures, Reddit predictions, or beta ratings into a Metacritic score; show platform, capture date, and sample size together.", updateWatch: "On each update, record capture date, platform, Metascore, critic review count, User Score, and User Score sample size.", sources: [{ label: "Mortal Shell II Metacritic details", href: "https://www.metacritic.com/game/mortal-shell-ii/details/" }, { label: "Mortal Shell Metacritic", href: "https://www.metacritic.com/game/mortal-shell/" }, { label: "Steam Open Beta reviews", href: betaSteam }], sections: [
      { title: "Current score status", intro: "The absence of a stable score is itself useful information for readers.", bullets: ["The details page lists PC, PlayStation 5, and Xbox Series X release information.", "A verified Mortal Shell II summary score was not stable during the checked review.", "Use an explicit unavailable state instead of a predicted number."] },
      { title: "How to read the cards", intro: "Critic and user scores answer different questions.", bullets: ["Metascore aggregates critic reviews.", "User Score depends on player sample size and timing.", "Show review count and capture date beside every score."] },
      { title: "Comparison with the original", intro: "Historical context should not be mistaken for the sequel's score.", bullets: ["The original Mortal Shell has a reported all-platform Metascore of 76.", "Keep that number in a separate comparison card.", "Update the sequel timeline whenever a platform score becomes stable."] },
    ],
  }),
  "mortal-shell-ii-trailer": page({
    slug: "mortal-shell-ii-trailer", keyword: "Mortal Shell II trailer", title: "Mortal Shell II Trailers", description: "Watch the official Mortal Shell II announcement, gameplay reveal, and release-date trailers, with dates, featured Shells, weapons, areas, and boss clues.", status: "Verified", quickAnswer: "The PlayStation Gameplay Reveal is the strongest current traffic video and shows the game's Shell variety, combat, and interconnected world. The Release Date Trailer confirms the August 20, 2026 global release.", updateWatch: "Refresh view counts with a capture date and update the featured-video order when official channels publish launch or post-launch trailers.", sources: [{ label: "PlayStation Announcement Trailer", href: "https://www.youtube.com/watch?v=KJWAUJhInH0" }, { label: "PlayStation Gameplay Reveal", href: "https://www.youtube.com/watch?v=yI9Zp5NWAbg" }, { label: "Playstack Gameplay Reveal", href: gameplay }, { label: "Official Release Date Trailer", href: releaseTrailer }], sections: [
      { title: "Watch first", intro: "Start with the video that gives the clearest look at the playable systems.", bullets: ["PlayStation Gameplay Reveal: published April 1, 2026 and the strongest current traffic signal in the checked material.", "Playstack Gameplay Reveal: shows three Shell approaches in the interconnected world.", "Release Date Trailer: confirms the August 20, 2026 launch date."] },
      { title: "Trailer timeline", intro: "Keep announcement, gameplay, and date-confirmation videos distinct.", bullets: ["PlayStation Announcement Trailer: June 6, 2025.", "Gameplay Reveal videos: focus on Shells, weapons, routes, and combat identity.", "Release Date Trailer: focuses on world tone, launch timing, and the final date."] },
      { title: "How to use screenshots", intro: "Trailer frames are reference material, not a substitute for final UI testing.", bullets: ["Tag each screenshot with the source video and timestamp.", "Use visible Shell, weapon, region, and boss clues as leads for future guides.", "Show view counts as 'as of' values because they change."] },
    ],
  }),
  "mortal-shell-ii-trailer-song": page({
    slug: "mortal-shell-ii-trailer-song", keyword: "Mortal Shell II trailer song", title: "Mortal Shell II Trailer Song", description: "Find the verified song and composer information for each Mortal Shell II trailer, with a clear status when official credits are not available.", status: "Update watch", quickAnswer: "No official Playstack, Cold Symmetry, or PlayStation description checked here identifies the trailer songs. Keep Announcement, Gameplay Reveal, and Release Date Trailer music separate and label the current answer Not officially identified.", updateWatch: "Monitor official video descriptions, game credits, and developer or publisher replies before adding a title or artist.", sources: [{ label: "PlayStation Announcement Trailer", href: "https://www.youtube.com/watch?v=KJWAUJhInH0" }, { label: "Cold Symmetry Announcement Trailer", href: "https://www.youtube.com/watch?v=L4RzK5uvt84" }, { label: "Playstack Gameplay Reveal", href: gameplay }, { label: "Official Release Date Trailer", href: releaseTrailer }], sections: [
      { title: "Current answer", intro: "The correct answer is a status, not a guess from comments.", bullets: ["No verified official song name or musician credit was found in the checked descriptions.", "Use the exact phrase Not officially identified until a primary source confirms it.", "Do not combine multiple trailer tracks into one presumed theme."] },
      { title: "Trailer-by-trailer log", intro: "Different videos may use different tracks or edits.", bullets: ["Record the video title, timestamp, and audible musical feature.", "Keep Announcement, Gameplay Reveal, and Release Date Trailer entries separate.", "A metal atmosphere or in-game Lute sidearm does not identify a trailer song."] },
      { title: "Safe update rule", intro: "Only primary confirmation should change the answer.", bullets: ["Accept an official description, credit list, or developer/publisher reply.", "Discord discussion can surface leads but cannot serve as final proof.", "Add an update date and source link whenever the credit changes."] },
    ],
  }),
  "mortal-shell-ii-cheat": page({
    slug: "mortal-shell-ii-cheat", keyword: "Mortal Shell II cheat", title: "Mortal Shell II Cheats and Console Commands", description: "Check whether Mortal Shell II has official cheat codes or console commands, understand trainer risks, and use legitimate build, resource, and accessibility strategies instead.", status: "Verified", quickAnswer: "No official cheat codes or developer console commands were confirmed by Cold Symmetry, Playstack, Steam, PlayStation, or Xbox. Third-party trainers are not official, may break after patches, and can risk saves, security, or platform terms.", updateWatch: "Only add a cheat or command after an official patch note, developer reply, or reproducible in-game test confirms it.", sources: [{ label: "Steam release page", href: steam }, { label: "Steam Open Beta", href: betaSteam }, { label: "Official website", href: official }, { label: "Official Discord", href: discord }], sections: [
      { title: "Are there official cheats?", intro: "The current verified answer is no confirmed official code list.", bullets: ["No official cheat codes were found.", "No official developer console or console command was confirmed.", "Do not label third-party trainer features as built-in game cheats."] },
      { title: "Safer ways to lower difficulty", intro: "A guide can serve the same player need without unsafe downloads.", bullets: ["Use a Shell whose defense and mobility fit the player's preferred pace.", "Follow an early upgrade and resource route before attempting optional bosses.", "Adjust supported accessibility and controller settings before changing game files."] },
      { title: "Trainer and download warning", intro: "Unknown executables create more risk than a difficult boss fight.", bullets: ["Do not provide unknown trainer downloads.", "Third-party tools can fail after patches or damage saves.", "Back up saves and check platform rules before using any external tool."] },
    ],
  }),
};

const innerPageTranslations: Record<string, InnerPageLocaleMap> = {
  "mortal-shell-ii-release-date": {
    de: {
      keyword: "Mortal Shell II Veröffentlichungsdatum",
      title: "Mortal Shell II Veröffentlichungsdatum",
      description: "Mortal Shell II startet weltweit am 20. August 2026. Vergleiche Ausgabe, Editionen, Plattformen und Starttag-Fragen.",
      quickAnswer: "Das globale digitale Startdatum ist der 20. August 2026. Devout-Edition-Besitzer erhalten bis zu 72 Stunden erweiterten Zugriff ab dem 17. August 2026; die Standard-Edition hat kein früheres Startdatum.",
      updateWatch: "Regionale Freischaltzeiten, Preload-Größe und den Day-One-Patch erneut prüfen, sobald die Stores finale Pläne veröffentlichen.",
      sections: [
        { title: "Startdatum auf einen Blick", intro: "Berücksichtige Edition und Plattform, wenn du deinen Startzeitpunkt planst.", bullets: ["Weltweiter Digitalstart: 20. August 2026.", "Startplattformen: Steam, PlayStation 5 und Xbox Series X|S.", "Keine bestätigte Version für PS4, Xbox One oder Nintendo Switch."] },
        { title: "Advanced Access versus Launch Day", intro: "Advanced Access ist ein Editionsvorteil und kein allgemeiner früherer Starttermin für alle Spieler.", bullets: ["Devout Edition Advanced Access beginnt am 17. August 2026.", "Je nach Plattform und Region kann der Vorteil bis zu 72 Stunden früheren Zugang bedeuten.", "Für Standard Edition und allgemeine Launch-Berichte gilt weiterhin der 20. August."] },
        { title: "Editionen und Plattformen", intro: "Prüfe vor dem Kauf sowohl Edition als auch die Plattformseite im Store.", bullets: ["Standard Edition ist das Basisspiel.", "Devout Edition enthält zusätzliche Obsidian-Skins für alle acht Shells.", "Revered Edition ist eine separate physische PS5-Sammlerfassung."] },
      ],
    },
    fr: {
      keyword: "Date de sortie de Mortal Shell II",
      title: "Date de sortie de Mortal Shell II",
      description: "Mortal Shell II sort officiellement le 20 août 2026. Vérifie l'édition, les plateformes, les prix et les détails du lancement.",
      quickAnswer: "La sortie numérique mondiale a lieu le 20 août 2026. Les propriétaires de la Devout Edition obtiennent jusqu'à 72 heures d'Advanced Access dès le 17 août 2026; cela ne s'applique pas à la Standard Edition.",
      updateWatch: "Revérifiez les horaires par région, la taille de préchargement et les notes de patch du jour 1 dès que les stores publient les informations finales.",
      sections: [
        { title: "Date de sortie en bref", intro: "Pense à la fois l'édition et la plateforme pour planifier ton heure de départ.", bullets: ["Sortie numérique mondiale : 20 août 2026.", "Plateformes de lancement : Steam, PlayStation 5 et Xbox Series X|S.", "Aucune version confirmée sur PS4, Xbox One ou Nintendo Switch."] },
        { title: "Advanced Access versus jour de sortie", intro: "L'Advanced Access est un avantage d'édition, pas une règle de sortie permanente pour tous.", bullets: ["L'Advanced Access Devout commence le 17 août 2026.", "Selon la plateforme et la région, il peut offrir jusqu'à 72 heures d'avance.", "Pour la Standard Edition, la référence de lancement reste le 20 août."] },
        { title: "Comparer édition et plateforme", intro: "Avant d'acheter, vérifie le contenu de l'édition et la page store de chaque plateforme.", bullets: ["La Standard Edition est le jeu de base.", "La Devout Edition ajoute des skins Obsidian et l'Advanced Access.", "La Revered Edition est une version collector PS5 séparée."] },
      ],
    },
    "pt-br": {
      keyword: "Data de lançamento de Mortal Shell II",
      title: "Data de lançamento de Mortal Shell II",
      description: "Mortal Shell II estreia em 20 de agosto de 2026 globalmente. Compare edições, plataformas e regras de acesso no dia de lançamento.",
      quickAnswer: "A data global de lançamento digital é 20 de agosto de 2026. Donos da Devout Edition recebem até 72 horas de Advanced Access a partir de 17 de agosto de 2026; a Standard Edition não tem esse acesso antecipado.",
      updateWatch: "Reverificar horários por região, tamanho de pré-carregamento e patch do dia do lançamento quando as lojas publicarem cronogramas finais.",
      sections: [
        { title: "Data de lançamento em resumo", intro: "Considere edição e plataforma ao planejar a janela de início.", bullets: ["Lançamento digital global: 20 de agosto de 2026.", "Plataformas de lançamento: Steam, PlayStation 5 e Xbox Series X|S.", "Não há confirmação de versão para PS4, Xbox One ou Nintendo Switch."] },
        { title: "Advanced Access vs Dia do Lançamento", intro: "Advanced Access é benefício de edição, não uma regra de saída antecipada para todos.", bullets: ["Devout Edition ativa Advanced Access em 17 de agosto de 2026.", "Dependendo da plataforma e região, pode dar até 72h de vantagem.", "Para a Standard Edition e cobertura geral, use a data oficial de 20 de agosto."] },
        { title: "Comparação de edições e plataformas", intro: "Antes de comprar, confira conteúdo e página da loja da plataforma.", bullets: ["Standard Edition é o jogo base.", "Devout Edition adiciona skins Obsidian para as 8 Shells e Advanced Access.", "Revered Edition é collector físico exclusivo PS5."] },
      ],
    },
  },
  "mortal-shell-ii-open-beta": {
    de: {
      keyword: "Mortal Shell II Open Beta",
      title: "Mortal Shell II Open Beta",
      description: "Infos zu Mortal Shell II Open Beta: Download, verfügbare Inhalte, Plattformen, Erfolge und Inhalte, die in das Vollspiel übernommen werden.",
      quickAnswer: "Die Open Beta deckte die Prologe bis in die erste offene Region ab und dauerte ungefähr drei Stunden. Start auf Steam am 5. Juni 2026, danach auf PS5 und Xbox Series X|S.",
      updateWatch: "Bestätige, ob die Beta noch herunterladbar bleibt und ob der Belohnungsanspruch noch offen ist.",
      sections: [
        { title: "Was die Beta enthält", intro: "Die Beta ist ein fokussierter Ausschnitt statt der kompletten Kampagne.", bullets: ["Spiele den Prolog und die erste offene Zone in etwa drei Stunden.", "Erkunde Dungeons, beende Beacons und besiege einen versteckten Mini-Boss.", "Leite den Fortschritt auf Magdalena, die Herrin des Waldes, hin."] },
        { title: "Belohnungen und Übernahme", intro: "Beta-Belohnungen sind von normalen Fortschrittstransfers getrennt.", bullets: ["Mehr als 30 Minuten Konsolenspiel können die Flayed Harbinger-Ausgabe freischalten.", "Fortschritt jenseits von Marrow Keep kann den Prolog-Skip im Vollspiel ermöglichen.", "Währungen, Waffen, Shells und Sammlerstücke werden nicht vollständig übernommen."] },
        { title: "Beta-Status", intro: "Behandle alle Beta-Regeln als zeitgestempelte Hinweise.", bullets: ["Steam listete neun Erfolge und eine sehr positive Bewertung.", "Beta-Feedback ist für Routen und Bedienbarkeit hilfreich, aber kein finaler Launch-Betrieb.", "Nutze die offizielle Produktseite, um Plattformverfügbarkeit zu prüfen."] },
      ],
    },
    fr: {
      keyword: "Mortal Shell II Open Beta",
      title: "Mortal Shell II Open Beta",
      description: "Trouvez les détails du téléchargement, du contenu disponible, des plates-formes, des succès et du transfert en jeu lors de la bêta ouverte.",
      quickAnswer: "La bêta ouverte couvre le prologue jusqu'à la première zone ouverte, environ trois heures. Elle a commencé sur Steam le 5 juin 2026 puis est arrivée sur PS5 et Xbox Series X|S.",
      updateWatch: "Confirme si la bêta reste téléchargeable après le lancement et si le parcours de récompenses est encore actif.",
      sections: [
        { title: "Ce que contient la bêta", intro: "La bêta est un extrait ciblé, pas une campagne complète.", bullets: ["Parcours le prologue et la première zone ouverte sur environ trois heures.", "Explore des donjons, valide des Beacons et affronte un mini-boss caché.", "La progression mène vers Magdalena, la Lady of the Woods."] },
        { title: "Récompenses et transfert", intro: "Les récompenses de bêta sont séparées du transfert de progression normal.", bullets: ["Jouer plus de 30 minutes sur console peut débloquer l'apparence Flayed Harbinger.", "La progression au-delà de Marrow Keep peut débloquer un saut du prologue.", "Monnaies, armes, Shells et objets de collection ne se transfèrent pas totalement."] },
        { title: "État de la bêta", intro: "Conserve toutes les infos bêta avec une date de vérification.", bullets: ["Steam indique neuf succès et une note très positive.", "Le ressenti bêta aide pour routes et ergonomie, pas pour les règles de sortie finales.", "Consulte la page officielle produit pour la disponibilité par plateforme."] },
      ],
    },
    "pt-br": {
      keyword: "Mortal Shell II beta aberta",
      title: "Mortal Shell II beta aberta",
      description: "Encontre detalhes da Open Beta: download, conteúdo disponível, plataformas, conquistas e o que segue para o jogo completo.",
      quickAnswer: "A Open Beta cobre o prólogo até a primeira região aberta, cerca de três horas de conteúdo. Começou no Steam em 5 de junho de 2026 e depois apareceu no PS5 e Xbox Series X|S.",
      updateWatch: "Confirme se a beta continua disponível para download e se as recompensas ainda podem ser resgatadas.",
      sections: [
        { title: "O que a beta contém", intro: "A beta é um recorte focado, não da campanha completa.", bullets: ["Jogue prólogo e primeira região aberta por cerca de três horas.", "Explore dungeons, limpe Beacons e enfrente mini boss escondido.", "A progressão segue para Magdalena, a Lady of the Woods."] },
        { title: "Recompensas e transferência", intro: "As recompensas beta são tratadas separadamente da transferência normal.", bullets: ["Mais de 30 minutos no console pode destravar aparência Flayed Harbinger.", "Progresso além de Marrow Keep pode conceder opção de pular prólogo.", "Moeda, armas, Shells e colecionáveis não transferem 100%."] },
        { title: "Status da beta", intro: "Trate todas regras da beta como validações com data.", bullets: ["Steam listou nove conquistas e avaliação muito positiva.", "Feedback beta é útil para rota e usabilidade, não para regra final de lançamento.", "Use a página oficial do produto para checar plataformas."] },
      ],
    },
  },
  "mortal-shell-ii-demo": {
    de: {
      keyword: "Mortal Shell II Demo",
      title: "Mortal Shell II Demo Download",
      description: "Mortal Shell II wird offiziell als Open Beta angeboten statt als separate Demo. Finde Download-Routing, Größe, Dauer, Plattformen und Fortschrittsregeln.",
      quickAnswer: "Offiziell heißt die Version Mortal Shell II - Open Beta. Sie dauert ungefähr drei Stunden und zeigt etwa 30 GB auf Steam.",
      updateWatch: "Prüfe den Nachfolge-Zugriff auf PS5/Xbox nach Launch und ob Belohnungen sowie Skip-Qualifikationen noch funktionieren.",
      sections: [
        { title: "Gibt es eine Mortal Shell II Demo?", intro: "Die offizielle Bezeichnung ist entscheidend bei der Suche in Stores.", bullets: ["Offiziell heißt das Angebot Mortal Shell II - Open Beta.", "Es gibt keine dauerhafte eigenständige Demo im klassischen Sinn.", "Nutze offizielle Steam/PS5/Xbox-Listen statt unbekannter Downloadquellen."] },
        { title: "Download und Testinhalt", intro: "Der spielbare Ausschnitt zeigt Intro-Systeme und erste Region.", bullets: ["Die Beta enthält Prolog und erste offene Zone.", "Ca. drei Stunden abhängig von Erkundung und Kämpfen.", "Steam nennt etwa 30 GB Speicherbelegung; Build-Historie kann leicht variieren."] },
        { title: "Fortschritt und Plattformen", intro: "Die Trial bietet Belohnungen, aber keinen vollständigen Save-Transfer.", bullets: ["Belohnungen und Prolog-Übersprung können ins Vollspiel übernommen werden.", "Waffen, Shells, Währungen, Sammlerstücke übertragen sich nicht vollständig.", "Bestätigte Startplattformen sind PC, PS5 und Xbox Series X|S."] },
      ],
    },
    fr: {
      keyword: "Télécharger Mortal Shell II Demo",
      title: "Téléchargement de la démo de Mortal Shell II",
      description: "Mortal Shell II utilise officiellement le nom Open Beta plutôt qu'une démo permanente. Vérifie le téléchargement, la taille, la durée et les règles de progression.",
      quickAnswer: "Le nom officiel est Mortal Shell II - Open Beta, pas une démo permanente. La durée tourne autour de trois heures et Steam annonce 30 Go disponibles.",
      updateWatch: "Après le lancement, vérifiez le remplacement éventuel de l'accès bêta et la validité des récompenses.",
      sections: [
        { title: "Existe-t-il une démo officielle ?", intro: "Le nom officiel importe quand on cherche sur les boutiques.", bullets: ["Le nom officiel est Mortal Shell II - Open Beta.", "Ce n'est pas une démo autonome permanente.", "Utilise les pages officielles Steam, PlayStation ou Xbox au lieu de miroirs inconnus."] },
        { title: "Téléchargement et contenu de test", intro: "Le segment jouable montre les systèmes d'ouverture et la première zone.", bullets: ["La bêta contient le prologue et la première zone ouverte.", "Durée estimée d'environ trois heures selon exploration et essais.", "Steam indique 30 Go de stockage disponible; cette valeur varie selon build."] },
        { title: "Progression et support plateforme", intro: "Le trial donne des récompenses mais pas un transfert complet de save.", bullets: ["Récompenses beta et skip de prologue peuvent être conservés.", "Armes, Shells, monnaies et objets de collection ne se transfèrent pas entièrement.", "Les plateformes confirmées au lancement sont PC, PS5, Xbox Series X|S."] },
      ],
    },
    "pt-br": {
      keyword: "Demo Mortal Shell II",
      title: "Download de demo de Mortal Shell II",
      description: "Mortal Shell II usa oficialmente o nome Open Beta em vez de demo separada. Verifique rota de download, tamanho, duração, plataformas e regras de progresso.",
      quickAnswer: "O nome oficial é Mortal Shell II - Open Beta. A experiência gira em torno de cerca de três horas e o Steam mostra 30 GB de espaço disponível.",
      updateWatch: "Após o lançamento, confirme o possível substituto da Open Beta e se recompensas e salto de prólogo continuam válidos.",
      sections: [
        { title: "Existe demo oficial?", intro: "O nome oficial importa ao buscar nas lojas de plataforma.", bullets: ["Nome oficial: Mortal Shell II - Open Beta.", "Não existe uma demo permanente com nome separado.", "Use Steam/PS5/Xbox oficiais, não espelhos desconhecidos."] },
        { title: "Download e conteúdo da beta", intro: "A parte jogável mostra abertura de sistemas e primeira região.", bullets: ["A beta inclui prólogo e primeira área aberta.", "A duração fica em torno de 3 horas conforme exploração e combate.", "Steam exibe cerca de 30 GB de espaço disponível; tamanho pode variar por build."] },
        { title: "Progresso e suporte de plataforma", intro: "A trial concede recompensas, não transferência total de save.", bullets: ["Recompensas beta e qualificação para pular prólogo podem passar para o jogo final.", "Armas, Shells, moedas e colecionáveis não transferem 100%.", "Plataformas confirmadas no lançamento: PC, PS5 e Xbox Series X|S."] },
      ],
    },
  },
  "mortal-shell-ii-guide": {
    de: {
      title: "Mortal Shell II Einstiegshandbuch",
      keyword: "Mortal Shell II Leitfaden",
      description: "Praktischer Anfängerleitfaden für Harden, Guard, Parry, Dodge, Shells, Waffen, Upgrades, Beacons und Tarstones in den ersten drei Stunden.",
      quickAnswer: "Mortal Shell II verzichtet auf eine klassische Ausdauerleiste. Lerne Harden-Zeitfenster, Haltungsbruch, Resolve-Nutzung und sichere Routen zwischen Beacons und Marrow Keep.",
      updateWatch: "Ersetze Beta-Zeiten, Tastenbelegung und Schadens-/Schwierigkeitstrends durch formale Tests nach Launch.",
      sections: [
        { title: "Deine erste Kampfschleife", intro: "In den ersten Stunden zählt mehr Geduld als ständige leichte Angriffe.", bullets: ["Nimm Harden, um einen Treffer zu absorbieren, dann nutze die Erholungsphase.", "Brich die Haltung des Gegners, bevor du auf eine lange Attacke setzt.", "Spare Resolve für eine Waffe oder Sidearm, die zu deiner Shell passt."] },
        { title: "Shell und Waffe wählen", intro: "Die Shell-Identität ist die Grundlage jedes Builds.", bullets: ["Finde einen gefallenen Körper, um eine Shell zu übernehmen und neuen Fähigkeitspfad zu öffnen.", "Tiel erscheint früh in der Beta und begünstigt Dodge/Stealth.", "Kombiniere eine verlässliche Hauptwaffe mit einer Sidearm, die Resolve nicht zu schnell verbraucht."] },
        { title: "Erkunde ohne Verlieren", intro: "Wenn Ressourcen knapp sind, gewinnt eine kurze sichere Route.", bullets: ["Nutze Beacons und Marrow Keep als Orientierung auf deiner Route.", "Markiere optionale Dungeons und Tarstone-Wege vor jedem Boss-Versuch.", "Setze auf Shell Points oder Glimpses, wenn eine neue Fähigkeit deine Überlebensfähigkeit deutlich verbessert."] },
      ],
    },
    fr: {
      title: "Guide débutant de Mortal Shell II",
      keyword: "Guide Mortal Shell II",
      description: "Un guide pratique pour débutants avec Harden, Guard, Parry, Dodge, Shells, armes, améliorations, Beacons et Tarstones dans les 3 premières heures.",
      quickAnswer: "Mortal Shell II n'utilise pas de barre d'endurance classique. Apprends le bon timing de Harden, les ruptures de posture, l'utilisation de Resolve et les itinéraires entre Beacons et Marrow Keep.",
      updateWatch: "Remplace les données de bêta (timings, contrôles, coûts) par des tests sur le build final après lancement.",
      sections: [
        { title: "Ta première boucle de combat", intro: "Les premières heures demandent de la patience plus que des enchaînements répétitifs.", bullets: ["Utilise Harden pour absorber un coup, puis punis la fenêtre de reprise.", "Brise la posture ennemie avant d'entamer une longue chaîne d'attaques.", "Conserve Resolve pour une arme ou sidearm adaptée à ta build."] },
        { title: "Choisir Shell et arme", intro: "L'identité de Shell est la base de ton build.", bullets: ["Trouve un corps tombé pour posséder une Shell et ouvrir une nouvelle voie d'aptitudes.", "Tiel apparaît tôt en bêta et se prête au style dodge/stealth.", "Associe une arme principale fiable à une sidearm qui ne consomme pas trop de Resolve."] },
        { title: "Explorer sans perdre la route", intro: "Quand les ressources sont limitées, une route courte peut être meilleure que l'exploitation excessive.", bullets: ["Utilise Beacons et Marrow Keep comme repères.", "Repère les dungeons et routes Tarstone avant chaque boss-fight.", "Revient aux Shell Points ou Glimpses quand une nouvelle capacité change ta survie."] },
      ],
    },
    "pt-br": {
      title: "Guia para iniciantes de Mortal Shell II",
      keyword: "Guia Mortal Shell II",
      description: "Guia prático de iniciante com Harden, Guard, Parry, Dodge, Shells, armas, upgrades, Beacons e Tarstones para as 2-3 primeiras horas.",
      quickAnswer: "Mortal Shell II remove a barra de stamina tradicional. Priorize Harden timing, quebra de postura, uso de Resolve, poses e caminho seguro entre Beacons e Marrow Keep.",
      updateWatch: "Trocar timings, teclas, custos de upgrade e detalhes de punição da beta por testes do lançamento formal.",
      sections: [
        { title: "Seu primeiro ciclo de combate", intro: "Nas 2-3 horas iniciais, paciência vale mais que spam de golpes leves.", bullets: ["Use Harden para absorver um golpe e aproveitar a janela de recuperação.", "Quebre a postura do inimigo antes de começar uma sequência longa.", "Guarde Resolve para arma ou sidearm que combinam com seu build de Shell."] },
        { title: "Escolher uma Shell e arma", intro: "A identidade da Shell é a base de qualquer build.", bullets: ["Encontre um corpo caído para possuir uma Shell e abrir um novo caminho de habilidade.", "Tiel aparece cedo na beta e favorece dodge/stealth.", "Combine uma arma principal confiável com sidearm que não gaste Resolve rápido demais."] },
        { title: "Explorar sem perder a run", intro: "Com poucos recursos, uma rota curta costuma ser mais eficiente que exploração excessiva.", bullets: ["Use Beacons e Marrow Keep como marcos de exploração.", "Marque dungeons opcionais e rotas Tarstone antes de tentar bosses.", "Volte para Shell Points ou Glimpses quando uma nova habilidade melhora claramente sua sobrevivência."] },
      ],
    },
  },
  "mortal-shell-ii-achievement-guide": {
    de: {
      title: "Mortal Shell II Erfolgsguide",
      keyword: "Mortal Shell II Achievements",
      description: "Verfolge Erfolge, Beta-zentrale Ziele, schwer verfehlbare Aufgaben, Shell- und Waffenfreischaltungen sowie einen sicheren 100%-Pfad.",
      quickAnswer: "Die Open Beta listet neun Erfolge. Halte Beta- und Vollspiel-Erfolge strikt getrennt und nutze Beacons, Tar Golem- sowie Sammlungsvorgänge als Kern.",
      updateWatch: "Nach dem Launch: offizielle Erfolgsnamen, versteckte Bedingungen, Trophy-Entsprechungen und Plattform-Synchronisierung ergänzen.",
      sections: [
        { title: "Beta und Vollspiel", intro: "Eine saubere Liste beginnt mit der Trennung buildabhängiger Ziele.", bullets: ["Die Open Beta listet neun Erfolge.", "Behandle Beta-Errungenschaften getrennt von der Vollspielliste.", "Notiere für jeden Erfolg Build und Datum."] },
        { title: "Leicht zu verpassende Ziele", intro: "Erkundungsziele werden bei zu schneller Route oft ausgelassen.", bullets: ["Sammle Beacons und versteckte Orte vor dem Verlassen jeder Region.", "Überprüfe Tar Golem- und Sammelziele entlang deiner Route.", "Wiederhole Shell-, Waffen- und Versuchsorte vor dem finalen Bosskampf."] },
        { title: "Route zu 100%", intro: "Eine leicht spoilerarme Route hält die Komplettierung kontrollierbar.", bullets: ["Schließe zuerst automatische Story-Ziele ab, dann Shell- und Waffenaufgaben.", "Setze einen Save vor optionalen Bosskämpfen in unbekanntem Bereich.", "Zeitangaben aus der Beta sind keine bestätigte 100%-Pflichtangabe."] },
      ],
    },
    fr: {
      title: "Guide des succès de Mortal Shell II",
      keyword: "Succès Mortal Shell II",
      description: "Suit les succès, les objectifs spécifiques de la bêta, les tâches faciles à rater et les parcours de 100 %.",
      quickAnswer: "La bêta ouvre neuf succès. Sépare toujours les succès de bêta des succès de la version finale et vérifie les tâches Beacon/Tar Golem/collections.",
      updateWatch: "Après le lancement, ajoute le nom exact des succès, conditions cachées, correspondance Trophy et règles de synchronisation.",
      sections: [
        { title: "Succès beta et version finale", intro: "La checklist la plus propre sépare les objectifs selon le contexte.", bullets: ["La bêta recense neuf succès.", "N'utilise pas les succès de bêta comme succès définitifs.", "Conserve build et date pour chaque objectif."] },
        { title: "Objectifs faciles à rater", intro: "Les objectifs d'exploration sont souvent manqués sans route prudente.", bullets: ["Vérifie Beacons et zones cachées avant de quitter chaque zone.", "Compare les objectifs Tar Golem et collecte à chaque passage.", "Revois emplacements Shell/armes avant l'affrontement final du boss."] },
        { title: "Parcours 100 %", intro: "Une route peu spoilante rend la complétion plus simple.", bullets: ["Fais d'abord les objectifs narratifs automatiques, puis les tâches Shell/armes.", "Pose un point de sauvegarde avant les boss optionnels.", "L'estimation beta d'environ 4h n'est pas une preuve formelle finale."] },
      ],
    },
    "pt-br": {
      title: "Guia de conquistas de Mortal Shell II",
      keyword: "Conquistas Mortal Shell II",
      description: "Acompanhe conquistas, objetivos da beta, tarefas fáceis de perder e um roteiro seguro para completar 100%.",
      quickAnswer: "A Open Beta tem nove conquistas listadas. Mantenha conquistas da beta separadas da versão final e use Beacons, Tar Golem e objetivos de coleção no planejamento.",
      updateWatch: "Após o lançamento, adicione nomes oficiais, condições ocultas, notas de troféus e regras de sincronização entre plataformas.",
      sections: [
        { title: "Beta e jogo final", intro: "Checklist mais segura separa objetivos por tipo de versão.", bullets: ["A Open Beta possui nove conquistas listadas.", "Não misture progresso de beta com lista final.", "Anote build e data em cada objetivo."] },
        { title: "Objetivos fáceis de perder", intro: "Objetivos de exploração são os mais fáceis de ignorar.", bullets: ["Revise Beacons e locais escondidos antes de sair de cada região.", "Cheque metas Tar Golem e coleções conforme sua rota.", "Revise posições de Shell, armas e treino antes de boss final."] },
        { title: "Rota para 100%", intro: "Uma rota com menos spoiler mantém o plano manejável.", bullets: ["Conclua objetivos de história automáticos antes, depois tarefas de Shell e armas.", "Crie ponto de save antes de bosses opcionais.", "A estimativa de 4h da beta não é promessa oficial de conclusão."] },
      ],
    },
  },
  "mortal-shell-ii-beta-teleport": {
    de: {
      title: "Mortal Shell II Beta Teleport",
      keyword: "Mortal Shell II Beta Teleport",
      description: "Erfahre, wie das Teleport-System funktioniert, wie du ins Marrow Keep zurückkehrst und wie Beacon-Reisen in der Beta behandelt wurden.",
      quickAnswer: "Der Beta-Teleport ist mit Marrow Keep und Plattformen verknüpft und hat meist lange Übergänge. Ein direkter Beacon-zu-Beacon-Sprung wurde in der Beta nicht bestätigt.",
      updateWatch: "Bestätige Interaktionsknopf, Voraussetzungen, Ziele und finale Release-Änderungen im offiziellen Build.",
      sections: [
        { title: "Teleport-Kurzantwort", intro: "Bestimme zuerst, ob du eine Rückkehr oder einen Schnellsprung erwartest.", bullets: ["Marrow Keep-Rückkehr und Beacon-zu-Beacon-Reise sind verschiedene Funktionen.", "Die Beta nutzt meist lange Plattform-Übergänge.", "Ein unreaktiver Beacon heißt nicht immer, dass der Speicher kaputt ist."] },
        { title: "Wenn die Plattform nichts tut", intro: "Mache eine kurze Prüfung vor Fehlersuche im Save.", bullets: ["Bestätige Zielbereich und sichtbaren Interaktionshinweis.", "Stehe vollständig auf der Plattform und warte auf den Interaktionsstatus.", "Ist die Ziel-Liste leer, nutze den lokalen Weg statt erzwungenem Sprung."] },
        { title: "Beta-Limitierung oder finale Regel?", intro: "Die Seite bleibt als zeitgebundene Analyse geführt.", bullets: ["Community-Hinweise allein belegen keine permanente Regel.", "Warte auf offizielle Patches und Build-Daten, bevor du final antwortest.", "Notiere Build und Datum bei jeder Regeländerung."] },
      ],
    },
    fr: {
      title: "Téléportation bêta de Mortal Shell II",
      keyword: "Téléportation bêta Mortal Shell II",
      description: "Apprends comment fonctionne le téléport de la bêta, le retour à Marrow Keep et les limitations de déplacement entre Beacons.",
      quickAnswer: "Le téléport de la bêta est lié à Marrow Keep et à des plateformes spécifiques, avec des transitions longues. Le saut Beacon vers Beacon direct n'est pas confirmé.",
      updateWatch: "Confirme le bouton exact, les prérequis, les destinations disponibles et les changements du jeu final.",
      sections: [
        { title: "Réponse rapide au téléport", intro: "Commence par identifier s'il s'agit d'un retour de région ou d'un déplacement Beacon.", bullets: ["Retour Marrow Keep et Beacon-to-Beacon sont des cas différents.", "La beta implique des plateformes dédiées et des transitions longues.", "Un Beacon sans effet peut simplement ne pas être débloqué."] },
        { title: "Quand la plateforme ne réagit pas", intro: "Fais une mini-checklist avant d'accuser la sauvegarde.", bullets: ["Confirme objectif de zone et prompt d'interaction.", "Place-toi bien sur la plateforme et attends l'état d'interaction.", "Si la liste des destinations est vide, poursuis la route locale."] },
        { title: "Limite beta ou règle finale ?", intro: "On garde une réponse liée à la date vérifiée.", bullets: ["Les retours communautaires ne suffisent pas à valider la version finale.", "Vérifie patch notes officielles et build final avant de conclure.", "Consigne build et date quand la mécanique change."] },
      ],
    },
    "pt-br": {
      title: "Teleporte da Beta de Mortal Shell II",
      keyword: "Teleporte beta Mortal Shell II",
      description: "Veja como o teleporte da beta funciona, como retornar ao Marrow Keep e como diferenciar limites de viagem entre Beacons.",
      quickAnswer: "O teleporte da beta está ligado ao Marrow Keep e a plataformas específicas, com transições longas. O salto direto Beacon para Beacon não foi confirmado como regra final.",
      updateWatch: "Confirme botão, pré-requisitos, destinos e mudanças da versão final.",
      sections: [
        { title: "Resposta rápida de teleporte", intro: "Antes, defina se é retorno de região ou deslocamento Beacon.", bullets: ["Retorno para Marrow Keep e teleporte Beacon-to-Beacon são usos diferentes.", "A beta usa plataformas específicas com transição longa.", "Beacon inerte nem sempre significa save bugada."] },
        { title: "Quando a plataforma não responde", intro: "Faça checklist curta antes de concluir que o save está quebrado.", bullets: ["Confirme o objetivo da área e o prompt de interação.", "Suba totalmente na plataforma e espere estado de interação.", "Se lista estiver vazia, siga a rota local."] },
        { title: "Limitação de beta ou regra final?", intro: "Mantemos resposta por data e estado.", bullets: ["Comentários de comunidade não validam regra permanente.", "Confira patch notes oficiais e build final antes de declarar definitiva.", "Anote build e data quando a regra mudar."] },
      ],
    },
  },
  "mortal-shell-ii-beta-fast-travel": {
    de: {
      title: "Mortal Shell II Beta Schnellentfernung",
      keyword: "Mortal Shell II Beta Fast Travel",
      description: "Unterscheidet Beta-Reisekonzept und Beacons, zeigt den Beta-Weg und hält offen, was im finalen Spiel noch gilt.",
      quickAnswer: "Regionen und Rückkehr nach Marrow Keep funktionieren in der Beta; ein freier Beacon-Schnellweg zwischen allen Punkten wurde nicht bestätigt.",
      updateWatch: "Prüfe nach Release, ob ein Unlock wie Ornate Mask ein globales Reisefeature freischaltet.",
      sections: [
        { title: "Gibt es Fast Travel in der Beta?", intro: "Die Kurzantwort hängt von der Begriffsdefinition ab.", bullets: ["Regionale Bewegung und Rückkehr nach Marrow Keep funktionieren in der Beta.", "Ein direkter Beacon-zu-Beacon-Schnellweg wurde nicht bestätigt.", "Lange Übergänge und feste Rückkehrpunkte kennzeichnen den aktuellen Stand."] },
        { title: "Effizientes Zurückgehen", intro: "Bis ein direkter Sprung freigeschaltet wird, spart Routenplanung Zeit.", bullets: ["Sichte vor dem Zurückgehen Beacon und Seitenwege.", "Nutze Marrow Keep als Upgrade- und Resupply-Hub.", "Notiere den kürzesten Weg von jedem Beacon zu Boss oder Dungeon-Eingang."] },
        { title: "Typische Verwechslung", intro: "Teleport und Fast Travel sind verwandt, aber nicht gleich.", bullets: ["Teleport kann eine Rückkehr zu Marrow Keep über Plattform bedeuten.", "Fast Travel ist die Wahl eines freigeschalteten Beacon-Ziels.", "Halte die Begriffe im Update klar getrennt."] },
      ],
    },
    fr: {
      title: "Voyage rapide en bêta de Mortal Shell II",
      keyword: "Fast Travel bêta Mortal Shell II",
      description: "Sépare le voyage rapide et la téléportation, montre la logique de la bêta et les changements possibles après lancement.",
      quickAnswer: "La beta propose un retour régional et vers Marrow Keep; le voyage Beacon direct n'est pas confirmé officiellement.",
      updateWatch: "Après lancement, vérifie si un objet de déblocage change le comportement de déplacement rapide.",
      sections: [
        { title: "La beta a-t-elle du fast travel?", intro: "La réponse courte dépend de la définition utilisée.", bullets: ["Le retour régional et le retour Marrow Keep fonctionnent en bêta.", "Le voyage Beacon à Beacon direct n'est pas confirmé.", "Les transitions longues et points fixes restent le mode actuel."] },
        { title: "Retour efficace", intro: "Sans saut direct, planifier la route fait gagner du temps.", bullets: ["Nettoyer Beacon et chemins latéraux avant de reprendre la route principale.", "Utiliser Marrow Keep comme hub d'améliorations et de ravitaillement.", "Repérer le chemin le plus court entre Beacon et boss/dungeon."] },
        { title: "Confusion fréquente", intro: "Teleport et fast travel sont proches mais différents.", bullets: ["Le teleport = retour vers Marrow Keep via plateforme.", "Le fast travel = déplacement vers un Beacon débloqué.", "Garde ces termes séparés dans notes et mises à jour."] },
      ],
    },
    "pt-br": {
      title: "Viagem rápida da beta de Mortal Shell II",
      keyword: "Viagem rápida beta Mortal Shell II",
      description: "Distingua viagem rápida e teleporte na beta, documente o caminho atual e acompanhe mudanças da versão final.",
      quickAnswer: "A beta tem retorno regional e para o Marrow Keep; fast travel Beacon para Beacon não foi confirmado de forma permanente.",
      updateWatch: "Após lançamento, confirme se algum item de unlock muda a regra de viagem rápida globalmente.",
      sections: [
        { title: "A beta tem fast travel?", intro: "A resposta curta depende do que se chama de fast travel.", bullets: ["A beta tem retorno regional e retorno ao Marrow Keep.", "Fast travel Beacon para Beacon não foi confirmado de forma permanente.", "Hoje o padrão costuma ser retorno com transições longas."] },
        { title: "Volta eficiente", intro: "Até o unlock global, organizar rota evita perda de tempo.", bullets: ["Limpe Beacon e rota lateral antes de seguir pela rota principal.", "Use Marrow Keep como ponto de upgrade e suprimentos.", "Anote o caminho mais curto de cada Beacon para boss ou dungeon."] },
        { title: "Confusão comum", intro: "Teleport e fast travel são parecidos, mas não iguais.", bullets: ["Teleport pode ser retorno do Marrow Keep por plataforma.", "Fast travel costuma ser salto para Beacon liberado.", "Mantenha essa diferença em updates e guias."] },
      ],
    },
  },
  "mortal-shell-ii-devout-edition": {
    de: {
      title: "Mortal Shell II Devout Edition",
      keyword: "Mortal Shell II Devout Edition",
      description: "Vergleich von Devout- und Standard-Edition: Preisbeispiele, Obsidian-Hüllen-Skins, Advanced Access und Upgrade-Möglichkeiten.",
      quickAnswer: "Devout enthält das Spiel und Obsidian-Skins für alle acht spielbaren Shells. Auf US-Preis: 59,99 $ gegen 49,99 $ in Standard.",
      updateWatch: "Regionale Preise, Devout Upgrade-Verfügbarkeit und weiterhin claimbare Pre-Order-Belohnungen prüfen.",
      sections: [
        { title: "Edition-Vergleich", intro: "Der Mehrwert liegt in Kosmetik und frühem Zugang.", bullets: ["Standard ist das Basispaket.", "Devout enthält einen Obsidian-Skin-Satz für alle 8 Shells.", "Devout bietet Advanced Access mit den bekannten Launch-Daten."] },
        { title: "Was Devout enthält", intro: "Unterscheide dauerhaftes Spiel-Update und Vorbesteller-Belohnungen.", bullets: ["Das Basisspiel ist inklusive.", "Zusätzliche Shell-Skins sind der Hauptunterschied.", "Skeletal- und Obsidian-Harbynger-Skins sind Pre-Order-Belohnungen."] },
        { title: "Lohnt sich das Upgrade?", intro: "Devout ändert nicht die Kern-Kampfmechanik.", bullets: ["Sinnvoll für frühzeitigen Zugang und Sammlerinteresse.", "Auf Xbox ist das Upgrade auf Besitz der Standard Edition angewiesen.", "Spieler ohne diesen Fokus können bei Standard bleiben."] },
      ],
    },
    fr: {
      title: "Édition Devout de Mortal Shell II",
      keyword: "Édition Devout de Mortal Shell II",
      description: "Compare l'édition Devout et la Standard : prix, skins Obsidian, Advanced Access et options d'upgrade.",
      quickAnswer: "La Devout Edition inclut le jeu et des skins Obsidian pour les 8 Shells jouables. Exemple US: 59,99$ vs 49,99$ pour la Standard.",
      updateWatch: "Vérifie les prix régionaux, la disponibilité de l'upgrade Devout et les récompenses précommande encore valides.",
      sections: [
        { title: "Comparaison d'éditions", intro: "Le vrai gain concerne les skins et l'accès avancé.", bullets: ["La Standard est la base du jeu.", "La Devout inclut des skins Obsidian et Advanced Access.", "Des exemples de prix: 49,99$ (Standard) vs 59,99$ (Devout)."] },
        { title: "Ce que contient Devout", intro: "Sépare le contenu permanent des récompenses précommande.", bullets: ["Le jeu de base est inclus.", "Tous les 8 Shells reçoivent un skin Obsidian.", "Certains skins sont des bonus précommande, pas des mécaniques permanentes."] },
        { title: "Vale la peine de l'upgrade?", intro: "Devout ne modifie pas la difficulté ni la mécanique de combat.", bullets: ["Intéressant pour l'accès anticipé et la collection.", "Sur Xbox, l'upgrade Devout exige la possession de Standard.", "Le gameplay de base reste inchangé pour la campagne."] },
      ],
    },
    "pt-br": {
      title: "Edição Devout de Mortal Shell II",
      keyword: "Edição Devout de Mortal Shell II",
      description: "Compare Devout e Standard: exemplos de preço, skins de obsidiana, Advanced Access e opções de upgrade.",
      quickAnswer: "A Devout Edition inclui o jogo e conjunto de skins Obsidian para os oito Shells jogáveis. Exemplo EUA: 59,99$ contra 49,99$ da Standard.",
      updateWatch: "Verificar preços regionais, disponibilidade de upgrade Devout e validade dos bônus de pré-venda.",
      sections: [
        { title: "Comparação de edições", intro: "O valor de Devout está em skins e acesso antecipado.", bullets: ["Standard é o jogo base.", "Devout inclui skins Obsidian e Advanced Access.", "Exemplos: 49,99$ Standard, 59,99$ Devout (US)."] },
        { title: "O que Devout inclui", intro: "Separar conteúdo base e bônus de pré-venda.", bullets: ["Jogo base incluso.", "As 8 Shells recebem conjunto de skins Obsidian.", "Certos skins são bônus de pré-venda, não parte central do jogo."] },
        { title: "Vale o upgrade?", intro: "Devout não altera a mecânica de combate central.", bullets: ["É útil para quem quer acesso antecipado e coleção.", "No Xbox, upgrade Devout depende da edição base.", "Para só jogar campanha, Standard pode bastar."] },
      ],
    },
  },
  "mortal-shell-ii-revered-edition": {
    de: {
      title: "Mortal Shell II Revered Edition",
      keyword: "Mortal Shell II Revered Edition",
      description: "Infos zur Revered Edition: PS5 Physical Collector Set, Digitalextras, Preorder-Skins und aktueller Lagerstatus.",
      quickAnswer: "Revered ist ein physischer PS5-Collector-Satz mit Artbook, Steelcase, Druckgrafiken und digitalen Extras; offiziell oft als ausverkauft markiert.",
      updateWatch: "Regionale Händler, Liste der digitalen Extras und eventuelle offizielle Restocks beobachten.",
      sections: [
        { title: "Sammler-Highlights", intro: "Revered ist auf physische Sammlerobjekte fokussiert.", bullets: ["Physisches Artbook und hochwertige Drucke.", "Steelcase und digitale Zusatzinhalte.", "Bestätigte Verfügbarkeit variiert stark nach Region."] },
        { title: "Plattform und Verfügbarkeit", intro: "Überprüfe zuerst die PS5-spezifische Verfügbarkeit.", bullets: ["Revered ist primär ein PS5-Sammlerset.", "Viele Regionen berichten ausverkauftes Listing.", "Verlasse dich nur auf offizielle Händlerkommunikation."] },
        { title: "Kaufhinweise", intro: "Sammelausgaben haben begrenzte Fenster.", bullets: ["Vergleiche offizielle PSN- und Händlerseiten vor Bestellung.", "Dokumentiere Veröffentlichungsland und Restock-Signale.", "Prüfe digitale Zusatzleistungen im finalen Bestandsbild."] },
      ],
    },
    fr: {
      title: "Édition Revered de Mortal Shell II",
      keyword: "Édition Revered de Mortal Shell II",
      description: "Consulter le contenu collector Revered, objets physiques PS5, bonus numériques, précommandes et disponibilité.",
      quickAnswer: "La Revered Edition est un coffret collector PS5 avec artbook physique, steelcase et impressions. Officiellement, elle est souvent indiquée en rupture.",
      updateWatch: "Surveille les stocks régionaux, la liste exacte des bonus numériques et les annonces de réapprovisionnement.",
      sections: [
        { title: "Points forts collector", intro: "La Revered Edition reste centrée sur le contenu physique.", bullets: ["Artbook et impressions.", "Steelcase et bonus numériques.", "Stock très variable selon région."] },
        { title: "Plateforme et disponibilité", intro: "Vérifie d'abord la disponibilité PS5 officielle.", bullets: ["Revered est une édition collector PS5.", "Beaucoup de régions la signalent en rupture.", "Appuie-toi sur les messages des revendeurs officiels."] },
        { title: "Conseils d'achat", intro: "Les éditions collector sont souvent limitées.", bullets: ["Contrôler PSN et revendeurs locaux avant de commander.", "Conserver la liste exacte des bonus numériques.", "Surveiller annonces de réassort."] },
      ],
    },
    "pt-br": {
      title: "Edição Revered de Mortal Shell II",
      keyword: "Edição Revered de Mortal Shell II",
      description: "Confira Revered: coletânea física para PS5, bônus digitais, skins pré-venda e status de estoque por região.",
      quickAnswer: "A Revered Edition é um pacote collector físico de PS5 com artbook, steelcase, impressos e extras digitais; pode estar esgotada em muitas regiões.",
      updateWatch: "Acompanhe estoque regional, lista de bônus digitais e comunicações oficiais de reabastecimento.",
      sections: [
        { title: "Principais conteúdos", intro: "A Revered é focada em colecionismo e itens físicos.", bullets: ["Artbook físico e impressões exclusivas.", "Steelcase e itens digitais de assinatura.", "Verifique bônus digitais listados por região."] },
        { title: "Plataforma e disponibilidade", intro: "A versão é de PS5 em formato collector.", bullets: ["É uma edição física da PS5.", "Diversas regiões a mostram como esgotada.", "Use fonte oficial de loja para decisão de compra."] },
        { title: "Dica de compra", intro: "Compare com Devout e Standard antes de comprar.", bullets: ["Priorize se valoriza itens físicos e colecionáveis.", "Não confirme disponibilidade sem anúncio recente.", "Documente a diferença de itens entre edições."] },
      ],
    },
  },
  "mortal-shell-ii-characters": {
    de: {
      title: "Mortal Shell II Charaktere",
      keyword: "Mortal Shell II characters",
      description: "Finde Charaktere, Harbinger-Progression, Gegnertypen und ihre Rolle in Story, Bosse und Beacons.",
      quickAnswer: "Die Charakter-Basis bleibt für die ersten zwei bis drei Stunden auf den Harbinger-Narrativ und Story-Hinweise fokussiert; weitere Zusammenhänge erscheinen mit dem Fortschritt.",
      updateWatch: "Nach Launch: bestätigte Namen, Kampfwerte und eventuelle Lore-Pfade mit offiziellen Patch-Notizen prüfen.",
      sections: [
        { title: "Charaktere im Einstieg", intro: "Die ersten Begegnungen sind für die Route-Findung am wichtigsten.", bullets: ["Harbinger-Story bleibt in den ersten Stunden der Hauptfokus.", "Nebenfiguren liefern Routen- und Lore-Hinweise.", "Gegnertypen helfen bei Build-Entscheidungen."] },
        { title: "Rollen im Spiel", intro: "Nicht jede Figur wirkt gleich stark im späteren Verlauf.", bullets: ["Ein Teil ist narrativ, ein Teil kampfbezogen.", "Alltägliche NPC-Hinweise können später in Boss- oder Beacons-Abschnitte verweisen.", "Dokumentiere bestätigte Namen pro Patch."] },
        { title: "Lernfluss", intro: "Sichere Prioritäten, bevor du die Route vertiefst.", bullets: ["Fokussiere auf Kerncharaktere in den ersten Zonen.", "Erweitere nur mit verifizierten Lore-Details.", "Gleiche spätere Builds gegen Story-Entscheidungen ab."] },
      ],
    },
    fr: {
      title: "Personnages de Mortal Shell II",
      keyword: "Personnages Mortal Shell II",
      description: "Découvrez les personnages, le Harbinger, alliés et ennemis, et leur rôle dans l'histoire, les boss et les Beacons.",
      quickAnswer: "Les premiers 2-3 heures concentre sur la progression Harbinger et les indices narratifs; les rôles détaillés des personnages se clarifient avec la progression.",
      updateWatch: "Après lancement, ajouter noms confirmés, builds et trajectoires d'histoire officielles.",
      sections: [
        { title: "Personnages principaux", intro: "Les premières heures fixent la base narrative.", bullets: ["Harbinger est central pour les objectifs de départ.", "Les alliés orientent les routes et les Beacons.", "Certains ennemis anticipent les mécaniques de boss."] },
        { title: "Rôles et priorités", intro: "Distingue rapidement narratif et mécanique.", bullets: ["Personnages narratifs apportent contexte.", "Personnages mécaniques influencent builds et explorations.", "Actualise les fiches après validation officielle."] },
        { title: "Ordre conseillé", intro: "Conserve une progression lisible.", bullets: ["Commence par les interactions du début de jeu.", "Note les personnages qui débloquent des routes.", "Reprends les rôles après chaque boss."] },
      ],
    },
    "pt-br": {
      title: "Personagens de Mortal Shell II",
      keyword: "Personagens Mortal Shell II",
      description: "Encontre personagens, Harbinger, aliados e inimigos e seus papéis em história, chefes e rotas de Beacon.",
      quickAnswer: "Nos primeiros 2-3 horas o foco é Harbinger e os sinais de lore; os detalhes de personagens ganham clareza com mais progresso.",
      updateWatch: "Após lançamento, validar nomes oficiais, funções e mudanças de lore com fontes do jogo.",
      sections: [
        { title: "Personagens iniciais", intro: "Os primeiros personagens guiam a história central.", bullets: ["Harbinger define a base das escolhas iniciais.", "Alianças e inimigos ajudam a montar rotas de Beacon.", "Acompanhe mudanças de lore por atualização."] },
        { title: "Funções", intro: "Separe função de lore e função mecânica.", bullets: ["Alguns são narrativos, outros alteram a jogabilidade.", "Atualize papéis quando a versão final validar nomes.", "Evite spoilers em rotas de guia inicial."] },
        { title: "Como acompanhar", intro: "Guarde ordem e fonte de cada atualização.", bullets: ["Priorize conteúdo com fonte oficial.", "Revise papéis após novos capítulos de história.", "Mantenha nota de build quando necessário."] },
      ],
    },
  },
  "mortal-shell-ii-new-shells": {
    de: {
      title: "Mortal Shell II Neue Shells",
      keyword: "Mortal Shell II neue Shells",
      description: "Vergleich aller neuen Shells: Fähigkeiten, Mobilitätsprofil, Angriffstypen und empfohlene Rollen für frühe Builds.",
      quickAnswer: "In der Beta sind acht spielbare Shells genannt; die früh erkannte Tiel betont Dodge/Stealth, Harbinger-Typen bleiben nach Build-Ausrichtung.",
      updateWatch: "Nach dem Launch neue Fähigkeiten, Baumschritte und Verfügbarkeit von Build-Elementen verifizieren.",
      sections: [
        { title: "Überblick", intro: "Die frühen Builds beruhen auf der Wahl der richtigen Shell.", bullets: ["In den veröffentlichten Daten sind acht Shells spielbar.", "Tiel bleibt die auffälligste Bewegungsorientierung.", "Verifiziere Fähigkeiten nach der finalen Veröffentlichung."] },
        { title: "Rollen", intro: "Wähle Rollen je nach Gebiet und Gegnerdichte.", bullets: ["Defensiv ausgerichtete Shells für längere Kämpfe.", "Offensiv ausgerichtete Shells für kurze Fenster.", "Mobilität hilft bei unerwarteten Boss-Routen."] },
        { title: "Updateplan", intro: "Patch-notizbasiert vergleichen.", bullets: ["Bäume und Zahlen nach Build-Patch prüfen.", "Verfügbare Waffen/Sidearms aktualisieren.", "Verifiziere jede neue Bestätigung mit Datenstand."] },
      ],
    },
    fr: {
      title: "Nouvelles enveloppes de Mortal Shell II",
      keyword: "Nouvelles enveloppes Mortal Shell II",
      description: "Compare toutes les nouvelles enveloppes selon capacités, mobilité, type d'attaque et rôle dans les builds précoces.",
      quickAnswer: "La beta mentionne 8 Shells jouables; Tiel ressort tôt pour un style dodge/stealth.",
      updateWatch: "Après lancement, vérifier les compétences finales, l'arbre de progression et l'évolution des rôles.",
      sections: [
        { title: "Vue d'ensemble", intro: "Les versions initiales peuvent évoluer vers le build final.", bullets: ["La bêta indique la base des huit Shells.", "Certaines rôles évoluent selon patchs officiels.", "Ne pas figer la taxonomie avant confirmation."] },
        { title: "Rôles recommandés", intro: "Adapte les rôles aux zones visées.", bullets: ["Shell défensive pour contrôle des rencontres.", "Shell offensif pour transitions courtes.", "Shell mobilité pour sorties rapides entre zones."] },
        { title: "Pérennisation", intro: "Mettre à jour par version officielle.", bullets: ["Synchroniser rôles avec patch notes.", "Corriger les noms de Shells officiellement.", "Réévaluer la liste des builds recommandés."] },
      ],
    },
    "pt-br": {
      title: "Novas carcaças de Mortal Shell II",
      keyword: "Novas carcaças Mortal Shell II",
      description: "Compare todas as novas carcaças: habilidades, mobilidade, tipo de dano e papéis recomendados para builds iniciais.",
      quickAnswer: "A beta trabalha com oito Shells jogáveis; a Tiel aparece cedo e favorece dodge/stealth em um dos estilos.",
      updateWatch: "Após lançamento, confirme habilidades finais, árvore de progressão e mudanças de papéis.",
      sections: [
        { title: "Visão geral inicial", intro: "No início, foque em comparar os 8 tipos principais de Shells.", bullets: ["A beta lista oito Shells base.", "Funções podem mudar conforme o patch oficial.", "Registre builds temporários apenas como provisórios."] },
        { title: "Função por fase", intro: "Escolha o papel de cada Shell por trecho de rota.", bullets: ["Funções defensivas para áreas de risco.", "Funções ofensivas para windows curtos.", "Funções de mobilidade para deslocamento seguro."] },
        { title: "Pós-lançamento", intro: "Finalize após confirmar árvore real.", bullets: ["Incluir habilidades e nomes oficiais.", "Ajustar rota conforme progressão real.", "Remover suposições de beta."] },
      ],
    },
  },
  "mortal-shell-ii-tarstone-locations": {
    de: {
      title: "Mortal Shell II Tarstone-Standorte",
      keyword: "Mortal Shell II Tarstone Standorte",
      description: "Sammle Tarstone-Orte, Effekte, Routen, Support-Kisten und Abweichungen zwischen Beta-Karte und finalem Release-Mapping.",
      quickAnswer: "Bekannte Beta-Hinweise nennen Deadman's, Shattering, Shrike und Siegebreaker Stone; Name, Anzahl und Positionen müssen nach finaler Karte erneut geprüft werden.",
      updateWatch: "Genauer Koordinatencheck, exakte Effekte und Voraussetzungen nach dem offiziellen Karten-Release ergänzen.",
      sections: [
        { title: "Wichtige Tarstones", intro: "Priorisiere bekannte Beta-Namen, bis die finale Karte vorliegt.", bullets: ["Bekannte Nennungen: Deadman's, Shattering, Shrike, Siegebreaker Stone.", "Positionen sind zum Zeitpunkt der Beta nicht endgültig.", "Offizielle Karte entscheidet über den finalen Satz."] },
        { title: "Routenlogik", intro: "Verknüpfe Tarstones mit Beacon-Routen.", bullets: ["Kurze Laufwege vor jedem großen Boss testen.", "Support-Kisten in demselben Loop berücksichtigen.", "Notiere Bedingungen und Voraussetzungen separat."] },
        { title: "Freigabe", intro: "Aktualisiere nach Karten-Freigabe.", bullets: ["Koordinaten exakt eintragen.", "Effekte und Anforderungen verifizieren.", "Totalsummen pro Region nachziehen."] },
      ],
    },
    fr: {
      title: "Emplacements Tarstone de Mortal Shell II",
      keyword: "Emplacements Tarstone Mortal Shell II",
      description: "Rassemble les emplacements Tarstone, effets, parcours, coffres de support et écarts entre beta et carte finale.",
      quickAnswer: "Les repères Beta citent Deadman's, Shattering, Shrike et Siegebreaker Stone, mais les noms et positions exacts nécessitent une vérification post-lancement.",
      updateWatch: "Ajouter coordonnées exactes, prérequis d'effet et totaux confirmés avec la carte finale.",
      sections: [
        { title: "Repères principaux", intro: "Conserver les noms Beta comme point de départ.", bullets: ["Deadman's, Shattering, Shrike, Siegebreaker Stone.", "Confirmer coordonnées et noms finaux officiels.", "Mettre à jour les totaux par région."] },
        { title: "Organisation de route", intro: "Lier chaque Tarstone à une trajectoire stable.", bullets: ["Associer Beacon et route de retour.", "Noter les coffres de support entre deux points clés.", "Éviter un ordre basé sur des rumeurs."] },
        { title: "Validation finale", intro: "Finaliser uniquement après release map.", bullets: ["Ajouter prérequis d'effet exacts.", "Confirmer la liste complète de Tarstones.", "Référencer la source officielle au bas de section."] },
      ],
    },
    "pt-br": {
      title: "Locais de Tarstone de Mortal Shell II",
      keyword: "Locais de Tarstone Mortal Shell II",
      description: "Colete locais, efeitos, rotas, cofres de suporte e diferenças entre coordenadas de beta e mapa final.",
      quickAnswer: "A beta cita Deadman's, Shattering, Shrike e Siegebreaker Stone; nomes, totais e coordenadas precisam de validação após o mapa final.",
      updateWatch: "Adicionar coordenadas exatas, requisitos e efeitos depois de confirmar o mapa final.",
      sections: [
        { title: "Locais principais", intro: "Mantenha os nomes da beta como guia inicial.", bullets: ["Deadman's, Shattering, Shrike e Siegebreaker Stone.", "Confirme nomes e localizações no mapa final.", "Verifique os efeitos antes de inserir no guia principal."] },
        { title: "Rota", intro: "Conecte Tarstones a rotas de retorno seguras.", bullets: ["Planeje Beacon e caminho de saída.", "Priorize locais com cofres de suporte na volta.", "Atualize totais por região após validação oficial."] },
        { title: "Conferência", intro: "Registre fonte e data de cada ajuste.", bullets: ["Ajuste somente com mapa oficial.", "Anote requisitos e pré-requisitos de efeito.", "Mantenha mudanças em histórico por versão."] },
      ],
    },
  },
  "mortal-shell-ii-pc": {
    de: {
      title: "Mortal Shell II PC Anforderungen",
      keyword: "Mortal Shell II PC",
      description: "Prüfe PC-Release, Steam-Systemvoraussetzungen, Grafik-Optimierung, Controller-Support und Steam Deck-Fragen für Mortal Shell II.",
      quickAnswer: "Steam-Start: 20. August 2026. Mindestwerte: Windows 10/11, i7-10700K oder Ryzen 5 3600, 16 GB RAM, RTX 2060 SUPER oder RX 6600, DX12, SSD und 30 GB verfügbar.",
      updateWatch: "Vor- und empfohlene Specs, DLSS/FSR/XeSS, Raytracing, Bildwiederholung und Linux/Deck-Support nach Release testen.",
      sections: [
        { title: "Mindestwerte", intro: "Die veröffentlichten Mindestwerte dienen als Grundlage.", bullets: ["Windows 10/11 und aktuelle CPU/GPU-Klasse prüfen.", "Mindestens 16 GB RAM und SSD-Installation beachten.", "Direkter VRAM- und Tempedruck auf lange Sessions messen."] },
        { title: "Optimierung", intro: "Stelle Auflösung und Effekte je nach Zielleistung ein.", bullets: ["Zuerst Grafikeinstellungen balancieren.", "Dann DLSS/FSR/XeSS gezielt aktivieren.", "Dokumentiere framerate-stabile Settings."] },
        { title: "Kompatibilitätsprüfung", intro: "Controller und Steam Deck müssen separat validiert werden.", bullets: ["Input-Lag testen.", "Steam Deck-Unterstützung anhand offizieller Quellen prüfen.", "Ray Tracing und Zusatzfeatures erst nach Patch testen."] },
      ],
    },
    fr: {
      title: "Exigences PC de Mortal Shell II",
      keyword: "Mortal Shell II PC",
      description: "Vérifie la sortie PC, les spécifications Steam, l'optimisation, la compatibilité manette et les questions Steam Deck.",
      quickAnswer: "Lancement Steam: 20 août 2026. Configuration minimale: Windows 10/11, i7-10700K oder Ryzen 5 3600, 16 Go RAM, RTX 2060 SUPER oder RX 6600, DX12, SSD et 30 Go.",
      updateWatch: "Ajouter les specs recommandées, FSR/DLSS/XeSS, ray tracing et support Steam Deck après la version finale.",
      sections: [
        { title: "Exigences de base", intro: "Commence par les exigences minimales publiées.", bullets: ["Windows 10/11, 16 Go RAM, DX12 comme base.", "GPU RTX 2060 SUPER ou RX 6600.", "SSD et espace disque suffisant."] },
        { title: "Ajustements", intro: "Ne pas forcer les options hautes d'emblée.", bullets: ["Ajuster résolution et effets progressivement.", "Évaluer FSR/DLSS/XeSS selon GPU.", "Noter les seuils de stabilité."] },
        { title: "Validation avancée", intro: "Steam Deck et Linux sont des cas propres.", bullets: ["Tester séparément la compatibilité Deck.", "Évaluer ray tracing et contrôleurs.", "Ajouter les réglages recommandés finalisés."] },
      ],
    },
    "pt-br": {
      title: "Requisitos de PC para Mortal Shell II",
      keyword: "Mortal Shell II PC",
      description: "Verifique lançamento no PC, requisitos de sistema Steam, otimização, suporte a controle e dúvidas sobre Steam Deck.",
      quickAnswer: "Lançamento Steam em 20 de agosto de 2026. Mínimo listado: Windows 10/11, i7-10700K ou Ryzen 5 3600, 16 GB RAM, RTX 2060 SUPER ou RX 6600, DirectX 12, SSD, 30 GB livres.",
      updateWatch: "Validar depois do lançamento specs recomendadas, FSR/DLSS/XeSS, ray tracing e suporte Steam Deck/Linux.",
      sections: [
        { title: "Especificações mínimas", intro: "Use estes requisitos apenas como base inicial.", bullets: ["Windows 10/11, 16 GB RAM, DX12.", "RTX 2060 SUPER ou RX 6600 e SSD.", "Espaço livre conforme instalação recomendada."] },
        { title: "Ajuste de desempenho", intro: "Monitore estabilidade em cenas críticas.", bullets: ["Iniciar com qualidade média e subir por etapas.", "Ativar FSR/DLSS/XeSS conforme ganho real.", "Verificar limites térmicos em sessões longas."] },
        { title: "Verificação extra", intro: "Controle Steam Deck e Linux separadamente.", bullets: ["Testes de controle e input mapping.", "Conferir suporte ao Ray Tracing se disponível.", "Atualizar recomendações com dados de patch."] },
      ],
    },
  },
  "mortal-shell-ii-ps5": {
    de: {
      title: "Mortal Shell II PS5 Leitfaden",
      keyword: "Mortal Shell II PS5",
      description: "Informationen zu PS5-Veröffentlichung, Editionen, Preisbeispielen, Open Beta Zugang, DualSense und PS5 Pro Details.",
      quickAnswer: "PS5 Standard startet am 20. August 2026; Devout Advanced Access ab 17. August. PS5 Pro Enhanced und Offline-Spiel sind laut Store gelistet.",
      updateWatch: "Ergebnisnachweis zu Auflösung, Bildrate, VRR/HDR und Speichergröße auf realer Hardware ergänzen.",
      sections: [
        { title: "Launch-Daten", intro: "Die PS5-Startseite bleibt primäre Referenz.", bullets: ["Standard am 20.08.2026; AA am 17.08.2026.", "DualSense-Features und Offline-Status prüfen.", "PS5 Pro Enhanced separat validieren."] },
        { title: "Performance", intro: "Messe erst an realer Hardware.", bullets: ["Auflösung und Frame-Rate nach Regionen/Sequenzen.", "VRR/HDR Verhalten im Testmodus prüfen.", "Größenänderung nach Patch mitprotokollieren."] },
        { title: "Tests", intro: "Führe separate Läufe für frühe und finale Inhalte aus.", bullets: ["Messung in Boss-Passagen.", "Messung in Erkundungsphasen.", "Vergleich vor/nach großem Patch."] },
      ],
    },
    fr: {
      title: "Guide PS5 de Mortal Shell II",
      keyword: "Mortal Shell II PS5",
      description: "Détails de sortie PS5, éditions, exemples de prix, accès bêta, fonctions DualSense et support PS5 Pro.",
      quickAnswer: "La Standard Edition PS5 sort le 20 août 2026, Devout Advanced Access du 17 août. Le store cite jeu solo, offline, DualSense et PS5 Pro Enhanced.",
      updateWatch: "Ajouter tests de résolution, fps, VRR/HDR et taille d'installation sur hardware réel.",
      sections: [
        { title: "Points PS5", intro: "Commencez par valider la fiche officielle PSN.", bullets: ["Date et éditions vérifiées.", "Offre de fonctionnalités DualSense/PS5 Pro.", "Contrôler la disponibilité offline et le stockage."] },
        { title: "Mesures", intro: "Les résultats doivent venir d'une console réelle.", bullets: ["Tester résolution et fps sur plusieurs zones.", "Vérifier VRR/HDR en conditions stressées.", "Noter l'évolution de la taille d'installation."] },
        { title: "Mise à jour", intro: "Rafraîchir après chaque gros patch.", bullets: ["Enregistrer build et date.", "Définir seuils de performance stables.", "Éviter de publier un chiffre non reproductible."] },
      ],
    },
    "pt-br": {
      title: "Guia PS5 de Mortal Shell II",
      keyword: "Mortal Shell II PS5",
      description: "Confira data de lançamento PS5, edições, preços, acesso Open Beta, recursos do DualSense e suporte PS5 Pro.",
      quickAnswer: "A Standard Edition PS5 lança em 20 de agosto de 2026; Devout Advanced Access começa em 17 de agosto. Recursos listados: single-player, offline, vibração DualSense, PS5 Pro Enhanced.",
      updateWatch: "Adicionar testes de resolução, frame rate, VRR/HDR e tamanho de instalação no hardware real.",
      sections: [
        { title: "Verificação inicial", intro: "Comece pela página oficial da Sony e da PSN.", bullets: ["Confirmar datas e edições do lançamento.", "Checar funções PS5 Pro e DualSense.", "Validar status offline/single player."] },
        { title: "Testes de desempenho", intro: "Métricas reais valem mais que specs teóricas.", bullets: ["Medir fps e resolução por cena crítica.", "Testar VRR/HDR em áreas de boss.", "Registrar tamanho após patches."] },
        { title: "Ajuste contínuo", intro: "Mantenha histórico de alterações técnicas.", bullets: ["Anotar build/hardware usado.", "Comparar atualizações por janela temporal.", "Atualizar se houver regressões de frame."] },
      ],
    },
  },
  "mortal-shell-ii-psn": {
    de: {
      title: "Mortal Shell II PSN Store Guide",
      keyword: "Mortal Shell II PSN",
      description: "Nutzung des PSN-Konzepts zum Wechseln zwischen Standard, Devout und Open Beta sowie zur Fehlerbehebung bei Regionen und PS Plus.",
      quickAnswer: "Die PSN-Konzeptseite enthält Standard, Devout und Open Beta. In der Regel findest du die Beta über Editions oder das Drei-Punkte-Menü.",
      updateWatch: "Store-Hierarchie, Preise pro Region, Preload und Fehlercodes regelmäßig prüfen.",
      sections: [
        { title: "Store-Navigation", intro: "Öffne zuerst die PSN-Konzeptseite für Mortal Shell II.", bullets: ["Wähle Standard, Devout oder Open Beta über Editions.", "Nutze den Menüpunkt mit drei Punkten, wenn nötig.", "Überprüfe Store-Hierarchie in der gewählten Region."] },
        { title: "Fehlerquellen", intro: "Regionale Sperren und Fehlercodes werden regelmäßig aktualisiert.", bullets: ["Prüfe Preload-Status vor dem Testen.", "Notiere Fehlermeldungen inkl. Zeitstempel.", "Verifiziere Preise pro Region erneut nach Updates."] },
        { title: "Fallback", intro: "Dokumentiere die letzte erfolgreiche Methode.", bullets: ["Logge verwendete Menüpfade.", "Lege Links als Lesezeichen mit Timestamp ab.", "Aktualisiere die Anleitung nach Store-Layout-Änderung."] },
      ],
    },
    fr: {
      title: "Guide du Store PSN de Mortal Shell II",
      keyword: "Mortal Shell II PSN",
      description: "Utilise la page PSN pour switcher entre Standard, Devout et Open Beta et résoudre les limites régionales et PS Plus.",
      quickAnswer: "La page concept PSN regroupe Standard, Devout et Open Beta. La beta est souvent dans Editions ou le menu à trois points.",
      updateWatch: "Revérifier hiérarchie du store, précommandes, région, préchargamento e código de erro conforme ao PSN oficial.",
      sections: [
        { title: "Navigation", intro: "Le page concept PSN reste la référence.", bullets: ["Vérifier la hiérarchie de la page PSN.", "Naviguer via Editions pour changer version.", "Contrôler région du compte PSN."] },
        { title: "Erreurs", intro: "Ne pas ignorer les codes de retour.", bullets: ["Noter le code d'erreur, région et heure.", "Vérifier préchargement et précommandes.", "Reprendre après maintenance console."] },
        { title: "Résolution", intro: "Mettre à jour après changement confirmé.", bullets: ["Mise à jour de la page store avec sources.", "Ajouter nouveaux flux de navigation en cas de changement."] },
      ],
    },
    "pt-br": {
      title: "Guia da PSN Store para Mortal Shell II",
      keyword: "Mortal Shell II PSN",
      description: "Use a página de conceito da PSN para alternar Standard, Devout e Open Beta e resolver problemas de região e PS Plus.",
      quickAnswer: "A página de conceito PSN contém Standard, Devout e Open Beta. Troque via menu Editions ou três pontos para encontrar a entrada da beta.",
      updateWatch: "Rever a hierarquia da store, preços por região, estado de pré-carga e eventuais códigos de erro pós-lançamento.",
      sections: [
        { title: "Acesso ao PSN", intro: "A base é a página de conceito da PSN.", bullets: ["Entrar no menu correto por região.", "Mudar entre Standard/Devout/Beta conforme seção Editions.", "Conferir três pontos para opções ocultas."] },
        { title: "Problemas", intro: "Regiões diferentes podem dar bloqueios diferentes.", bullets: ["Anotar código de erro e horário.", "Revisar estado de pré-carga para beta.", "Checar preços e region lock em cada reload."] },
        { title: "Ajuste", intro: "Refaça o fluxo após mudanças de cache/conta.", bullets: ["Fechar e entrar novamente na sessão.", "Usar método registrado na seção de suporte.", "Atualizar guia de navegação frequentemente."] },
      ],
    },
  },
  "mortal-shell-ii-xbox": {
    de: {
      title: "Mortal Shell II Xbox Guide",
      keyword: "Mortal Shell II Xbox",
      description: "Xbox Series X|S Release-Daten, Editionen, Open Beta Download, Performance-Fragen, Controller und Game Pass Status.",
      quickAnswer: "Mortal Shell II unterstützt Xbox Series X|S, startet am 20. August 2026. Devout Advanced Access beginnt am 17. August. Kein offizielles Day-One-Game-Pass wurde bestätigt.",
      updateWatch: "Teste Frame-Rate und Auflösung getrennt auf Series X/S, sowie Quick Resume e tamanho de instalação em cada versão.",
      sections: [
        { title: "Lancement", intro: "Confirme datas e edições antes de recomendar.", bullets: ["Xbox Series X|S é a plataforma alvo inicial.", "Standard em 20.08.2026, AA em 17.08.2026.", "Game Pass Day 1 ainda não oficialmente confirmado."] },
        { title: "Performance", intro: "Execute medições independentes por cenário.", bullets: ["FPS e resolução por modo de jogo.", "Quick Resume e cloud save em testes completos.", "Comparar tamanho de instalação entre versões."] },
        { title: "Correções", intro: "Revise mensalmente conforme patch.", bullets: ["Documentar regressões de frame.", "Atualizar seção de disponibilidade beta.", "Manter links oficiais atualizados."] },
      ],
    },
    fr: {
      title: "Guide Xbox de Mortal Shell II",
      keyword: "Mortal Shell II Xbox",
      description: "Infos sur Xbox Series X|S, dates de sortie, éditions, accès Open Beta, performance, contrôleur et statut Game Pass.",
      quickAnswer: "La série Xbox supportée est Series X|S. Sortie le 20 août 2026, Advanced Access Devout du 17 août. Pas d'annonce officielle Game Pass Day 1.",
      updateWatch: "Testar resolução, frame rate, Quick Resume, cloud saves e possível Game Pass em cada versão após lançamento.",
      sections: [
        { title: "Données de base", intro: "Confirme la cible de plateforme avant optimisation.", bullets: ["Optimisé Series X|S selon source officielle.", "Pas d'annonce officielle Game Pass Day 1.", "Comparer Standard/Devout pós-lançamento."] },
        { title: "Mesures", intro: "Séparer les métriques techniques de la communication marketing.", bullets: ["Tester frame rate et résolution.", "Valider Quick Resume et cloud saves.", "Mesurer tailles de téléchargement."] },
        { title: "Cycle de suivi", intro: "Mettre à jour dès chaque patch notable.", bullets: ["Ajouter nouvelle build testée.", "Corriger erreurs de section de guide.", "Documenter toute annonce Game Pass."] },
      ],
    },
    "pt-br": {
      title: "Guia Xbox de Mortal Shell II",
      keyword: "Mortal Shell II Xbox",
      description: "Checar timing de lançamento Xbox Series X|S, edições, Open Beta, performance, recursos de controle e situação de Game Pass.",
      quickAnswer: "Mortal Shell II roda em Xbox Series X|S. Lança em 20 de agosto de 2026 e Devout Advanced Access começa em 17 de agosto. Não há confirmação oficial de Game Pass no dia 1.",
      updateWatch: "Testar resolução e taxa de frames separadamente em Series X/S, além de Quick Resume, cloud saves e tamanho de download.",
      sections: [
        { title: "Checklist inicial", intro: "Valide plataforma e edições na página da Microsoft.", bullets: ["Lançamento em 20/08/2026 e AA em 17/08/2026.", "Séries X/S suportadas para partida.", "Game Pass Day 1 sem confirmação oficial."] },
        { title: "Medições", intro: "Mensure separadamente cada recurso.", bullets: ["FPS e resolução por modo.", "Testar Quick Resume e cloud saves.", "Verificar tamanho de instalação por patch."] },
        { title: "Acompanhamento", intro: "Ajuste o guia conforme novos dados.", bullets: ["Atualizar quando o anúncio de Game Pass ocorrer.", "Registrar variações entre versões de store.", "Guardar histórico de versões testadas."] },
      ],
    },
  },
  "mortal-shell-ii-review": {
    de: {
      title: "Mortal Shell II Review",
      keyword: "Mortal Shell II Review",
      description: "Ist Mortal Shell II den Kauf wert? Schnellvergleich von Kampfstil, Shell- und Tarstone-System, Erkundung, Story und Leistung.",
      quickAnswer: "Erste Berichte sind überwiegend positiv zu Tempo, Shell-Varianz und Landmarks. Kritische Punkte bleiben Hit Detection, UI-Hinweise und Kameraverhalten.",
      updateWatch: "Nach Launch: Plattform, Patchstand, Zeitaufwand, Endgame und finale Performance-Metriken nachtragen.",
      sections: [
        { title: "Kernaussage", intro: "Das Review bleibt vorläufig bis vollständige Plattformdaten vorliegen.", bullets: ["Frühes Feedback ist positiv, aber nicht final.", "Kritikpunkte betreffen v. a. Hit Detection und Kamera.", "Nach Launch müssen neue Daten ergänzt werden."] },
        { title: "Zielgruppe", intro: "Das Spiel richtet sich klar auf Build-orientierte Spieler.", bullets: ["Empfehlung für Fans von komplexen Bewegungsketten.", "Weniger geeignet für reine Action-only Spieler.", "Prüfe Endgame-Realismus nach Patches."] },
        { title: "Nachladen", intro: "Tracke Performance über Patches.", bullets: ["Plattform und Patchversion in jedem Update.", "Zeitaufwand- und Endgame-Vergleich hinzufügen.", "Vergleiche finale MetriKen mit Release-Status."] },
      ],
    },
    fr: {
      title: "Critique de Mortal Shell II",
      keyword: "Critique Mortal Shell II",
      description: "Mortal Shell II vaut-il le prix ? Vue rapide du combat, des builds Shell/Tarstone, de l'exploration, des boss et de la performance.",
      quickAnswer: "La première couverture est globalement positive : rythme plus rapide, plus de builds et une meilleure lisibilité. Points d'attention : hit detection, UI et caméra.",
      updateWatch: "Après lancement, intégrer plateforme, version, temps de jeu, difficulté finale et notes de patch.",
      sections: [
        { title: "Bilan initial", intro: "La review est positive mais dépend des validations finales.", bullets: ["Garder séparation bêta/version finale.", "Mettre l'accent sur difficultés réelles détectées.", "Mentionner limitations techniques récurrentes."] },
        { title: "Public", intro: "Cible joueurs orientés build et exploration.", bullets: ["Bonne base pour joueurs techniques.", "Risque de friction pour profils casual.", "Comparer difficulté finale post-patch."] },
        { title: "Suivi", intro: "Ajouter les données officielles au fur et à mesure.", bullets: ["Plateforme et version de test.", "Temps de jeu réel et stats finales.", "Noter la progression des correctifs."] },
      ],
    },
    "pt-br": {
      title: "Análise de Mortal Shell II",
      keyword: "Análise de Mortal Shell II",
      description: "Vale a pena comprar Mortal Shell II? Revise combate, builds Shell/Tarstone, exploração, chefes, história e desempenho.",
      quickAnswer: "A cobertura inicial é positiva no ritmo e variedade de builds, com pontos de atenção em hit detection, prompts e câmera em alguns momentos.",
      updateWatch: "Após lançamento, adicionar plataforma, versão, tempo de jogo, chefes finais e métricas de desempenho do patch atual.",
      sections: [
        { title: "Diagnóstico inicial", intro: "A análise inicial é positiva com limitações técnicas.", bullets: ["Distinguir feedback beta de release completo.", "Aguardar métricas finais de boss e endgame.", "Priorizar estabilidade de câmera e detecção de hit."] },
        { title: "Público", intro: "Recomendado para quem gosta de builds.", bullets: ["Bom para exploração tática e ajuste de rota.", "Menos para quem busca loop casual rápido.", "Atualizar com dificuldade final por patch."] },
        { title: "Métricas", intro: "Registrar plataforma, versão e patch.", bullets: ["Tempo de jogo por rota.", "Taxa de fps em chefes e exploração.", "Notas do patch e duração."] },
      ],
    },
  },
  "mortal-shell-ii-metacritic": {
    de: {
      title: "Mortal Shell II Metacritic Score",
      keyword: "Mortal Shell II Metacritic",
      description: "Verfolge Metascore pro Plattform, Kritiker- versus User-Werte, Anzahl der Rezensionen und Vergleich mit dem ersten Mortal Shell.",
      quickAnswer: "Ein stabiler Mortal Shell II Metascore war im geprüften Detailstand noch nicht dauerhaft verifizierbar. Bitte Platform, Datum und Stichprobe mitführen.",
      updateWatch: "Bei jedem Update: Datum, Plattform, Metascore, Kritikeranzahl, User Score und Stichprobengröße dokumentieren.",
      sections: [
        { title: "Metriken sauber lesen", intro: "Metacritic ist ein Dashboard, kein Urteil an sich.", bullets: ["Dokumentiere Plattform + Datum jedes Wertes.", "Unterscheide Kritiker und Nutzerzahlen.", "Beachte Stichprobengröße vor Vergleich."] },
        { title: "Updateplan", intro: "Nach jedem neuen Datensatz ergänzen.", bullets: ["Metascore, Kritikerzahl, User Score aufnehmen.", "Speichere auch den Zeitpunkt der Erhebung.", "Vergleiche Veränderungen über Zeit."] },
        { title: "Transparenz", intro: "Mache Instabilitäten für den Nutzer sichtbar.", bullets: ["Keine starren Schlussfolgerungen ohne Datenbasis.", "Markiere nicht-stabile Werte klar.", "Bevorzuge offizielle Datensätze."] },
      ],
    },
    fr: {
      title: "Score Metacritic de Mortal Shell II",
      keyword: "Metacritic Mortal Shell II",
      description: "Suivi des scores Par platforme, critiques vs utilisateurs, nombre de critiques et comparaison avec Mortal Shell.",
      quickAnswer: "Aucune valeur Metacritic stable et vérifiée n'est encore confirmée pour Mortal Shell II. Utilise plateforme, date et taille d'échantillon.",
      updateWatch: "À chaque mise à jour, enregistrer date, plateforme, Metascore, nombre de critiques, User Score et échantillon.",
      sections: [
        { title: "Lecture claire", intro: "Séparer métriques critiques et utilisateurs.", bullets: ["Associer chaque score à sa plateforme.", "Ajouter échantillon au calcul.", "Inclure date et version."] },
        { title: "Actualisation", intro: "Mettre à jour régulièrement après patches.", bullets: ["Vérifier nouvelle valeur Metacritic et critiques.", "Rafraîchir User Score selon échantillon.", "Archiver les anciennes données."] },
        { title: "Précautions", intro: "Ne pas conclure trop tôt.", bullets: ["Mentionner quand l'échantillon est limité.", "Éviter comparaison interplateformes non homogènes.", "Prévoir mise à jour continue."] },
      ],
    },
    "pt-br": {
      title: "Nota da Metacritic de Mortal Shell II",
      keyword: "Metacritic Mortal Shell II",
      description: "Acompanhe metascore por plataforma, notas de crítica e usuários, quantidade de reviews e comparação com Mortal Shell.",
      quickAnswer: "Ainda não há um Metascore estável e verificado de Mortal Shell II. Use sempre plataforma, data e tamanho da amostra.",
      updateWatch: "A cada atualização, registrar data, plataforma, Metascore, quantidade de crítica, User Score e amostra.",
      sections: [
        { title: "Leitura de dados", intro: "Metacritic deve ser usado com contexto completo.", bullets: ["Atualizar por plataforma e data.", "Diferenciar crítica e usuário.", "Registrar amostra de cada valor."] },
        { title: "Manutenção", intro: "Adicionar novos registros em cada revisão.", bullets: ["Notar variações entre versões.", "Recalcular tendências após grandes patches.", "Guardar histórico de mudanças."] },
        { title: "Cautela", intro: "Não converta número único em verdade final.", bullets: ["Evitar promessas de nota fixada.", "Marcar ausência de volume quando houver pouco dado.", "Preferir contexto temporal nas conclusões."] },
      ],
    },
  },
  "mortal-shell-ii-trailer": {
    de: {
      title: "Mortal Shell II Trailer",
      keyword: "Mortal Shell II Trailer",
      description: "Offizielle Trailer (Ankündigung, Gameplay und Release Date) nach Datum, sichtbaren Shells, Waffen, Regionen und Boss-Hinweisen.",
      quickAnswer: "Der PS Gameplay Reveal hat aktuell die stärkste Reichweite und zeigt Variety, Kampfsystem und offene Welt. Der Release Trailer bestätigt den 20.08.2026 Start.",
      updateWatch: "Sortenwerte und Reihenfolge der Featured-Videos regelmäßig mit Datenstand aktualisieren.",
      sections: [
        { title: "Trailer priorisation", intro: "Sortiere nach Relevanz officieller Veröffentlichung.", bullets: ["Gameplay Reveal als technische Referenz.", "Release Trailer für Terminbestätigung.", "Andere Clips je nach neuer Veröffentlichung neu priorisieren."] },
        { title: "Was beobachten", intro: "Nutze Trailer als Ergänzung, nicht als alleinige Quelle.", bullets: ["Identifiziere Shells und Waffen visuell.", "Notiere Boss-Hinweise und Gebiete.", "Prüfe Hinweise auf Open Beta-Reichweite."] },
        { title: "Nachführung", intro: "Aktualisiere Datums- und Reihenfolgeangaben.", bullets: ["Korrigiere Sichtbarkeit nach offizieller Staffelung.", "Archiviert alte Clips mit Datum, falls ersetzt."] },
      ],
    },
    fr: {
      title: "Bandes-annonces de Mortal Shell II",
      keyword: "Mortal Shell II trailer",
      description: "Parcours des trailers officiels (annonce, gameplay, date de sortie) avec dates, Shells montrés, armes, zones et indices boss.",
      quickAnswer: "Le Gameplay Reveal de PlayStation est le plus pertinent actuellement et confirme la diversité des Shells; le Release Trailer confirme la date du 20 août 2026.",
      updateWatch: "Mettre à jour fréquences de vues, ordre de mise en avant et nouvelles vidéos de lancement en fonction des annonces officielles.",
      sections: [
        { title: "Sélection des vidéos", intro: "Commencer par la source officielle PlayStation.", bullets: ["Gameplay Reveal = mécanique principale.", "Release Trailer = date et confirmation officielle.", "Ajouter les vidéos de lancement officielles."] },
        { title: "Interprétation", intro: "Séparer contenu commercial et informations mécaniques.", bullets: ["Identifier ce qui change le gameplay réel.", "Repérer shell/armes visibles.", "Noter les zones mentionnées."] },
        { title: "Mise à jour", intro: "Conserver l'ordre des featured-Videos à jour.", bullets: ["Réviser à chaque nouveau post officiel.", "Mettre à jour vues/ordre avec timestamp."] },
      ],
    },
    "pt-br": {
      title: "Trailers de Mortal Shell II",
      keyword: "Trailer Mortal Shell II",
      description: "Assista os trailers oficiais: anúncio, gameplay reveal e release date, com datas, Shells, armas, áreas e pistas de chefes.",
      quickAnswer: "O Gameplay Reveal da PlayStation é o vídeo de maior volume atual e confirma variedade de Shells; o trailer de data confirma lançamento em 20 de agosto de 2026.",
      updateWatch: "Atualizar ordem dos vídeos em destaque e contagens com data de captura.",
      sections: [
        { title: "Ordem de visualização", intro: "Priorize conteúdo oficial de maior relevância.", bullets: ["Gameplay Reveal é base para mecânicas.", "Release Trailer confirma a data.", "Inclua novos trailers oficiais conforme campanha."] },
        { title: "Leitura eficiente", intro: "Foque nos pontos úteis para jogabilidade.", bullets: ["Shells e armas em evidência.", "Indícios de áreas e chefes.", "Diferenças entre teaser e gameplay reveal."] },
        { title: "Atualização", intro: "Reordene e atualize com timestamp.", bullets: ["Adicionar novos links oficiais.", "Atualizar lista no mesmo padrão de data."] },
      ],
    },
  },
  "mortal-shell-ii-trailer-song": {
    de: {
      title: "Mortal Shell II Trailer Song",
      keyword: "Mortal Shell II Trailer Song",
      description: "Suche nach bestätigten Song- und Komponistennachweisen pro Trailer mit klarer Kennzeichnung bei fehlender offizieller Quellenlage.",
      quickAnswer: "In den offiziellen Beschreibungen wurden bisher keine offiziellen Trailer-Musik-Zuweisungen bestätigt. Aktuell bleibt der Status: offiziell nicht identifiziert.",
      updateWatch: "Erst bei offizieller Quellenbestätigung Namen und Künstler nachtragen.",
      sections: [
        { title: "Status actual", intro: "Aktuell liegen keine bestätigten Zuordnungen vor.", bullets: ["Keine offiziellen Track-Namen in verifizierten Quellen.", "Keine inoffiziellen Treffer übernehmen.", "Status bleibt aktuell als nicht identifiziert."] },
        { title: "Nachweis", intro: "Quellenbezug vor jeder Ergänzung.", bullets: ["Kanal-Beschreibung der offiziellen Uploads prüfen.", "Credits im Video/Spielinhalt einsehen.", "Publisher- oder Entwicklerantwort abwarten."] },
        { title: "Nachführung", intro: "Sobald bestätigt, Einträge sofort korrigieren.", bullets: ["Trackname + Künstler hinterlegen.", "Capture-Datum ergänzen.", "Verweise auf veraltete Quellen entfernen."] },
      ],
    },
    fr: {
      title: "Musique des trailers de Mortal Shell II",
      keyword: "Mortal Shell II musique trailer",
      description: "Trouvez les crédits musicaux officiels de chaque trailer avec un statut clair quand les informations manquent.",
      quickAnswer: "Aucune source officielle n'a confirmé les titres de musique des trailers analysés. Status actuel: non officiellement identifié.",
      updateWatch: "Ajouter titre et auteur seulement après source primaire officielle (description, credits, réponse éditeur).",
      sections: [
        { title: "Etat actuel", intro: "Aucun identifiant officiel validé pour le moment.", bullets: ["Aucune source officielle pour les titres identifiés.", "Éviter les rumeurs communautaires.", "Conserver un statut 'non identifié'."] },
        { title: "Validation", intro: "La confirmation doit venir d'une source primaire.", bullets: ["Descriptions officielles PlayStation/YouTube.", "Crédits publiés de manière officielle.", "Réponse directe du studio/publisher."] },
        { title: "Mise à jour", intro: "Mettre à jour immédiatement après confirmation.", bullets: ["Ajouter titre et auteur avec date et URL.", "Corriger les sections de statut dans la même section."] },
      ],
    },
    "pt-br": {
      title: "Música de trailer de Mortal Shell II",
      keyword: "Mortal Shell II música do trailer",
      description: "Encontre música e compositor de cada trailer com status claro quando os créditos oficiais não estiverem disponíveis.",
      quickAnswer: "Até agora nenhuma descrição oficial confirmou oficialmente as músicas dos trailers. Status atual: não identificado oficialmente.",
      updateWatch: "Adicionar título e artista apenas após confirmação em fonte primária oficial.",
      sections: [
        { title: "Estado atual", intro: "Nenhuma música de trailer foi confirmada oficialmente até agora.", bullets: ["Não use fontes não oficiais.", "Mantenha status como não identificado.", "Informe data da última verificação."] },
        { title: "Validação", intro: "Somente confirme com fonte primária.", bullets: ["Descrição oficial do vídeo.", "Créditos oficiais ou resposta de publisher.", "Salvar link e data para rastreio."] },
        { title: "Atualização", intro: "Assim que confirmado, atualizar de imediato.", bullets: ["Adicionar título e artista.", "Remover marcador de status provisório."] },
      ],
    },
  },
  "mortal-shell-ii-cheat": {
    de: {
      title: "Mortal Shell II Cheats und Konsolenbefehle",
      keyword: "Mortal Shell II Cheat",
      description: "Prüft ob offizielle Cheats oder Konsolenbefehle existieren; erklärt Risiken externer Trainer und sichere Alternativen.",
      quickAnswer: "Es wurden keine offiziellen Cheats oder Konsolenbefehle bestätigt. Externe Trainer sind nicht offiziell und können nach Patches brechen.",
      updateWatch: "Ergänzen nur nach offizieller Bestätigung in Patchnotes oder Testbericht.",
      sections: [
        { title: "Status", intro: "Es gibt aktuell keine offiziellen Cheat-Codes.", bullets: ["Keine offiziellen Konsole-Befehle bestätigt.", "Patchnotes sind die primäre Referenz.", "Externe Trainer sind nicht offiziell."] },
        { title: "Sicher spielen", intro: "Nutze offizielle Alternativen statt riskanter Tools.", bullets: ["Trainings- und Einstellungsoptionen bevorzugen.", "Bewahre Kontrolleingaben über Plattformmechaniken.", "Vertraue nicht auf unbestätigte Quellen."] },
        { title: "Update-Bedingung", intro: "Zusätzliche Cheat-Informationen nur bei starker Evidenz.", bullets: ["Source-Patchnotes oder offizieller Entwicklerantwort.", "Reproduzierbarer Ingame-Nachweis erforderlich.", "Eintrag danach sofort in allen Sprachen ergänzen."] },
      ],
    },
    fr: {
      title: "Cheats et commandes console de Mortal Shell II",
      keyword: "Cheat Mortal Shell II",
      description: "Vérifie s'il existe des cheats/commandes console officiels, explique les risques d'outils tiers et propose des alternatives sûres.",
      quickAnswer: "Aucun code officiel ni commande développeur n'a été confirmé. Les trainers tiers ne sont pas officiels et peuvent poser des risques.",
      updateWatch: "Ajouter des références officielles uniquement après patch notes, réponse développeur ou reproduction in-game solide.",
      sections: [
        { title: "Statut actuel", intro: "Aucune preuve officielle de cheat n'est confirmée.", bullets: ["Pas de commandes console officielles publiées.", "Éviter les conseils d'outils tiers.", "Conserver l'information sous forme de mise en garde."] },
        { title: "Méthode sûre", intro: "Mettre en avant des alternatives légitimes.", bullets: ["Entraînement officiel et guides de builds.", "Tester la sécurité des sessions solo avant tout.", "Signaler risques de bannissement si détectés."] },
        { title: "Condition d'ajout", intro: "Valider avant publication.", bullets: ["Patch notes ou déclaration développeur officielle.", "Reproduction in-game prouvée.", "Mettre à jour les trois langues ensuite."] },
      ],
    },
    "pt-br": {
      title: "Cheats e comandos de console de Mortal Shell II",
      keyword: "Cheat Mortal Shell II",
      description: "Verifique se existem códigos oficiais ou comandos de console, e conheça riscos de trainers externos versus alternativas seguras.",
      quickAnswer: "Não há confirmação de cheats oficiais ou comandos oficiais. Trainers de terceiros não são oficiais e podem quebrar após updates.",
      updateWatch: "Adicionar somente com confirmação oficial via patch note, resposta do dev ou teste reproduzível.",
      sections: [
        { title: "Estado atual", intro: "Nenhum cheat ou comando oficial confirmado até agora.", bullets: ["Não confirme fontes de terceiros como oficiais.", "Patch notes e resposta do studio são prioridade.", "Use ferramentas oficiais para progressão."] },
        { title: "Método seguro", intro: "Prefira estratégias legítimas de build e treino.", bullets: ["Focar em mecânicas, não atalhos externos.", "Evitar baixar ferramentas não verificadas.", "Checar termos da plataforma em caso de dúvida."] },
        { title: "Quando atualizar", intro: "Atualize somente com prova concreta.", bullets: ["Patch note oficial ou anúncio do desenvolvedor.", "Teste reproduzível em versão atual.", "Adicionar nome do código apenas com fonte."] },
      ],
    },
  },
};

export const innerPageSlugs = Object.keys(innerPages);

export function getInnerPage(slug: string, locale: Locale = "en") {
  const base = innerPages[slug];
  if (!base) return undefined;
  if (locale === "en") return base;
  const localizedBase = { ...base, eyebrow: localeEyebrows[locale] ?? base.eyebrow };
  const translations = innerPageTranslations[slug]?.[locale];
  if (!translations) return localizedBase;
  return {
    ...localizedBase,
    ...translations,
    sections: translations.sections ?? base.sections,
  };
}
