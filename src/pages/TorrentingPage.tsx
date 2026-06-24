import React, { useState } from 'react';
import { Magnet, Info, Download, Settings, BookOpen, AlertTriangle, ShieldCheck, ExternalLink } from 'lucide-react';

interface GuideSection {
  title: string;
  content: React.ReactNode;
}

export function TorrentingPage() {
  const [activeTab, setActiveTab] = useState<'getting-started' | 'qbittorrent' | 'nyaa' | 'trackers'>('getting-started');

  const content: Record<string, GuideSection> = {
    'getting-started': {
      title: 'Getting Started with Torrenting',
      content: (
        <div className="space-y-6">
          <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] leading-relaxed">
            Torrenting is a peer-to-peer (P2P) file sharing protocol. Instead of downloading a file from a single server, you download parts of it from other users (peers/seeds) who already have the file.
          </p>

          <div className="bg-[var(--bg-elev-1)] border border-[var(--divider)] rounded-2xl p-5 md:p-6 space-y-4">
            <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] font-bold text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              Core Safety & Rules
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--text-secondary)] font-['Inter',sans-serif]">
              <li><strong className="text-[var(--text-primary)]">Use a VPN:</strong> If you are in a country with strict copyright enforcement (USA, Germany, Japan), you MUST use a paid VPN (like Mullvad, ProtonVPN) that supports P2P.</li>
              <li><strong className="text-[var(--text-primary)]">Bind Your Client:</strong> Always bind your torrent client to your VPN interface so it halts traffic if the VPN drops.</li>
              <li><strong className="text-[var(--text-primary)]">Keep Seeding:</strong> P2P relies on sharing. Try to seed back to a ratio of at least 1.0 (share as much as you downloaded) to maintain healthy swarms.</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-2xl">
              <h4 className="font-['Poppins',sans-serif] text-[var(--text-primary)] font-bold mb-2">Seeders vs Leechers</h4>
              <p className="text-xs text-[var(--text-secondary)] font-['Inter',sans-serif] leading-relaxed">
                <strong className="text-[var(--text-primary)]">Seeders:</strong> Users who have 100% of the file and are uploading it.<br />
                <strong className="text-[var(--text-primary)]">Leechers:</strong> Users who are downloading the file and have less than 100% of it.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-2xl">
              <h4 className="font-['Poppins',sans-serif] text-[var(--text-primary)] font-bold mb-2">Magnet vs Torrent</h4>
              <p className="text-xs text-[var(--text-secondary)] font-['Inter',sans-serif] leading-relaxed">
                <strong className="text-[var(--text-primary)]">Magnet Link:</strong> A URI containing the hash code of the files. The client fetches metadata from peers directly.<br />
                <strong className="text-[var(--text-primary)]">.torrent File:</strong> A file containing list of trackers and metadata of the torrent.
              </p>
            </div>
          </div>
        </div>
      )
    },
    'qbittorrent': {
      title: 'qBittorrent Configuration',
      content: (
        <div className="space-y-6">
          <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] leading-relaxed">
            qBittorrent is the recommended open-source torrent client. It is clean, ad-free, and contains advanced features.
          </p>

          <div className="space-y-4">
            <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] font-bold text-lg flex items-center gap-2">
              <Settings className="w-5 h-5 text-[var(--brand)]" />
              Recommended Settings
            </h3>

            <div className="border border-[var(--divider)] rounded-2xl overflow-hidden">
              <table className="w-full border-collapse font-['Inter',sans-serif] text-sm text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elev-1)] text-[var(--text-primary)] font-semibold border-b border-[var(--divider)]">
                    <th className="p-4 text-left">Category</th>
                    <th className="p-4 text-left">Setting Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--divider)]">
                  <tr>
                    <td className="p-4 font-bold text-[var(--text-primary)]">VPN Interface Binding</td>
                    <td className="p-4">Go to <code className="bg-[var(--chip-bg)] text-[var(--brand)] px-1.5 py-0.5 rounded">Options &gt; Advanced &gt; Network Interface</code>. Select your VPN interface name (e.g. ProtonVPN, Mullvad).</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[var(--text-primary)]">Anonymous Mode</td>
                    <td className="p-4">Go to <code className="bg-[var(--chip-bg)] text-[var(--brand)] px-1.5 py-0.5 rounded">Options &gt; Connection</code> and check <code className="text-[var(--text-primary)] font-medium">Enable Anonymous Mode</code>. (Obfuscates user agent string).</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[var(--text-primary)]">Encryption Mode</td>
                    <td className="p-4">Go to <code className="bg-[var(--chip-bg)] text-[var(--brand)] px-1.5 py-0.5 rounded">Options &gt; Bittorrent</code>. Set Encryption mode to <code className="text-[var(--text-primary)] font-medium">Require encryption</code>.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[var(--text-primary)]">Search Plugins</td>
                    <td className="p-4">Enable the built-in search tab. Go to <code className="bg-[var(--chip-bg)] text-[var(--brand)] px-1.5 py-0.5 rounded">View &gt; Search Engine</code>. Click Search plugins &gt; Check for updates to install community providers.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    },
    'nyaa': {
      title: 'How to use Nyaa.si',
      content: (
        <div className="space-y-6">
          <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] leading-relaxed">
            Nyaa.si is the primary public tracker directory for anime, manga, light novels, drama, and soundtracks.
          </p>

          <div className="bg-[var(--bg-elev-1)] border border-[var(--divider)] rounded-2xl p-5 md:p-6 space-y-4">
            <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] font-bold text-lg">
              Understanding Nyaa Filter Badges
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400">
                <strong className="block mb-1 text-sm font-bold">Green Background</strong>
                Trusted release. Verified uploaders (e.g. SubsPlease, Erai-raws, Judas). Safe to download.
              </div>
              <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--divider)] text-[var(--text-secondary)]">
                <strong className="block mb-1 text-sm font-bold text-[var(--text-primary)]">Normal Row</strong>
                User upload. Unverified. Read comments before running executables or opening archives.
              </div>
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400">
                <strong className="block mb-1 text-sm font-bold">Red Background</strong>
                Remake or deprecated release. Search for better alternative encodes.
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-['Poppins',sans-serif] text-[var(--text-primary)] font-bold text-base">Popular Anime Upload Groups:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[var(--text-secondary)] font-['Inter',sans-serif]">
              <div className="p-3 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-xl">
                <strong className="text-[var(--text-primary)]">SubsPlease / Erai-raws</strong>
                <p className="text-xs mt-1">Direct rips of official streaming sites (Crunchyroll/Netflix) with soft subtitles.</p>
              </div>
              <div className="p-3 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-xl">
                <strong className="text-[var(--text-primary)]">Judas / ASW / Beatrice-Raws</strong>
                <p className="text-xs mt-1">High fidelity mini-encodes (HEVC/x265), combining audio feeds and fan subtitles.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    'trackers': {
      title: 'Public Trackers List',
      content: (
        <div className="space-y-6">
          <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] leading-relaxed">
            Trackers coordinate connection between peers. Adding public trackers to your torrent properties can increase peer counts and speeds.
          </p>

          <div className="p-5 bg-[var(--bg-elev-1)] border border-[var(--divider)] rounded-2xl space-y-3">
            <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] font-bold text-base flex items-center gap-2">
              <Info className="w-5 h-5 text-[var(--brand)]" />
              How to add trackers:
            </h3>
            <ol className="list-decimal pl-5 space-y-1.5 text-sm text-[var(--text-secondary)] font-['Inter',sans-serif]">
              <li>Right click a running torrent in your client.</li>
              <li>Go to <code className="bg-[var(--chip-bg)] text-[var(--brand)] px-1 py-0.5 rounded">Properties</code> &gt; Trackers.</li>
              <li>Paste public trackers separated by a blank line at the bottom of the list.</li>
            </ol>
          </div>

          <div className="space-y-2">
            <h4 className="font-['Poppins',sans-serif] text-[var(--text-primary)] font-bold text-sm">Top Trackers:</h4>
            <pre className="p-4 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-2xl font-mono text-xs text-[var(--text-secondary)] overflow-x-auto select-all">
{`http://tracker.files.fm:6969/announce
udp://tracker.opentrackr.org:1337/announce
udp://tracker.coppersurfer.tk:6969/announce
udp://9.rarbg.to:2710/announce
udp://open.demonii.com:1337/announce
udp://tracker.leechers-paradise.org:6969/announce
udp://tracker.cyberia.is:6969/announce`}
            </pre>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 -z-10">
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-green-500 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Magnet className="w-6 h-6 text-[var(--brand)]" />
          <h1 className="text-[var(--text-primary)] font-['Poppins',sans-serif] text-3xl font-extrabold tracking-tight">
            Torrenting Guide
          </h1>
        </div>
        <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] text-sm md:text-base">
          All the basic how-tos about peer-to-peer downloading, client safety, and tracker lists.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[var(--divider)] pb-px overflow-x-auto scrollbar-hide mb-8">
        {(Object.keys(content) as Array<keyof typeof content>).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 font-['Inter',sans-serif] text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'border-[var(--brand)] text-[var(--brand)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Content Panel */}
      <div className="bg-[var(--bg-surface)] border border-[var(--divider)] rounded-3xl p-6 md:p-8 shadow-sm">
        <h2 className="font-['Poppins',sans-serif] text-[var(--text-primary)] font-bold text-xl md:text-2xl mb-6">
          {content[activeTab].title}
        </h2>
        {content[activeTab].content}
      </div>
    </div>
  );
}
