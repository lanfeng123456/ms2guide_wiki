# Mortal Shell II 网站开发信息

> 信息核对日期：2026-08-19

## 1、主题基础信息

### （1）官方网站、社群与官方视频

- 官方网站：[Mortal Shell II](https://mortalshell.com/)
- 官方发行商公告：[Mortal Shell II Launches August 20](https://www.playstack.com/news/mortal-shell-ii-release-date/)
- 官方 Discord：[Mortal Shell Community](https://discord.com/invite/mortalshell)
- 常用 Reddit 社群：[r/MortalShell](https://www.reddit.com/r/MortalShell/)
- 官方 YouTube 预告片：[Mortal Shell II - Official Release Date Trailer](https://www.youtube.com/watch?v=qHLY7zFhRvg)
- 官方高流量视频：[Mortal Shell II - Official Announcement Trailer](https://www.youtube.com/watch?v=w0SLSLuYMhw)
- Steam 商店：[Mortal Shell II](https://store.steampowered.com/app/2584270/Mortal_Shell_II/)

### （2）玩家最关心的 4 组数据

| 数据 | Value |
|---|---:|
| Release Date | August 20, 2026 |
| Advanced Access | Live |
| Playable Shells | 8 |
| Open Beta Reviews | 92% Positive |

数据说明：正式发行日期、支持平台和 8 个可玩 Shell 来自官网及 Playstack 公告；Open Beta 评价来自 Steam 商店公开数据。Advanced Access 已于 2026 年 8 月 17 日开放。

### SEO 与首页数据结构

```json
{
  "home": {
    "meta": {
      "title": "Mortal Shell II Wiki — Guides, Shells & Bosses",
      "description": "Mortal Shell II Wiki offers beginner tips, Shell guides, weapon upgrades, boss strategies, Tarstone locations, achievements, and fast travel help."
    },
    "hero": {
      "eyebrow": "Independent Fan-Made Community Wiki",
      "title": "Mortal Shell II",
      "description": "Possess fallen warriors and master their distinct combat styles in a compact, interconnected open world. Break enemy posture, wield powerful sidearms, and dethrone false gods without a stamina bar holding you back.",
      "stats": [
        "Releases Aug 20, 2026",
        "Advanced Access Live",
        "8 Playable Shells",
        "3 Launch Platforms",
        "92% Positive Beta Reviews"
      ],
      "primaryCta": "Start Beginner Guide",
      "secondaryCta": "Compare Shells",
      "tertiaryCta": "Find Tarstone Locations",
      "videoLabel": "Official Release Date Trailer"
    },
    "start": {
      "eyebrow": "Start Here",
      "title": "Your Mortal Shell II Journey",
      "cards": [
        {
          "number": "1",
          "title": "Beginner Guide",
          "description": "Learn hardening, healing, exploration, early upgrades, and the combat fundamentals needed to survive your opening hours."
        },
        {
          "number": "2",
          "title": "Shells & Builds",
          "description": "Compare all playable Shells, understand their strengths, and choose upgrades that fit your preferred combat style."
        },
        {
          "number": "3",
          "title": "Weapons & Upgrades",
          "description": "Find weapons and sidearms, understand upgrade paths, and build effective loadouts for difficult encounters."
        },
        {
          "number": "4",
          "title": "Bosses & Exploration",
          "description": "Prepare for major bosses, locate Tarstone, uncover hidden routes, and use teleportation or fast travel efficiently."
        }
      ]
    },
    "aboutGame": {
      "title": "What is Mortal Shell II?",
      "paragraphs": [
        "Mortal Shell II is a standalone dark-fantasy action RPG developed by Cold Symmetry. Players possess distinct warrior Shells and explore a dense, interconnected open world filled with hostile creatures, hidden structures, and false gods.",
        "Combat removes the traditional stamina restriction and emphasizes posture breaks, critical strikes, sidearms, and extensive weapon upgrades. Each Shell supports a different approach, giving players room to experiment with builds while uncovering the story of a ravaged world."
      ],
      "stats": [
        {
          "label": "Developer",
          "value": "Cold Symmetry"
        },
        {
          "label": "Publisher",
          "value": "Playstack"
        },
        {
          "label": "Platforms",
          "value": "Steam, PlayStation 5, Xbox Series X|S"
        },
        {
          "label": "Genre",
          "value": "Dark Fantasy Action RPG"
        },
        {
          "label": "Release Date",
          "value": "August 20, 2026"
        },
        {
          "label": "Playable Shells",
          "value": "8"
        },
        {
          "label": "World Structure",
          "value": "Interconnected Open World"
        }
      ],
      "cta": "Explore All Guides"
    },
    "finalCta": {
      "title": "Ready to Master Mortal Shell II?",
      "description": "From your first possession and early weapon upgrades to hidden Tarstone, advanced builds, and endgame boss fights, our independent community wiki helps you take the next step.",
      "primary": "Read the Beginner Guide",
      "secondary": "Play Mortal Shell II"
    }
  },
  "footer": {
    "aboutTitle": "Mortal Shell II Wiki",
    "about": "Mortal Shell II Wiki is an independent fan-made guide hub covering Shells, weapons, bosses, achievements, exploration, and progression. It is not affiliated with Cold Symmetry or Playstack.",
    "description": "Dark-fantasy action RPG with eight playable Shells, unrestricted combat, and an interconnected open world.",
    "playGame": "Play Mortal Shell II",
    "officialDiscord": "Official Discord — https://discord.com/invite/mortalshell",
    "officialYoutube": "Official Trailer — https://www.youtube.com/watch?v=qHLY7zFhRvg",
    "communityTool": "暂无",
    "privacyPolicy": "Privacy Policy",
    "termsOfService": "Terms of Service"
  },
  "metadata": {
    "title": "Mortal Shell II Wiki — Guides, Shells & Bosses",
    "description": "Master Mortal Shell II with beginner guides, Shell builds, boss strategies, weapon upgrades, Tarstone locations, achievements, and fast travel tips.",
    "keywords": "Mortal Shell II, wiki, guides, Shells, bosses, weapons, Tarstone, achievements, fast travel"
  },
  "sidebarCodes": [
    "暂无",
    "暂无"
  ]
}
```

### 自查结果

- `home.meta.title`：46 个字符，符合 `≤60`。
- `metadata.title`：46 个字符，符合 `≤60`。
- `metadata.description`：148 个字符，符合 `140-160`。
- `metadata.keywords`：91 个字符，符合 `≤100`。
- `home.hero.stats`：是纯字符串数组，不含对象。
- `home.start.cards`：包含 4 个对象。
- `home.aboutGame.stats`：每项均包含 `label` 和 `value`。
- `footer.about`：包含 2 句介绍。
- `sidebarCodes`：包含 2 条“暂无”，因为目前没有可稳定核验的官方兑换码。

## 3、网站主题色与默认主题

结论：默认使用深色主题。Mortal Shell II 的视觉核心是焦黑金属、风化骨色与炽热锈红，深色背景更符合游戏氛围，也能让战斗截图和火焰色 CTA 更突出。

```css
/* 导航页主题色 - 亮色主题 */
--nav-theme: 18 61% 38%;       /* oxidized rust */
--nav-theme-light: 32 72% 52%; /* ember amber */

/* 导航页主题色 - 暗色主题 */
--nav-theme: 18 69% 52%;       /* brighter rust for dark surfaces */
--nav-theme-light: 35 82% 64%; /* glowing ember */
```

建议配套色：

```css
--background: 24 14% 7%;
--surface: 24 11% 12%;
--foreground: 39 24% 88%;
--muted: 30 10% 58%;
--border: 25 16% 24%;
--danger: 4 68% 45%;
```

## 4、多语言

结论：优先支持英语、俄语、巴西葡萄牙语、日语。游戏官方名称在这些语言的商店本地化页面中均保持为 `Mortal Shell II`，无需翻译品牌名。

| 优先级 | 语言 | Locale | 本地化主题名 | 选择依据 |
|---:|---|---|---|---|
| 1 | English | `en` | Mortal Shell II | 官方完整配音语言，也是攻略搜索和视频内容的主要语言。 |
| 2 | Русский | `ru` | Mortal Shell II | Open Beta 的俄语评价量在非英语、非中文语言中最高。 |
| 3 | Português do Brasil | `pt-BR` | Mortal Shell II | Open Beta 已有明显活跃评价量，且巴西动作 RPG 受众规模较大。 |
| 4 | 日本語 | `ja` | Mortal Shell II | 官方支持界面和字幕，且 Souls-like 与动作 RPG 在日本具备稳定受众。 |

语言支持依据：[Mortal Shell II Steam 商店](https://store.steampowered.com/app/2584270/Mortal_Shell_II/)与 [Mortal Shell II Open Beta](https://store.steampowered.com/app/4711740/Mortal_Shell_II/)。

## 信息来源

- [Mortal Shell II 官方网站](https://mortalshell.com/)
- [Playstack 官方发行日期公告](https://www.playstack.com/news/mortal-shell-ii-release-date/)
- [Steam 官方商店页](https://store.steampowered.com/app/2584270/Mortal_Shell_II/)
- [Steam Open Beta 页面](https://store.steampowered.com/app/4711740/Mortal_Shell_II/)
- [Playstack 官方 Release Date Trailer](https://www.youtube.com/watch?v=qHLY7zFhRvg)
