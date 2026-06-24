import React from 'react';
import { Compass, BookOpen, Globe, Magnet, Bookmark, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useSeasonalAsset } from '../hooks/useSeasonalAsset';

interface HomePageProps {
  onNavigate?: (path: string) => void;
}

interface DashboardItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
  gradient: string;
  tag: string;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const avatarImage = useSeasonalAsset('homeAvatar', '/polic.png');

  const dashboardItems: DashboardItem[] = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Websites Directory',
      description: 'Curated list of platforms for anime streaming, manga reading, light novels, and J-Music.',
      path: '/websites',
      gradient: 'from-[#38BDF8] to-[#2563EB]',
      tag: 'DIRECTORY'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Guides & FAQs',
      description: 'Step-by-step tutorials, troubleshooting tips, and setup walk-throughs.',
      path: '/guides',
      gradient: 'from-[#A855F7] to-[#7C3AED]',
      tag: 'TUTORIALS'
    },
    {
      icon: <Magnet className="w-6 h-6" />,
      title: 'Torrenting Guide',
      description: 'P2P rules, qBittorrent client configuration, Nyaa usage, and tracker files.',
      path: '/torrenting',
      gradient: 'from-[#22C55E] to-[#15803D]',
      tag: 'P2P SAFETY'
    },
    {
      icon: <Bookmark className="w-6 h-6" />,
      title: 'Otaku Glossary',
      description: 'Definitions of animeCour blocks, scanlation terms, and high fidelity audio compression.',
      path: '/glossary',
      gradient: 'from-[#F43F5E] to-[#BE123C]',
      tag: 'REFERENCE'
    },
    {
      icon: <Compass className="w-6 h-6" />,
      title: 'Japan & Immersion',
      description: 'Language learning frameworks, Anki workflows, and translation dictionary software Yomitan.',
      path: '/japan',
      gradient: 'from-[#F97316] to-[#C2410C]',
      tag: 'IMMERSION'
    },
    {
      icon: <HelpCircle className="w-6 h-6" />,
      title: 'FAQ / Help',
      description: 'Frequently asked questions and answers to common troubleshooting issues.',
      path: '/faq',
      gradient: 'from-[#EC4899] to-[#D946EF]',
      tag: 'SUPPORT'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto pt-10 relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 -z-10">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-[#FBBF24] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-72 h-72 bg-gradient-to-br from-[#38BDF8] to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#F472B6] to-transparent rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center pb-12 relative">
        {/* Mobile Avatar */}
        <div className="lg:hidden flex items-center justify-center mb-4">
          <div className="relative w-48 h-48">
            <div className="animate-float">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--chart-3)] via-[var(--chart-2)] to-[var(--chart-1)] rounded-full blur-2xl opacity-65 scale-110" />
                <img
                  src={avatarImage}
                  alt="Miyomi Mascot"
                  height={180}
                  width={180}
                  className="relative z-10 object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Left Content */}
        <div className="relative z-10 text-center lg:text-left space-y-4">
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <h1
              className="text-[var(--text-primary)] font-['Poppins',sans-serif] relative inline-block"
              style={{ fontSize: 'clamp(32px, 8vw, 56px)', lineHeight: '1.1', fontWeight: 800, letterSpacing: '-0.02em' }}
            >
              My Miyomi
              <span className="text-[var(--brand)]">.</span>
            </h1>
          </div>

          <p
            className="text-[var(--text-secondary)] font-['Inter',sans-serif] leading-relaxed max-w-lg"
            style={{ fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: '1.6' }}
          >
            My personal dashboard containing directories, guides, reference definitions, and immersion resources. Offline-first and ad-free.
          </p>
        </div>

        {/* Desktop Avatar */}
        <div className="hidden lg:flex items-center justify-center relative mx-auto">
          <div className="relative w-full max-w-lg">
            <div className="animate-float">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--chart-3)] via-[var(--chart-2)] to-[var(--chart-1)] rounded-full blur-3xl opacity-50 scale-110" />
                <img
                  src={avatarImage}
                  alt="Miyomi Mascot"
                  width={240}
                  className="relative z-10 object-contain drop-shadow-2xl mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Dashboard Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 relative z-10">
        {dashboardItems.map((item, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onNavigate?.(item.path)}
            className="group relative overflow-hidden p-6 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-3xl hover:shadow-lg transition-all text-left flex flex-col justify-between"
            style={{ boxShadow: '0 6px 20px 0 rgba(0,0,0,0.03)' }}
          >
            {/* Hover Accent Line */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />

            <div>
              {/* Header Info */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center bg-gradient-to-br ${item.gradient} text-white`}>
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold font-['Inter',sans-serif] text-[var(--text-secondary)] opacity-60 uppercase tracking-widest">
                  {item.tag}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] font-bold text-lg mb-2 group-hover:text-[var(--brand)] transition-colors">
                {item.title}
              </h3>
              <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] text-sm leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            {/* Link indicator */}
            <div className="text-[var(--brand)] font-semibold text-xs font-['Inter',sans-serif] flex items-center gap-1 group-hover:translate-x-1 transition-transform self-end">
              Go to Section &rarr;
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
