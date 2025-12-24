/**
 * APP: WISH Archive
 * 
 * - WISH 관련 자료들을 연대기별로 정리하여 탐색할 수 있는 가상 파일 시스템 제공
 * - 트리 뷰와 파일 뷰를 통해 폴더 및 파일 탐색 가능
 * - 앨범 및 이벤트 파일 클릭 시 상세 정보 표시
 */

'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { Spinner, Button, Dropdown, MenuBar, MenuItemType, ToolBar } from '@/components/ui';

// ----------------------------------------------------------------------
// Types & Icons
// ----------------------------------------------------------------------

type FileType = 'root' | 'drive' | 'folder' | 'era' | 'album' | 'event';

interface FileSystemItem {
    id?: string;
    name: string;
    type: FileType;
    children?: FileSystemItem[];
    date?: string;
    cover?: string | null;
    eventType?: string;
    description?: string;
}

// 아이콘 매핑 함수
const getIcon = (item: FileSystemItem) => {
    switch (item.type) {
        case 'drive': return '💽';
        case 'folder': return '📁';
        case 'era': return '📂';
        case 'album': return '💿';
        case 'event':
            // 이벤트 타입별 아이콘
            if (item.eventType === 'CONCERT') return '🎤';
            if (item.eventType === 'MUSIC_SHOW') return '📺';
            if (item.eventType === 'RELEASE') return '📀';
            return '📅';
        default: return '📄';
    }
};

// ----------------------------------------------------------------------
// Helper Components
// ----------------------------------------------------------------------

// 네비게이션 버튼
function NavButton({ label, icon, disabled, onClick, active }: { label: string, icon: React.ReactNode, disabled?: boolean, onClick?: () => void, active?: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        flex items-center justify-center min-w-[32px] h-[28px] px-1 rounded-sm
        border border-transparent
        ${active ? 'bg-gray-300 border-gray-400 shadow-inner' : ''}
        ${!disabled && !active ? 'hover:bg-gray-100 hover:border-gray-300 hover:shadow-sm active:shadow-inner active:bg-gray-200' : ''}
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-all duration-75
      `}
            title={label}
        >
            <span className="text-lg leading-none">{icon}</span>
            <span className="sr-only">{label}</span>
        </button>
    );
}

// 파일 속성 모달 (실행 시 상세 정보 표시)
function PropertiesDialog({ item, onClose }: { item: FileSystemItem; onClose: () => void }) {
    if (!item) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
            {/* 윈도우 스타일 프레임 */}
            <div className="w-[360px] bg-[#C0C0C0] border-2 border-white border-r-black border-b-black shadow-xl flex flex-col p-[2px]">

                {/* 타이틀 바 */}
                <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center h-7 select-none">
                    <span className="font-bold text-xs truncate pr-2">{item.name} Properties</span>
                    <button
                        onClick={onClose}
                        className="w-4 h-4 bg-[#C0C0C0] text-black border-t-white border-l-white border-r-black border-b-black border flex items-center justify-center text-[10px] active:border-t-black active:border-l-black active:border-r-white active:border-b-white"
                    >
                        ✕
                    </button>
                </div>

                {/* 컨텐츠 */}
                <div className="p-4 flex flex-col gap-4 text-sm font-sans text-black">

                    {/* 일반 정보 탭 스타일 */}
                    <div className="flex gap-4 items-start">
                        <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-white border border-gray-400 shadow-inner text-4xl">
                            {item.cover ? <img src={item.cover} alt="" className="w-full h-full object-cover" /> : getIcon(item)}
                        </div>
                        <div className="flex flex-col gap-2 w-full overflow-hidden">
                            <div className="flex flex-col">
                                <label className="text-xs text-gray-600">Name:</label>
                                <input
                                    readOnly
                                    value={item.name}
                                    className="text-sm border border-gray-400 px-1 py-0.5 bg-white focus:outline-none"
                                />
                            </div>
                            <div className="w-full h-[1px] bg-gray-400 border-b border-white" />
                            <div className="grid grid-cols-[60px_1fr] gap-x-2 gap-y-1 text-xs">
                                <span className="text-gray-600">Type:</span>
                                <span>{item.type.toUpperCase()} File</span>
                                <span className="text-gray-600">Date:</span>
                                <span>{item.date ? new Date(item.date).toLocaleDateString() : '-'}</span>
                            </div>
                        </div>
                    </div>

                    {/* 설명 영역 */}
                    {item.description && (
                        <fieldset className="border border-gray-400 border-b-white border-r-white p-2">
                            <legend className="px-1 text-xs text-gray-600">Description</legend>
                            <div className="max-h-[100px] overflow-y-auto custom-scrollbar text-xs leading-relaxed whitespace-pre-wrap">
                                {item.description}
                            </div>
                        </fieldset>
                    )}

                    {/* 하단 버튼 */}
                    <div className="flex justify-end gap-2 mt-2">
                        <Button variant="default" size="sm" onClick={onClose} className="min-w-[70px]">OK</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// 메인 컴포넌트
// ----------------------------------------------------------------------

export default function WishArchive({ onClose }: { onClose: () => void }) {
    // -- State --
    const [fileSystem, setFileSystem] = useState<FileSystemItem | null>(null);
    const [currentPath, setCurrentPath] = useState<FileSystemItem[]>([]); // 현재 경로 스택
    const [history, setHistory] = useState<FileSystemItem[][]>([]); // 뒤로/앞으로 기록
    const [historyIndex, setHistoryIndex] = useState(-1);

    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

    // View Options
    const [viewMode, setViewMode] = useState<'icons' | 'details'>('icons');
    const [sortBy, setSortBy] = useState<'name' | 'date'>('date');
    const [showTree, setShowTree] = useState(true); // 모바일/데스크톱 트리 토글

    // Modal
    const [propertiesItem, setPropertiesItem] = useState<FileSystemItem | null>(null);

    // -- Data Fetching --
    useEffect(() => {
        async function init() {
            try {
                const res = await fetch('/api/archive');
                if (res.ok) {
                    const data = await res.json();
                    setFileSystem(data);

                    // 초기 경로: Root -> Drive (D:)
                    const initialPath = data.children && data.children.length > 0
                        ? [data, data.children[0]]
                        : [data];

                    setCurrentPath(initialPath);
                    setHistory([initialPath]);
                    setHistoryIndex(0);
                }
            } catch (e) {
                console.error("Failed to load archive:", e);
            } finally {
                setLoading(false);
            }
        }
        init();
    }, []);

    // -- Navigation Handlers --
    const navigateToPath = (newPath: FileSystemItem[]) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newPath);

        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setCurrentPath(newPath);
        setSelectedItems(new Set());
    };

    const handleItemOpen = (item: FileSystemItem) => {
        // 파일(Leaf Node)인 경우 속성창 열기
        if (['album', 'event'].includes(item.type)) {
            setPropertiesItem(item);
            return;
        }
        // 폴더인 경우 하위로 이동
        navigateToPath([...currentPath, item]);
    };

    const navigateUp = () => {
        if (currentPath.length <= 1) return;
        const newPath = currentPath.slice(0, -1);
        navigateToPath(newPath);
    };

    const goBack = () => {
        if (historyIndex > 0) {
            setHistoryIndex(prev => prev - 1);
            setCurrentPath(history[historyIndex - 1]);
            setSelectedItems(new Set());
        }
    };

    const goForward = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(prev => prev + 1);
            setCurrentPath(history[historyIndex + 1]);
            setSelectedItems(new Set());
        }
    };

    // -- Selection Handlers --
    const handleSelect = (item: FileSystemItem, multi: boolean) => {
        const key = item.id || item.name;
        if (multi) {
            const newSet = new Set(selectedItems);
            if (newSet.has(key)) newSet.delete(key);
            else newSet.add(key);
            setSelectedItems(newSet);
        } else {
            setSelectedItems(new Set([key]));
        }
    };

    // -- Memoized Data --
    const currentFolder = currentPath[currentPath.length - 1] || {};

    // 정렬된 파일 목록
    const sortedChildren = useMemo(() => {
        if (!currentFolder.children) return [];
        const list = [...currentFolder.children];
        return list.sort((a, b) => {
            // 1. 폴더 우선
            const aIsFolder = ['folder', 'era', 'drive'].includes(a.type);
            const bIsFolder = ['folder', 'era', 'drive'].includes(b.type);
            if (aIsFolder !== bIsFolder) return aIsFolder ? -1 : 1;

            // 2. 정렬 기준
            if (sortBy === 'date') {
                const dateA = a.date ? new Date(a.date).getTime() : 0;
                const dateB = b.date ? new Date(b.date).getTime() : 0;
                return dateB - dateA; // 최신순
            } else {
                return a.name.localeCompare(b.name);
            }
        });
    }, [currentFolder, sortBy]);

    const selectedCount = selectedItems.size;

    if (loading || !fileSystem) {
        return (
            <div className="h-full flex flex-col items-center justify-center bg-[#f0f0f0] select-none">
                <Spinner size="lg" />
                <p className="mt-4 font-pixel text-xs text-gray-500 animate-pulse">Mounting Archive Drive...</p>
            </div>
        );
    }

    // 메뉴 정의
    const menuItems: MenuItemType[] = [
        { key: 'file', label: '&File', children: <Dropdown.Menu><Dropdown.Item label="Close" onClick={onClose} /></Dropdown.Menu> },
        { key: 'edit', label: '&Edit', children: <Dropdown.Menu><Dropdown.Item label="Select All" /></Dropdown.Menu> },
        {
            key: 'view', label: '&View',
            children: (
                <Dropdown.Menu>
                    <Dropdown.Item label="Icons" checked={viewMode === 'icons'} onClick={() => setViewMode('icons')} />
                    <Dropdown.Item label="Details" checked={viewMode === 'details'} onClick={() => setViewMode('details')} />
                    <Dropdown.Divider />
                    <Dropdown.Item label="Sort by Name" checked={sortBy === 'name'} onClick={() => setSortBy('name')} />
                    <Dropdown.Item label="Sort by Date" checked={sortBy === 'date'} onClick={() => setSortBy('date')} />
                </Dropdown.Menu>
            )
        },
    ];

    return (
        <div className="flex flex-col h-full w-full bg-[#f0f0f0] font-sans select-none overflow-hidden">

            {/* 1. Menu Bar */}
            <MenuBar items={menuItems} className="bg-[#f0f0f0]" />

            {/* 2. Standard Toolbar */}
            <ToolBar hasGripper={true} className="border-b-0">
                <div className="flex gap-1 items-center">
                    <NavButton label="Back" icon="⬅️" disabled={historyIndex <= 0} onClick={goBack} />
                    <NavButton label="Forward" icon="➡️" disabled={historyIndex >= history.length - 1} onClick={goForward} />
                    <NavButton label="Up" icon="⬆️" disabled={currentPath.length <= 1} onClick={navigateUp} />
                </div>
                <div className="w-[1px] h-5 bg-gray-400 mx-2" />
                <div className="flex gap-1 items-center">
                    <NavButton label="Search" icon="🔍" />
                    <NavButton label="Folders" icon="📂" active={showTree} onClick={() => setShowTree(!showTree)} />
                </div>
                <div className="w-[1px] h-5 bg-gray-400 mx-2" />
                <div className="flex gap-1 items-center">
                    <NavButton label="Icons" icon="🧱" active={viewMode === 'icons'} onClick={() => setViewMode('icons')} />
                    <NavButton label="Details" icon="≣" active={viewMode === 'details'} onClick={() => setViewMode('details')} />
                </div>
            </ToolBar>

            {/* 3. Address Bar */}
            <ToolBar hasGripper={true} className="pt-0">
                <span className="text-xs text-gray-600 mr-2 shrink-0">Address</span>
                <div className="flex-1 bg-white border border-gray-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)] px-1 py-0.5 flex items-center h-[24px] overflow-hidden">
                    <img src="/icons/folder_icon.png" className="w-4 h-4 mr-1 opacity-60 shrink-0" onError={(e) => e.currentTarget.style.display = 'none'} alt="" />

                    <div className="flex items-center text-sm font-sans text-gray-800 whitespace-nowrap">
                        {currentPath.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <button
                                    onClick={() => navigateToPath(currentPath.slice(0, index + 1))}
                                    className="hover:bg-blue-100 hover:text-blue-800 px-0.5 cursor-pointer rounded-sm"
                                >
                                    {item.name}
                                </button>
                                {index < currentPath.length - 1 && (
                                    <span className="text-gray-400 mx-0.5">\</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <span className="text-[10px] text-gray-500 ml-auto pl-2">▼</span>
                </div>
            </ToolBar>

            {/* 4. Main Body (Tree + Content) */}
            <div className="flex-1 flex m-1 bg-white border-2 border-inset border-gray-400 shadow-[inset_1px_1px_0px_#888] min-h-0 relative">

                {/* Left: Tree View (Responsive) */}
                {showTree && (
                    <div className="
                        absolute md:static z-20 h-full w-[200px] bg-white border-r border-gray-200 
                        overflow-y-auto custom-scrollbar flex flex-col shadow-lg md:shadow-none
                    ">
                        <div className="p-1 min-w-max">
                            <TreeView
                                item={fileSystem}
                                level={0}
                                accumulatedPath={[]}
                                currentPath={currentPath}
                                onNavigate={(path) => navigateToPath(path)}
                            />
                        </div>
                    </div>
                )}

                {/* Right: File View */}
                <div className="flex-1 flex flex-col bg-white overflow-hidden w-full relative">
                    <div className="flex-1 overflow-auto custom-scrollbar bg-white">

                        {/* 리스트 뷰일 때 최소 너비 설정으로 가로 스크롤 유도 */}
                        <div className={viewMode === 'details' ? 'min-w-[500px]' : 'w-full'}>

                            {/* Header (Details Mode Only) */}
                            {viewMode === 'details' && (
                                <div className="flex text-xs text-gray-600 px-2 py-1 border-b border-gray-200 bg-gray-50 font-bold sticky top-0 z-10">
                                    <div className="w-1/2 px-1 border-r border-gray-200 hover:bg-gray-200 cursor-pointer" onClick={() => setSortBy('name')}>Name</div>
                                    <div className="w-1/4 px-1 border-r border-gray-200 hover:bg-gray-200 cursor-pointer">Type</div>
                                    <div className="w-1/4 px-1 hover:bg-gray-200 cursor-pointer" onClick={() => setSortBy('date')}>Date</div>
                                </div>
                            )}

                            {/* Files Grid/List */}
                            <div
                                className={`
                                    p-2 content-start
                                    ${viewMode === 'icons'
                                        ? 'grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-x-2 gap-y-4'
                                        : 'flex flex-col gap-0.5'
                                    }
                                `}
                                onClick={(e) => { if (e.target === e.currentTarget) setSelectedItems(new Set()); }}
                            >
                                {sortedChildren.length === 0 && (
                                    <div className="w-full h-32 flex flex-col items-center justify-center text-gray-400">
                                        <span className="text-2xl mb-2">🗑️</span>
                                        <span className="text-xs">This folder is empty.</span>
                                    </div>
                                )}

                                {sortedChildren.map((item) => {
                                    const key = item.id || item.name;
                                    const isSelected = selectedItems.has(key);
                                    const label = item.name.length > 20 ? item.name.slice(0, 20) + '...' : item.name;

                                    return (
                                        <div
                                            key={key}
                                            onClick={(e) => { e.stopPropagation(); handleSelect(item, e.ctrlKey || e.metaKey); }}
                                            onDoubleClick={() => handleItemOpen(item)}
                                            className={`
                                                cursor-default group
                                            ${viewMode === 'icons'
                                                    ? 'flex flex-col items-center w-full'
                                                    : `flex items-center px-1 py-0.5 text-xs ${isSelected ? 'bg-[#000080] text-white' : 'hover:bg-gray-100'}`
                                                }
                                            `}
                                        >
                                            {viewMode === 'icons' ? (
                                                // --- Icon View ---
                                                <>
                                                    <div className={`
                                                        w-12 h-12 flex items-center justify-center text-3xl mb-1 relative
                                                        ${isSelected ? 'opacity-80' : ''}
                                                    `}>
                                                        {item.cover ? (
                                                            <div className="relative w-full h-full shadow-md">
                                                                <img src={item.cover} alt="" className="w-full h-full object-cover rounded-[1px] border border-gray-400" />
                                                                {item.type === 'album' && <div className="absolute inset-0 bg-black/10 ring-1 ring-inset ring-white/20" />}
                                                            </div>
                                                        ) : (
                                                            <span className="drop-shadow-sm filter">{getIcon(item)}</span>
                                                        )}
                                                    </div>
                                                    <span className={`
                                                        text-xs text-center break-words w-full px-1 py-0.5 rounded-[1px] leading-tight
                                                        ${isSelected ? 'bg-[#000080] text-white' : 'text-gray-900'}
                                                    `}>
                                                        {label}
                                                    </span>
                                                </>
                                            ) : (
                                                // --- Details View ---
                                                <>
                                                    <div className="w-1/2 flex items-center gap-2 px-1 truncate">
                                                        <span className="w-4 text-center text-base shrink-0">{getIcon(item)}</span>
                                                        <span className="truncate">{item.name}</span>
                                                    </div>
                                                    <div className="w-1/4 px-1 truncate text-gray-500 group-hover:text-inherit">{item.type}</div>
                                                    <div className="w-1/4 px-1 truncate text-gray-500 group-hover:text-inherit">{item.date ? new Date(item.date).toLocaleDateString() : '-'}</div>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. Status Bar */}
            <div className="h-6 bg-[#f0f0f0] border-t border-gray-300 flex items-center gap-2 px-1 text-xs text-gray-600">
                <div className="flex-1 px-1 truncate">{selectedCount > 0 ? `${selectedCount} item(s) selected` : `${sortedChildren.length} object(s)`}</div>
                <div className="w-[1px] h-4 bg-gray-400" />
                <div className="w-32 px-1 truncate">My WISH</div>
            </div>

            {/* 속성 모달 (커스텀 다이얼로그) */}
            {propertiesItem && <PropertiesDialog item={propertiesItem} onClose={() => setPropertiesItem(null)} />}
        </div>
    );
}

// ----------------------------------------------------------------------
// Tree View Component
// ----------------------------------------------------------------------

function TreeView({ 
  item, 
  level, 
  accumulatedPath,
  currentPath, 
  onNavigate 
}: { 
  item: FileSystemItem, 
  level: number, 
  accumulatedPath: FileSystemItem[],
  currentPath: FileSystemItem[], 
  onNavigate: (path: FileSystemItem[]) => void 
}) {
  const isActive = currentPath.includes(item);
  const isSelected = currentPath[currentPath.length - 1] === item;
  
  // 기본적으로 루트, 드라이브, 폴더는 펼침 상태 (로직 개선 가능)
  const isExpanded = isActive || level < 1; 

  // 현재 노드까지의 전체 경로 계산
  const myFullPath = [...accumulatedPath, item];

  const hasChildren = item.children && item.children.some(c => ['drive', 'folder', 'era'].includes(c.type));

  return (
    <div className="select-none font-sans">
      <div
        className={`
          flex items-center gap-1 px-1 py-[1px] cursor-pointer text-xs truncate
          border border-transparent
          ${isSelected ? 'bg-[#000080] text-white border-dotted border-gray-200' : 'text-black hover:underline'}
        `}
        style={{ paddingLeft: `${level * 16 + 4}px` }}
        onClick={(e) => { e.stopPropagation(); onNavigate(myFullPath); }}
      >
        <span className="text-sm opacity-90">{item.type === 'root' ? '🖥️' : (item.type === 'drive' ? '💽' : (isExpanded ? '📂' : '📁'))}</span>
        <span>{item.name}</span>
      </div>

      {isExpanded && hasChildren && (
        <div>
          {item.children!
            .filter(child => ['drive', 'folder', 'era'].includes(child.type))
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(child => (
              <TreeView
                key={child.id || child.name}
                item={child}
                level={level + 1}
                accumulatedPath={myFullPath}
                currentPath={currentPath}
                onNavigate={onNavigate}
              />
            ))
          }
        </div>
      )}
    </div>
  );
}