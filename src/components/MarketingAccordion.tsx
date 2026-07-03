import React, { useState } from 'react';
import { ChevronDown, Edit3, Award, Instagram, Link, Mic, Layers, Slash } from 'lucide-react';
import { marketingCards } from '../data/portfolio';

export default function MarketingAccordion() {
  const [expandedId, setExpandedId] = useState<string | null>('writing');

  const toggleFolder = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'edit-3':
        return <Edit3 className="w-4 h-4 shrink-0 text-stone-800" />;
      case 'award':
        return <Award className="w-4 h-4 shrink-0 text-stone-800" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 shrink-0 text-rose-800" />;
      default:
        return <Layers className="w-4 h-4 shrink-0 text-stone-800" />;
    }
  };

  const getLinkIcon = (iconName: string) => {
    switch (iconName) {
      case 'link':
        return <Link className="w-3.5 h-3.5 text-stone-400" />;
      case 'instagram':
        return <Instagram className="w-3.5 h-3.5 text-rose-500" />;
      case 'mic':
        return <Mic className="w-3.5 h-3.5 text-blue-500" />;
      default:
        return <Link className="w-3.5 h-3.5 text-stone-400" />;
    }
  };

  return (
    <div className="space-y-3.5 pb-8 select-none">
      {marketingCards.map((card) => {
        const isExpanded = expandedId === card.id;

        return (
          <div
            key={card.id}
            className="rounded-xl border shadow-sm overflow-hidden transition-all duration-300"
            style={{
              backgroundColor: card.color,
              borderColor: card.borderColor,
            }}
          >
            {/* Header Accordion Button */}
            <button
              onClick={() => toggleFolder(card.id)}
              className="w-full px-4 py-3 flex justify-between items-center text-xs md:text-sm font-bold text-stone-900 transition-colors cursor-pointer"
              style={{
                backgroundColor: card.borderColor + 'df', // Subtle transparency
              }}
            >
              <span className="tracking-wide flex items-center gap-2">
                {getIcon(card.icon)}
                {card.title}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-stone-700 transition-transform duration-300 ${
                  isExpanded ? 'transform rotate-180' : ''
                }`}
              />
            </button>

            {/* Inner Content Section */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                isExpanded ? 'max-h-[380px] overflow-y-auto' : 'max-h-0'
              }`}
            >
              <div className="p-4 space-y-4 text-xs text-stone-700 leading-relaxed font-sans bg-[#FAFDF9]">
                {/* Executive Summary */}
                <p className="font-light text-stone-600 border-b border-stone-200 pb-3 leading-relaxed tracking-wide">
                  {card.summary}
                </p>

                {/* Categories & Links */}
                <div className="space-y-4">
                  {card.details.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-2">
                      <span className="font-bold text-stone-900 text-xs tracking-wider uppercase block">
                        {section.label}
                      </span>

                      {/* Links Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-1 font-mono text-xs text-amber-900 font-semibold tracking-wide">
                        {section.links.map((link, lIdx) => (
                          <a
                            key={lIdx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline flex items-center gap-1.5 p-1 rounded hover:bg-stone-50 border border-transparent hover:border-stone-200/50 transition-all cursor-pointer"
                          >
                            {getLinkIcon(link.icon)}
                            <span className="truncate">{link.text}</span>
                          </a>
                        ))}
                      </div>

                      {/* Unreleased drafts indicator */}
                      {section.unreleased && section.unreleased.length > 0 && (
                        <div className="space-y-1.5 pl-1.5">
                          {section.unreleased.map((un, uIdx) => (
                            <span
                              key={uIdx}
                              className="text-stone-400 font-mono text-xs flex items-center gap-1.5"
                            >
                              <Slash className="w-3.5 h-3.5 text-stone-300 shrink-0" />
                              {un}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
