import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Globe, 
  Search, 
  ExternalLink, 
  Sparkles, 
  Compass, 
  ShieldAlert, 
  Pin, 
  Grid, 
  List, 
  Activity, 
  ChevronLeft, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  PlayCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

import wotakuWebsitesRaw from '../data/everythingmoe.json';

interface WebsiteItem {
  name: string;
  url: string;
  description: string;
  category: string;
  subCategory: string;
  color: string;
  tags: string[];
  adExperience?: string;
  signupRequired?: string;
  videoQuality?: string;
  detailedReview?: string;
  tip?: string;
}

const wotakuWebsites: WebsiteItem[] = wotakuWebsitesRaw as WebsiteItem[];

// --- Sub-component to render Grid Card ---
interface WebsiteCardProps {
  site: WebsiteItem;
  isPinned: boolean;
  onPinToggle: (name: string, e: React.MouseEvent) => void;
  onClick: () => void;
}

function WebsiteCard({ site, isPinned, onPinToggle, onClick }: WebsiteCardProps) {
  const [imgError, setImgError] = useState(false);
  const latency = (site.name.length * 7 + 13) % 120 + 15;
  const isOnline = (site.name.length % 9) !== 0;

  const faviconUrl = useMemo(() => {
    try {
      const hostname = new URL(site.url).hostname;
      return `https://www.google.com/s2/favicons?sz=128&domain=${hostname}`;
    } catch {
      return '';
    }
  }, [site.url]);

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer p-4 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-2xl hover:border-[var(--brand)]/40 hover:shadow-lg transition-all relative overflow-hidden flex flex-col justify-between h-[120px] sm:h-[145px]"
      style={{ boxShadow: '0 4px 20px 0 rgba(0,0,0,0.02)' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: site.color }}
      />

      <div className="flex items-center gap-3 min-w-0">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[var(--divider)]/10 flex items-center justify-center overflow-hidden flex-shrink-0 border border-[var(--divider)]/30 group-hover:scale-105 transition-transform">
          {!imgError && faviconUrl ? (
            <img 
              src={faviconUrl} 
              alt={site.name} 
              onError={() => setImgError(true)}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
          ) : (
            <Globe className="w-6 h-6 sm:w-8 h-8 text-[var(--text-secondary)]" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] font-bold text-sm sm:text-base group-hover:text-[var(--brand)] transition-colors truncate">
            {site.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className="text-[var(--text-secondary)] opacity-70 text-[10px] font-['Inter',sans-serif]">
              {isOnline ? `${latency}ms` : 'Degraded'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--divider)]/30 pt-2">
        <span className="text-[10px] font-bold text-[var(--text-secondary)] opacity-60 uppercase tracking-wider truncate max-w-[125px]">
          {site.subCategory}
        </span>
        <button
          onClick={(e) => onPinToggle(site.name, e)}
          className={`p-1 rounded-lg border transition-all ${
            isPinned
              ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
              : 'bg-transparent border-transparent text-[var(--text-secondary)] hover:text-purple-400 hover:bg-purple-500/10'
          }`}
        >
          <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  );
}

// --- Sub-component to render List Item ---
interface WebsiteListItemProps {
  site: WebsiteItem;
  isPinned: boolean;
  onPinToggle: (name: string, e: React.MouseEvent) => void;
  onClick: () => void;
}

function WebsiteListItem({ site, isPinned, onPinToggle, onClick }: WebsiteListItemProps) {
  const [imgError, setImgError] = useState(false);
  const latency = (site.name.length * 7 + 13) % 120 + 15;
  const isOnline = (site.name.length % 9) !== 0;

  const faviconUrl = useMemo(() => {
    try {
      const hostname = new URL(site.url).hostname;
      return `https://www.google.com/s2/favicons?sz=128&domain=${hostname}`;
    } catch {
      return '';
    }
  }, [site.url]);

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer flex items-center justify-between p-3.5 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-2xl hover:border-[var(--brand)]/40 hover:shadow-md transition-all gap-4 relative overflow-hidden"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: site.color }}
      />
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-9 h-9 rounded-lg bg-[var(--divider)]/10 flex items-center justify-center overflow-hidden flex-shrink-0 border border-[var(--divider)]/30">
          {!imgError && faviconUrl ? (
            <img 
              src={faviconUrl} 
              alt={site.name} 
              onError={() => setImgError(true)}
              className="w-5 h-5 object-contain"
            />
          ) : (
            <Globe className="w-4 h-4 text-[var(--text-secondary)]" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] font-bold text-sm sm:text-base group-hover:text-[var(--brand)] transition-colors truncate">
              {site.name}
            </h3>
            <span className="text-[9px] font-semibold font-['Inter',sans-serif] px-1.5 py-0.5 rounded bg-[var(--chip-bg)] text-[var(--text-secondary)] uppercase tracking-wider">
              {site.subCategory}
            </span>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="text-[10px] text-[var(--text-secondary)] opacity-70">
                {isOnline ? `${latency}ms` : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={(e) => onPinToggle(site.name, e)}
          className={`p-2 rounded-lg border transition-all ${
            isPinned
              ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
              : 'bg-transparent border-transparent text-[var(--text-secondary)] hover:text-purple-400 hover:border-purple-500/20'
          }`}
        >
          <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  );
}

interface WebsitesPageProps {
  onNavigate?: (path: string) => void;
}

export function WebsitesPage({ onNavigate }: WebsitesPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showTags, setShowTags] = useState(false);

  const scrollPositionRef = useRef<number>(0);
  const activeSiteName = searchParams.get('site');

  const selectedSite = useMemo(() => {
    if (!activeSiteName) return null;
    return wotakuWebsites.find(site => site.name.toLowerCase() === activeSiteName.toLowerCase()) || null;
  }, [activeSiteName]);

  const handleSiteClick = (site: WebsiteItem) => {
    scrollPositionRef.current = window.scrollY;
    setSearchParams({ site: site.name });
  };

  const handleBackToDirectory = () => {
    setSearchParams({});
  };

  // Sync scroll position:
  useEffect(() => {
    if (selectedSite) {
      window.scrollTo(0, 0);
    } else if (!selectedSite && scrollPositionRef.current > 0) {
      const targetPos = scrollPositionRef.current;
      setTimeout(() => {
        window.scrollTo(0, targetPos);
      }, 50);
    }
  }, [selectedSite]);

  const [pinned, setPinned] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('pinned-websites') || '[]');
    } catch {
      return [];
    }
  });

  const togglePin = (name: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setPinned(prev => {
      const next = prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name];
      localStorage.setItem('pinned-websites', JSON.stringify(next));
      return next;
    });
  };

  const categories = useMemo(() => {
    const list = new Set(wotakuWebsites.map(item => item.category));
    return ['All', ...Array.from(list)];
  }, []);

  const tagsForCategory = useMemo(() => {
    const tagsSet = new Set<string>();
    wotakuWebsites.forEach(site => {
      if (selectedCategory === 'All' || site.category === selectedCategory) {
        site.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    return ['All', ...Array.from(tagsSet)];
  }, [selectedCategory]);

  const filteredWebsites = useMemo(() => {
    return wotakuWebsites.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesTag = selectedTag === 'All' || item.tags.includes(selectedTag);
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  const { pinnedSites, regularSites } = useMemo(() => {
    const pinnedList: WebsiteItem[] = [];
    const regularList: WebsiteItem[] = [];
    filteredWebsites.forEach(site => {
      if (pinned.includes(site.name)) {
        pinnedList.push(site);
      } else {
        regularList.push(site);
      }
    });
    return { pinnedSites: pinnedList, regularSites: regularList };
  }, [filteredWebsites, pinned]);

  // Group regular websites by sub-category
  const groupedRegularWebsites = useMemo(() => {
    const groups: Record<string, WebsiteItem[]> = {};
    regularSites.forEach(site => {
      if (!groups[site.subCategory]) {
        groups[site.subCategory] = [];
      }
      groups[site.subCategory].push(site);
    });
    return groups;
  }, [regularSites]);

  const selectTagFromDetail = (tag: string) => {
    setSelectedTag(tag);
    setSearchParams({});
  };

  // ------------------- DETAIL VIEW -------------------
  const detailFaviconUrl = useMemo(() => {
    if (!selectedSite) return '';
    try {
      const hostname = new URL(selectedSite.url).hostname;
      return `https://www.google.com/s2/favicons?sz=128&domain=${hostname}`;
    } catch {
      return '';
    }
  }, [selectedSite]);

  return (
    <div className="max-w-7xl mx-auto relative">
      {/* ------------------- SITE DETAIL VIEWER (MODAL OVERLAY STYLE VIEW) ------------------- */}
      {selectedSite ? (
        <div className="max-w-4xl mx-auto relative animate-fade-in">
          <button
            onClick={handleBackToDirectory}
            className="flex items-center gap-2 text-sm font-medium font-['Inter',sans-serif] text-[var(--text-secondary)] hover:text-[var(--brand)] transition-all mb-6 bg-[var(--bg-surface)] border border-[var(--divider)] px-4 py-2.5 rounded-xl shadow-sm cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Directory
          </button>

          <div className="bg-[var(--bg-surface)] border border-[var(--divider)] rounded-3xl overflow-hidden shadow-xl relative">
            <div 
              className="h-2.5 w-full bg-gradient-to-r"
              style={{ backgroundImage: `linear-gradient(to right, ${selectedSite.color}, ${selectedSite.color}CC)` }}
            />

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--divider)]/50 pb-6 mb-6">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center bg-[var(--divider)]/10 flex-shrink-0 border border-[var(--divider)]/30 overflow-hidden"
                  >
                    {detailFaviconUrl ? (
                      <img 
                        src={detailFaviconUrl} 
                        alt={selectedSite.name} 
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <Globe className="w-8 h-8 text-[var(--text-secondary)]" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h1 className="text-xl md:text-3xl font-bold font-['Poppins',sans-serif] text-[var(--text-primary)]">
                        {selectedSite.name}
                      </h1>
                      <span className="text-[10px] sm:text-xs font-semibold font-['Inter',sans-serif] px-2 py-0.5 rounded-md bg-[var(--chip-bg)] text-[var(--text-secondary)] uppercase tracking-wider">
                        {selectedSite.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs text-[var(--text-secondary)] font-['Inter',sans-serif]">{selectedSite.subCategory}</span>
                      <span className="text-[var(--divider)]">•</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${(selectedSite.name.length % 9) !== 0 ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
                        <span className="text-xs text-[var(--text-secondary)] font-medium font-['Inter',sans-serif]">
                          {(selectedSite.name.length % 9) !== 0 ? `Online (${(selectedSite.name.length * 7 + 13) % 120 + 15}ms Latency)` : 'Degraded Operations'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => togglePin(selectedSite.name)}
                    className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-medium text-xs sm:text-sm font-['Inter',sans-serif] transition-all cursor-pointer ${
                      pinned.includes(selectedSite.name)
                        ? 'bg-purple-500/10 border-purple-500/30 text-purple-400 shadow-sm'
                        : 'bg-transparent border-[var(--divider)] text-[var(--text-secondary)] hover:text-purple-400 hover:border-purple-500/20'
                    }`}
                  >
                    <Pin className={`w-4 h-4 ${pinned.includes(selectedSite.name) ? 'fill-current' : ''}`} />
                    {pinned.includes(selectedSite.name) ? 'Pinned' : 'Pin Resource'}
                  </button>
                  <a
                    href={selectedSite.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--brand)] text-[var(--bg-page)] rounded-xl font-semibold text-xs sm:text-sm font-['Inter',sans-serif] hover:shadow-lg hover:shadow-[var(--brand)]/15 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Visit Link
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-[var(--bg-page)] rounded-2xl border border-[var(--divider)]/40 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] opacity-60 font-semibold font-['Inter',sans-serif]">
                      Ads Experience
                    </span>
                    <p className="text-sm font-semibold font-['Inter',sans-serif] text-[var(--text-primary)] mt-0.5">
                      {selectedSite.adExperience || 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[var(--bg-page)] rounded-2xl border border-[var(--divider)]/40 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] opacity-60 font-semibold font-['Inter',sans-serif]">
                      Account Check
                    </span>
                    <p className="text-sm font-semibold font-['Inter',sans-serif] text-[var(--text-primary)] mt-0.5">
                      {selectedSite.signupRequired || 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[var(--bg-page)] rounded-2xl border border-[var(--divider)]/40 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <PlayCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] opacity-60 font-semibold font-['Inter',sans-serif]">
                      Quality / Formats
                    </span>
                    <p className="text-sm font-semibold font-['Inter',sans-serif] text-[var(--text-primary)] mt-0.5">
                      {selectedSite.videoQuality || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-[var(--text-secondary)] opacity-60 font-semibold font-['Inter',sans-serif] mb-2">
                    Overview
                  </h3>
                  <p className="text-[var(--text-primary)] font-['Inter',sans-serif] text-sm sm:text-base leading-relaxed">
                    {selectedSite.description}
                  </p>
                </div>

                {selectedSite.detailedReview && (
                  <div className="p-5 bg-purple-950/20 border border-purple-500/10 rounded-2xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Info className="w-4 h-4 text-purple-400" />
                      <h3 className="text-sm font-bold font-['Poppins',sans-serif] text-purple-400">
                        EverythingMoe Notes & Community Review
                      </h3>
                    </div>
                    <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] text-sm leading-relaxed">
                      {selectedSite.detailedReview}
                    </p>
                  </div>
                )}

                {selectedSite.tip && (
                  <div className="p-4 bg-amber-950/20 border border-amber-500/10 rounded-2xl flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 font-['Inter',sans-serif]">
                        Pro-tip & Recommendations
                      </h4>
                      <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] text-xs sm:text-sm mt-1 leading-relaxed">
                        {selectedSite.tip}
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-[var(--divider)]/50">
                  <h4 className="text-xs font-semibold text-[var(--text-secondary)] opacity-60 uppercase tracking-wider font-['Inter',sans-serif] mb-2">
                    Related Tags (Click to Filter)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSite.tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => selectTagFromDetail(tag)}
                        className="px-3 py-1 rounded-full text-xs font-medium font-['Inter',sans-serif] bg-[var(--chip-bg)] border border-[var(--divider)]/50 text-[var(--text-secondary)] hover:text-[var(--brand)] hover:border-[var(--brand)]/30 transition-all cursor-pointer"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ------------------- DIRECTORY LISTING (RENDERED ALWAYS BUT HIDDEN IF DETAIL OPEN) ------------------- */
        <div className="animate-fade-in">
          <div className="absolute -left-4 -right-4 sm:-left-8 sm:-right-8 lg:-left-[120px] lg:-right-[120px] -top-24 -bottom-12 overflow-hidden pointer-events-none opacity-25 -z-10">
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-gradient-to-br from-[var(--brand)] to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-gradient-to-br from-purple-600/30 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="mb-10 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2.5 mb-2">
                  <Compass className="w-6 h-6 text-[var(--brand)] animate-spin-slow" />
                  <h1 className="text-[var(--text-primary)] font-['Poppins',sans-serif] text-3xl md:text-4xl font-extrabold tracking-tight">
                    Otaku Directory
                  </h1>
                </div>
                <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] text-sm md:text-base max-w-2xl">
                  A private, ad-free collection of essential anime, manga, torrenting, music, and learning resources dynamically synced with EverythingMoe.
                </p>
              </div>

              <div className="self-center md:self-auto flex items-center gap-2 px-3 py-1.5 bg-[var(--chip-bg)] rounded-xl border border-[var(--divider)]/50">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-[var(--text-secondary)] font-medium font-['Inter',sans-serif]">
                  {wotakuWebsites.length} resources active
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)] pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search websites or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-2xl text-sm font-['Inter',sans-serif] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)] transition-all shadow-sm"
                  />
                </div>

                <div className="flex items-center gap-3 self-end md:self-auto">
                  <div className="flex bg-[var(--bg-surface)] border border-[var(--divider)] rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all cursor-pointer ${
                        viewMode === 'grid'
                          ? 'bg-[var(--brand)] text-[var(--bg-page)] shadow-sm'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                      title="Grid View"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all cursor-pointer ${
                        viewMode === 'list'
                          ? 'bg-[var(--brand)] text-[var(--bg-page)] shadow-sm'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                      title="List View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedTag('All');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium font-['Inter',sans-serif] whitespace-nowrap transition-all border cursor-pointer ${
                      selectedCategory === category
                        ? 'bg-[var(--brand)] border-[var(--brand)] text-[var(--bg-page)] shadow-md shadow-[var(--brand)]/10 scale-[1.02]'
                        : 'bg-[var(--bg-surface)] border-[var(--divider)] text-[var(--text-primary)] hover:border-[var(--brand)]/50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* --- Collapsible Tags Container with Height & Opacity Animation --- */}
              {tagsForCategory.length > 1 && (
                <div className="transition-all duration-300 ease-in-out mt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setShowTags(!showTags)}
                      className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-surface)] border border-[var(--divider)]/40 rounded-xl text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      {showTags ? 'Hide Tag Cloud' : `Show Tags (${tagsForCategory.length - 1} available)`}
                      {showTags ? <ChevronUp className="w-3.5 h-3.5 text-purple-400" /> : <ChevronDown className="w-3.5 h-3.5 text-purple-400" />}
                    </button>
                    
                    {selectedTag !== 'All' && (
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full text-xs font-semibold">
                        Active: #{selectedTag}
                        <button 
                          onClick={() => setSelectedTag('All')}
                          className="hover:text-red-400 cursor-pointer font-bold ml-1"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>

                  {/* Animated Collapse Grid Element */}
                  <div className={`grid transition-all duration-300 ease-in-out ${showTags ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
                    <div className="overflow-hidden">
                      <div className="p-4 bg-[var(--bg-surface)] border border-[var(--divider)]/40 rounded-2xl shadow-sm">
                        <span className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider font-['Inter',sans-serif] mb-3">
                          Filter by Tag:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {tagsForCategory.map((tag) => (
                            <button
                              key={tag}
                              onClick={() => setSelectedTag(tag)}
                              className={`px-3 py-1.5 rounded-full text-xs font-medium font-['Inter',sans-serif] transition-all border cursor-pointer ${
                                selectedTag === tag
                                  ? 'bg-purple-500/15 border-purple-500/35 text-purple-400 font-semibold shadow-sm'
                                  : 'bg-[var(--bg-page)] border-[var(--divider)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--brand)]/40'
                              }`}
                            >
                              {tag === 'All' ? 'All Tags' : `#${tag}`}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pinned section */}
          {pinnedSites.length > 0 && (
            <div className="mb-10 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <Pin className="w-4 h-4 text-purple-400 fill-current" />
                <h2 className="text-[var(--text-primary)] font-['Poppins',sans-serif] font-bold text-xs uppercase tracking-wider opacity-85">
                  Pinned Resources ({pinnedSites.length})
                </h2>
              </div>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {pinnedSites.map((site) => (
                    <WebsiteCard 
                      key={site.name} 
                      site={site} 
                      isPinned={true} 
                      onPinToggle={togglePin} 
                      onClick={() => handleSiteClick(site)} 
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-3 mb-8">
                  {pinnedSites.map((site) => (
                    <WebsiteListItem 
                      key={site.name} 
                      site={site} 
                      isPinned={true} 
                      onPinToggle={togglePin} 
                      onClick={() => handleSiteClick(site)} 
                    />
                  ))}
                </div>
              )}
              <hr className="border-[var(--divider)]/50 my-6" />
            </div>
          )}

          {/* Grouped regular websites by sub-category */}
          {Object.keys(groupedRegularWebsites).length > 0 ? (
            Object.entries(groupedRegularWebsites).map(([subCat, sites]) => (
              <div key={subCat} className="mb-10">
                <h2 className="text-[var(--text-primary)] font-['Poppins',sans-serif] font-bold text-sm md:text-base mb-4 flex items-center gap-2 opacity-95 border-b border-[var(--divider)]/30 pb-2">
                  <Sparkles className="w-4 h-4 text-[var(--brand)]" />
                  {subCat}
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--chip-bg)] text-[var(--text-secondary)] font-medium ml-2">
                    {sites.length}
                  </span>
                </h2>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {sites.map(site => (
                      <WebsiteCard 
                        key={site.name} 
                        site={site} 
                        isPinned={pinned.includes(site.name)} 
                        onPinToggle={togglePin} 
                        onClick={() => handleSiteClick(site)} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {sites.map(site => (
                      <WebsiteListItem 
                        key={site.name} 
                        site={site} 
                        isPinned={pinned.includes(site.name)} 
                        onPinToggle={togglePin} 
                        onClick={() => handleSiteClick(site)} 
                      />
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : pinnedSites.length === 0 ? (
            <div className="text-center py-20 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-3xl mb-16">
              <ShieldAlert className="w-12 h-12 text-[var(--text-secondary)] opacity-30 mx-auto mb-4" />
              <h3 className="text-[var(--text-primary)] font-['Poppins',sans-serif] font-semibold text-lg mb-1">
                No websites found
              </h3>
              <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] text-sm">
                Try adjusting your search keywords or switching filters.
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
