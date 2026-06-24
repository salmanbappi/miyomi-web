import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Info, HelpCircle } from 'lucide-react';

interface GlossaryItem {
  term: string;
  definition: string;
  category: 'General' | 'Anime' | 'Manga' | 'Audio' | 'NSFW';
}

const glossaryData: GlossaryItem[] = [
  // General
  { term: 'Otaku', definition: 'A Japanese term for people with consuming interests, particularly in anime, manga, video games, or computers.', category: 'General' },
  { term: 'Weeb / Weeaboo', definition: 'Slang for a non-Japanese person who is obsessed with Japanese culture, anime, and manga, sometimes to an excessive degree.', category: 'General' },
  { term: 'Hikikomori', definition: 'Acute social withdrawal, where individuals choose to remain isolated in their homes for extended periods.', category: 'General' },
  { term: 'Waifu', definition: 'A fictional female character from anime, manga, or games that a fan feels affection for or considers their "anime wife".', category: 'General' },
  { term: 'Husbando', definition: 'The male equivalent of a waifu; a fictional male character whom a fan considers their "husband".', category: 'General' },

  // Anime
  { term: 'Cour', definition: 'A three-month broadcasting block of television programming, typically consisting of 10 to 13 episodes.', category: 'Anime' },
  { term: 'Filler', definition: 'Episodes in an anime series that do not compile with or adapt the original manga source, used to prevent the anime from catching up with the manga.', category: 'Anime' },
  { term: 'OVA', definition: 'Original Video Animation. Anime films or series made specifically for home release formats (Blu-ray/DVD) without pre-broadcast.', category: 'Anime' },
  { term: 'ONA', definition: 'Original Net Animation. Anime releases distributed directly onto streaming services or internet portals.', category: 'Anime' },
  { term: 'Seiyuu', definition: 'A Japanese voice actor or actress working in anime, video games, radio, and dubbing foreign films.', category: 'Anime' },

  // Manga
  { term: 'Tankobon', definition: 'A compiled volume of manga chapters, collected from serial magazine publications.', category: 'Manga' },
  { term: 'Scanlation', definition: 'The scanning, translation, editing, and digital distribution of manga from raw foreign copies by fan scanlation groups.', category: 'Manga' },
  { term: 'Webtoon', definition: 'Digital comic strip formatting originating from South Korea, read vertically in a continuous scroll format.', category: 'Manga' },
  { term: 'Manhwa', definition: 'Korean term for comics and print cartoons. Read left-to-right, often printed in full color.', category: 'Manga' },
  { term: 'Manhua', definition: 'Chinese term for comics produced in China, Taiwan, or Hong Kong. Read right-to-left.', category: 'Manga' },

  // Audio
  { term: 'FLAC', definition: 'Free Lossless Audio Codec. Audio compression format that preserves sound quality 100% without loss, yielding larger files.', category: 'Audio' },
  { term: 'Opus', definition: 'A highly efficient lossy audio format that performs exceptionally well at low bitrates, recommended for voice and music.', category: 'Audio' },
  { term: 'Hi-Res Audio', definition: 'High-Resolution audio files that exceed CD quality standards (normally 24-bit/96kHz and higher).', category: 'Audio' },

  // NSFW
  { term: 'Doujinshi', definition: 'Self-published, fan-created works, including manga, novels, or art collections. Often parodies of existing series.', category: 'NSFW' },
  { term: 'Hentai', definition: 'Anime, manga, or visual novels containing explicit sexual themes and graphics.', category: 'NSFW' }
];

export function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredItems = useMemo(() => {
    return glossaryData.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.definition.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const categories = ['All', 'General', 'Anime', 'Manga', 'Audio', 'NSFW'];

  return (
    <div className="max-w-4xl mx-auto pt-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 -z-10">
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-indigo-500 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-6 h-6 text-[var(--brand)]" />
          <h1 className="text-[var(--text-primary)] font-['Poppins',sans-serif] text-3xl font-extrabold tracking-tight">
            Otaku Glossary
          </h1>
        </div>
        <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] text-sm md:text-base">
          Definitions and explanations of frequently used anime, manga, scanlation, and audio terms.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)] pointer-events-none" />
          <input
            type="text"
            placeholder="Search glossary terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-2xl text-sm font-['Inter',sans-serif] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)] transition-all shadow-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium font-['Inter',sans-serif] whitespace-nowrap transition-all border ${
                selectedCategory === category
                  ? 'bg-[var(--brand)] border-[var(--brand)] text-[var(--bg-page)] shadow-md shadow-[var(--brand)]/10 scale-[1.02]'
                  : 'bg-[var(--bg-surface)] border-[var(--divider)] text-[var(--text-primary)] hover:border-[var(--brand)]/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.term}
              className="p-5 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-2xl hover:border-[var(--brand)]/40 hover:shadow-lg transition-all"
              style={{ boxShadow: '0 6px 20px 0 rgba(0,0,0,0.03)' }}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] font-bold text-lg">
                  {item.term}
                </h3>
                <span className="text-[10px] font-semibold font-['Inter',sans-serif] px-2 py-0.5 rounded-md bg-[var(--chip-bg)] text-[var(--text-secondary)] uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
              <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] text-sm leading-relaxed">
                {item.definition}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-3xl">
          <HelpCircle className="w-12 h-12 text-[var(--text-secondary)] opacity-30 mx-auto mb-4" />
          <h3 className="text-[var(--text-primary)] font-['Poppins',sans-serif] font-semibold text-lg mb-1">
            No terms found
          </h3>
          <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] text-sm">
            Try adjusting your search query or switching filters.
          </p>
        </div>
      )}
    </div>
  );
}
