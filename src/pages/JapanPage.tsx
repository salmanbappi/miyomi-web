import React, { useState } from 'react';
import { Compass, Book, Award, Info, Laptop, CheckSquare } from 'lucide-react';

interface MethodSection {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export function JapanPage() {
  const [activeSection, setActiveSection] = useState<'methods' | 'anki' | 'tools'>('methods');

  const content: Record<string, MethodSection> = {
    'methods': {
      title: 'Immersion Learning Methods',
      icon: <Compass className="w-5 h-5 text-[var(--brand)]" />,
      content: (
        <div className="space-y-6">
          <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] leading-relaxed text-sm md:text-base">
            Learning Japanese through immersion relies on engaging with native materials (anime, manga, light novels, streams) as early as possible. This approach mimics natural acquisition rather than mechanical rule-memorization.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-[var(--bg-elev-1)] border border-[var(--divider)] rounded-2xl">
              <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] font-bold text-base mb-2">AJATT / MIA / Refold</h3>
              <p className="text-xs text-[var(--text-secondary)] font-['Inter',sans-serif] leading-relaxed">
                Structured frameworks focusing on high-volume passive listening and active reading using SRS tools. Focus is placed on acquiring vocabulary in context (sentence mining).
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elev-1)] border border-[var(--divider)] rounded-2xl">
              <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] font-bold text-base mb-2">Active vs Passive</h3>
              <p className="text-xs text-[var(--text-secondary)] font-['Inter',sans-serif] leading-relaxed">
                <strong className="text-[var(--text-primary)]">Active Immersion:</strong> Engaging with content while looking up unknown words, paying close attention.<br />
                <strong className="text-[var(--text-primary)]">Passive Immersion:</strong> Listening to audio in the background while doing other tasks to train the ear to Japanese phonetics.
              </p>
            </div>
          </div>
        </div>
      )
    },
    'anki': {
      title: 'Anki Setup & SRS',
      icon: <CheckSquare className="w-5 h-5 text-[var(--brand)]" />,
      content: (
        <div className="space-y-6">
          <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] leading-relaxed text-sm">
            Anki is a flashcard program using Spaced Repetition System (SRS). It optimizes review intervals so you memorize words right before forgetting them.
          </p>

          <div className="space-y-4">
            <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] font-bold text-base">Anki Best Practices:</h3>
            <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-secondary)] font-['Inter',sans-serif]">
              <li><strong className="text-[var(--text-primary)]">Start with a Core Deck:</strong> Download the <code className="bg-[var(--chip-bg)] text-[var(--brand)] px-1 py-0.5 rounded">Core 2.3k</code> vocabulary deck to build initial comprehension.</li>
              <li><strong className="text-[var(--text-primary)]">Sentence Mining:</strong> Once you know ~1,000 words, create your own cards. Extract 1 sentence containing exactly 1 unknown word (1T card) from your anime or manga immersion.</li>
              <li><strong className="text-[var(--text-primary)]">Keep it Fast:</strong> Limit review time to under 10 seconds per card. Show card &gt; guess meaning &gt; press good/again.</li>
            </ul>
          </div>
        </div>
      )
    },
    'tools': {
      title: 'Immersion Softwares & Tools',
      icon: <Laptop className="w-5 h-5 text-[var(--brand)]" />,
      content: (
        <div className="space-y-6">
          <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] leading-relaxed text-sm">
            Configure tools to make reading manga/novels and looking up terms quick and frictionless.
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--chip-bg)] flex items-center justify-center text-[var(--brand)] font-bold text-sm shrink-0">
                1
              </div>
              <div>
                <strong className="text-[var(--text-primary)] text-sm block">Yomichan / Yomitan</strong>
                <span className="text-xs text-[var(--text-secondary)] leading-relaxed">Browser popup dictionary. Hover over Japanese web text with Shift key pressed to get instant definitions, audio, and card exporting options to Anki.</span>
              </div>
            </div>
            <div className="p-4 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--chip-bg)] flex items-center justify-center text-[var(--brand)] font-bold text-sm shrink-0">
                2
              </div>
              <div>
                <strong className="text-[var(--text-primary)] text-sm block">Mokuro</strong>
                <span className="text-xs text-[var(--text-secondary)] leading-relaxed">OCR software for manga. Converts manga image text into selectable, searchable HTML files so Yomitan can be used to read manga.</span>
              </div>
            </div>
            <div className="p-4 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--chip-bg)] flex items-center justify-center text-[var(--brand)] font-bold text-sm shrink-0">
                3
              </div>
              <div>
                <strong className="text-[var(--text-primary)] text-sm block">Texthooker & Novel Readers</strong>
                <span className="text-xs text-[var(--text-secondary)] leading-relaxed">Novel readers like TT-Reader sync extracted text from visual novels to a browser window, allowing Yomitan popup queries.</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 -z-10">
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-amber-500 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Book className="w-6 h-6 text-[var(--brand)]" />
          <h1 className="text-[var(--text-primary)] font-['Poppins',sans-serif] text-3xl font-extrabold tracking-tight">
            Japan & Immersion
          </h1>
        </div>
        <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] text-sm md:text-base">
          Immersion frameworks, flashcard spacing workflows, and technical look-up dictionary integrations.
        </p>
      </div>

      {/* Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {(Object.keys(content) as Array<keyof typeof content>).map((key) => {
          const item = content[key];
          const isSelected = activeSection === key;
          return (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`p-5 bg-[var(--bg-surface)] border rounded-2xl text-left transition-all ${
                isSelected
                  ? 'border-[var(--brand)] shadow-md'
                  : 'border-[var(--divider)] hover:border-[var(--brand)]/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {item.icon}
                <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  {key}
                </span>
              </div>
              <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] font-bold text-base">
                {item.title}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Display Panel */}
      <div className="bg-[var(--bg-surface)] border border-[var(--divider)] rounded-3xl p-6 md:p-8 shadow-sm">
        <h2 className="font-['Poppins',sans-serif] text-[var(--text-primary)] font-bold text-xl md:text-2xl mb-6">
          {content[activeSection].title}
        </h2>
        {content[activeSection].content}
      </div>
    </div>
  );
}
