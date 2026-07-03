import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { ComicItem } from '../types';
import { comicsData } from '../data/comics';

interface ComicGridProps {
  onSelectComic: (comic: ComicItem) => void;
}

export default function ComicGrid({ onSelectComic }: ComicGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('全部');

  const categories = useMemo(() => {
    const list = new Set(comicsData.map((c) => c.category));
    return ['全部', ...Array.from(list)];
  }, []);

  const filteredComics = useMemo(() => {
    return comicsData.filter((comic) => {
      const matchesSearch =
        comic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comic.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (comic.tags && comic.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesCategory = activeCategory === '全部' || comic.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="space-y-4">
      {/* Search and Category Filter section */}
      <div className="space-y-3">
        {/* Sketchy Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索漫画标题、标签或关键字..."
            className="w-full text-xs font-sans bg-[#fdfdfb] border-2 border-stone-300 rounded-lg px-3 py-2 pl-8 focus:outline-none focus:ring-1 focus:ring-stone-400 placeholder-stone-400 text-stone-700 shadow-sm"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
        </div>

        {/* Paper bookmarks for categories */}
        <div className="flex flex-wrap gap-1.5 pb-1 select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 text-[10px] font-serif border rounded-md transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-stone-800 text-stone-50 border-stone-800 shadow-sm translate-y-[-1px]'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-h-[440px] overflow-y-auto pr-1 no-scrollbar pb-8">
        {filteredComics.length > 0 ? (
          filteredComics.map((comic) => {
            return (
              <div
                key={comic.id}
                onClick={() => {
                  if (comic.url) {
                    window.open(comic.url, '_blank', 'noopener,noreferrer');
                  } else {
                    onSelectComic(comic);
                  }
                }}
                className="group relative bg-[#fdfdfb] p-3 rounded-lg border border-stone-200 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 transform hover:scale-[1.02] flex flex-col justify-between min-h-[140px]"
              >
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[9px] font-mono text-stone-400">
                    <span>{comic.vol}</span>
                    <span className="bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded border border-stone-200/50">
                      {comic.category}
                    </span>
                  </div>

                  <h4 className="text-xs font-serif font-bold text-stone-800 group-hover:text-stone-900 line-clamp-2 leading-tight">
                    {comic.title}
                  </h4>

                  <p className="text-[10px] text-stone-500 font-sans leading-relaxed line-clamp-3 font-light">
                    {comic.summary}
                  </p>
                </div>

                {/* Tags bottom list */}
                {comic.tags && comic.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-stone-100">
                    {comic.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[8px] bg-[#fbfaf5] text-stone-400 border border-stone-200/40 px-1 py-0.1 rounded font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-16 text-center text-stone-400 font-serif text-xs">
            没有找到相关的作品档案哦 ✏️
          </div>
        )}
      </div>
    </div>
  );
}
