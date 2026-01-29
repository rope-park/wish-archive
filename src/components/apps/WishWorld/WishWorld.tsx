/**
 * APP: Wish World
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Spinner, Badge } from '@/components/ui';
import { LoreType, LoreStatus } from '@prisma/client';

type LoreItem = {
  id: string;
  title: string;
  type: LoreType;
  status: LoreStatus;
  era: string | null;
  description: string;
  solution: string | null;
  thumbnailUrl: string | null;
  tags: string[];
  discoveryDate: Date | null;
  solvedDate: Date | null;
  upvotes: number;
  downvotes: number;
  viewCount: number;
  isApproved: boolean;
};


export default function WishWorld() {
  const [selectedLore, setSelectedLore] = useState<LoreItem | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [loreData, setLoreData] = useState<LoreItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 데이터 로드
  useEffect(() => {
    async function fetchLore() {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();
        if (filter !== 'all') {
          // type이나 era로 필터링
          if (['CONCEPT', 'SYMBOL', 'THEORY', 'CONNECTION', 'OBJECT', 'EASTER_EGG'].includes(filter)) {
            params.set('type', filter);
          } else {
            params.set('era', filter);
          }
        }
        
        const response = await fetch(`/api/lore?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch lore data');
        
        const data = await response.json();
        console.log('API Response:', data);
        console.log('Lores count:', data.lores?.length);
        setLoreData(data.lores || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoreData([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchLore();
  }, [filter]);

  const filteredData = loreData;

  return (
    <div className="flex flex-col h-full bg-gray-200 font-pixel text-black overflow-hidden">
      
      {/* [모바일] 상단 툴바 - 필터 버튼들 */}
      <div className="lg:hidden w-full bg-gray-300 border-b-2 border-white shadow-outset overflow-x-auto">
        <div className="flex gap-1 p-2 min-w-max">
          <FilterBtn label="전체" onClick={() => setFilter('all')} isActive={filter === 'all'} />
          <div className="w-px bg-gray-400 mx-1" />
          <FilterBtn label="컨셉" onClick={() => setFilter('CONCEPT')} isActive={filter === 'CONCEPT'} />
          <FilterBtn label="심볼" onClick={() => setFilter('SYMBOL')} isActive={filter === 'SYMBOL'} />
          <FilterBtn label="이론" onClick={() => setFilter('THEORY')} isActive={filter === 'THEORY'} />
          <FilterBtn label="연결" onClick={() => setFilter('CONNECTION')} isActive={filter === 'CONNECTION'} />
          <FilterBtn label="오브젝트" onClick={() => setFilter('OBJECT')} isActive={filter === 'OBJECT'} />
          <FilterBtn label="이스터에그" onClick={() => setFilter('EASTER_EGG')} isActive={filter === 'EASTER_EGG'} />
          <div className="w-px bg-gray-400 mx-1" />
          <FilterBtn label="NASA" onClick={() => setFilter('NASA')} isActive={filter === 'NASA'} />
          <FilterBtn label="WISH" onClick={() => setFilter('WISH')} isActive={filter === 'WISH'} />
          <FilterBtn label="Songbird" onClick={() => setFilter('Songbird')} isActive={filter === 'Songbird'} />
          <FilterBtn label="Steady" onClick={() => setFilter('Steady')} isActive={filter === 'Steady'} />
          <FilterBtn label="COLOR" onClick={() => setFilter('COLOR')} isActive={filter === 'COLOR'} />
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
      
      {/* [왼쪽] 사이드바: 카테고리 필터 - 데스크톱만 */}
      <div className="hidden lg:flex w-48 shrink-0 border-r-2 border-white bg-gray-300 p-2 flex-col gap-2 shadow-outset overflow-y-auto">
        <div className="bg-[#000080] text-white p-1 text-center font-bold mb-2 shadow-inset">
          CLASSIFIED
        </div>
        
        <CategoryBtn label="전체" onClick={() => setFilter('all')} isActive={filter === 'all'} />
        
        <div className="text-[10px] text-gray-600 mt-2 mb-1 px-1">TYPE</div>
        <CategoryBtn label="컨셉" onClick={() => setFilter('CONCEPT')} isActive={filter === 'CONCEPT'} />
        <CategoryBtn label="심볼" onClick={() => setFilter('SYMBOL')} isActive={filter === 'SYMBOL'} />
        <CategoryBtn label="이론" onClick={() => setFilter('THEORY')} isActive={filter === 'THEORY'} />
        <CategoryBtn label="연결" onClick={() => setFilter('CONNECTION')} isActive={filter === 'CONNECTION'} />
        <CategoryBtn label="오브젝트" onClick={() => setFilter('OBJECT')} isActive={filter === 'OBJECT'} />
        <CategoryBtn label="이스터에그" onClick={() => setFilter('EASTER_EGG')} isActive={filter === 'EASTER_EGG'} />
        
        <div className="text-[10px] text-gray-600 mt-2 mb-1 px-1">ERA</div>
        <CategoryBtn label="NASA" onClick={() => setFilter('NASA')} isActive={filter === 'NASA'} />
        <CategoryBtn label="WISH" onClick={() => setFilter('WISH')} isActive={filter === 'WISH'} />
        <CategoryBtn label="Songbird" onClick={() => setFilter('Songbird')} isActive={filter === 'Songbird'} />
        <CategoryBtn label="Steady" onClick={() => setFilter('Steady')} isActive={filter === 'Steady'} />
        <CategoryBtn label="COLOR" onClick={() => setFilter('COLOR')} isActive={filter === 'COLOR'} />
      </div>

      {/* [중앙] 파일 리스트 (Grid) */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-gray-500 shadow-inset">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner />
            <span className="ml-2 text-white">Loading...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="bg-red-600 text-white p-4 border-2 border-white">
              ERROR: {error}
            </div>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="bg-gray-300 text-black p-4 border-2 border-white">
              No lore data found.
            </div>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
          {filteredData.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedLore(item)}
              className={`
                cursor-pointer group flex flex-col gap-2 p-2 
                bg-gray-300 border-2 border-white shadow-outset
                hover:bg-white transition-colors
                active:border-gray-500 active:translate-y-px
              `}
            >
              {/* 썸네일 영역 */}
              <div className="relative w-full aspect-video bg-black border border-gray-500 shadow-inset flex items-center justify-center overflow-hidden">
                {item.thumbnailUrl ? (
                  <div className="relative w-full h-full">
                     <Image src={item.thumbnailUrl} alt={item.title} fill className="object-cover" />
                  </div>
                ) : (
                  <span className="text-green-500 text-2xl">?</span>
                )}
                
                {/* 상태 뱃지 */}
                {item.status === 'UNSOLVED' && (
                   <div className="absolute top-1 right-1 bg-red-600 text-white text-[10px] px-1 animate-pulse">
                     UNSOLVED
                   </div>
                )}
              </div>

              {/* 제목 */}
              <div className="flex items-center justify-between">
                <span className="font-bold truncate text-xs sm:text-sm">{item.title}</span>
                <span className="text-[9px] sm:text-[10px] text-gray-600 ml-1 shrink-0">[{item.era || 'N/A'}]</span>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
      </div>

      {/* [오른쪽] 상세 정보 패널 (선택 시 표시) - 반응형 */}
      {selectedLore && (
        <>
          {/* 모바일: 오버레이 배경 */}
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSelectedLore(null)}
          />
          
          {/* 상세 패널 */}
          <div className={`
            w-full sm:w-96 lg:w-80 shrink-0 
            fixed lg:relative
            right-0 top-0 bottom-0 lg:top-auto lg:bottom-auto
            border-l-2 border-white bg-gray-200 
            p-4 flex flex-col shadow-outset overflow-y-auto
            z-50
            transform transition-transform duration-300
            ${selectedLore ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          `}>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-base sm:text-lg font-bold leading-tight flex-1 mr-2">{selectedLore.title}</h2>
            <button 
              onClick={() => setSelectedLore(null)}
              className="w-6 h-6 shrink-0 flex items-center justify-center bg-gray-300 border border-black text-xs hover:bg-red-500 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="mb-4 space-y-2">
            <Badge variant="outline" className="mr-2 text-xs">{selectedLore.type.toUpperCase()}</Badge>
            <StatusBadge status={selectedLore.status} />
            {selectedLore.era && (
              <Badge variant="outline" className="text-xs bg-blue-100">{selectedLore.era}</Badge>
            )}
          </div>

          {/* 투표 기능 */}
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-300">
            <VoteButton 
              type="up" 
              count={selectedLore.upvotes} 
              loreId={selectedLore.id}
            />
            <VoteButton 
              type="down" 
              count={selectedLore.downvotes} 
              loreId={selectedLore.id}
            />
            <div className="ml-auto text-xs text-gray-600">
              👁 {selectedLore.viewCount}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border-2 border-gray-400 shadow-inset p-3 min-h-25 text-xs sm:text-sm leading-relaxed mb-3 overflow-y-auto max-h-60">
            <div className="whitespace-pre-line break-words">
              {selectedLore.description}
            </div>
          </div>

          {/* Solution (해결됨일 때만) */}
          {selectedLore.status === 'SOLVED' && selectedLore.solution && (
            <div className="bg-green-50 border-2 border-green-400 shadow-inset p-3 mb-3 text-xs sm:text-sm">
              <div className="font-bold text-green-700 mb-2">💡 해답:</div>
              <div className="whitespace-pre-line break-words text-green-900">
                {selectedLore.solution}
              </div>
            </div>
          )}

          {/* 발견일/해결일 */}
          <div className="text-[10px] text-gray-600 mb-3 space-y-1">
            {selectedLore.discoveryDate && (
              <div>📅 발견: {new Date(selectedLore.discoveryDate).toLocaleDateString('ko-KR')}</div>
            )}
            {selectedLore.solvedDate && (
              <div>✅ 해결: {new Date(selectedLore.solvedDate).toLocaleDateString('ko-KR')}</div>
            )}
          </div>

          {/* Tags */}
          {selectedLore.tags && selectedLore.tags.length > 0 && (
            <div className="mb-3">
              <div className="text-[10px] text-gray-600 mb-1">🏷️ 태그:</div>
              <div className="flex flex-wrap gap-1">
                {selectedLore.tags.map((tag, idx) => (
                  <span key={idx} className="text-[9px] bg-gray-200 px-2 py-0.5 border border-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto">
            <Button className="w-full text-xs" variant="default">
              📂 관련 자료 보기
            </Button>
          </div>
        </div>
        </>
      )}
    </div>
  );
}

// [Sub Components]
function VoteButton({ type, count, loreId }: { type: 'up' | 'down', count: number, loreId: string }) {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [localCount, setLocalCount] = useState(count);

  const handleVote = async () => {
    try {
      // 같은 버튼을 다시 누르면 취소
      if (userVote === type) {
        const response = await fetch(`/api/lore/${loreId}/vote`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ voteType: type, action: 'unvote' })
        });
        
        if (response.ok) {
          setLocalCount(prev => prev - 1);
          setUserVote(null);
        }
      } 
      // 투표하지 않은 상태에서 누르면 투표
      else if (!userVote) {
        const response = await fetch(`/api/lore/${loreId}/vote`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ voteType: type, action: 'vote' })
        });
        
        if (response.ok) {
          setLocalCount(prev => prev + 1);
          setUserVote(type);
        }
      }
    } catch (error) {
      console.error('Vote failed:', error);
    }
  };

  const isActive = userVote === type;

  return (
    <button
      onClick={handleVote}
      className={`
        flex items-center gap-1 px-2 py-1 text-xs border
        ${isActive
          ? type === 'up'
            ? 'bg-green-300 border-green-500'
            : 'bg-red-300 border-red-500'
          : type === 'up'
            ? 'bg-green-100 border-green-400 hover:bg-green-200'
            : 'bg-red-100 border-red-400 hover:bg-red-200'
        }
      `}
    >
      <span>{type === 'up' ? '👍' : '👎'}</span>
      <span className="font-bold">{localCount}</span>
    </button>
  );
}

function FilterBtn({ label, onClick, isActive }: { label: string, onClick: () => void, isActive: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-2 py-1 text-xs border whitespace-nowrap
        ${isActive 
          ? 'bg-[#000080] text-white border-black shadow-inset' 
          : 'bg-gray-300 text-black border-white hover:bg-white'
        }
      `}
    >
      {label}
    </button>
  );
}

function CategoryBtn({ label, onClick, isActive }: { label: string, onClick: () => void, isActive: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left px-2 py-1 text-sm border-2
        ${isActive 
          ? 'bg-[#000080] text-white border-t-black border-l-black border-r-white border-b-white shadow-inset' 
          : 'bg-gray-300 text-black border-transparent hover:bg-white hover:border-black'
        }
      `}
    >
      {label}
    </button>
  );
}

function StatusBadge({ status }: { status: LoreStatus }) {
  const colors = {
    SOLVED: 'bg-green-600 text-white',
    UNSOLVED: 'bg-red-600 text-white',
    ONGOING: 'bg-yellow-400 text-black',
    DEBUNKED: 'bg-gray-600 text-white',
  };
  return (
    <span className={`px-2 py-0.5 text-[10px] border border-black ${colors[status]}`}>
      STATUS: {status.toUpperCase()}
    </span>
  );
}