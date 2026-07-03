import React from 'react';
import { FileText, Link, Video, AlertCircle, Quote } from 'lucide-react';
import { reportsData } from '../data/portfolio';
import ImageWithFallback from './ImageWithFallback';

export default function InDepthReportsList() {
  const getIcon = (type: 'link' | 'video' | 'file') => {
    switch (type) {
      case 'video':
        return <Video className="w-3.5 h-3.5 text-blue-500 shrink-0" />;
      case 'file':
        return <FileText className="w-3.5 h-3.5 text-amber-600 shrink-0" />;
      default:
        return <Link className="w-3.5 h-3.5 text-stone-400 shrink-0" />;
    }
  };

  // Realistic reporting photo attachments matching each news report's theme
  const reportPhotos: Record<string, { src: string; caption: string; fallback: string; rotation: string }> = {
    'qingzang-line': {
      src: '/images/report-qingzang.png',
      caption: '骑行青藏线·一趟救赎的旅程',
      fallback: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80', // mountain bicycle
      rotation: 'rotate-1'
    },
    'ex-prisoners': {
      src: '/images/report-exprisoners.png',
      caption: '刑释人员再就业报道剪影',
      fallback: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80', // justice court scale
      rotation: '-rotate-1'
    },
    'autism-schools': {
      src: '/images/report-autism.png',
      caption: '自闭症学生教育突围战记录',
      fallback: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80', // star paper craft / child hand
      rotation: 'rotate-1'
    }
  };

  return (
    <div className="space-y-6 pb-8 pr-1 no-scrollbar overflow-y-auto select-none">
      {reportsData.map((report) => {
        const photoInfo = reportPhotos[report.id];

        return (
          <div key={report.id} className="space-y-4 border-b border-stone-200 pb-5 last:border-0 last:pb-0 leading-relaxed font-sans">
            {/* Title */}
            <h4 className="text-sm md:text-base font-serif font-bold text-stone-900 tracking-wide flex items-start gap-1.5">
              <FileText className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              {report.title}
            </h4>

            {/* Description */}
            {report.description && (
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                {report.description}
              </p>
            )}

            {/* Quotes block */}
            {report.quotes && report.quotes.length > 0 && (
              <blockquote className="border-l-2 border-stone-300 pl-3 italic text-stone-500 text-xs py-0.5 space-y-1">
                {report.quotes.map((quote, qIdx) => (
                  <p key={qIdx}>{quote}</p>
                ))}
              </blockquote>
            )}

            {/* Photo Attachment if present */}
            {photoInfo && (
              <div className="w-[55%] mx-auto py-1">
                <div className={`bg-white p-1.5 pb-2.5 shadow-sm border border-stone-200/60 transform ${photoInfo.rotation} hover:scale-105 transition-all duration-300 relative`}>
                  {/* Tape top overlay */}
                  <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-8 h-3.5 bg-yellow-100/30 border-l border-r border-dashed border-stone-300/30"></div>
                  
                  <div className="w-full aspect-[4/3] bg-stone-100 rounded-sm overflow-hidden">
                    <ImageWithFallback
                      src={photoInfo.src}
                      fallbackSrc={photoInfo.fallback}
                      alt={photoInfo.caption}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-[7px] text-stone-400 font-mono block mt-1.5 text-center truncate font-bold uppercase leading-none">
                    {photoInfo.caption}
                  </span>
                </div>
              </div>
            )}

            {/* Links Collection */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-wider block">
                📰 新闻采访实录 (Articles & Footage)
              </span>

              <div className="grid grid-cols-1 gap-2 pl-1 font-mono text-xs text-blue-900 font-semibold tracking-wide">
                {report.links.map((link, lIdx) => (
                  <a
                    key={lIdx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-start gap-1.5 hover:text-blue-800 transition-colors p-1 hover:bg-stone-50 border border-transparent hover:border-stone-200/50 rounded cursor-pointer leading-normal"
                  >
                    {getIcon(link.type)}
                    <span>{link.text}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
