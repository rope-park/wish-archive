/**
 * Taskbar (작업 표시줄)
 * 
 * - Colocation(파일 내 분리): 메인 컴포넌트 + 하위 컴포넌트들
 * - 하위 컴포넌트: 시작 버튼 (홈으로 이동), 앱 아이콘 독 (메뉴 이동), 시스템 트레이 (시계)
 */

'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import StartMenu from '@/components/os/StartMenu';
import { Button, Divider, Tooltip } from '../ui';

// [하위 컴포넌트] 시작 버튼
function StartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  return (
    <div className="shrink-0 relative" ref={buttonRef}>
      {/* 시작 메뉴 (버튼 위에 렌더링) */}
      <StartMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchorRef={buttonRef} // 필요하다면 위치 참조용으로 전달
      />

      {/* 시작 버튼 */}
      <Button
        className={`
          h-[38px] px-2 md:px-4 text-lg md:text-xl font-bold gap-2 
          ${isOpen ? 'bg-dither shadow-inset' : 'bg-gray-200'} // 열리면 눌린 상태
        `}
        onClick={() => setIsOpen(!isOpen)}
        isActive={isOpen} // Button 컴포넌트의 isActive prop 활용 가능
      >
        <span className="text-brand-primary drop-shadow-md">★</span>
        <span className="hidden md:inline font-pixel pt-1">START</span>
      </Button>
    </div>
  );
}

// [하위 컴포넌트] 시계
function SystemClock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="
      h-[37px] min-w-[90px] md:min-w-[110px] px-2
      flex items-center justify-center
      bg-gray-300 border border-gray-400 shadow-inset
    ">
      <span className="font-pixel text-sm md:text-xl tracking-wide pt-1 truncate">
        {time}
      </span>
    </div>
  );
}

// [하위 컴포넌트] 시스템 트레이 (아이콘 모음)
function SystemTray() {
  // 트레이 아이콘 데이터
  /** TODO: 아이콘 이미지 추가 */

  // 🔊 볼륨 상태 관리
  const [isMuted, setIsMuted] = useState(false);

  // 📩 메일 상태
  /** TODO: 전역 상태로 관리 */
  const [hasNewMail, setHasNewMail] = useState(true);

  return (
    <div className="
      hidden md:flex items-center gap-1 px-2 py-1 h-[37px] 
      bg-gray-200 shadow-inset border border-gray-400
      select-none
    ">

      {/* 1. 🛡️ Vaccine: 지루함 방지 시스템 */}
      <Tooltip content="Anti-Boredom 가동 중..." position="top">
        <div className="
          w-6 h-6 flex items-center justify-center 
          cursor-help hover:scale-110 transition-transform
        ">
          <span className="text-sm filter drop-shadow-sm">🛡️</span>
        </div>
      </Tooltip>

      {/* 2. 📩 Mail: 새 소식 알림 */}
      {/* 메일이 있을 때만 깜빡거리는 애니메이션 추가 */}
      <Tooltip content={hasNewMail ? "새로운 방명록이 도착했습니다!" : "새로운 메시지가 없습니다."}>
        <div
          onClick={() => setHasNewMail(false)} // 클릭하면 읽음 처리
          className={`
            w-6 h-6 flex items-center justify-center cursor-pointer
            ${hasNewMail ? 'animate-bounce' : 'opacity-50 grayscale'}
          `}
        >
          <span className="text-sm">📩</span>
        </div>
      </Tooltip>

      {/* 3. 💚 Heart: 위츄 체력 상태 */}
      <Tooltip content="WICHU HP: 100%">
        <div className="
          w-6 h-6 flex items-center justify-center 
          cursor-default animate-pulse
        ">
          <span className="text-xs text-red-600 drop-shadow-[1px_1px_0_#000]">
            ❤
          </span>
        </div>
      </Tooltip>

      {/* 4. 📶 Network: 연결 상태 */}
      <Tooltip content="WISH World와 연결됨">
        <div className="w-6 h-6 flex items-center justify-center cursor-help">
          <span className="text-sm">📶</span>
        </div>
      </Tooltip>

      {/* 5. 🔊 Volume: 음소거 토글 */}
      <Tooltip content={isMuted ? "음소거 켜짐" : "볼륨: 100%"}>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="
            w-6 h-6 flex items-center justify-center 
            hover:bg-gray-300 active:translate-y-[1px] rounded-sm
          "
        >
          <span className="text-sm">{isMuted ? '🔇' : '🔊'}</span>
        </button>
      </Tooltip>
    </div>
  );
}

// [메인 컴포넌트] Taskbar 컴포넌트
export default function Taskbar() {
  const pathname = usePathname();
  const router = useRouter();

// 페이지 경로와 태스크바 이름을 매핑
  const getPageTitle = (path: string) => {
    switch (path) {
      case '/': return 'My WISH (Desktop)';
      case '/archive': return 'WISH Archive';
      case '/releases': return 'Discography';
      case '/gallery': return 'WISH Gallery';
      case '/guestbook': return 'To. WISH';
      default: return 'WISH OS Explorer';
    }
  };

  // 현재 활성화된 탭 정보
  const currentTab = {
    id: pathname,
    title: getPageTitle(pathname),
    icon: pathname === '/' ? '💻' : '📂', // 홈이면 컴퓨터, 아니면 폴더 아이콘
  };

  const activeTasks = [currentTab]; // 현재는 활성화된 탭이 하나뿐임

  return (
    <nav className="
      fixed bottom-0 left-0 z-[--z-dock]
      w-full h-[50px] px-1 pb-1
      flex items-center gap-2
      bg-gray-200
      border-t-2 border-white
      shadow-[0_-4px_10px_rgba(0,0,0,0.1)]
    ">
      
      {/* 시작 버튼 영역 */}
      <StartButton />

      <div className="h-[36px] mx-1"><Divider orientation="vertical" /></div>

      {/* 태스크 탭 영역 (현재 페이지 + 위젯) */}
      <div className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar px-1 h-full">
        {activeTasks.map((task) => (
          <button
            key={task.id}
            onClick={() => router.push(task.id)} // 클릭 시 해당 페이지로 이동 (이미 거기 있으면 새로고침 효과)
            className={`
              h-[38px] w-[160px] md:w-[200px] shrink-0
              flex items-center gap-2 px-3
              border border-black/50 rounded-sm
              transition-all select-none
              
              /* 현재 페이지면 '눌린(Inset)' 상태, 아니면 '튀어나온(Outset)' 상태 */
              ${pathname === task.id 
                ? 'bg-gray-100 shadow-inset font-bold bg-dither text-black' 
                : 'bg-gray-200 shadow-outset active:shadow-inset text-gray-800'
              }
            `}
          >
            <span className="text-lg">{task.icon}</span>
            <span className="font-pixel text-sm pt-1 truncate flex-1 text-left">
              {task.title}
            </span>
          </button>
        ))}
      </div>

      <div className="hidden md:block h-[36px] mx-1"><Divider orientation="vertical" /></div>

      {/* 트레이 & 시계 영역 */}
      <div className="flex gap-2 shrink-0">
        <SystemTray />
        <SystemClock />
      </div>

    </nav>
  );
}
