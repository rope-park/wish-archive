/**
 * APP: Wish World (외부 링크 포털 사이트)
 */
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { ExternalLink, LinkType } from '@prisma/client';
import { Button, Divider, Spinner, Card, ToolBar } from '@/components/ui';
import { useWindowStore } from '@/app/stores/useWindowStore';

// ----------------------------------------------------------------------
// Types & Assets
// ----------------------------------------------------------------------

type RouteType = 'HOME' | 'DIRECTORY' | 'COMMUNITY' | 'SHOP';

interface HistoryState {
    route: RouteType;
    url: string;
}

const HOME_URL = 'http://www.wish-world.com';

// TODO: 아이콘들을 SVG로 교체하거나 아이콘 폰트 사용 고려
const getLinkIcon = (type: LinkType) => {
    switch (type) {
        case 'YOUTUBE': return '📺';
        case 'INSTAGRAM': return '📸';
        case 'X_TWITTER': return '✖️'; // or 🐦
        case 'TIKTOK': return '🎵';
        case 'WEVERSE': return 'W';
        case 'OFFICIAL_SITE': return '🏠';
        case 'SPOTIFY': return '🎧';
        default: return '🔗';
    }
};

const getLinkColor = (type: LinkType) => {
    switch (type) {
        case 'YOUTUBE': return 'text-red-600';
        case 'INSTAGRAM': return 'text-pink-600';
        case 'X_TWITTER': return 'text-black';
        case 'TIKTOK': return 'text-black';
        case 'WEVERSE': return 'text-green-500';
        case 'SPOTIFY': return 'text-green-600';
        default: return 'text-blue-600';
    }
}

// ----------------------------------------------------------------------
// Helper Components
// ----------------------------------------------------------------------

// 3D 느낌의 버튼 (Neo-Brutalism style)
function NeoButton({ children, onClick, color = "bg-white" }: { children: React.ReactNode, onClick?: () => void, color?: string }) {
    return (
        <button 
            onClick={onClick}
            className={`
                ${color} border-2 border-black rounded-xl px-4 py-2 font-bold text-sm
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
                transition-all
            `}
        >
            {children}
        </button>
    )
}

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------
export default function WishWorld({ onClose }: { onClose: () => void }) {
  // -- State --
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<ExternalLink[]>([]);
  
  // Navigation
  const [currentRoute, setCurrentRoute] = useState<RouteType>('HOME');
  const [historyStack, setHistoryStack] = useState<HistoryState[]>([{ route: 'HOME', url: HOME_URL }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [addressBar, setAddressBar] = useState(HOME_URL);

  // Data Fetching
  useEffect(() => {
    async function fetchLinks() {
      try {
        setLoading(true);
        const res = await fetch('/api/group');
        if (res.ok) {
          const data = await res.json();
          if (data.externalLinks) setLinks(data.externalLinks);
        }
      } catch (e) { console.error(e); } finally { setTimeout(() => setLoading(false), 800); }
    }
    fetchLinks();
  }, []);

  // -- Navigation Logic --
  const navigate = (route: RouteType, urlSuffix: string = '') => {
    const newUrl = `http://www.wish-world.com/${route.toLowerCase()}${urlSuffix}`;
    const newState: HistoryState = { route, url: newUrl };
    const newStack = historyStack.slice(0, historyIndex + 1);
    newStack.push(newState);
    
    setHistoryStack(newStack);
    setHistoryIndex(newStack.length - 1);
    setCurrentRoute(route);
    setAddressBar(newUrl);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setCurrentRoute(historyStack[prevIndex].route);
      setAddressBar(historyStack[prevIndex].url);
    }
  };

  const goForward = () => {
    if (historyIndex < historyStack.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setCurrentRoute(historyStack[nextIndex].route);
      setAddressBar(historyStack[nextIndex].url);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // -- Content Sorting --
  const { officialLinks, socialLinks, musicLinks } = useMemo(() => {
      return {
          officialLinks: links.filter(l => ['OFFICIAL_SITE', 'WEVERSE', 'SHOP'].includes(l.type)),
          socialLinks: links.filter(l => ['YOUTUBE', 'INSTAGRAM', 'X_TWITTER', 'TIKTOK'].includes(l.type)),
          musicLinks: links.filter(l => ['SPOTIFY', 'APPLE_MUSIC', 'MELON_MUSIC', 'GENIE_MUSIC'].includes(l.type)),
      };
  }, [links]);

  return (
    <div className="flex flex-col w-full h-full bg-[#C0C0C0] font-sans select-none overflow-hidden border-2 border-[#E0E0E0] shadow-xl">
      
      {/* ─────────────────────────────────────────────────────────────
          [SHELL] Retro Browser UI (Windows 98 Style)
      ────────────────────────────────────────────────────────────── */}
      <div className="flex px-1 py-0.5 border-b border-white shadow-sm text-xs select-none bg-[#C0C0C0]">
        {['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'].map(menu => (
          <div key={menu} className="px-2 py-0.5 hover:bg-[#000080] hover:text-white cursor-default rounded-sm">
            <span className="first-letter:underline">{menu}</span>
          </div>
        ))}
        <div className="ml-auto w-5 h-5 bg-black border border-gray-600 relative overflow-hidden flex items-center justify-center">
             <div className={`text-lg transition-opacity duration-300 ${loading ? 'opacity-100 animate-spin' : 'opacity-0'}`}>🌍</div>
        </div>
      </div>

      <div className="flex items-center gap-0.5 p-1 border-b border-gray-400 border-t-white bg-[#C0C0C0]">
        <ShellButton icon="⬅️" label="Back" onClick={goBack} disabled={historyIndex <= 0} />
        <ShellButton icon="➡️" label="Forward" onClick={goForward} disabled={historyIndex >= historyStack.length - 1} />
        <ShellButton icon="❌" label="Stop" onClick={() => setLoading(false)} disabled={!loading} />
        <ShellButton icon="🔄" label="Refresh" onClick={handleRefresh} />
        <ShellButton icon="🏠" label="Home" onClick={() => navigate('HOME')} />
        <div className="w-[1px] h-8 bg-gray-400 border-r border-white mx-1" />
        <ShellButton icon="⭐" label="Favorites" />
      </div>

      <div className="flex items-center gap-2 p-1 px-2 border-b border-gray-400 border-t-white bg-[#D4D0C8]">
        <span className="text-xs text-gray-600">Address</span>
        <div className="flex-1 bg-white border-2 border-inset border-gray-400 px-1 py-0.5 flex items-center shadow-inset">
            <img src="/icons/ie_page.png" alt="" className="w-3 h-3 mr-1 opacity-60" onError={(e) => e.currentTarget.style.display='none'}/>
            <input 
                type="text" 
                value={addressBar} 
                onChange={(e) => setAddressBar(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRefresh()}
                className="w-full text-sm outline-none font-sans bg-transparent text-gray-600"
            />
        </div>
        <button className="flex items-center gap-1 px-2 py-0.5 bg-[#C0C0C0] border-2 border-outset border-white text-xs active:border-inset" onClick={handleRefresh}>Go</button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          [VIEWPORT] The Actual Site (Neo-Y2K Bento Grid Design)
      ────────────────────────────────────────────────────────────── */}
      <div className="flex-1 border-2 border-inset border-gray-500 m-1 bg-white overflow-hidden relative">
        
        {loading && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
                 <div className="w-16 h-16 border-4 border-[#86efac] border-t-[#3b82f6] rounded-full animate-spin mb-4" />
                 <p className="font-pixel text-blue-500 animate-pulse">Traveling to Wish World...</p>
            </div>
        )}

        <div className="w-full h-full overflow-y-auto custom-scrollbar bg-[#F3F4F6] relative">
            
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#E0F2FE] to-transparent z-0 pointer-events-none" />
            <div className="absolute top-10 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none" />
            <div className="absolute top-10 left-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none" />

            {/* === CONTENT CONTAINER === */}
            <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-6 min-h-full">
                
                {/* 1. Header Area */}
                <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400 font-pixel tracking-tighter drop-shadow-sm">
                            WISH WORLD
                        </h1>
                        <p className="text-gray-400 text-sm font-medium tracking-wide mt-1">Make your dream come true ✨</p>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="relative w-full md:w-80">
                         <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">🔍</div>
                         <input 
                            type="text" 
                            placeholder="Search WISH..." 
                            className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-transparent bg-white shadow-sm focus:border-blue-400 focus:outline-none transition-all"
                         />
                    </div>
                </header>


                {/* === PAGE: HOME (Bento Grid) === */}
                {currentRoute === 'HOME' && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(140px,auto)] animate-slideUp">
                        
                        {/* [Main Hero Card] - 2x2 Size */}
                        <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl p-6 text-white relative overflow-hidden group shadow-lg">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/30">LATEST RELEASE</span>
                                    <h2 className="text-4xl font-black mt-4 font-pixel drop-shadow-md">Songbird</h2>
                                    <p className="text-blue-50 text-sm mt-2 max-w-xs">Fly high with our new single. Listen to the dreamy melody now.</p>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <NeoButton color="bg-white text-blue-600" onClick={() => handleExternalLink('https://www.youtube.com/watch?v=ABC')}>Watch MV</NeoButton>
                                    <button className="px-4 py-2 text-sm font-bold hover:bg-white/10 rounded-xl transition-colors">Stream ›</button>
                                </div>
                            </div>
                            <div className="absolute -bottom-4 -right-4 text-9xl opacity-20 rotate-12 group-hover:rotate-0 transition-transform duration-500">🕊️</div>
                        </div>

                        {/* [Profile/Login Card] */}
                        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
                             <div className="w-16 h-16 bg-gray-100 rounded-full mb-3 overflow-hidden border-2 border-gray-200 group-hover:border-blue-400 transition-colors">
                                 <img src="/icons/user.png" alt="" className="w-full h-full object-cover opacity-50" />
                             </div>
                             <h3 className="font-bold text-gray-800">Hello, Guest!</h3>
                             <p className="text-xs text-gray-400 mb-4">Join our universe</p>
                             <NeoButton color="bg-black text-white" onClick={() => {}}>Login</NeoButton>
                        </div>

                        {/* [WISH CAST] - News Ticker */}
                        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col">
                             <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/> LIVE NEWS
                             </h3>
                             <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-1">
                                {[
                                    { tag: 'NEW', text: "Songbird MV hits 10M Views!", date: "1h ago" },
                                    { tag: 'INFO', text: "Fanmeeting Tour Schedule", date: "4h ago" },
                                    { tag: 'SHOP', text: "New Merch Coming Soon", date: "1d ago" },
                                ].map((news, i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <div className="flex justify-between text-[10px] text-gray-400 mb-0.5">
                                            <span className="font-bold text-blue-500">{news.tag}</span>
                                            <span>{news.date}</span>
                                        </div>
                                        <div className="text-xs font-medium text-gray-700 group-hover:text-blue-600 truncate">{news.text}</div>
                                    </div>
                                ))}
                             </div>
                        </div>

                        {/* [Music Player Widget] */}
                        <div className="md:col-span-2 bg-[#1DB954] rounded-3xl p-4 text-white relative overflow-hidden shadow-md flex items-center gap-4 group cursor-pointer" onClick={() => navigate('DIRECTORY')}>
                             <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center shrink-0 border-4 border-white/20 animate-[spin_5s_linear_infinite]">
                                <div className="w-8 h-8 bg-[#1DB954] rounded-full border-2 border-black" />
                             </div>
                             <div className="flex-1 z-10">
                                 <div className="text-xs font-bold opacity-80 mb-1">NOW PLAYING</div>
                                 <div className="text-2xl font-black font-pixel truncate">WISH (Korean Ver.)</div>
                                 <div className="text-sm opacity-90">NCT WISH • The 1st Single</div>
                             </div>
                             <div className="absolute right-4 bottom-4 text-4xl opacity-50 group-hover:scale-125 transition-transform">🎧</div>
                        </div>

                        {/* [Quick Link: Directory] */}
                        <div 
                            onClick={() => navigate('DIRECTORY')}
                            className="bg-yellow-100 rounded-3xl p-5 border border-yellow-200 shadow-sm hover:shadow-md cursor-pointer transition-all hover:-translate-y-1 relative overflow-hidden"
                        >
                            <h3 className="font-bold text-yellow-800 text-lg">Directory</h3>
                            <p className="text-xs text-yellow-600">All Links Here</p>
                            <div className="absolute -bottom-4 -right-4 text-6xl opacity-50">📂</div>
                        </div>

                        {/* [Quick Link: Community] */}
                        <div 
                            onClick={() => navigate('COMMUNITY')}
                            className="bg-pink-100 rounded-3xl p-5 border border-pink-200 shadow-sm hover:shadow-md cursor-pointer transition-all hover:-translate-y-1 relative overflow-hidden"
                        >
                            <h3 className="font-bold text-pink-800 text-lg">Cafe</h3>
                            <p className="text-xs text-pink-600">Talk Together</p>
                            <div className="absolute -bottom-4 -right-4 text-6xl opacity-50">💬</div>
                        </div>
                        
                    </div>
                )}

                {/* === PAGE: DIRECTORY === */}
                {currentRoute === 'DIRECTORY' && (
                    <div className="animate-slideUp max-w-4xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-black text-gray-800">Directory</h2>
                            <NeoButton onClick={() => navigate('HOME')}>Back</NeoButton>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {/* Official Links */}
                             <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-500 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                    <span className="text-xl">🏢</span> Official
                                </h3>
                                <div className="space-y-2">
                                    {officialLinks.map(link => (
                                        <a key={link.id} onClick={() => handleExternalLink(link.url)} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-200">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl">{getLinkIcon(link.type)}</div>
                                            <div className="flex-1">
                                                <div className="font-bold text-gray-800 text-sm">{link.title || link.type}</div>
                                                <div className="text-xs text-gray-400 truncate">{link.url}</div>
                                            </div>
                                            <span className="text-gray-300">↗</span>
                                        </a>
                                    ))}
                                </div>
                             </div>

                             {/* Social Links */}
                             <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-500 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                    <span className="text-xl">📱</span> Social
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {socialLinks.map(link => (
                                        <a key={link.id} onClick={() => handleExternalLink(link.url)} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 hover:bg-pink-50 cursor-pointer transition-colors border border-transparent hover:border-pink-200 group">
                                            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{getLinkIcon(link.type)}</div>
                                            <div className="font-bold text-gray-700 text-xs">{link.title || link.type}</div>
                                        </a>
                                    ))}
                                </div>
                             </div>

                             {/* Music Links */}
                             <div className="md:col-span-2 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-lg">
                                <h3 className="font-bold text-gray-400 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                    <span className="text-xl">🎧</span> Streaming
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {musicLinks.map(link => (
                                        <a key={link.id} onClick={() => handleExternalLink(link.url)} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full cursor-pointer transition-colors backdrop-blur-sm border border-white/10">
                                            <span>{getLinkIcon(link.type)}</span>
                                            <span className="text-sm font-bold">{link.title || link.type}</span>
                                        </a>
                                    ))}
                                </div>
                             </div>
                        </div>
                    </div>
                )}

                {/* === PAGE: SHOP / COMMUNITY (Coming Soon) === */}
                {['SHOP', 'COMMUNITY'].includes(currentRoute) && (
                     <div className="flex flex-col items-center justify-center min-h-[400px] text-center animate-slideUp">
                         <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-6xl shadow-lg mb-6 animate-bounce border-4 border-gray-50">
                             {currentRoute === 'SHOP' ? '🛍️' : '🚧'}
                         </div>
                         <h2 className="text-4xl font-black text-gray-800 mb-2 font-pixel">
                             COMING SOON
                         </h2>
                         <p className="text-gray-500 mb-8 max-w-sm">
                             Our cute cupids are currently building this place! Please come back later.
                         </p>
                         <NeoButton onClick={() => navigate('HOME')}>Return Home</NeoButton>
                     </div>
                )}

            </div>
            
            {/* Simple Footer */}
            <div className="py-6 text-center">
                 <div className="inline-block text-[10px] text-gray-400 font-mono bg-white/50 px-3 py-1 rounded-full border border-gray-200">
                    © 2024 WISH WORLD. MADE WITH LOVE.
                 </div>
            </div>

        </div>
      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// Sub Components
// ----------------------------------------------------------------------

function ShellButton({ icon, label, onClick, disabled, active }: { icon: string, label: string, onClick?: () => void, disabled?: boolean, active?: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                flex flex-col items-center justify-center px-2 py-1 min-w-[44px] rounded-sm
                border border-transparent
                ${active ? 'bg-gray-300 shadow-inner border-gray-400' : ''}
                ${!disabled && !active ? 'hover:border-gray-400 hover:shadow-outset hover:bg-gray-100 active:shadow-inset active:translate-y-[1px]' : ''}
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-all duration-75
            `}
        >
            <span className="text-lg leading-none mb-0.5 filter drop-shadow-sm grayscale opacity-80">{icon}</span>
            <span className="text-[9px] leading-none text-gray-800">{label}</span>
        </button>
    );
}