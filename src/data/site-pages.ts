import type { Locale } from '@/i18n/config';

export const sitePageSlugs = [
  'about',
  'how-it-works',
  'business',
  'contact',
  'legal',
  'privacy',
  'terms',
  'cookies',
] as const;

export type SitePageSlug = (typeof sitePageSlugs)[number];

type LocalizedText = Record<Locale, string>;

interface SitePageSection {
  title: LocalizedText;
  paragraphs: LocalizedText[];
  bullets?: LocalizedText[];
}

interface SitePageLink {
  label: LocalizedText;
  href: `/${SitePageSlug}` | '/map';
}

interface SitePageDefinition {
  title: LocalizedText;
  description: LocalizedText;
  intro: LocalizedText;
  updatedAt: LocalizedText;
  sections: SitePageSection[];
  relatedLinks?: SitePageLink[];
}

export interface LocalizedSitePage {
  slug: SitePageSlug;
  title: string;
  description: string;
  intro: string;
  updatedAt: string;
  relatedTitle: string;
  sections: Array<{
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  relatedLinks?: Array<{
    label: string;
    href: string;
  }>;
}

const sharedUpdatedAt = {
  en: 'Last updated: March 20, 2026',
  zh: '最后更新：2026年3月20日',
} satisfies LocalizedText;

const sharedRelatedTitle = {
  en: 'Related',
  zh: '相关页面',
} satisfies LocalizedText;

const sitePages: Record<SitePageSlug, SitePageDefinition> = {
  about: {
    title: {
      en: 'Our Story',
      zh: '我们的故事',
    },
    description: {
      en: 'Why Chrono-Map exists and what kind of city memory experience we are building.',
      zh: '为什么 Chrono-Map 会存在，以及我们想打造怎样的城市记忆体验。',
    },
    intro: {
      en: 'Chrono-Map began with a simple observation: people walk past layered history every day, but most places do not make those stories easy to see, compare, and share.',
      zh: 'Chrono-Map 起源于一个很简单的观察：人们每天都会经过层层叠叠的城市历史，但大多数地点并不会把这些故事清楚地呈现出来、对比出来、传播出去。',
    },
    updatedAt: sharedUpdatedAt,
    sections: [
      {
        title: {
          en: 'What We Care About',
          zh: '我们在意什么',
        },
        paragraphs: [
          {
            en: 'We focus on place-based storytelling: historic sites, film locations, public memory, architecture, and the human stories attached to each address.',
            zh: '我们关注以地点为核心的叙事：历史遗址、影视取景地、公共记忆、城市建筑，以及每一个地址背后的人与事件。',
          },
          {
            en: 'Our goal is not only to publish facts, but to make cultural context discoverable in a way that feels useful on the street, on mobile, and across languages.',
            zh: '我们的目标不只是发布事实，更是把文化语境做成真正可发现、可在街头使用、可在手机上浏览、也可跨语言理解的内容体验。',
          },
        ],
      },
      {
        title: {
          en: 'Why Sydney Layers',
          zh: '为什么是 Sydney Layers',
        },
        paragraphs: [
          {
            en: 'Sydney is a city where colonial history, Indigenous history, migration, cinema, tourism, and everyday life overlap in a small physical space. That density makes it ideal for time-based exploration.',
            zh: '悉尼是一座在很小的物理空间里叠加了殖民历史、原住民历史、移民经验、电影文化、旅游叙事与日常生活的城市，这种密度非常适合做“时间维度”的探索。',
          },
          {
            en: 'The long-term vision is broader than one city, but Sydney is the right place to prove the product, the editorial model, and the bilingual experience.',
            zh: '我们的长期愿景不会只停留在一座城市，但悉尼是验证产品形态、内容方法和双语体验最合适的起点。',
          },
        ],
      },
      {
        title: {
          en: 'Editorial Approach',
          zh: '内容方法',
        },
        paragraphs: [
          {
            en: 'We curate place pages with a mix of historical context, visual comparison, concise visitor guidance, and narrative hooks that help each location feel memorable instead of encyclopedic.',
            zh: '我们用“历史背景 + 视觉对比 + 简明访问信息 + 可记忆的叙事钩子”来策划地点页面，让每个地点更像被真正理解，而不是一篇平铺直叙的百科条目。',
          },
        ],
        bullets: [
          {
            en: 'Readable on mobile while standing on-site',
            zh: '站在现场时也能在手机上快速读完',
          },
          {
            en: 'Clear enough for visitors, students, and casual explorers',
            zh: '对游客、学生和普通探索者都足够清晰',
          },
          {
            en: 'Structured so future tours, plaques, and QR experiences can plug in cleanly',
            zh: '结构化设计，方便未来接入步行路线、实体铭牌和二维码体验',
          },
        ],
      },
    ],
    relatedLinks: [
      {
        label: {
          en: 'See How It Works',
          zh: '查看运作方式',
        },
        href: '/how-it-works',
      },
      {
        label: {
          en: 'Explore the Map',
          zh: '探索地图',
        },
        href: '/map',
      },
    ],
  },
  'how-it-works': {
    title: {
      en: 'How It Works',
      zh: '运作方式',
    },
    description: {
      en: 'How locations are curated, displayed, translated, and surfaced across the site.',
      zh: '地点内容如何被整理、展示、翻译，并在整个网站中被发现。',
    },
    intro: {
      en: 'Chrono-Map combines editorial curation, structured location data, and map-based browsing so users can move from a city view to a story view in a few taps.',
      zh: 'Chrono-Map 把内容策划、结构化地点数据与地图浏览结合起来，让用户可以在几次点击之内，从“看城市”切换到“读故事”。',
    },
    updatedAt: sharedUpdatedAt,
    sections: [
      {
        title: {
          en: '1. We Curate Places',
          zh: '1. 我们先策划地点',
        },
        paragraphs: [
          {
            en: 'Each location starts with a place worth visiting or understanding. We select sites that have historical, cultural, cinematic, or civic significance.',
            zh: '每个地点都从“值得到访或理解的地方”开始。我们优先选择具有历史、文化、影视或公共记忆价值的地点。',
          },
        ],
      },
      {
        title: {
          en: '2. We Build a Structured Story Layer',
          zh: '2. 我们为地点建立结构化故事层',
        },
        paragraphs: [
          {
            en: 'Location entries include coordinates, summaries, long-form context, facts, images, and visitor information. That structure lets the same content power the map, cards, and future physical touchpoints like QR plaques.',
            zh: '地点条目包含坐标、摘要、长文背景、趣味事实、图片和访问信息。这种结构化方式可以同时服务地图、信息卡片，以及未来的二维码铭牌等线下触点。',
          },
        ],
      },
      {
        title: {
          en: '3. We Localize for Bilingual Access',
          zh: '3. 我们做双语本地化',
        },
        paragraphs: [
          {
            en: 'English and Chinese content are maintained as first-class experiences. This reduces friction for international visitors and helps stories travel beyond a single language audience.',
            zh: '英文和中文都被当作一等体验来维护，这能降低国际访客的理解门槛，也能让这些城市故事跨越单一语言圈层传播。',
          },
        ],
      },
      {
        title: {
          en: '4. We Improve Through Feedback',
          zh: '4. 我们通过反馈持续修正',
        },
        paragraphs: [
          {
            en: 'Historical interpretation is never finished. When readers, institutions, or partners spot factual issues, missing context, or licensing concerns, we review and update the relevant content.',
            zh: '历史解释从来不是一次写完就结束的事情。若读者、机构或合作方指出事实错误、语境缺失或授权问题，我们会复核并更新对应内容。',
          },
        ],
      },
    ],
    relatedLinks: [
      {
        label: {
          en: 'Read Our Story',
          zh: '阅读我们的故事',
        },
        href: '/about',
      },
      {
        label: {
          en: 'Business Collaboration',
          zh: '查看商业合作',
        },
        href: '/business',
      },
    ],
  },
  business: {
    title: {
      en: 'Business Collaboration',
      zh: '商业合作',
    },
    description: {
      en: 'Ways cultural institutions, tourism operators, brands, and local partners can work with Chrono-Map.',
      zh: '文化机构、旅游运营方、品牌方与本地合作伙伴可以如何与 Chrono-Map 合作。',
    },
    intro: {
      en: 'We are open to partnerships that improve cultural discovery without turning place-based storytelling into ad clutter.',
      zh: '我们欢迎能提升文化发现体验的合作，但不会把地点叙事做成充满广告噪音的页面。',
    },
    updatedAt: sharedUpdatedAt,
    sections: [
      {
        title: {
          en: 'Partnership Types',
          zh: '合作类型',
        },
        paragraphs: [
          {
            en: 'Chrono-Map is suitable for destination marketing, museum and archive partnerships, precinct activation, educational use, and location-based storytelling programs.',
            zh: 'Chrono-Map 适合目的地营销、博物馆与档案机构合作、街区活化、教育用途，以及各种基于地点的故事化项目。',
          },
        ],
        bullets: [
          {
            en: 'Sponsored thematic trails and curated city routes',
            zh: '主题路线赞助与城市导览策划',
          },
          {
            en: 'Digital overlays for heritage sites, galleries, and public spaces',
            zh: '面向遗址、画廊与公共空间的数字内容叠层',
          },
          {
            en: 'Bilingual cultural content programs for visitors and communities',
            zh: '面向游客与社区的双语文化内容项目',
          },
        ],
      },
      {
        title: {
          en: 'What We Need From Partners',
          zh: '我们希望合作方提供什么',
        },
        paragraphs: [
          {
            en: 'The best collaborations provide clear goals, factual source material, image rights clarity, timeline expectations, and a realistic understanding of editorial review.',
            zh: '最顺畅的合作通常建立在这些基础上：目标清晰、资料可信、图片权利明确、时间预期合理，并尊重必要的内容审核流程。',
          },
        ],
      },
      {
        title: {
          en: 'Commercial Principles',
          zh: '商业原则',
        },
        paragraphs: [
          {
            en: 'We label sponsored or commissioned work clearly. We do not promise editorial outcomes that conflict with historical integrity, safety, or public trust.',
            zh: '我们会清楚标注赞助或委托内容，也不会承诺任何会损害历史准确性、安全性或公众信任的编辑结果。',
          },
        ],
      },
    ],
    relatedLinks: [
      {
        label: {
          en: 'Contact Us',
          zh: '联系我们',
        },
        href: '/contact',
      },
    ],
  },
  contact: {
    title: {
      en: 'Contact Us',
      zh: '联系我们',
    },
    description: {
      en: 'How to reach the Chrono-Map team for corrections, partnerships, licensing, or general feedback.',
      zh: '如何就内容更正、商业合作、授权事宜或一般反馈联系 Chrono-Map 团队。',
    },
    intro: {
      en: 'The fastest way to reach us is by email. If your message relates to factual corrections, include the location name, the issue, and any supporting source.',
      zh: '最快的联系方式是电子邮件。如果你的来信涉及事实更正，请附上地点名称、问题说明以及可核验的参考来源。',
    },
    updatedAt: sharedUpdatedAt,
    sections: [
      {
        title: {
          en: 'General Contact',
          zh: '常规联系',
        },
        paragraphs: [
          {
            en: 'Email: hello@chrono-map.com',
            zh: '电子邮箱：hello@chrono-map.com',
          },
          {
            en: 'GitHub: https://github.com',
            zh: 'GitHub：https://github.com',
          },
          {
            en: 'We aim to review genuine inquiries within 5 business days.',
            zh: '我们通常会在 5 个工作日内处理有效来信。',
          },
        ],
      },
      {
        title: {
          en: 'Please Contact Us About',
          zh: '以下事项欢迎联系',
        },
        paragraphs: [
          {
            en: 'We welcome factual corrections, copyright or image licensing questions, requests for collaboration, press inquiries, and feedback about translation quality or accessibility.',
            zh: '我们欢迎内容事实更正、版权或图片授权咨询、合作提案、媒体联系，以及关于翻译质量或可访问性的反馈。',
          },
        ],
      },
      {
        title: {
          en: 'Responsible Disclosure',
          zh: '安全问题反馈',
        },
        paragraphs: [
          {
            en: 'If you discover a security issue, please contact us privately with steps to reproduce it. Do not publish exploit details before we have had a reasonable chance to review and respond.',
            zh: '如果你发现了安全问题，请先私下联系我们并提供复现方式。在我们有合理时间完成确认和响应前，请不要公开披露利用细节。',
          },
        ],
      },
    ],
  },
  legal: {
    title: {
      en: 'Legal Information',
      zh: '法律信息',
    },
    description: {
      en: 'A general legal overview for using Chrono-Map, including intellectual property, notices, and policy links.',
      zh: 'Chrono-Map 的通用法律说明，包括知识产权、通知方式和相关政策入口。',
    },
    intro: {
      en: 'This page provides a plain-language overview of the legal framework around Chrono-Map. It should be read together with our Privacy Policy, Terms of Service, and Cookie Policy.',
      zh: '本页以通俗方式概述 Chrono-Map 的法律框架，应与《隐私政策》《服务条款》和《Cookie 政策》一并阅读。',
    },
    updatedAt: sharedUpdatedAt,
    sections: [
      {
        title: {
          en: 'Site Operator and Notices',
          zh: '网站运营与通知',
        },
        paragraphs: [
          {
            en: 'Chrono-Map is operated as a cultural storytelling website and product concept under the Chrono-Map brand. For legal notices, licensing discussions, or rights-related questions, please contact hello@chrono-map.com.',
            zh: 'Chrono-Map 以文化叙事网站和产品形态的方式运营。若涉及法律通知、授权洽谈或权利相关问题，请联系 hello@chrono-map.com。',
          },
        ],
      },
      {
        title: {
          en: 'Intellectual Property',
          zh: '知识产权',
        },
        paragraphs: [
          {
            en: 'Unless otherwise stated, the site design, editorial copy, layout, branding, and original compilations are protected by intellectual property laws. Third-party names, images, and marks remain the property of their respective owners.',
            zh: '除非另有说明，本站的设计、编辑文案、版式、品牌元素和原创编排均受知识产权法律保护。第三方名称、图片与商标仍归各自权利人所有。',
          },
        ],
      },
      {
        title: {
          en: 'Policy Documents',
          zh: '政策文件',
        },
        paragraphs: [
          {
            en: 'Our Privacy Policy explains how personal data is handled. Our Terms of Service govern site use. Our Cookie Policy explains the limited cookies and similar technologies relevant to this website.',
            zh: '《隐私政策》说明个人数据如何被处理；《服务条款》约束网站使用方式；《Cookie 政策》解释本网站涉及的有限 Cookie 与类似技术。',
          },
        ],
      },
      {
        title: {
          en: 'No Legal Advice',
          zh: '非法律意见',
        },
        paragraphs: [
          {
            en: 'Content on this page is provided for transparency and general guidance. It is not legal advice and should not replace advice from a qualified lawyer in your jurisdiction.',
            zh: '本页内容仅用于透明披露和一般说明，并不构成法律意见，也不能替代你所在法域中合格律师的专业建议。',
          },
        ],
      },
    ],
    relatedLinks: [
      {
        label: {
          en: 'Privacy Policy',
          zh: '隐私政策',
        },
        href: '/privacy',
      },
      {
        label: {
          en: 'Terms of Service',
          zh: '服务条款',
        },
        href: '/terms',
      },
      {
        label: {
          en: 'Cookie Policy',
          zh: 'Cookie 政策',
        },
        href: '/cookies',
      },
    ],
  },
  privacy: {
    title: {
      en: 'Privacy Policy',
      zh: '隐私政策',
    },
    description: {
      en: 'How Chrono-Map handles basic visitor data, support requests, and third-party service data needed to operate the site.',
      zh: 'Chrono-Map 如何处理基本访客数据、联系请求，以及网站运行所需的第三方服务数据。',
    },
    intro: {
      en: 'Chrono-Map is designed as a low-friction public website. We do not currently require user accounts to browse the site, and we aim to limit personal data collection to what is reasonably necessary to operate and improve the service.',
      zh: 'Chrono-Map 是一个低门槛公开网站。当前浏览网站不需要注册账号，我们也尽量把个人数据收集控制在运营和改进服务所合理必需的范围内。',
    },
    updatedAt: sharedUpdatedAt,
    sections: [
      {
        title: {
          en: 'Data We May Receive',
          zh: '我们可能接收的数据',
        },
        paragraphs: [
          {
            en: 'Depending on how you interact with the site, we may receive basic technical data such as IP address, browser type, device information, referral source, requested pages, and timestamps through our hosting or infrastructure providers.',
            zh: '根据你的访问方式，我们可能通过托管或基础设施服务商接收一些基础技术数据，例如 IP 地址、浏览器类型、设备信息、来源页面、访问页面和时间戳。',
          },
          {
            en: 'If you contact us directly, we may receive your name, email address, message content, and any files or references you choose to provide.',
            zh: '如果你主动联系我们，我们可能会收到你的姓名、邮箱、来信内容，以及你自愿提供的附件或参考资料。',
          },
        ],
      },
      {
        title: {
          en: 'How We Use Data',
          zh: '我们如何使用数据',
        },
        paragraphs: [
          {
            en: 'We use limited data to deliver the website, maintain stability, understand broad usage patterns, reply to legitimate inquiries, investigate abuse, and improve content quality.',
            zh: '这些有限数据主要用于提供网站服务、维持稳定性、理解整体使用情况、回复合理咨询、调查滥用行为，以及改进内容质量。',
          },
        ],
        bullets: [
          {
            en: 'Operate map, localization, and hosting infrastructure',
            zh: '支撑地图、本地化和托管基础设施运行',
          },
          {
            en: 'Review reported factual, legal, or technical issues',
            zh: '处理用户反馈的事实、法律或技术问题',
          },
          {
            en: 'Protect the site from misuse, automated abuse, and operational risk',
            zh: '保护网站免受滥用、自动化攻击与运营风险影响',
          },
        ],
      },
      {
        title: {
          en: 'Third-Party Services',
          zh: '第三方服务',
        },
        paragraphs: [
          {
            en: 'Chrono-Map relies on third-party providers such as hosting services and map infrastructure. Those providers may process technical request data as part of serving content and map assets.',
            zh: 'Chrono-Map 依赖托管服务和地图基础设施等第三方服务商，这些服务商在提供页面和地图资源时，可能会处理必要的技术请求数据。',
          },
          {
            en: 'If optional analytics or additional integrations are enabled in the future, this policy will be updated to reflect that change.',
            zh: '如果未来启用了可选分析工具或更多第三方集成，我们会更新本政策以反映这些变化。',
          },
        ],
      },
      {
        title: {
          en: 'Data Retention and Rights',
          zh: '数据保留与权利',
        },
        paragraphs: [
          {
            en: 'We keep personal data only for as long as reasonably necessary for the purpose it was collected, or as required by law. Where applicable, you may request access, correction, or deletion by contacting hello@chrono-map.com.',
            zh: '我们仅在实现收集目的所合理必要的期间内，或法律要求的期间内保留个人数据。在适用情况下，你可以通过 hello@chrono-map.com 请求访问、更正或删除相关数据。',
          },
        ],
      },
    ],
  },
  terms: {
    title: {
      en: 'Terms of Service',
      zh: '服务条款',
    },
    description: {
      en: 'The rules for accessing and using the Chrono-Map website and its editorial content.',
      zh: '访问和使用 Chrono-Map 网站及其编辑内容时需要遵守的规则。',
    },
    intro: {
      en: 'By accessing or using Chrono-Map, you agree to use the site lawfully, responsibly, and in a way that does not interfere with the service, its data, or other users.',
      zh: '访问或使用 Chrono-Map 即表示你同意以合法、负责且不干扰服务、数据或其他用户的方式使用本网站。',
    },
    updatedAt: sharedUpdatedAt,
    sections: [
      {
        title: {
          en: 'Permitted Use',
          zh: '允许的使用方式',
        },
        paragraphs: [
          {
            en: 'You may browse the site, read location pages, share links, and use the service for personal, educational, editorial, or internal evaluation purposes, provided you comply with applicable law and these terms.',
            zh: '在遵守适用法律和本条款的前提下，你可以浏览网站、阅读地点页面、分享链接，并将本服务用于个人、教育、编辑或内部评估用途。',
          },
        ],
      },
      {
        title: {
          en: 'Prohibited Conduct',
          zh: '禁止行为',
        },
        paragraphs: [
          {
            en: 'You may not misuse the site, attempt unauthorized access, interfere with infrastructure, or use automated means to extract the site at scale without written permission.',
            zh: '你不得滥用本网站、尝试未授权访问、干扰基础设施，或在未经书面许可的情况下通过自动化方式大规模提取网站内容。',
          },
        ],
        bullets: [
          {
            en: 'No bulk scraping, harvesting, or systematic copying of location datasets',
            zh: '不得批量抓取、采集或系统性复制地点数据集',
          },
          {
            en: 'No model training, dataset creation, or republication of substantial content without permission',
            zh: '未经许可，不得将大量内容用于模型训练、数据集构建或再发布',
          },
          {
            en: 'No attempts to disable, probe, or degrade site performance or security controls',
            zh: '不得尝试绕过、探测或削弱网站性能与安全控制',
          },
        ],
      },
      {
        title: {
          en: 'Content Ownership and Accuracy',
          zh: '内容权属与准确性',
        },
        paragraphs: [
          {
            en: 'Chrono-Map content is provided for informational and cultural discovery purposes. We aim for accuracy, but historical interpretation may evolve and some third-party information may change over time.',
            zh: 'Chrono-Map 内容主要用于信息参考和文化发现。我们会尽量确保准确，但历史解释可能持续演变，部分第三方信息也可能随时间变化。',
          },
        ],
      },
      {
        title: {
          en: 'Liability and Changes',
          zh: '责任限制与条款更新',
        },
        paragraphs: [
          {
            en: 'The site is provided on an “as is” and “as available” basis to the extent permitted by law. We may modify, suspend, or update content and features without notice. Continued use after an update means you accept the revised terms.',
            zh: '在法律允许的范围内，本网站按“现状”和“可用”基础提供。我们可以在不另行通知的情况下修改、暂停或更新内容与功能；更新后继续使用即视为你接受修订后的条款。',
          },
        ],
      },
    ],
  },
  cookies: {
    title: {
      en: 'Cookie Policy',
      zh: 'Cookie 政策',
    },
    description: {
      en: 'How cookies and similar technologies are used on Chrono-Map.',
      zh: 'Chrono-Map 如何使用 Cookie 和类似技术。',
    },
    intro: {
      en: 'Chrono-Map keeps cookie usage limited. Because this is primarily a public content website, we aim to avoid unnecessary tracking and advertising technologies.',
      zh: 'Chrono-Map 会尽量控制 Cookie 的使用范围。由于这是一个以公开内容为主的网站，我们会避免引入不必要的跟踪和广告技术。',
    },
    updatedAt: sharedUpdatedAt,
    sections: [
      {
        title: {
          en: 'Essential and Functional Cookies',
          zh: '必要与功能性 Cookie',
        },
        paragraphs: [
          {
            en: 'Some cookies or similar storage technologies may be used by the framework, hosting environment, or localization flow to keep the site functioning properly, maintain session-level behavior, or remember language-related preferences.',
            zh: '框架、托管环境或语言切换流程可能会使用少量 Cookie 或类似存储机制，以保证网站正常运行、维持会话级行为，或记住语言相关偏好。',
          },
        ],
      },
      {
        title: {
          en: 'Third-Party Services',
          zh: '第三方服务相关 Cookie',
        },
        paragraphs: [
          {
            en: 'Map and infrastructure providers may set or rely on cookies, local storage, or similar technologies when serving map tiles, security services, or embedded resources. Their handling is governed by their own policies.',
            zh: '地图与基础设施服务商在提供地图瓦片、安全服务或嵌入资源时，可能会设置或依赖 Cookie、本地存储或类似技术。相关处理受这些服务商自身政策约束。',
          },
        ],
      },
      {
        title: {
          en: 'Analytics and Future Changes',
          zh: '分析工具与未来变化',
        },
        paragraphs: [
          {
            en: 'If we enable optional analytics, audience measurement, or consent-based tooling in the future, we will update this policy and, where required, provide additional notice or choices.',
            zh: '如果未来启用了可选分析、受众测量或基于同意的工具，我们会更新本政策，并在需要时提供额外提示或选择机制。',
          },
        ],
      },
      {
        title: {
          en: 'Managing Cookies',
          zh: '如何管理 Cookie',
        },
        paragraphs: [
          {
            en: 'Most browsers let you block, clear, or restrict cookies. Doing so may affect some site features, including map behavior or localization convenience.',
            zh: '大多数浏览器都允许你阻止、清除或限制 Cookie，但这样做可能影响部分网站功能，包括地图表现或语言切换体验。',
          },
        ],
      },
    ],
  },
};

export function isSitePageSlug(value: string): value is SitePageSlug {
  return sitePageSlugs.includes(value as SitePageSlug);
}

export function getLocalizedSitePage(locale: Locale, slug: SitePageSlug): LocalizedSitePage {
  const page = sitePages[slug];

  return {
    slug,
    title: page.title[locale],
    description: page.description[locale],
    intro: page.intro[locale],
    updatedAt: page.updatedAt[locale],
    relatedTitle: sharedRelatedTitle[locale],
    sections: page.sections.map((section) => ({
      title: section.title[locale],
      paragraphs: section.paragraphs.map((paragraph) => paragraph[locale]),
      bullets: section.bullets?.map((bullet) => bullet[locale]),
    })),
    relatedLinks: page.relatedLinks?.map((link) => ({
      label: link.label[locale],
      href: `/${locale}${link.href}`,
    })),
  };
}
