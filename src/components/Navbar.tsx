"use client";

import { X, ChevronDown, Github, Instagram, Youtube, Facebook, Plus, Search, Menu, Heart } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { SearchModal } from './SearchModal';
import { useSeasonalAsset } from '../hooks/useSeasonalAsset';
import { useLocation, useNavigate } from 'react-router-dom';
import { ParticleEffect } from './ParticleEffect';
import { useThemeEngineContext } from '@/hooks/useThemeEngine';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { TelegramIcon } from './TelegramIcon';
import { DiscordIcon } from './DiscordIcon';

interface NavbarProps {
  onNavigate?: (path: string) => void;
}

function NavbarParticles() {
  try {
    const { particleConfig } = useThemeEngineContext();
    if (!particleConfig || particleConfig.type === 'none') return null;
    return <ParticleEffect className="absolute inset-0 z-0" config={particleConfig} countOverride={15} />;
  } catch {
    return null;
  }
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [guidesDropdownOpen, setGuidesDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const hoverTimeouts = useRef<{ pages: number | null; guides: number | null }>({
    pages: null,
    guides: null,
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedSection(null);
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      (['pages', 'guides'] as const).forEach((section) => {
        const timeoutId = hoverTimeouts.current[section];
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      });
    };
  }, []);

  const logoImage = useSeasonalAsset('logo', '/hugme.png');

  const mainNavItems = [
    { label: 'Home', path: '/' },
    { label: 'Websites Directory', path: '/websites' },
    { label: 'Guides & FAQs', path: '/guides' },
    { label: 'Torrenting Guide', path: '/torrenting' },
    { label: 'Otaku Glossary', path: '/glossary' },
    { label: 'Japan & Immersion', path: '/japan' },
    { label: 'FAQ / Help', path: '/faq' },
  ];

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, label: 'GitHub', link: 'https://github.com/tas33n/miyomi' },
  ];

  const handleClick = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const clearHoverTimeout = (section: 'pages' | 'guides') => {
    const timeoutId = hoverTimeouts.current[section];
    if (timeoutId) {
      clearTimeout(timeoutId);
      hoverTimeouts.current[section] = null;
    }
  };

  const openDropdown = (section: 'pages' | 'guides') => {
    clearHoverTimeout(section);
    if (section === 'pages') {
      setPagesDropdownOpen(true);
    } else {
      setGuidesDropdownOpen(true);
    }
  };

  const scheduleDropdownClose = (section: 'pages' | 'guides') => {
    clearHoverTimeout(section);
    hoverTimeouts.current[section] = window.setTimeout(() => {
      if (section === 'pages') {
        setPagesDropdownOpen(false);
      } else {
        setGuidesDropdownOpen(false);
      }
      hoverTimeouts.current[section] = null;
    }, 150);
  };

  const renderDropdownItem = (item: { label: string; path: string }) => (
    <DropdownMenuItem
      key={item.path}
      onClick={() => handleClick(item.path)}
      className={`cursor-pointer ${isActive(item.path)
        ? 'text-[var(--brand)] bg-[var(--chip-bg)]'
        : 'text-[var(--text-primary)] hover:bg-[var(--bg-elev-1)]'
        }`}
      style={{ fontWeight: isActive(item.path) ? 600 : 400 }}
    >
      {item.label}
    </DropdownMenuItem>
  );

  return (
    <>
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />

      <nav
        className={`h-16 fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${scrolled
          ? 'bg-[var(--bg-page)]/80 backdrop-blur-xl border-b border-[var(--divider)]/50 shadow-sm'
          : 'bg-transparent'
          }`}
      >
        {/* Navbar Content */}
        <div className="relative z-10 h-full px-4 sm:px-8 lg:px-[120px] flex items-center justify-between w-full gap-4 overflow-hidden">
          <NavbarParticles />
          {/* Left Section: Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleClick('/')}
              className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
            >
              <img src={logoImage} alt="Miyomi" className="w-8 h-8 object-contain group-hover:scale-110 transition-transform" />
              <span className="text-[var(--brand)] font-['Poppins',sans-serif] text-lg" style={{ fontWeight: 600 }}>
                Miyomi
              </span>
            </button>
          </div>

          {/* Right Section: Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-4">
            {/* Directory Dropdown - Hover Trigger */}
            <DropdownMenu open={pagesDropdownOpen} onOpenChange={setPagesDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  onPointerDown={(event) => event.preventDefault()}
                  onMouseEnter={() => openDropdown('pages')}
                  onMouseLeave={() => scheduleDropdownClose('pages')}
                  className="flex items-center gap-1 text-sm py-2 px-2 relative transition-colors text-[var(--text-primary)] hover:text-[var(--brand)] font-['Inter',sans-serif]"
                  style={{ fontWeight: 400 }}
                >
                  Explore <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                sideOffset={6}
                onMouseEnter={() => openDropdown('pages')}
                onMouseLeave={() => scheduleDropdownClose('pages')}
                className="w-48 bg-[var(--bg-page)]/90 backdrop-blur-xl border border-[var(--divider)]/50 rounded-xl shadow-sm p-1 transition-all duration-200 ease-out"
              >
                {mainNavItems.map(renderDropdownItem)}
              </DropdownMenuContent>
            </DropdownMenu>



            {/* Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--brand)] transition-colors relative group"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[var(--bg-surface)] border border-[var(--divider)] rounded text-xs text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Search
              </span>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Social Links */}
            <div className="flex items-center gap-1">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[var(--text-secondary)] hover:text-[var(--brand)] transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--brand)] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[var(--text-primary)] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay (Backdrop) */}
      <div
        className={`fixed inset-0 top-16 z-[997] md:hidden transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        style={{
          backgroundColor: 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Dropdown (Content) */}
      <div
        className={`fixed top-16 left-0 right-0 z-[998] md:hidden bg-[var(--bg-page)]/95 backdrop-blur-xl border-b border-[var(--divider)] shadow-lg transition-all duration-300 origin-top ${mobileMenuOpen ? 'translate-y-0 opacity-100 scale-y-100' : '-translate-y-4 opacity-0 scale-y-95 pointer-events-none'
          }`}
      >
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto w-full">
          <div className="px-6 py-6 max-w-lg mx-auto">
            {/* Navigation List */}
            <div className="space-y-1.5 mb-6">
              <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider block px-4 mb-2">
                Explore Portal
              </span>
              {mainNavItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleClick(item.path)}
                  className={`w-full text-left py-2.5 px-4 rounded-xl transition-all font-['Inter',sans-serif] ${isActive(item.path)
                    ? 'text-[var(--brand)] bg-[var(--chip-bg)] font-semibold'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-elev-1)]'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>



            {/* Appearance Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between py-2.5">
                <span className="text-[var(--text-primary)] font-['Inter',sans-serif]" style={{ fontWeight: 500 }}>
                  appearance
                </span>
                <ThemeToggle />
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-3 border-t border-[var(--divider)]">
              <div className="flex items-center justify-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 text-[var(--text-secondary)] hover:text-[var(--brand)] transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
