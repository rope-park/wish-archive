'use client';

import { useEffect, useState } from 'react';
import { useArchiveStore } from '@/app/stores/useArchiveStore';
import { FileNode, CATEGORY_FILTERS, MEMBER_FILTERS } from '@/types/archive';
import { 
  FolderIcon, 
  FolderOpenIcon, 
  ChevronRightIcon, 
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ServerIcon,
  TagIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export default function ArchiveSidebar() {
  const { filters, setEra, toggleMember, toggleCategory, resetFilters } = useArchiveStore();
  
  const [activeTab, setActiveTab] = useState<'EXPLORER' | 'SEARCH'>('EXPLORER');
  const [fileSystem, setFileSystem] = useState<FileNode | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root', 'WISH Archive (D:)']));
  const [loading, setLoading] = useState(true);

  // 1. 초기 데이터 로딩 (API 연동)
  useEffect(() => {
    async function fetchTree() {
      try {
        const res = await fetch('/api/archive');
        const data = await res.json();
        setFileSystem(data);
        
        // 최상위 드라이브 자동 펼치기
        if (data.children?.[0]) {
            setExpandedNodes(prev => new Set(prev).add(data.children[0].name));
        }
      } catch (error) {
        console.error("Failed to load archive tree:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTree();
  }, []);

  // 트리 노드 토글
  const toggleNode = (nodeName: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeName)) next.delete(nodeName);
      else next.add(nodeName);
      return next;
    });
  };

  // 2. 재귀적 트리 렌더러
  const renderTree = (node: FileNode, depth: number = 0) => {
    const isExpanded = expandedNodes.has(node.name);
    const isSelected = node.type === 'era' && filters.eraId === node.id;
    
    // 앨범/이벤트 파일은 사이드바에 표시 안 하고(너무 많음), 폴더(Era)까지만 표시
    const isLeaf = node.type === 'album' || node.type === 'event';
    if (isLeaf) return null;

    return (
      <li key={node.name + depth} className="select-none" role="treeitem" aria-expanded={isExpanded} aria-selected={isSelected}>
        <div 
          className="
            flex items-center gap-1 py-1 pr-2 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-400
          "
          style={{
            paddingLeft: `${depth * 16 + 8}px`,
            backgroundColor: isSelected ? 'var(--color-brand-secondary, #FF2E93)' : undefined,
            color: isSelected ? 'white' : '#374151'
          }}
          onMouseEnter={(e) => {
            if (!isSelected) e.currentTarget.style.backgroundColor = '#e5e7eb';
          }}
          onMouseLeave={(e) => {
            if (!isSelected) e.currentTarget.style.backgroundColor = '';
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (node.type === 'era') {
              setEra(node.id!); // Era 선택 시 필터 적용
            } else {
              toggleNode(node.name); // 폴더는 열기/닫기만
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (node.type === 'era') {
                setEra(node.id!);
              } else {
                toggleNode(node.name);
              }
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`${node.type === 'era' ? 'Select era' : 'Toggle folder'} ${node.name}`}
        >
          {/* 화살표 아이콘 (자식이 있을 때만) */}
          <span className="w-4 h-4 flex items-center justify-center">
            {node.children && node.children.length > 0 && !isLeaf && (
               isExpanded 
               ? <ChevronDownIcon className="w-3 h-3" /> 
               : <ChevronRightIcon className="w-3 h-3" />
            )}
          </span>

          {/* 폴더 아이콘 */}
          {node.type === 'drive' ? (
             <ServerIcon className="w-4 h-4 text-gray-500" />
          ) : isExpanded ? (
             <FolderOpenIcon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-yellow-500'}`} />
          ) : (
             <FolderIcon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-yellow-500'}`} />
          )}

          <span className="text-sm truncate font-medium">{node.name}</span>
        </div>

        {/* 자식 노드 렌더링 */}
        {isExpanded && node.children && (
          <ul>
            {node.children.map(child => renderTree(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav className="w-full h-full shrink-0 bg-[#f0f0f0] border-r-2 border-white shadow-[inset_-2px_-2px_0px_rgba(0,0,0,0.2)] flex flex-col font-sans" aria-label="Archive navigation">
      
      {/* 1. 탭 헤더 */}
      <div className="flex border-b border-gray-400 bg-[#ece9d8]" role="tablist">
        <button
          onClick={() => setActiveTab('EXPLORER')}
          role="tab"
          aria-selected={activeTab === 'EXPLORER'}
          aria-controls="explorer-panel"
          tabIndex={activeTab === 'EXPLORER' ? 0 : -1}
          className={`flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1 transition-colors ${
            activeTab === 'EXPLORER' 
              ? 'bg-white border-t-2 border-orange-400 border-b-0 relative top-px z-10' 
              : 'bg-[#ece9d8] text-gray-500 hover:bg-[#e0e0e0]'
          }`}
        >
          <FolderIcon className="w-3 h-3" /> EXPLORER
        </button>
        <button
          onClick={() => setActiveTab('SEARCH')}
          role="tab"
          aria-selected={activeTab === 'SEARCH'}
          aria-controls="filter-panel"
          tabIndex={activeTab === 'SEARCH' ? 0 : -1}
          className={`flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1 transition-colors ${
            activeTab === 'SEARCH' 
              ? 'bg-white border-t-2 border-blue-400 border-b-0 relative top-px z-10' 
              : 'bg-[#ece9d8] text-gray-500 hover:bg-[#e0e0e0]'
          }`}
        >
          <MagnifyingGlassIcon className="w-3 h-3" /> FILTER
        </button>
      </div>

      {/* 2. 컨텐츠 영역 */}
      <div 
        className="flex-1 overflow-y-auto bg-white p-2 scroll-smooth"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#9ca3af #f3f4f6',
        }}
      >
        
        {/* === EXPLORER TAB === */}
        {activeTab === 'EXPLORER' && (
          <div className="h-full" role="tabpanel" id="explorer-panel" aria-labelledby="explorer-tab">
            {loading ? (
              <div className="p-4 text-xs text-gray-500">Loading System...</div>
            ) : fileSystem ? (
              <ul role="tree" aria-label="Archive folder tree">{renderTree(fileSystem)}</ul>
            ) : (
              <div className="p-4 text-xs text-red-500">Failed to load tree.</div>
            )}
          </div>
        )}

        {/* === SEARCH TAB === */}
        {activeTab === 'SEARCH' && (
          <div className="space-y-6 p-1" role="tabpanel" id="filter-panel" aria-labelledby="filter-tab">
            {/* 필터 초기화 */}
            <div className="flex justify-end">
              <button 
                onClick={resetFilters}
                className="text-xs font-bold px-4 py-2 bg-gradient-to-b from-gray-200 to-gray-300 border-2 border-gray-400 hover:from-gray-300 hover:to-gray-400 active:from-gray-400 active:to-gray-500 rounded shadow-[2px_2px_0px_rgba(0,0,0,0.2)] active:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)] active:translate-y-[1px] transition-all touch-manipulation"
                tabIndex={0}
                aria-label="Clear all filters"
                style={{ minHeight: '40px' }}
              >
                🗑️ Clear All
              </button>
            </div>

            {/* 멤버 필터 */}
            <section aria-labelledby="members-filter">
              <h4 id="members-filter" className="flex items-center gap-1.5 font-bold text-xs text-gray-600 mb-3 pb-2 border-b-2 border-gray-300">
                <UserGroupIcon className="w-4 h-4" /> MEMBERS
              </h4>
              <div className="grid grid-cols-2 gap-2.5" role="group" aria-label="Member filters">
                {MEMBER_FILTERS.map((m) => {
                  const isActive = filters.memberIds.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      onClick={() => toggleMember(m.id)}
                      aria-pressed={isActive}
                      tabIndex={0}
                      className={`
                        px-3 py-2.5 text-xs font-bold border-2 transition-all flex items-center justify-center gap-2 active:scale-95 rounded-sm touch-manipulation
                        ${isActive 
                          ? `${m.color} border-gray-600 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15),2px_2px_0px_rgba(0,0,0,0.2)]` 
                          : 'bg-gradient-to-b from-white to-gray-50 border-gray-400 hover:border-gray-500 shadow-[2px_2px_0px_rgba(0,0,0,0.15)]'
                        }
                      `}
                      style={{ minHeight: '44px', minWidth: '44px' }}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-black shadow-sm' : 'bg-gray-300'}`} aria-hidden="true" />
                      <span className="font-bold">{m.name}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 카테고리 필터 */}
            <section aria-labelledby="categories-filter">
              <h4 id="categories-filter" className="flex items-center gap-1.5 font-bold text-xs text-gray-600 mb-3 pb-2 border-b-2 border-gray-300">
                <TagIcon className="w-4 h-4" /> CATEGORIES
              </h4>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Category filters">
                {CATEGORY_FILTERS.map((cat) => {
                  const isActive = filters.categories.includes(cat.value);
                  return (
                    <button
                      key={cat.value}
                      onClick={() => toggleCategory(cat.value)}
                      aria-pressed={isActive}
                      tabIndex={0}
                      className={`
                        px-3 py-2 text-xs font-medium border-2 rounded-full transition-all active:scale-95 touch-manipulation
                        ${isActive 
                          ? `${cat.color} border-gray-600 font-bold text-black shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),2px_2px_4px_rgba(0,0,0,0.15)]` 
                          : 'bg-gradient-to-b from-white to-gray-50 border-gray-300 text-gray-600 hover:border-gray-400 shadow-sm hover:shadow'
                        }
                      `}
                      style={{ minHeight: '36px' }}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        )}

      </div>

      {/* 3. 사이드바 푸터 */}
      <div className="p-2 bg-[#f0f0f0] border-t border-white text-[10px] text-gray-500 font-mono">
        <div className="flex justify-between">
          <span>OBJECTS: {activeTab === 'EXPLORER' ? 'TREE' : 'FILTER'}</span>
          <span>LOCAL</span>
        </div>
      </div>
    </nav>
  );
}