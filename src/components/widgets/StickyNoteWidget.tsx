/**
 * StickyNote 컴포넌트
 * 
 * - 더블 클릭 시 편집 모드로 전환
 * - 편집 모드에서 포커스 자동 설정 및 커서 위치 조정
 * - 색상 옵션 제공
 */

'use client';

import { useState, useRef, useEffect } from 'react';

interface StickyNoteProps {
  initialText?: string;       // 초기 내용
  color?: 'pink' | 'yellow' | 'blue' | 'green' | 'purple' | 'red'; // 메모지 색상
  className?: string;
  onSave?: (text: string) => void; // 저장 시 실행될 함수 (선택사항)
}

export default function StickyNoteWidget({
  initialText = "Wish for Our Wish!",
  color = 'pink',
  className = '',
  onSave,
}: StickyNoteProps) {
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 편집 모드 진입 시 자동으로 포커스
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      // 커서를 맨 뒤로 이동
      textareaRef.current.setSelectionRange(text.length, text.length);
    }
  }, [isEditing, text.length]);

  // 편집 종료 핸들러
  const handleBlur = () => {
    setIsEditing(false);
    onSave?.(text);
  };

  // 색상 테마 매핑
  const colorStyles = {
    pink:   'bg-[#F5CAD4] shadow-[2px_4px_6px_rgba(0,0,0,0.15)]', 
    yellow: 'bg-[#FFF9C4] shadow-[2px_4px_6px_rgba(0,0,0,0.15)]',
    blue:   'bg-[#B9E6FD] shadow-[2px_4px_6px_rgba(0,0,0,0.15)]',
    green:  'bg-[#8FD0AC] shadow-[2px_4px_6px_rgba(0,0,0,0.15)]',
    purple: 'bg-[#E9B0EF] shadow-[2px_4px_6px_rgba(0,0,0,0.15)]',
    red:    'bg-[#FFB7B2] shadow-[2px_4px_6px_rgba(0,0,0,0.15)]',
  };

  return (
    <div className={`relative w-[200px] h-[200px] ${className}`}>
      
      {/* 테이프 (Tape) - 상단에 붙은 느낌 */}
      {/* 본체보다 z-index를 높여서 위를 덮도록 배치 */}
      <div className="
        absolute -top-3 left-1/2 -translate-x-1/2 z-20
        w-[70px] h-8
        bg-white/40 backdrop-blur-sm
        shadow-[0_1px_2px_rgba(0,0,0,0.1)]
        rotate-[-2deg]
        pointer-events-none
      " />

      {/* 메모지 본체 */}
      <div 
        className={`
          w-full h-full p-6 pt-10
          ${colorStyles[color]}
          shadow-[2px_4px_8px_rgba(0,0,0,0.1)]
          transition-transform duration-200
          hover:scale-[1.02]
        `}
        onDoubleClick={() => setIsEditing(true)} // 더블 클릭 시 편집 모드
      >
        {isEditing ? (
          // [편집 모드] 입력창
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
            className="
              no-drag
              w-full h-full
              bg-transparent border-none outline-none resize-none
              font-hand text-gray-800 text-lg leading-relaxed
              placeholder:text-gray-400/70
              custom-scrollbar
            "
            placeholder="Write your wish..."
          />
        ) : (
          // [뷰 모드] 텍스트 표시
          <div className="
            w-full h-full 
            font-hand text-gray-900 text-lg leading-relaxed 
            break-words whitespace-pre-wrap cursor-text
            opacity-90
          ">
            {text}
          </div>
        )}
      </div>      
    </div>
  );
}