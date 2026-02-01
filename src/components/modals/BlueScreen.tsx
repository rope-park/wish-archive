/**
 * Blue Screen of Death (BSOD) - 윈도우 98 스타일
 * 욕설 입력 시 표시되는 경고 화면
 */

'use client';

import { useEffect } from 'react';

interface BlueScreenProps {
  onClose: () => void;
  message?: string;
}

export default function BlueScreen({ onClose, message = "예쁜 말만 써주세요!" }: BlueScreenProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-10000 bg-[#0000AA] text-white font-mono flex items-center justify-center p-4 animate-fade-in">
      <div className="max-w-3xl w-full">
        {/* 헤더 */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">WISH OS</h1>
          <p className="text-sm">치명적인 오류가 발생했습니다</p>
        </div>

        {/* 에러 메시지 */}
        <div className="bg-[#AAAAAA] text-black p-4 mb-6">
          <p className="font-bold text-lg mb-2">*** STOP: 0x0000WISH (0x00000BAD, 0x00000WORD)</p>
          <p className="text-sm">INAPPROPRIATE_CONTENT_DETECTED</p>
        </div>

        {/* 상세 설명 */}
        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            시스템이 부적절한 콘텐츠를 감지했습니다.
          </p>
          
          <p className="text-yellow-300 font-bold text-lg">
            💚 {message}
          </p>

          <p>
            WISH OS는 모든 사용자가 안전하고 즐겁게 이용할 수 있는 공간을 만들기 위해 노력하고 있습니다.
            멤버들과 팬 여러분을 위한 따뜻한 말과 응원을 남겨주세요.
          </p>

          <div className="border-t border-white pt-4 mt-6">
            <p className="font-bold mb-2">금지 행위:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>멤버 비방, 욕설, 루머 유포</li>
              <li>도배성 글 작성</li>
              <li>타인의 개인정보 유출</li>
              <li>불쾌감을 주는 닉네임 사용</li>
            </ul>
          </div>
        </div>

        {/* 하단 안내 */}
        <div className="mt-8 pt-4 border-t border-white">
          <p className="text-center text-sm">
            계속하려면 <span className="bg-white text-black px-2 py-1 font-bold">ESC</span> 또는 <span className="bg-white text-black px-2 py-1 font-bold">ENTER</span> 키를 누르세요
          </p>
        </div>

        {/* 기술 정보 (패러디) */}
        <div className="mt-6 text-xs opacity-70">
          <p>Technical information:</p>
          <p>*** STOP: 0x0000WISH (0x00000BAD, 0x00000WORD, 0xDEADBEEF, 0xCAFEBABE)</p>
        </div>
      </div>
    </div>
  );
}
