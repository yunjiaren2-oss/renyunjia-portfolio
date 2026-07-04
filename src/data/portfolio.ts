import { MarketingCard, CampaignItem, InDepthReport } from '../types';

export const marketingCards: MarketingCard[] = [
  {
    id: 'writing',
    title: '一、内容策划与写作',
    icon: 'edit-3',
    color: '#c6c06a',
    bgColor: '#faf8ec',
    borderColor: '#b2a95c',
    accentColor: '#a1964d',
    summary: '参与内容选题策划、提报，设计采访提纲并完成人物采访与信息整理，通过捕捉用户情绪与共鸣点，将故事转化为具有传播力的内容表达。多篇内容阅读量达10w+，并拓展播客这一新型内容形态。',
    details: [
      {
        label: '📄 微信公众号文章 (Featured WeChat Articles)',
        links: [
          { text: '12月不是结束，而是好消息的开始｜Goodnews年末回访 ↗', url: 'https://mp.weixin.qq.com/s/xaVrpZ2IvhLJhAbBylykZg', icon: 'link' },
          { text: '郑智化退网了，但她们的声音不该消失｜和4位有障人士对谈 ↗', url: 'https://mp.weixin.qq.com/s/oV8KYvt0LDORPYSTM8ZOww', icon: 'link' },
          { text: '走得足够远就能逃离困境吗？阎鹤祥说，不能 ↗', url: 'https://mp.weixin.qq.com/s/RvI1mAFk_RmCOKlfYb2WRQ', icon: 'link' },
          { text: '朋友是什么？这是《请回答1988》的59个答案 ↗', url: 'https://mp.weixin.qq.com/s/xPJ1sck8cbV4diDat6HVlA', icon: 'link' }
        ]
      },
      {
        label: '📕 小红书策划 (RED Campaign)',
        links: [
          { text: '“是的，我上网就是为了看这些好事发生” ↗', url: 'http://xhslink.com/o/2EcfsdvWRVR', icon: 'instagram' },
          { text: '“永远不要为打翻的牛奶哭泣，网球同理” ↗', url: 'http://xhslink.com/o/4qGGCfHLgJD', icon: 'instagram' }
        ]
      },
      {
        label: '🌌 小宇宙播客 (Xiaoyuzhou Podcast)',
        links: [
          { text: '和4位有障人士对谈：郑智化退网了，但她们的声音不该消失 ↗', url: 'https://www.xiaoyuzhoufm.com/episode/6939096c498c58d63aa9ac9b', icon: 'mic' }
        ]
      }
    ]
  },
  {
    id: 'brand',
    title: '二、品牌营销',
    icon: 'award',
    color: '#e8afb7',
    bgColor: '#faf4f5',
    borderColor: '#dca1aa',
    accentColor: '#d89ba3',
    summary: '参与各大品牌合作内容的策划与执行。在品牌商业内核与社交媒体原生情感表达之间建立高转化桥梁，实现品效合一，多维度提升品牌声量。',
    details: [
      {
        label: '🎁 美团商业合作 (Meituan Co-branding)',
        links: [
          { text: '美团品牌推文：在老家把生意做成的人，做对了什么？ ↗', url: 'https://mp.weixin.qq.com/s/-uZ4nlpmbla-25HiQyt9vQ', icon: 'link' }
        ]
      },
      {
        label: '🚗 AUDI品牌营销 (AUDI Campaign)',
        links: [
          { text: '微信：追赶风的人 ↗', url: 'https://mp.weixin.qq.com/s/0wgcsSqo1ghpMj316JZ4LA', icon: 'link' },
          { text: '小红书：想问问大家，平时都是怎么找搭子的？ ↗', url: 'http://xhslink.com/o/28jGwj56Wvg', icon: 'instagram' },
          { text: '微博：互动策划 ① ↗', url: 'https://weibo.com/3818859252/QnpIynP5G', icon: 'link' },
          { text: '微博：互动策划 ② ↗', url: 'https://weibo.com/3818859252/QobfoyhJS', icon: 'link' },
          { text: '微博：互动策划 ③ ↗', url: 'https://weibo.com/3818859252/QogKlweWV', icon: 'link' },
          { text: '微博：互动策划 ④ ↗', url: 'https://weibo.com/3818859252/Qohx3qTPq', icon: 'link' },
          { text: '微博：互动策划 ⑤ ↗', url: 'https://weibo.com/3818859252/QoiI7kxuX', icon: 'link' }
        ]
      }
    ]
  },
  {
    id: 'personal',
    title: '三、小红书个人账号爆款笔记',
    icon: 'trending-up',
    color: '#cdc3d0',
    bgColor: '#faf7fa',
    borderColor: '#b4a5b7',
    accentColor: '#a192a5',
    summary: '观察同一题材内容现象，抓住目标受众需求与痛点，做差异化内容，成功产出爆款笔记。',
    details: [
      {
        label: '📕 个人小红书爆款图文 (RED Personal Viral Cases)',
        links: [
          { text: '爆款记录：6个月没学到1000h的上岸记录 (6w+浏览｜3k+点赞｜1k+收藏) ↗', url: 'http://xhslink.com/o/2pSHJtUR59g', icon: 'instagram' },
          { text: '干货指南：怎么高质量的水一篇课程论文（三步搞定）(3w+浏览｜2k+点赞｜3k+收藏) ↗', url: 'http://xhslink.com/o/8ipjh6nzpY9', icon: 'instagram' }
        ]
      },
    
    ]
  }
];

export const campaignItems: CampaignItem[] = [
  {
    id: 'goodnight',
    title: '🌙 新世相「晚安短信」 (The "Goodnight" Campaign)',
    stats: '全网曝光 5亿+ ｜ 刷屏级情感营销',
    overview: '在微信、小红书、微博、线下等全渠道，参与策划执行新世相「晚安短信」项目。「晚安短信计划」是新世相从2018年起推出的跨年行动项目，从每年12月，每晚10点，每晚一条短信，陪伴百万人共同跨年。',
    role: '在复杂协同项目中主动提出想法并推动落地，提升用户参与体验与项目执行效率。',
    proactivePushList: [
      {
        title: '「晚安手写信」城市寻宝',
        desc: '在城市各个角落藏下手写信，引导用户线下寻宝并进行社交媒体晒单分享，将线上活动落地到线下参与'
      },
      {
        title: '「晚安」剧院与城市漫游 ',
        desc: '策划将晚安短信带到话剧院巡演现场及各城市地标，设计富有仪式感的打卡，丰富线下活动形式，提升用户参与仪式感。'
      }
    ],
    photos: [
      {
        src: '/images/image-1.png',
        caption: '「晚安」剧院 ',
        rotation: 'rotate-1',
        aspect: 'aspect-[3/4]',
        objectFit: 'object-contain',
        isFeatured: true
      },
      {
        src: '/images/image-2.png',
        caption: '「晚安手写信」城市寻宝  ',
        rotation: '-rotate-1',
        aspect: 'aspect-[3/4]',
        objectFit: 'object-contain'
      },
      {
        src: '/images/image-5.png',
        caption: '「晚安城市里的人」深夜回家 ',
        rotation: 'rotate-1',
        aspect: 'aspect-[3/4]',
        objectFit: 'object-contain'
      },
      {
        src: '/images/image-6.png',
        caption: '「晚安城市里的人」挤地铁 ',
        rotation: '-rotate-1',
        aspect: 'aspect-[3/4]',
        objectFit: 'object-contain'
      },
      {
        src: '/images/image-7.png',
        caption: '「晚安城市里的人」想上岸的人 ',
        rotation: 'rotate-2',
        aspect: 'aspect-[3/4]',
        objectFit: 'object-contain'
      }
    ]
  },
  {
    id: 'afternoon-3pm',
    title: '🕒 「她在下午三点起笔」女性长辈艺术展 (She at 3 PM)',
    stats: '线下日均观展 4W+ ｜ 妇女节深度情感企划',
    overview: '在妇女节期间，参与策划并执行「她在下午三点起笔」女性长辈艺术展。探讨女性角色转型、家庭付出与自我实现的张力，为女性长辈搭建表达自我的舞台。',
    role: '参与展览策划、联络协调、内容推文撰写、线上线下联动宣发。',
    highlights: [
      {
        title: '🎨 核心视觉与装置设计',
        items: [
          '设计多个标志性艺术装置，引导观众在各个角落作画。',
          '一面女性创作互动墙：你在人生的几点？欢迎画下你的第一笔。',
          '室外时钟装置及地贴、电梯厅、大屏等展陈物料。户外时钟装置：一起走进她们的下午3点。',
          '展览指导单位：长沙市妇联、长沙市妇女儿童发展基金会、长沙市岳麓区银盆岭街道妇女联合会。'
        ]
      },
      {
        title: '📈 传播战绩与媒体反馈',
        items: [
          '线下表现：日均观展人数 4W+，成为长沙妇女节现象级线下内容。',
          '线上传播：#给100位女性长辈的画展# 浏览量 16W+，原创发帖数 1400+，#长沙万象城# 话题浏览量增长近百万。',
          '媒体传播：获长沙市妇联官方发布，被红网时刻、文旅湘江、湖南湘江新区等近10家媒体报道。'
        ]
      }
    ],
    photos: [
      {
        src: '/images/image-8.png',
        caption: '画展精美现场展陈',
        rotation: '-rotate-1',
        aspect: 'aspect-[3/4]',
        objectFit: 'object-contain',
        isFeatured: true
      },
      {
        src: '/images/image-9.png',
        caption: '女性创作分享互动墙',
        rotation: 'rotate-2',
        aspect: 'aspect-[3/4]',
        objectFit: 'object-contain'
      }
    ]
  },
  {
    id: 'women-photos',
    title: '📸 女性工作照',
    stats: '全网曝光千万级 ｜ 小红书双热点',
    overview: '妇女节策划，借着工作照，将一个女性的“社会价值”与“自我实现”视觉化，呈现“她们已经是谁”的结果，也是“她们正在成为什么”的过程；呈现不是被观看的“她”，而是主动观看世界、并着手去改变世界的“她”。通过一次全网征集，策划一场共同行动，完成一次话题传播。',
    role: '照片筛选与内容把控、用户沟通与建联、视频剪辑。',
    highlights: [
      {
        title: '📊 最终传播数据',
        items: [
          '小红书双热点话题，词条阅读量均为 500W+',
          '热门话题：#被深圳的妇女节大屏感动到了#；#妇女节在大屏里看见各行各业的她#',
          '单个点赞破 10W+ 热帖较多，全网整体曝光量破千万。'
        ]
      }
    ],
    photos: [
      {
        src: '/images/image-3.png',
        caption: '各行各业的“她”登上大屏',
        rotation: '-rotate-1',
        aspect: 'aspect-[3/4]',
        objectFit: 'object-contain',
        isFeatured: true
      },
      {
        src: '/images/image-4.png',
        caption: '登上小红书热榜',
        rotation: 'rotate-2',
        aspect: 'aspect-[3/4]',
        objectFit: 'object-contain',
        objectPosition: 'object-top'
      }
    ]
  }
];

export const reportsData: InDepthReport[] = [
  {
    id: 'qingzang-line',
    title: '和自闭症儿子骑行青藏线后：不再纠结未来，他允许一切发生',
    quotes: [
      '“四年前，先后遭遇父母去世、婚姻破裂，李庆胜辞去了工作，一度绝望。”',
      '“而今，李庆胜父子俩在青藏线上留下了骑行的车痕... 完成这趟‘不可能’的骑行之后，李庆胜说：‘一切来源于我的自闭症儿子。’”'
    ],
    links: [
      { text: '澎湃特稿：不再纠结未来，他允许一切发生 ↗', url: 'https://m.thepaper.cn/newsDetail_forward_31246956', type: 'link' },
      { text: '澎湃视频：9岁自闭症男孩用48天骑行青藏线 ↗', url: 'https://m.thepaper.cn/newsDetail_forward_31251232', type: 'video' }
    ],
    description: '澎湃新闻独家专访。关注心智障碍群体的家庭自救与社会接纳，深入探访一个孤独症家庭跋涉数千公里的救赎旅途，引发广泛社会讨论与暖心反响。'
  },
  {
    id: 'ex-prisoners',
    title: '《刑释人员再就业》系列深度报道',
    quotes: [
      '“聚焦刑释人员就业现状，剖析政策执行堵点与法律救济短板，从企业责任、帮教机制探讨破局之道。”'
    ],
    links: [
      { text: '系列①丨无法回避的歧视：“你坐过牢，我们不会用” ↗', url: 'https://m.thepaper.cn/newsDetail_forward_31428502', type: 'link' },
      { text: '系列②丨平等就业权与公众安全顾虑如何平衡？ ↗', url: 'https://m.thepaper.cn/newsDetail_forward_31430599', type: 'link' },
      { text: '系列③丨将“反歧视”从文件写入现实，多地已在实践 ↗', url: 'https://m.thepaper.cn/newsDetail_forward_31450674', type: 'link' }
    ],
    description: '刑释人员回归社会的关键一步是再就业。该系列调查深入司法、企业、社区和刑释人员群体，探寻消除社会隔阂、平衡公众关切与劳动权保障的可行良方。'
  },
  {
    id: 'autism-schools',
    title: '《校门内外的星娃们》自闭症学生教育系列报道',
    quotes: [
      '“如何为自闭症儿童提供专业、个性化的教育支持？星娃们的求学路面临哪些卡点？”'
    ],
    links: [
      { text: '系列①丨三个自闭症孩子家庭的教育“突围战” ↗', url: 'https://m.thepaper.cn/newsDetail_forward_31686794', type: 'link' },
      { text: '系列②丨专访邹小兵：望不再讨论自闭症孩子“能不能上学” ↗', url: 'https://m.thepaper.cn/newsDetail_forward_31686824', type: 'link' },
      { text: '系列③丨三位大学“星娃”讲述象牙塔之路 ↗', url: 'https://m.thepaper.cn/newsDetail_forward_31699903', type: 'link' }
    ],
    description: '通过采访自闭症儿童家庭、知名发育儿科专家邹小兵教授，以及考上大学的心智障碍青年，展现自闭症群体从融合教育到高等教育通路上的艰难与希望。'
  },
  {
    id: 'other-news',
    title: '社会法治与民生纪实调查',
    links: [
      { text: '揭秘主播丨喝了长高？一儿童奶粉被指篡改数据广告宣传 ↗', url: 'https://m.thepaper.cn/newsDetail_forward_31948490', type: 'link' },
      { text: '阿里拍卖风波丨客户付余款遭系统拦截，重拍再收费引争议 ↗', url: 'https://m.thepaper.cn/newsDetail_forward_31935173', type: 'link' },
      { text: '法治追踪丨汕头12岁男童烫伤8天后死亡：亲属以新罪名重新报案 ↗', url: 'https://m.thepaper.cn/newsDetail_forward_32399846', type: 'link' },
      { text: '新春基层纪实丨95后新农人拍视频“巡村”：卖货，也展示家乡 ↗', url: 'https://m.thepaper.cn/newsDetail_forward_32611709', type: 'link' }
    ],
    description: '澎湃新闻社会版/新媒体版重点稿件。题材包括消费陷阱拆解、民生矛盾追踪、以及乡村振兴人物特写，丰富的采访、策划、写作经验。'
  }
];
