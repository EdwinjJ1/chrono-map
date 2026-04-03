import { getLocationById } from '@/data/locations';
import type { Locale } from '@/i18n/config';

export const topicPageSlugs = [
  'sydney-film-locations',
  'sydney-hidden-history',
  'sydney-heritage-walk',
] as const;

export type TopicPageSlug = (typeof topicPageSlugs)[number];

type LocalizedText = Record<Locale, string>;

interface TopicSection {
  title: LocalizedText;
  paragraphs: LocalizedText[];
}

interface TopicPageDefinition {
  title: LocalizedText;
  seoTitle: LocalizedText;
  description: LocalizedText;
  intro: LocalizedText;
  badge: LocalizedText;
  sections: TopicSection[];
  locationIds: number[];
}

export interface LocalizedTopicPage {
  slug: TopicPageSlug;
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  badge: string;
  sections: Array<{
    title: string;
    paragraphs: string[];
  }>;
  locations: ReturnType<typeof getLocationById>[];
}

const topicPages: Record<TopicPageSlug, TopicPageDefinition> = {
  'sydney-film-locations': {
    title: {
      en: 'Sydney Film Locations',
      zh: '悉尼影视取景地',
    },
    seoTitle: {
      en: 'Sydney Film Locations | The Matrix and More | Chrono-Map',
      zh: '悉尼影视取景地 | 黑客帝国等电影拍摄地 | Chrono-Map',
    },
    description: {
      en: 'Explore Sydney film locations, from The Matrix to major civic landmarks used on screen. A curated map-based guide for movie fans.',
      zh: '探索悉尼影视取景地，从《黑客帝国》到众多银幕地标。为电影爱好者整理的地图专题。',
    },
    intro: {
      en: 'Sydney has repeatedly stood in for itself and for fictional worlds on screen. This guide highlights the best-known film locations with enough historical context to make the walk memorable.',
      zh: '悉尼既经常在银幕上扮演自己，也经常扮演虚构世界。这份专题挑出最值得看的影视取景地，并补上足够的背景，让路线更有记忆点。',
    },
    badge: {
      en: 'Topic Guide',
      zh: '专题指南',
    },
    sections: [
      {
        title: {
          en: 'What You Will Find',
          zh: '你会看到什么',
        },
        paragraphs: [
          {
            en: 'This page focuses on cinematic locations that are still meaningful in the city itself. Instead of listing every production credit, it prioritizes places that work both as film trivia and as real-world stops.',
            zh: '这个专题聚焦那些既有影视价值、又有现实地点意义的地方。它不会罗列所有拍摄记录，而是优先挑出既适合电影迷，也适合真实走访的地点。',
          },
        ],
      },
      {
        title: {
          en: 'Why Sydney Works On Screen',
          zh: '为什么悉尼适合上镜',
        },
        paragraphs: [
          {
            en: 'Sydney offers dense civic spaces, globally recognizable waterfront icons, and architecture that can shift from historical gravitas to futuristic spectacle within a few blocks.',
            zh: '悉尼拥有密集的公共空间、全球辨识度极高的海港地标，以及几条街之内就能从历史厚重感切换到未来感的建筑环境。',
          },
        ],
      },
    ],
    locationIds: [2, 4, 5, 51],
  },
  'sydney-hidden-history': {
    title: {
      en: 'Sydney Hidden History',
      zh: '悉尼隐藏历史',
    },
    seoTitle: {
      en: 'Sydney Hidden History | Stories Behind Famous Places | Chrono-Map',
      zh: '悉尼隐藏历史 | 热门地点背后的故事 | Chrono-Map',
    },
    description: {
      en: 'Discover Sydney hidden history through plague outbreaks, contested demolitions, political conflict, and overlooked public memory.',
      zh: '从瘟疫、拆迁争议、政治冲突到被忽视的公共记忆，探索悉尼隐藏历史。',
    },
    intro: {
      en: 'The best-known places in Sydney often hide the sharpest stories. This guide surfaces conflict, loss, reinvention, and survival beneath familiar landmarks.',
      zh: '悉尼最出名的地点，往往藏着最锋利的故事。这份专题把熟悉地标背后的冲突、失落、重建与幸存重新翻出来。',
    },
    badge: {
      en: 'Topic Guide',
      zh: '专题指南',
    },
    sections: [
      {
        title: {
          en: 'History Worth Re-seeing',
          zh: '值得重新看的历史',
        },
        paragraphs: [
          {
            en: 'These places are not obscure because they are small. They are obscure because the part most people remember is usually the postcard version, not the struggle that shaped the site.',
            zh: '这些地点之所以“隐藏”，不是因为它们不重要，而是因为多数人记住的是明信片版本，而不是塑造这些地点的真实冲突。',
          },
        ],
      },
    ],
    locationIds: [1, 3, 8, 32],
  },
  'sydney-heritage-walk': {
    title: {
      en: 'Sydney Heritage Walk',
      zh: '悉尼遗产步行路线',
    },
    seoTitle: {
      en: 'Sydney Heritage Walk | Self-Guided Route | Chrono-Map',
      zh: '悉尼遗产步行路线 | 自助路线指南 | Chrono-Map',
    },
    description: {
      en: 'Plan a self-guided Sydney heritage walk across landmark buildings, public memory sites, and historic streets worth visiting on foot.',
      zh: '规划一条适合步行的悉尼遗产路线，串联重要建筑、公共记忆地点与值得慢慢看的历史街区。',
    },
    intro: {
      en: 'This walk is designed for users who want more than sightseeing. It connects architectural highlights with the people, politics, and preservation battles behind them.',
      zh: '这条路线适合不满足于“看景点”的用户。它把建筑亮点与背后的人物、政治和保育故事连了起来。',
    },
    badge: {
      en: 'Topic Guide',
      zh: '专题指南',
    },
    sections: [
      {
        title: {
          en: 'How To Use This Route',
          zh: '如何使用这条路线',
        },
        paragraphs: [
          {
            en: 'Use the guide as a self-directed walk. Open each linked place page for the deeper story, then return to the map for routing and nearby discoveries.',
            zh: '把它当作一条自助步行路线来用。点开每个地点页看完整故事，再回到地图继续找路线和附近地点。',
          },
        ],
      },
    ],
    locationIds: [1, 3, 6, 7, 46],
  },
};

export function isTopicPageSlug(value: string): value is TopicPageSlug {
  return topicPageSlugs.includes(value as TopicPageSlug);
}

export function getLocalizedTopicPage(locale: Locale, slug: TopicPageSlug): LocalizedTopicPage {
  const topicPage = topicPages[slug];

  return {
    slug,
    title: topicPage.title[locale],
    seoTitle: topicPage.seoTitle[locale],
    description: topicPage.description[locale],
    intro: topicPage.intro[locale],
    badge: topicPage.badge[locale],
    sections: topicPage.sections.map((section) => ({
      title: section.title[locale],
      paragraphs: section.paragraphs.map((paragraph) => paragraph[locale]),
    })),
    locations: topicPage.locationIds
      .map((locationId) => getLocationById(locationId))
      .filter(Boolean),
  };
}
