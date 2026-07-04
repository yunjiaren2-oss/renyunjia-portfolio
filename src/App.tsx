import React, { useState, useEffect } from 'react';
import {
  User,
  TrendingUp,
  Terminal,
  FolderClosed,
  ChevronRight,
  ChevronLeft,
  Mail,
  Copy,
  Check,
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';
import { ComicItem } from './types';
import { comicsData } from './data/comics';
import ComicGrid from './components/ComicGrid';
import ComicModal from './components/ComicModal';
import MarketingAccordion from './components/MarketingAccordion';
import CampaignsList from './components/CampaignsList';
import InDepthReportsList from './components/InDepthReportsList';
import { resolveAssetPath } from './components/ImageWithFallback';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [activePage, setActivePage] = useState<number>(1);
  const activeSpread = Math.ceil(activePage / 2);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNextPage = () => {
    if (window.innerWidth < 768) {
      if (activePage < 6) {
        setActivePage(activePage + 1);
      }
    } else {
      if (activePage === 1 || activePage === 2) {
        setActivePage(3);
      } else if (activePage === 3 || activePage === 4) {
        setActivePage(5);
      }
    }
  };

  const handlePrevPage = () => {
    if (window.innerWidth < 768) {
      if (activePage > 1) {
        setActivePage(activePage - 1);
      } else {
        setIsOpened(false);
      }
    } else {
      if (activePage === 5 || activePage === 6) {
        setActivePage(3);
      } else if (activePage === 3 || activePage === 4) {
        setActivePage(1);
      } else {
        setIsOpened(false);
      }
    }
  };

  const [selectedComic, setSelectedComic] = useState<ComicItem | null>(null);
  
  // Avatar fallback state to support avatar.png, avatar.jpg, avatar.jpeg, avatar.webp
  const [avatarSrc, setAvatarSrc] = useState<string>('/images/avatar.png');
  const [hasAvatar, setHasAvatar] = useState<boolean>(true);

  const handleAvatarError = () => {
    if (avatarSrc === '/images/avatar.png') {
      setAvatarSrc('/images/avatar.jpg');
    } else if (avatarSrc === '/images/avatar.jpg') {
      setAvatarSrc('/images/avatar.jpeg');
    } else if (avatarSrc === '/images/avatar.jpeg') {
      setAvatarSrc('/images/avatar.webp');
    } else {
      setHasAvatar(false);
    }
  };

  // Custom toast notification state (avoids window.alert inside iframes!)
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleCopyWechat = () => {
    navigator.clipboard.writeText('15337053496');
    showToast('📋 微信 / 手机号 15337053496 已成功复制到剪贴板！');
  };

  const handleNextComic = () => {
    if (!selectedComic) return;
    const currentIndex = comicsData.findIndex((c) => c.id === selectedComic.id);
    if (currentIndex !== -1 && currentIndex < comicsData.length - 1) {
      setSelectedComic(comicsData[currentIndex + 1]);
    } else {
      setSelectedComic(comicsData[0]); // Wrap around
    }
  };

  const handlePrevComic = () => {
    if (!selectedComic) return;
    const currentIndex = comicsData.findIndex((c) => c.id === selectedComic.id);
    if (currentIndex > 0) {
      setSelectedComic(comicsData[currentIndex - 1]);
    } else {
      setSelectedComic(comicsData[comicsData.length - 1]); // Wrap around
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#b0c8d6] flex items-center justify-center p-4 md:p-6 select-none relative overflow-x-hidden font-serif">
      
      {/* 3D Paper Wrinkle Filter definitions */}
      <svg className="hidden">
        <filter id="paper-wrinkle">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="5" result="noise" />
          <feDiffuseLighting in="noise" lightingColor="#fff" surfaceScale="3" result="light">
            <feDistantLight azimuth="45" elevation="45" />
          </feDiffuseLighting>
          <feBlend mode="multiply" in="SourceGraphic" in2="light" result="blend" />
        </filter>
      </svg>

      {/* Decorative grass/hills background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-0">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full h-full">
          <path d="M0,120 Q360,60 720,130 T1440,100 L1440,200 L0,200 Z" fill="#69854d" opacity="0.6"/>
          <path d="M0,150 Q400,100 800,160 T1440,130 L1440,200 L0,200 Z" fill="#526f39" opacity="0.8"/>
        </svg>
      </div>

      {/* Twinkling star decorations */}
      <div className="absolute top-16 left-[10%] text-white opacity-40 animate-pulse text-2xl">★</div>
      <div className="absolute top-36 right-[12%] text-white opacity-50 text-xl">★</div>
      <div className="absolute bottom-36 left-[6%] text-white opacity-30 text-3xl">★</div>

      {/* Inner Frame for entire layout */}
      <div className="w-full max-w-7xl h-[92vh] max-h-[820px] relative flex items-center justify-center z-10">
        
        {/* ==========================================
             1. Closed Folder Cover View
             ========================================== */}
        {!isOpened ? (
          <div
            id="folder-cover"
            onClick={() => setIsOpened(true)}
            className="w-[390px] h-[510px] max-w-full bg-[#533b2a] rounded-2xl border-2 border-[#3d2a1d] shadow-[0_25px_50px_rgba(40,25,15,0.4)] relative flex flex-col justify-between p-7 cursor-pointer hover:scale-[1.03] active:scale-[0.99] transform transition-all duration-500 ease-out group"
          >
            {/* Paper clip sticking out from the top */}
            <div className="absolute -top-3 right-12 w-24 h-7 bg-white border border-stone-200 shadow-sm rounded-t z-10 flex justify-center pt-0.5">
              <div className="w-2.5 h-8 border-[1.5px] border-stone-400 rounded-full absolute -top-2 z-20 bg-transparent"></div>
            </div>

            {/* Red and white checked butterfly ribbon sticker on top-left */}
            <div className="absolute -top-2.5 -left-2.5 z-20 w-14 h-14 pointer-events-none drop-shadow-md">
              <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20 C25 -5, 25 35, 30 30 C35 35, 35 -5, 50 20 C40 25, 20 25, 10 20 Z" fill="#cf5044" />
                <rect x="26" y="24" width="8" height="8" rx="2" fill="#b93b30" />
                <path d="M10 20 L50 20 M20 5 L40 45" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="2 2" />
                <path d="M28 30 L15 50 M32 30 L45 48" stroke="#cf5044" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Inner Content of Cover */}
            <div className="flex-1 flex flex-col justify-center items-center text-center mt-4">
              <h1 className="handwritten text-white text-5xl md:text-6xl tracking-wider font-bold select-none drop-shadow">
                Postfolio
              </h1>
              <p className="text-[10px] text-stone-300 tracking-[0.25em] font-mono mt-1.5 select-none">
                Yunjia Ren's Archive
              </p>
              
              <div className="mt-20 space-y-2">
                <p className="text-xs text-stone-300 font-serif italic opacity-90 animate-bounce flex items-center justify-center gap-1">
                  <span>▲</span> 点击翻开档案文件夹
                </p>
                <p className="text-[9px] text-stone-400 font-sans tracking-wide opacity-75 max-md:hidden">
                  [ 建议电脑端或手机横屏查阅，体验更佳 ]
                </p>
              </div>
            </div>

            {/* Vintage bottom credit label */}
            <div className="text-center font-serif italic text-stone-400 text-[10px] select-none tracking-widest uppercase">
              Post Design &copy; 2026
            </div>

            {/* Raw Left Image Sticker (No Polaroid format) */}
            <div className="absolute -left-16 top-24 w-32 transform -rotate-12 select-none pointer-events-none group-hover:-translate-x-1.5 transition-transform duration-300">
              <img 
                src={resolveAssetPath('/images/books_basket.png')} 
                alt="Books Basket" 
                className="w-full h-auto object-contain drop-shadow-xl" 
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Raw Right Image Sticker (No Polaroid format) */}
            <div className="absolute -right-16 bottom-16 w-32 transform rotate-12 select-none pointer-events-none group-hover:translate-x-1.5 transition-transform duration-300">
              <img 
                src={resolveAssetPath('/images/books_pot.png')} 
                alt="Books Pot" 
                className="w-full h-auto object-contain drop-shadow-xl" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        ) : (
          
          // ==========================================
          // 2. Opened Binder Folder View
          // ==========================================
          <div
            id="folder-opened"
            className="w-full h-full relative z-10 flex flex-col md:flex-row animate-page-flip-anim"
          >
            {/* Binder Tabs on the right edge */}
            <div className="absolute right-[-28px] top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-40 select-none">
              
              {/* Tab 1: About & Comics */}
              <button
                onClick={() => {
                  setActivePage(1);
                  setSelectedComic(null);
                }}
                className={`py-4 bg-[#fbfaf7] border border-stone-300 border-l-transparent rounded-r-2xl text-[9px] md:text-[10px] font-bold flex flex-col items-center gap-1.5 transition-all duration-300 w-8 shadow-md cursor-pointer ${
                  (activePage === 1 || activePage === 2)
                    ? 'text-stone-900 translate-x-0 bg-[#fbfaf7] border-stone-400 font-extrabold'
                    : 'text-stone-400 translate-x-[-4px] bg-stone-50/95 hover:text-stone-700'
                }`}
              >
                <User className={`w-3.5 h-3.5 ${(activePage === 1 || activePage === 2) ? 'text-stone-800' : 'text-stone-400'}`} />
                <span>关</span><span>于</span><span>&</span><span>漫</span><span>画</span>
              </button>

              {/* Tab 2: Marketing & Campaigns */}
              <button
                onClick={() => {
                  setActivePage(3);
                  setSelectedComic(null);
                }}
                className={`py-4 border border-stone-300 border-l-transparent rounded-r-2xl text-[9px] md:text-[10px] font-bold flex flex-col items-center gap-1.5 transition-all duration-300 w-8 shadow-md cursor-pointer ${
                  (activePage === 3 || activePage === 4)
                    ? 'text-stone-900 translate-x-0 bg-[#fbfaf7] border-stone-400 font-extrabold'
                    : 'text-stone-400 translate-x-[-4px] bg-stone-50/95 hover:text-stone-700'
                }`}
              >
                <TrendingUp className={`w-3.5 h-3.5 ${(activePage === 3 || activePage === 4) ? 'text-stone-800' : 'text-stone-400'}`} />
                <span>营</span><span>销</span><span>&</span><span>活</span><span>动</span>
              </button>

              {/* Tab 3: Reports & Contacts */}
              <button
                onClick={() => {
                  setActivePage(5);
                  setSelectedComic(null);
                }}
                className={`py-4 border border-stone-300 border-l-transparent rounded-r-2xl text-[9px] md:text-[10px] font-bold flex flex-col items-center gap-1.5 transition-all duration-300 w-8 shadow-md cursor-pointer ${
                  (activePage === 5 || activePage === 6)
                    ? 'text-stone-900 translate-x-0 bg-[#fbfaf7] border-stone-400 font-extrabold'
                    : 'text-stone-400 translate-x-[-4px] bg-stone-50/95 hover:text-stone-700'
                }`}
              >
                <Terminal className={`w-3.5 h-3.5 ${(activePage === 5 || activePage === 6) ? 'text-stone-800' : 'text-stone-400'}`} />
                <span>报</span><span>道</span><span>&</span><span>联</span><span>系</span>
              </button>
            </div>

            {/* Master Opened Book Body */}
            <div className="w-full h-full bg-[#fbfaf7] rounded-3xl border-2 border-stone-300 shadow-[0_25px_60px_rgba(74,62,51,0.25)] flex flex-col md:flex-row overflow-hidden relative max-md:mr-7 max-md:w-[calc(100%-28px)]">
              
              {/* Spine shadow split */}
              <div className="absolute top-0 bottom-0 left-1/2 w-4 bg-gradient-to-r from-transparent via-stone-400/20 to-transparent z-20 pointer-events-none hidden md:block"></div>

              {/* Left/Right Click Regions overlay for page turning */}
              <button
                onClick={handlePrevPage}
                className="absolute left-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-r from-stone-950/[0.01] hover:from-stone-950/[0.04] to-transparent flex items-center justify-start pl-1.5 sm:pl-3 group/left z-40 transition-all cursor-pointer border-none outline-none focus:outline-none"
                title={activePage > 1 ? "上一页" : "合上档案文件夹"}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-stone-100/95 hover:bg-stone-100 shadow-sm flex items-center justify-center border border-stone-200/50 transition-all transform group-hover/left:-translate-x-0.5">
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-700" />
                </div>
              </button>

              <button
                onClick={handleNextPage}
                disabled={activePage === 6 || (activePage >= 5 && !isMobile)}
                className={`absolute right-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-l from-stone-950/[0.01] hover:from-stone-950/[0.04] to-transparent flex items-center justify-end pr-1.5 sm:pr-3 group/right z-40 transition-all cursor-pointer border-none outline-none focus:outline-none ${
                  (activePage === 6 || (activePage >= 5 && !isMobile)) ? 'pointer-events-none opacity-0' : ''
                }`}
                title="下一页"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-stone-100/95 hover:bg-stone-100 shadow-sm flex items-center justify-center border border-stone-200/50 transition-all transform group-hover/right:translate-x-0.5">
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-700" />
                </div>
              </button>

              {/* Spread navigation banner guide */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none text-center text-[10px] text-stone-500 font-semibold tracking-wider bg-stone-100/90 border border-stone-200 px-4 py-1.5 rounded-full shadow-sm max-md:hidden flex items-center gap-1">
                <span>💡 提示: </span>
                <span>点击页面左右两侧边缘或书签进行翻页</span>
              </div>

              {/* Left/Right Mobile pagination toggles with active index tracker */}
              <div className="absolute bottom-3 right-4 z-40 md:hidden flex gap-2 items-center">
                <button
                  onClick={handlePrevPage}
                  className="p-2 rounded-full bg-stone-800 text-stone-50 hover:bg-stone-900 shadow-md active:scale-95 transition-transform"
                  title="上一页"
                >
                  <ChevronLeft className="w-4.5 h-4.5" />
                </button>
                <div className="px-3 py-1 bg-stone-900/90 text-stone-100 font-mono text-[11px] rounded-full flex items-center justify-center font-bold tracking-wider shadow-md min-w-[50px]">
                  {activePage} / 6
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={activePage === 6}
                  className="p-2 rounded-full bg-stone-800 text-stone-50 hover:bg-stone-900 disabled:opacity-40 shadow-md active:scale-95 transition-transform"
                  title="下一页"
                >
                  <ChevronRight className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* =================================================================================
                   SPREAD 1: Education, General Intro (LEFT) + Science Comic List Search (RIGHT)
                   ================================================================================= */}
              {activeSpread === 1 && (
                <>
                  {/* 【Spread 1 LEFT】 Personal Bio & Typewriter Card */}
                  {(!isMobile || activePage === 1) && (
                    <div className="w-full md:w-1/2 h-full md:h-full border-b md:border-b-0 md:border-r border-stone-200 p-3.5 sm:p-4 md:p-5 flex flex-col justify-between bg-[#faf9f6]/30 relative overflow-hidden">
                      
                      {/* Retro crumpled paper sheet with 3D physical filters */}
                      <div
                        className="flex-1 min-h-0 w-full border border-stone-300/80 rounded-t-lg rounded-b-none border-b-0 p-4 md:p-5 overflow-y-auto shadow-inner relative z-10 no-scrollbar"
                        style={{ filter: 'url(#paper-wrinkle)', background: '#fdfdfc' }}
                      >
                        <div className="space-y-3.5 md:space-y-4 text-stone-800 leading-relaxed tracking-wide pb-32 md:pb-36">
                          <p className="text-[8px] md:text-[9px] text-amber-700 text-center font-mono tracking-widest font-semibold">
                            [ ✨ 提示: 滑动查看全部内容 ]
                          </p>
                          
                          <div className="text-center border-b border-stone-300/60 pb-3 space-y-1">
                            <h2 className="text-xl md:text-2xl font-bold font-serif text-stone-900 mt-1 tracking-wide">
                              任蕴佳 / Yunjia Ren
                            </h2>
                            <p className="text-xs text-stone-600 font-mono mt-0.5 font-semibold tracking-wider">
                              15337053496 | taot1007@163.com | 上海
                            </p>
                            <p className="text-[11px] text-stone-500 font-mono tracking-wide">
                              24岁 | 中共党员 | 2027届硕士在读
                            </p>
                          </div>

                          {/* Education Details */}
                          <div className="space-y-2.5 pt-1">
                            <h4 className="text-xs md:text-sm font-bold text-stone-900 tracking-wider uppercase border-b border-stone-200 pb-1 flex items-center gap-1">
                              <span>🎓</span> 教育经历 / Education
                            </h4>
                            <div className="text-[11px] md:text-xs leading-relaxed space-y-3 font-medium tracking-wide">
                              <div className="space-y-0.5">
                                <p className="font-bold text-stone-900 flex justify-between">
                                  <span>同济大学 · 新闻传播学 (硕士)</span>
                                  <span className="text-[9px] text-stone-400 font-mono">2024.09 - 2027.06</span>
                                </p>
                                <p className="text-stone-600 font-light">
                                  艺术与传媒学院 · GPA 3.91/4.0 （985）
                                </p>
                              </div>
                              <div className="space-y-0.5">
                                <p className="font-bold text-stone-900 flex justify-between">
                                  <span>北京外国语大学 · 新闻学 (本科)</span>
                                  <span className="text-[9px] text-stone-400 font-mono">2020.09 - 2024.06</span>
                                </p>
                                <p className="text-stone-600 font-light">
                                  国际新闻与传播学院 | GPA 3.6/4.0 | 辅修外交学 GPA 3.8/4.0 (211)
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Skills / Tech core list */}
                          <div className="space-y-2.5 pt-1 text-[11px] md:text-xs font-medium leading-relaxed tracking-wide">
                            <h4 className="text-xs md:text-sm font-bold text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-1">
                              <span>🛠️</span> 核心能力 / Core Strengths
                            </h4>
                            <div className="space-y-1.5 font-light text-stone-700">
                              <p>
                                <strong className="font-bold text-stone-900">核心能力: </strong> 具备从0到1完成策划、生产、发布、复盘的完整内容营销能力，熟悉小红书、抖音、微信等平台内容营销生态，擅长热点洞察、
用⼾需求分析及爆款营销策划，拥有达⼈共创、品牌内容营销及AI内容⽣产经验，具备较强的数据复盘意识及跨团队协作能⼒。
                              </p>
                              <p>
                                <strong className="font-bold text-stone-900">性格: </strong> 性格活泼开朗，爱思考想法多，有owner意识和判断力，具备良好的执行力和抗压能力，善于沟通，能快速适应团队协作氛围，熟
悉互联网内容生态及不同社交软件玩法。
                              </p>
                              <p>
                                <strong className="font-bold text-stone-900">专业技能: </strong> 熟练操作剪映、Photoshop、Canva、秀米，持有英语六级(CET-6)证书，采写、策划经验丰富。
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pink Retro Typewriter Body (Spread 1 bottom) */}
                      <div className="w-full h-[120px] md:h-[135px] flex-shrink-0 bg-gradient-to-t from-[#f19fb1] to-[#e48398] border-t-4 border-[#c75d74] rounded-t-3xl shadow-[0_-8px_20px_rgba(199,93,116,0.25)] p-2 flex flex-col justify-between relative z-20 -mt-1 select-none">
                        
                        {/* Platen roller slot assembly */}
                        <div className="w-[94%] mx-auto h-4 sm:h-5 bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 rounded shadow-md relative -mt-3.5 border-b border-stone-950 flex items-center justify-between px-4 z-10">
                          {/* Left roller knob */}
                          <div className="w-2 h-4 bg-stone-500 rounded border border-stone-600 absolute -left-1 sm:-left-2 top-1/2 transform -translate-y-1/2 shadow-inner"></div>
                          {/* Left carriage return metal lever */}
                          <div className="w-6 h-1 bg-stone-300 rounded absolute -left-5 sm:-left-6 top-1 transform -rotate-[15deg] shadow-sm origin-right border border-stone-400"></div>
                          {/* Right roller knob */}
                          <div className="w-2 h-4 bg-stone-500 rounded border border-stone-600 absolute -right-1 sm:-right-2 top-1/2 transform -translate-y-1/2 shadow-inner"></div>
                          {/* Paper feed slot line */}
                          <div className="w-full h-0.5 bg-black rounded shadow-inner"></div>
                        </div>

                        {/* 3D mechanical keyboard layout */}
                        <div className="flex-1 flex flex-col justify-center gap-0.5 px-4 py-1 select-none relative max-sm:scale-[0.85] max-sm:origin-center">
                          {/* Keyboard plate slot */}
                          <div className="absolute inset-x-2 inset-y-0.5 bg-[#d8758b] rounded-lg border border-[#c75d74]/50 shadow-inner -z-10"></div>
                          
                          {/* Row 1 */}
                          <div className="flex justify-center gap-1 sm:gap-1.5 relative z-10">
                            {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((char) => (
                              <div
                                key={char}
                                className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#fbd4dc] border border-[#d2627a] rounded-full shadow-[0_1px_1.5px_rgba(0,0,0,0.15)] flex items-center justify-center text-[5px] sm:text-[6.5px] text-[#8e293e] font-extrabold"
                              >
                                {char}
                              </div>
                            ))}
                          </div>
                          {/* Row 2 */}
                          <div className="flex justify-center gap-1 sm:gap-1.5 ml-1.5 relative z-10">
                            {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((char) => (
                              <div
                                key={char}
                                className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#fbd4dc] border border-[#d2627a] rounded-full shadow-[0_1px_1.5px_rgba(0,0,0,0.15)] flex items-center justify-center text-[5px] sm:text-[6.5px] text-[#8e293e] font-extrabold"
                              >
                                {char}
                              </div>
                            ))}
                          </div>
                          {/* Row 3 */}
                          <div className="flex justify-center gap-1 sm:gap-1.5 ml-3 relative z-10">
                            {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((char) => (
                              <div
                                key={char}
                                className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#fbd4dc] border border-[#d2627a] rounded-full shadow-[0_1px_1.5px_rgba(0,0,0,0.15)] flex items-center justify-center text-[5px] sm:text-[6.5px] text-[#8e293e] font-extrabold"
                              >
                                {char}
                              </div>
                            ))}
                          </div>
                          {/* Space bar */}
                          <div className="flex justify-center mt-0.5 relative z-10">
                            <div className="w-14 sm:w-20 h-1 sm:h-1.5 bg-[#fbd4dc] border border-[#d2627a] rounded-sm shadow-[0_1px_1.5px_rgba(0,0,0,0.15)]"></div>
                          </div>
                        </div>

                        {/* SVG typing hands overlapping the keyboard from the bottom */}
                        <div className="absolute -bottom-1 inset-x-0 h-16 pointer-events-none z-20 flex justify-between px-6 sm:px-12 md:px-16 overflow-hidden">
                          {/* Left Hand SVG */}
                          <svg viewBox="0 0 100 80" className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 transform translate-y-2 translate-x-2 rotate-[12deg] drop-shadow-md">
                            <path d="M5 80 C 15 50, 20 42, 32 38 C 34 37, 36 39, 36 43 L 30 80 Z" fill="#fbdcd4" stroke="#c0576f" strokeWidth="0.75" />
                            <path d="M32 38 C 42 37, 48 39, 54 44 C 57 46, 56 49, 52 49 C 45 49, 38 46, 34 43" fill="#fbdcd4" stroke="#c0576f" strokeWidth="0.75" />
                            <path d="M30 38 C 29 23, 33 19, 37 19 C 40 19, 41 23, 39 38" fill="#fbdcd4" stroke="#c0576f" strokeWidth="0.75" />
                            <path d="M24 40 C 20 20, 24 16, 28 16 C 31 16, 33 21, 31 40" fill="#fbdcd4" stroke="#c0576f" strokeWidth="0.75" />
                            <path d="M18 44 C 14 24, 18 21, 22 21 C 25 21, 27 25, 25 44" fill="#fbdcd4" stroke="#c0576f" strokeWidth="0.75" />
                            <path d="M12 49 C 9 32, 13 29, 16 29 C 19 29, 20 33, 18 49" fill="#fbdcd4" stroke="#c0576f" strokeWidth="0.75" />
                            <ellipse cx="37" cy="21" rx="1.5" ry="2" fill="#d2627a" />
                            <ellipse cx="28" cy="18" rx="1.5" ry="2" fill="#d2627a" />
                            <ellipse cx="22" cy="23" rx="1.5" ry="2" fill="#d2627a" />
                            <ellipse cx="16" cy="31" rx="1" ry="1.5" fill="#d2627a" />
                          </svg>

                          {/* Right Hand SVG */}
                          <svg viewBox="0 0 100 80" className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 transform translate-y-2 -translate-x-2 -rotate-[12deg] drop-shadow-md">
                            <path d="M95 80 C 85 50, 80 42, 68 38 C 66 37, 64 39, 64 43 L 70 80 Z" fill="#fbdcd4" stroke="#c0576f" strokeWidth="0.75" />
                            <path d="M68 38 C 58 37, 52 39, 46 44 C 43 46, 44 49, 48 49 C 55 49, 62 46, 66 43" fill="#fbdcd4" stroke="#c0576f" strokeWidth="0.75" />
                            <path d="M70 38 C 71 23, 67 19, 63 19 C 60 19, 59 23, 61 38" fill="#fbdcd4" stroke="#c0576f" strokeWidth="0.75" />
                            <path d="M76 40 C 80 20, 76 16, 72 16 C 69 16, 67 21, 69 40" fill="#fbdcd4" stroke="#c0576f" strokeWidth="0.75" />
                            <path d="M82 44 C 86 24, 82 21, 78 21 C 75 21, 73 25, 75 44" fill="#fbdcd4" stroke="#c0576f" strokeWidth="0.75" />
                            <path d="M88 49 C 91 32, 87 29, 84 29 C 81 29, 80 33, 82 49" fill="#fbdcd4" stroke="#c0576f" strokeWidth="0.75" />
                            <ellipse cx="63" cy="21" rx="1.5" ry="2" fill="#d2627a" />
                            <ellipse cx="72" cy="18" rx="1.5" ry="2" fill="#d2627a" />
                            <ellipse cx="78" cy="23" rx="1.5" ry="2" fill="#d2627a" />
                            <ellipse cx="84" cy="31" rx="1" ry="1.5" fill="#d2627a" />
                          </svg>
                        </div>

                        {/* Folder closed return button */}
                        <button
                          onClick={() => setIsOpened(false)}
                          className="text-[9px] md:text-[10px] text-[#8e293e] hover:text-stone-900 flex items-center justify-center gap-1 pb-1 transition font-bold select-none cursor-pointer relative z-30"
                        >
                          <FolderClosed className="w-3.5 h-3.5" /> 合上档案文件夹 (Close Portfolio Cover)
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 【Spread 1 RIGHT】 30 Science Comics Archives with search & filters */}
                  {(!isMobile || activePage === 2) && (
                    <div className="w-full md:w-1/2 h-full md:h-full p-4 sm:p-5 md:p-6 flex flex-col justify-between overflow-hidden bg-white pr-4 sm:pr-6 md:pr-10 relative">
                      <div className="border-b border-stone-200 pb-3 mb-3 shrink-0">
                        <span className="text-[8px] font-mono tracking-widest text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50 uppercase font-semibold">
                          02 / SCIENCE COMICS
                        </span>
                        <h3 className="text-base md:text-lg font-serif font-bold text-stone-900 mt-1">
                          科普类漫画脚本作品 
                        </h3>
                      </div>

                      {/* Render the ComicGrid and connect callback */}
                      <div className="flex-1 overflow-y-auto no-scrollbar">
                        <ComicGrid onSelectComic={(comic) => setSelectedComic(comic)} />
                      </div>

                      <div className="text-[8px] font-mono text-stone-400 text-right shrink-0 border-t border-stone-100 pt-3 flex justify-between items-center mt-2">
                        <span>Yunjia's Editorial Hub</span>
                        <span>VOL.1 - VOL.30 FULL DATABASE</span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* =================================================================================
                   SPREAD 2: Content Marketing策划 folders (LEFT) + Campaigns Projects polaroids (RIGHT)
                   ================================================================================= */}
              {activeSpread === 2 && (
                <>
                  {/* 【Spread 2 LEFT】 Sliding file directories of content marketing */}
                  {(!isMobile || activePage === 3) && (
                    <div className="w-full md:w-1/2 h-full md:h-full border-b md:border-b-0 md:border-r border-stone-200 p-4 sm:p-5 md:p-6 flex flex-col justify-between bg-[#fbfaf7] overflow-hidden relative">
                      <div className="border-b border-stone-200 pb-3 mb-3 shrink-0">
                        <span className="text-[8px] font-mono tracking-widest text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50 uppercase font-semibold">
                          03 / DIGITAL MARKETING
                        </span>
                        <h3 className="text-base md:text-lg font-serif font-bold text-stone-900 mt-1">
                          内容创作与品牌营销
                        </h3>
                        <p className="text-[10px] text-stone-400 font-mono mt-0.5 font-light">
                          [ 💡 点击抽屉文件夹可展开，滑动可阅读完整方案 ]
                        </p>
                      </div>

                      {/* Sliding accordion folders */}
                      <div className="flex-1 overflow-y-auto no-scrollbar">
                        <MarketingAccordion />
                      </div>
                    </div>
                  )}

                  {/* 【Spread 2 RIGHT】 Project Campaign Logs (晚安短信, 长辈画展, 工作女性照) */}
                  {(!isMobile || activePage === 4) && (
                    <div className="w-full md:w-1/2 h-full md:h-full p-4 sm:p-5 md:p-6 flex flex-col justify-between overflow-hidden bg-white pr-4 sm:pr-6 md:pr-12 relative">
                      <div className="border-b border-stone-200 pb-3 mb-3 shrink-0">
                        <span className="text-[8px] font-mono tracking-widest text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/50 uppercase font-semibold font-sans">
                          04 / CAMPAIGN PROJECTS
                        </span>
                        <h3 className="text-base md:text-lg font-serif font-bold text-stone-900 mt-1">
                          项目策划与活动落地
                        </h3>
                      </div>

                      {/* Campaigns listings */}
                      <div className="flex-1 overflow-y-auto no-scrollbar">
                        <CampaignsList />
                      </div>

                      <div className="text-[8px] font-mono text-stone-400 text-right shrink-0 border-t border-stone-100 pt-3">
                        CREATIVE EVENT MANAGEMENT &middot; SHANGHAI / CHANGSHA / SHENZHEN
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* =================================================================================
                   SPREAD 3: In-depth journalism investigations (LEFT) + Contact Terminal (RIGHT)
                   ================================================================================= */}
              {activeSpread === 3 && (
                <>
                  {/* 【Spread 3 LEFT】 Investigative reporting at The Paper (澎湃新闻) */}
                  {(!isMobile || activePage === 5) && (
                    <div className="w-full md:w-1/2 h-full md:h-full border-b md:border-b-0 md:border-r border-stone-200 p-4 sm:p-5 md:p-6 flex flex-col justify-between bg-stone-100/30 overflow-hidden relative">
                      <div className="border-b border-stone-200 pb-3 mb-3 shrink-0">
                        <span className="text-[8px] font-mono tracking-widest text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/50 uppercase font-semibold">
                          05 / INVESTIGATIVE JOURNALISM
                        </span>
                        <h3 className="text-base md:text-lg font-serif font-bold text-stone-900 mt-1">
                          深度特稿与社会新闻采访
                        </h3>
                        <p className="text-[10px] text-stone-400 font-mono mt-0.5 font-light">
                          [ 💡 澎湃新闻实习期间署名报道，支持点击查看原网页 ]
                        </p>
                      </div>

                      {/* Reporter list container */}
                      <div className="flex-1 overflow-y-auto no-scrollbar">
                        <InDepthReportsList />
                      </div>
                    </div>
                  )}

                  {/* 【Spread 3 RIGHT】 Contact board styled as an interactive Terminal */}
                  {(!isMobile || activePage === 6) && (
                    <div className="w-full md:w-1/2 h-full md:h-full p-4 sm:p-5 md:p-6 flex flex-col justify-between overflow-hidden bg-white pr-4 sm:pr-6 md:pr-10 relative">
                      <div className="border-b border-stone-200 pb-3 mb-3 shrink-0">
                        <span className="text-[8px] font-mono tracking-widest text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 uppercase font-semibold font-sans">
                          06 / CONTACT & COLLABORATION
                        </span>
                        <h3 className="text-base md:text-lg font-serif font-bold text-stone-900 mt-1">
                          期待您的联系！
                        </h3>
                        <p className="text-[10px] text-emerald-600 font-mono mt-0.5 font-semibold">
                          &bull; Connection secure and online
                        </p>
                      </div>

                      {/* Terminal Clipboard block */}
                      <div className="flex-1 bg-stone-50 border border-stone-200 rounded-xl p-4 md:p-5 shadow-sm space-y-4 flex flex-col justify-between">
                        <div className="space-y-3">
                          <p className="text-xs text-stone-600 leading-relaxed font-light">
                            目前正积极寻找 <strong className="font-semibold text-stone-900">内容策划、增长营销、增长运营、市场营销</strong> 方向的工作机会。非常期待听到您的来信！
                          </p>

                        {/* Retro permanent license of travel ID card (Reference: Figure 9) */}
                        <div className="relative mt-2 pt-4 pb-3 px-3 sm:pt-6 sm:pb-4 sm:px-4 bg-[#fbf6eb] border border-[#d6cbaf] rounded-lg shadow-md font-mono text-[10px] text-stone-800 select-none overflow-hidden flex flex-col justify-between">
                          
                          {/* 1. Metal Clip at the top */}
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-16 sm:w-20 h-4 sm:h-5 bg-gradient-to-b from-[#dfca97] via-[#c9ae6f] to-[#aa8e4b] border-b border-stone-600/30 rounded-b shadow z-20 flex flex-col items-center justify-center">
                            {/* Inner metallic clip clasp lines and rivet hole */}
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#ebd7a7] border border-stone-700/20 mb-0.5"></div>
                            <div className="w-8 sm:w-10 h-0.5 bg-stone-800/20 rounded"></div>
                          </div>

                          {/* 2. Shiny Metallic Gold Star Stickers (Top-Left & Bottom-Right) */}
                          {/* Top-Left gold star sticker */}
                          <div className="absolute top-1 left-2 w-6 h-6 sm:w-8 sm:h-8 drop-shadow-md z-20 transform -rotate-12 hover:scale-110 transition-transform duration-300">
                            <svg viewBox="0 0 24 24" fill="url(#goldGrad)" className="w-full h-full">
                              <defs>
                                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#fae089" />
                                  <stop offset="50%" stopColor="#dfae37" />
                                  <stop offset="100%" stopColor="#a37c15" />
                                </linearGradient>
                              </defs>
                              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.41l8.2-1.192z" />
                            </svg>
                          </div>
                          {/* Bottom-Right gold star sticker */}
                          <div className="absolute bottom-1 right-2 w-6 h-6 sm:w-8 sm:h-8 drop-shadow-md z-20 transform rotate-12 hover:scale-110 transition-transform duration-300">
                            <svg viewBox="0 0 24 24" fill="url(#goldGrad2)" className="w-full h-full">
                              <defs>
                                <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#fae089" />
                                  <stop offset="50%" stopColor="#dfae37" />
                                  <stop offset="100%" stopColor="#a37c15" />
                                </linearGradient>
                              </defs>
                              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.41l8.2-1.192z" />
                            </svg>
                          </div>

                          {/* 3. Outer Star-Studded Border */}
                          {/* Left border stars */}
                          <div className="absolute left-1 top-6 bottom-6 flex flex-col justify-between text-[6px] text-stone-500/80">
                            {Array.from({ length: 8 }).map((_, i) => <span key={i}>★</span>)}
                          </div>
                          {/* Right border stars */}
                          <div className="absolute right-1 top-6 bottom-6 flex flex-col justify-between text-[6px] text-stone-500/80">
                            {Array.from({ length: 8 }).map((_, i) => <span key={i}>★</span>)}
                          </div>
                          {/* Top border stars */}
                          <div className="absolute top-4 sm:top-5 left-4 right-4 flex justify-between text-[6px] text-stone-500/80">
                            {Array.from({ length: 12 }).map((_, i) => <span key={i}>★</span>)}
                          </div>
                          {/* Bottom border stars */}
                          <div className="absolute bottom-1 left-4 right-4 flex justify-between text-[6px] text-stone-500/80">
                            {Array.from({ length: 12 }).map((_, i) => <span key={i}>★</span>)}
                          </div>

                          {/* 4. Main Card Header and Serial Number */}
                          <div className="text-center pt-1 pb-1.5 border-b border-stone-300/60">
                            <h5 className="font-serif font-bold text-[8px] sm:text-[9px] tracking-[0.2em] text-stone-700">
                              WAITING FOR YOUR CALL
                            </h5>
                            <p className="text-[7px] sm:text-[8px] font-bold text-red-700/80 tracking-widest mt-0.5">
                              NO. 20021007
                            </p>
                          </div>

                          {/* 5. Card Body with Photo and Fields */}
                          <div className="flex gap-2 sm:gap-4 pt-2.5 pb-1 items-start">
                            
                                {/* Left Side: Photo Frame (Blue watercolor texture with travel stamp) */}
                            <div className="w-16 sm:w-20 md:w-24 shrink-0 flex flex-col items-center">
                              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-tr from-[#9bb7c2] via-[#cedee5] to-[#f2f7f9] rounded border border-stone-300 shadow-sm relative flex items-center justify-center overflow-hidden">
                                
                                {/* Custom ink travel stamp overlay */}
                                <div className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-10 sm:h-10 border-2 border-dashed border-emerald-600/40 rounded-full flex items-center justify-center transform -rotate-12 font-serif text-[5px] sm:text-[6px] text-emerald-600/50 font-bold tracking-tighter leading-none text-center z-10 pointer-events-none">
                                  <span>SHANGHAI<br/>DEP. 2026</span>
                                </div>
                                
                                {hasAvatar ? (
                                  <img
                                    src={resolveAssetPath(avatarSrc)}
                                    alt="Yunjia Ren's ID Photo"
                                    onError={handleAvatarError}
                                    className="w-full h-full object-cover z-0"
                                    referrerPolicy="no-referrer"
                                  />
                                ) : (
                                  /* Beautiful retro traveler silhouette placeholder */
                                  <div className="opacity-35 text-stone-600 flex flex-col items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 fill-current">
                                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <span className="text-[5px] sm:text-[5.5px] text-stone-500/80 font-serif italic mt-1 text-center block leading-none scale-90">
                                Photograph of Authorized traveler
                              </span>
                            </div>

                            {/* Right Side: Typewriter Data Rows */}
                            <div className="flex-1 space-y-2 sm:space-y-2.5 text-[8px] sm:text-[9px] leading-tight font-mono text-stone-700 relative min-w-0">
                              
                              {/* Row 1: Issued to */}
                              <div className="flex items-end gap-1 sm:gap-2 relative">
                                <span className="text-stone-400 shrink-0 w-[64px] sm:w-[84px] select-none text-left pb-0.5 truncate">Issued to</span>
                                <div className="flex-1 relative min-w-0 pb-0.5">
                                  <div className="absolute bottom-0 left-0 right-0 border-b border-dotted border-stone-400"></div>
                                  <span className="handwritten text-stone-900 font-bold text-xs sm:text-sm relative z-10 block truncate leading-none">
                                    任蕴佳 / Yunjia Ren
                                  </span>
                                </div>
                              </div>

                              {/* Row 2: E-mail */}
                              <div className="flex items-end gap-1 sm:gap-2 relative">
                                <span className="text-stone-400 shrink-0 w-[64px] sm:w-[84px] select-none text-left pb-0.5 truncate">E-mail</span>
                                <div className="flex-1 relative min-w-0 pb-0.5">
                                  <div className="absolute bottom-0 left-0 right-0 border-b border-dotted border-stone-400"></div>
                                  <span className="text-stone-800 font-bold relative z-10 block truncate leading-none select-text text-[8px] sm:text-[9px]">
                                    taot1007@163.com
                                  </span>
                                </div>
                              </div>

                              {/* Row 3: WeChat / Tel */}
                              <div className="flex items-end gap-1 sm:gap-2 relative">
                                <span className="text-stone-400 shrink-0 w-[64px] sm:w-[84px] select-none text-left pb-0.5 truncate">WeChat / Tel</span>
                                <div className="flex-1 relative min-w-0 pb-0.5">
                                  <div className="absolute bottom-0 left-0 right-0 border-b border-dotted border-stone-400"></div>
                                  <span className="text-stone-800 font-bold relative z-10 block truncate leading-none select-text text-[8px] sm:text-[9px]">
                                    15337053496 (上海)
                                  </span>
                                </div>
                              </div>

                              {/* Row 4: Place of Issue */}
                              <div className="flex items-end gap-1 sm:gap-2 relative">
                                <span className="text-stone-400 shrink-0 w-[64px] sm:w-[84px] select-none text-left pb-0.5 truncate">Place of Issue</span>
                                <div className="flex-1 relative min-w-0 pb-0.5">
                                  <div className="absolute bottom-0 left-0 right-0 border-b border-dotted border-stone-400"></div>
                                  <span className="text-stone-800 relative z-10 block truncate leading-none text-[8px] sm:text-[9px]">
                                    同济大学 (Tongji Univ.)
                                  </span>
                                </div>
                              </div>

                            </div>
                          </div>

                          {/* 6. Stamp overlay & Certification statement & Cursive Signature */}
                          <div className="pt-2 border-t border-stone-300/60 relative">
                            
                            {/* Blue rubber ink stamp: "YOU MIGHT GET LOST" */}
                            <div className="absolute -top-3 right-2 w-14 h-14 border border-indigo-500/40 rounded-full flex flex-col items-center justify-center transform rotate-12 font-sans text-[5.5px] text-indigo-500/60 font-bold leading-none text-center select-none pointer-events-none">
                              <span className="border-b border-indigo-500/20 pb-0.5 mb-0.5 w-[85%]">YOU MIGHT GET LOST</span>
                              <span>CALL ME</span>
                              <span className="border-t border-indigo-500/20 pt-0.5 mt-0.5 w-[85%]">CONTACT SECURED</span>
                            </div>

                            <p className="text-[7.5px] leading-tight font-serif italic text-stone-500/90 w-[70%]">
                              <strong>LICENSE OF TRAVEL:</strong> This is to Certify that the person named and described above is permitted to travel and explore freely unless detained by law.
                            </p>

                            {/* Cursive Signature block at bottom-right */}
                            <div className="absolute bottom-2 right-12 text-right">
                              <span className="text-[5px] text-stone-400/80 block scale-90 origin-right">
                                Signature of Authorized traveler
                              </span>
                              <span className="handwritten text-xs font-bold text-stone-800/90 tracking-wide inline-block transform -rotate-3 select-none">
                                Yunjia Ren
                              </span>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Touch target actions (optimized button touch regions to 44px height) */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a
                          href="mailto:taot1007@163.com"
                          className="flex-1 h-11 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition tracking-wider shadow cursor-pointer"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>发送邮件 (Email Me)</span>
                        </a>
                        <button
                          onClick={handleCopyWechat}
                          className="flex-1 h-11 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition tracking-wider shadow-sm cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>复制我的微信 (WeChat)</span>
                        </button>
                      </div>
                    </div>

                    <div className="text-[8px] font-mono text-stone-300 text-right shrink-0 pt-2 border-t border-stone-100">
                      RESUME SOURCE CODED IN SHAI | ALL WORK VERIFIED
                    </div>
                  </div>
                  )}
                </>
              )}

            </div>
          </div>
        )}

      </div>

      {/* ==========================================
           3. Detailed Comic Storyboard Modal
           ========================================== */}
      {selectedComic && (
        <ComicModal
          comic={selectedComic}
          onClose={() => setSelectedComic(null)}
          onNext={handleNextComic}
          onPrev={handlePrevComic}
        />
      )}

      {/* ==========================================
           4. Elegant In-App Toast System
           ========================================== */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-stone-900 text-stone-50 border border-stone-700 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-serif tracking-wide animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
