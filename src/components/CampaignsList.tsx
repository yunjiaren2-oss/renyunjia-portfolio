import React, { useState } from 'react';
import { Sparkles, Calendar, Heart, Award } from 'lucide-react';
import { campaignItems } from '../data/portfolio';
import ImageWithFallback, { resolveAssetPath } from './ImageWithFallback';

export default function CampaignsList() {
  const [lightboxPhoto, setLightboxPhoto] = useState<{ src: string; caption: string; fallback: string } | null>(null);

  const getFallbackImage = (campaignId: string, idx: number) => {
    const fallbacks: Record<string, string[]> = {
      goodnight: [
        'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&auto=format&fit=crop&q=80', // starry night
        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&auto=format&fit=crop&q=80', // writing desk
        'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=400&auto=format&fit=crop&q=80', // postcard envelope
      ],
      'afternoon-3pm': [
        'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=400&auto=format&fit=crop&q=80', // gallery exhibition
        'https://images.unsplash.com/photo-1531058020387-3be344559be6?w=400&auto=format&fit=crop&q=80', // art studio
        'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&auto=format&fit=crop&q=80', // female painter artwork
      ],
      'women-photos': [
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80', // professional woman
        'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80', // creative desk
      ],
    };

    return fallbacks[campaignId]?.[idx] || 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&auto=format&fit=crop&q=80';
  };

  return (
    <div className="space-y-8 pb-8 pr-1 no-scrollbar overflow-y-auto select-none">
      {campaignItems.map((item) => (
        <div key={item.id} className="space-y-4 border-b border-stone-200 pb-6 last:border-0 last:pb-0 font-sans">
          {/* Title & Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h4 className="text-sm md:text-base font-serif font-bold text-stone-900 tracking-wide">
              {item.title}
            </h4>
            <span className="text-[9px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200/50 font-semibold tracking-wide w-fit">
              {item.stats}
            </span>
          </div>

          {/* Project description and roles */}
          <div className="space-y-2 text-xs text-stone-600 leading-relaxed font-light">
            <p className="tracking-wide">
              <strong>项目概述：</strong>{item.overview}
            </p>
            <p className="tracking-wide text-stone-700 font-medium">
              <strong>我的职责：</strong>{item.role}
            </p>
          </div>

          {/* Proactive Push Section (Single or List) */}
          {item.proactivePush && (
            <div className="bg-stone-50 p-3 rounded-lg border border-stone-200/60 space-y-1">
              <p className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse animate-duration-1000"></span>
                主动推进亮点: {item.proactivePush.title}
              </p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                {item.proactivePush.desc}
              </p>
            </div>
          )}

          {item.proactivePushList && item.proactivePushList.length > 0 && (
            <div className="bg-stone-50/70 p-3 rounded-lg border border-stone-200/50 space-y-2.5">
              <p className="text-xs font-bold text-stone-800 flex items-center gap-1.5 border-b border-stone-200/60 pb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                主动与独立推进 (Proactive Initiatives)
              </p>
              <div className="space-y-2">
                {item.proactivePushList.map((push, pushIdx) => (
                  <div key={pushIdx} className="space-y-0.5 text-[11px] leading-relaxed pl-1">
                    <p className="font-semibold text-stone-800 flex items-start gap-1">
                      <span className="text-amber-500 mt-0.5">✦</span>
                      {push.title}
                    </p>
                    <p className="text-stone-500 font-light pl-3">{push.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights Section */}
          {item.highlights && item.highlights.length > 0 && (
            <div className="bg-stone-50/70 p-3 rounded-lg border border-stone-200/50 space-y-3">
              {item.highlights.map((hl, hlIdx) => (
                <div key={hlIdx} className="space-y-1.5">
                  <p className="text-xs font-bold text-stone-800 flex items-center gap-1.5 border-b border-stone-200/40 pb-1">
                    {hl.title}
                  </p>
                  <ul className="space-y-1 pl-1">
                    {hl.items.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-[11px] text-stone-600 font-light leading-relaxed flex items-start gap-1.5">
                        <span className="text-stone-400 mt-1 shrink-0 text-[6px]">●</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Polaroid Snapshots */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {item.photos.map((photo, pIdx) => {
              const colSpanClass = photo.colSpan || 'col-span-1';
              const aspectClass = photo.aspect || 'aspect-[4/3]';
              const objectFitClass = photo.objectFit || 'object-cover';
              const objectPositionClass = photo.objectPosition || 'object-center';
              const bgClass = photo.bgClass || 'bg-stone-100';
              const fallbackUrl = getFallbackImage(item.id, pIdx);

              return (
                <div
                  key={pIdx}
                  onClick={() => setLightboxPhoto({ src: photo.src, caption: photo.caption, fallback: fallbackUrl })}
                  className={`bg-white p-1.5 pb-2.5 shadow-sm border border-stone-200/60 transform ${photo.rotation} hover:scale-[1.03] hover:rotate-0 hover:z-20 transition-all duration-300 relative flex flex-col justify-between cursor-zoom-in ${colSpanClass}`}
                >
                  {/* Washi tape visual tape overlay */}
                  <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-8 h-3.5 bg-yellow-200/25 border-l border-r border-dashed border-stone-400/20"></div>

                  <div className={`w-full ${aspectClass} ${bgClass} rounded-sm overflow-hidden border border-stone-200/20 flex items-center justify-center relative`}>
                    <ImageWithFallback
                      src={photo.src}
                      fallbackSrc={fallbackUrl}
                      alt={photo.caption}
                      className={`${objectFitClass} ${objectPositionClass} w-full h-full hover:scale-110 transition-transform duration-500`}
                    />
                  </div>
                  <span className="text-[8px] text-stone-500 font-sans block mt-1.5 text-center leading-none truncate font-bold">
                    {photo.caption}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Lightbox Modal for 100% full view of any photo */}
      {lightboxPhoto && (
        <div 
          className="fixed inset-0 bg-stone-950/95 z-50 flex flex-col items-center justify-center p-4 cursor-zoom-out animate-fade-in"
          onClick={() => setLightboxPhoto(null)}
        >
          {/* Top-right close helper */}
          <div className="absolute top-4 right-4 text-stone-300 hover:text-white transition text-xs font-sans tracking-wider bg-stone-900/60 border border-stone-800 px-3.5 py-2 rounded-full shadow-lg">
            ✕ 点击任意处关闭 (Click to Close)
          </div>

          <div className="max-w-4xl max-h-[85vh] flex flex-col justify-center items-center gap-3">
            <img 
              src={resolveAssetPath(lightboxPhoto.src)} 
              alt={lightboxPhoto.caption}
              className="max-w-full max-h-[75vh] object-contain rounded-md shadow-2xl border border-stone-800"
              onError={(e) => {
                (e.target as HTMLImageElement).src = resolveAssetPath(lightboxPhoto.fallback);
              }}
            />
            <p className="text-stone-300 font-serif text-xs md:text-sm bg-stone-900/80 px-4 py-2 rounded-full border border-stone-800/80 tracking-wide text-center max-w-md shadow-md">
              📸 {lightboxPhoto.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
