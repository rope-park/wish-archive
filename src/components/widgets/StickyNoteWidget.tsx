/**
 * StickyNoteWidget 컴포넌트
 * 
 * - 더블 클릭 시 편집 모드로 전환
 * - 편집 모드에서 포커스 자동 설정 및 커서 위치 조정
 * - 색상 옵션 제공
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { ColorChip } from '../ui';

// 색상 타입 정의
type NoteColor = 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink';

interface StickyNoteProps {
  initialText?: string;       // 초기 내용
  color?: NoteColor; // 메모지 색상
  className?: string;
  onSave?: (text: string, color: NoteColor) => void; // 저장 시 실행될 함수 (선택사항)
  scale?: number;
}

export default function StickyNoteWidget({
  initialText = "Wish for Our Wish!",
  color = 'pink',
  className = '',
  onSave,
  scale = 1,
}: StickyNoteProps) {
  // 상태 관리
  const [text, setText] = useState(initialText);
  const [noteColor, setNoteColor] = useState<NoteColor>(color);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const PALETTE: NoteColor[] = ['red', 'yellow', 'green', 'blue', 'purple', 'pink'];

  // 편집 모드 진입 시 자동으로 포커스
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      // 커서를 맨 뒤로 이동
      textareaRef.current.setSelectionRange(text.length, text.length);
    }
  }, [isEditing, text.length]);

  // 편집 모드 진입 핸들러
  const handleEditStart = () => {
    setIsEditing(true);
  };

  // 터치 디바이스 감지
  const [tapCount, setTapCount] = useState(0);
  const [tapTimer, setTapTimer] = useState<NodeJS.Timeout | null>(null);

  const handleTouch = () => {
    // 더블탭 감지
    setTapCount(prev => prev + 1);
    
    if (tapTimer) clearTimeout(tapTimer);
    
    const timer = setTimeout(() => {
      if (tapCount >= 1) { // 2번째 탭
        handleEditStart();
      }
      setTapCount(0);
    }, 300);
    
    setTapTimer(timer);
  };

  // 편집 종료 핸들러
  const handleBlur = () => {
    setIsEditing(false);
    onSave?.(text, noteColor);
  };

  // 색상 테마 매핑
  const colorStyles: Record<NoteColor, string> = {
    red: 'bg-[#FFB7B2] shadow-[2px_4px_6px_rgba(0,0,0,0.15)]',
    yellow: 'bg-[#FFF9C4] shadow-[2px_4px_6px_rgba(0,0,0,0.15)]',
    green: 'bg-[#8FD0AC] shadow-[2px_4px_6px_rgba(0,0,0,0.15)]',
    blue: 'bg-[#B9E6FD] shadow-[2px_4px_6px_rgba(0,0,0,0.15)]',
    purple: 'bg-[#E9B0EF] shadow-[2px_4px_6px_rgba(0,0,0,0.15)]',
    pink: 'bg-[#F5CAD4] shadow-[2px_4px_6px_rgba(0,0,0,0.15)]',
  };

  const baseSize = (scale >= 1 ? 208 : 160) * scale;
  const tapeWidth = (scale >= 1 ? 90 : 70) * scale;
  const tapeHeight = (scale >= 1 ? 40 : 32) * scale;
  const padding = (scale >= 1 ? 40 : 32) * scale;
  const paddingTop = (scale >= 1 ? 48 : 40) * scale;
  const fontSize = (scale >= 1 ? 18 : 16) * scale;

  return (
    <div 
      className={`relative ${className}`}
      style={{ width: `${baseSize}px`, height: `${baseSize}px` }}
    >

      {/* 테이프 (Tape) - 상단에 붙은 느낌 */}
      {/* 본체보다 z-index를 높여서 위를 덮도록 배치 */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 z-20 bg-white/40 backdrop-blur-sm shadow-[0_1px_2px_rgba(0,0,0,0.1)] rotate-[-2deg] pointer-events-none"
        style={{
          top: `${-12 * scale}px`,
          width: `${tapeWidth}px`,
          height: `${tapeHeight}px`,
        }}
      />

      {/* 메모지 본체 */}
      <div
        className={`w-full h-full ${colorStyles[noteColor]} shadow-[2px_4px_8px_rgba(0,0,0,0.1)] transition-colors duration-300 ease-in-out hover:scale-[1.02] hover:transition-transform flex flex-col relative`}
        style={{
          padding: `${padding}px`,
          paddingTop: `${paddingTop}px`,
        }}
        onDoubleClick={handleEditStart}
        onTouchEnd={handleTouch}
      >
        {/* [편집 모드] 입력창 */}
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
            className="no-drag w-full h-full bg-transparent border-none outline-none resize-none font-hand text-gray-800 leading-relaxed placeholder:text-gray-500/50 custom-scrollbar"
            style={{ 
              fontFamily: 'var(--font-hand), cursive',
              fontSize: `${fontSize}px`,
              touchAction: 'auto',
            }}
            placeholder="Write your wish..."
            spellCheck={false}
          />
        ) : (
          // [뷰 모드] 텍스트 표시
          <div 
            className="w-full h-full font-hand text-gray-900 leading-relaxed break-words whitespace-pre-wrap cursor-text opacity-90 overflow-y-auto custom-scrollbar"
            style={{ 
              fontFamily: 'var(--font-hand), cursive',
              fontSize: `${fontSize}px`,
            }}
          >
            {text || <span className="text-gray-500/50 italic">Double click to write...</span>}
          </div>
        )}
      </div>

      {isEditing && (
        // 색상 선택 칩
        <div 
          className="absolute left-1/2 -translate-x-1/2 z-30 flex bg-white/40 backdrop-blur-md rounded-full shadow-sm border border-white/80 animate-pop-in"
          style={{
            bottom: `${-48 * scale}px`,
            gap: `${(scale >= 1 ? 8 : 6) * scale}px`,
            padding: `${8 * scale}px`,
          }}
        >
          {PALETTE.map((col) => (
            <ColorChip
              key={col}
              color={col}
              size='sm'
              selected={noteColor === col}
              onClick={() => setNoteColor(col)}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setNoteColor(col);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}