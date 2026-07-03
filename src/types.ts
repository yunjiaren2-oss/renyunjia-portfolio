export interface ComicItem {
  id: number;
  vol: string;
  title: string;
  summary: string;
  category: string;
  stats?: string;
  tags: string[];
  url?: string;
  script?: {
    concept: string;
    panels: {
      number: number;
      visual: string;
      dialogue: string;
      pacing: '快' | '缓' | '定格' | '推进';
    }[];
  };
}

export interface MarketingCard {
  id: string;
  title: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
  summary: string;
  details: {
    label: string;
    links: { text: string; url: string; icon: 'link' | 'instagram' | 'mic' | 'file-text' }[];
    unreleased?: string[];
  }[];
}

export interface CampaignItem {
  id: string;
  title: string;
  stats: string;
  overview: string;
  role: string;
  proactivePush?: {
    title: string;
    desc: string;
  };
  proactivePushList?: {
    title: string;
    desc: string;
  }[];
  highlights?: {
    title: string;
    items: string[];
  }[];
  photos: {
    src: string;
    caption: string;
    rotation: string;
    aspect?: string;
    objectFit?: string;
    objectPosition?: string;
    bgClass?: string;
    colSpan?: string;
    isFeatured?: boolean;
  }[];
}

export interface InDepthReport {
  id: string;
  title: string;
  quotes?: string[];
  links: { text: string; url: string; type: 'link' | 'video' | 'file' }[];
  description?: string;
}
