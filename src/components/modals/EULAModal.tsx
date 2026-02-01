/**
 * EULA Modal - 윈도우 98 설치 화면 스타일
 * 첫 방문 시 약관 동의 화면
 */

'use client';

import { useState, useEffect } from 'react';

const EULA_TEXT = `WISH OS 최종 사용자 라이선스 동의서 (EULA)

본 약관을 주의 깊게 읽어주세요. WISH OS를 사용함으로써 귀하는 다음 조건에 동의하게 됩니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. 개인정보 처리방침

수집 항목:
  • 방명록 작성 시: 닉네임, 작성 내용, (필요시) IP 주소 일부

쿠키/저장소 사용:
  • 사용자의 편의(위시돌 상태 저장, 테마 설정 등)를 위해 브라우저의 localStorage 및 Cookies를 사용합니다.

데이터 출처:
  • 공식 자료: NCT WISH Official Twitter / Instagram / Weverse
  • 트위터 데이터: 본 사이트는 Twitter(X)의 게시물을 임베딩하거나 링크를 저장하는 방식으로, 원본 데이터는 트위터 서버에서 불러옵니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2. 이용 규칙

금지 행위 (위반 시 무통보 삭제):
  • 멤버 비방, 욕설, 루머 유포, 도배성 글
  • 타인의 개인정보 유출 또는 불쾌감을 주는 닉네임

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3. 면책 사항

본 프로젝트는 팬 메이드 사이트이며, 공식 소속사(SM Entertainment)와 무관합니다.
모든 콘텐츠는 공개된 자료를 기반으로 제작되었으며, 상업적 목적이 없습니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

위 약관에 동의하시면 "I Agree" 버튼을 클릭하여 WISH OS를 시작하세요.
동의하지 않으시면 "Cancel" 버튼을 클릭하세요.
`;

export default function EULAModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // localStorage에서 동의 여부 확인
    const eulaAccepted = localStorage.getItem('wish_os_eula_accepted');
    
    if (!eulaAccepted) {
      // 약간의 딜레이 후 표시 (로딩 효과)
      setTimeout(() => {
        setIsVisible(true);
      }, 500);
    }
  }, []);

  const handleAgree = () => {
    setIsClosing(true);
    setTimeout(() => {
      localStorage.setItem('wish_os_eula_accepted', 'true');
      setIsVisible(false);
    }, 300);
  };

  const handleCancel = () => {
    alert('WISH OS를 사용하려면 약관에 동의해야 합니다.');
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-10000 bg-[#000080] flex items-center justify-center p-4 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* 윈도우 98 설치 화면 스타일 */}
      <div className="w-full max-w-2xl">
        {/* ASCII 로고 */}
        <div className="mb-6 text-white font-mono text-center">
          <pre className="text-xs md:text-sm">
{`
 _       ___________ __  __   ____  _____
| |     / /  _/ ___// / / /  / __ \\/ ___/
| | /| / // / \\__ \\/ /_/ /  / / / /\\__ \\ 
| |/ |/ // / ___/ / __  /  / /_/ /___/ / 
|__/|__/___//____/_/ /_/   \\____//____/  
`}
          </pre>
          <p className="text-sm mt-2">Setup Program</p>
        </div>

        {/* 메인 창 */}
        <div className="bg-[#c0c0c0] border-2 border-white shadow-lg">
          {/* 타이틀 바 */}
          <div className="bg-[#000080] text-white px-3 py-1 flex items-center justify-between">
            <span className="font-bold text-sm">WISH OS Setup</span>
          </div>

          {/* 내용 */}
          <div className="p-6">
            <h2 className="font-bold text-lg mb-4">License Agreement</h2>
            
            <p className="text-sm mb-3">
              Please read the following license agreement carefully.
            </p>

            {/* 약관 스크롤 박스 */}
            <div className="bg-white border-2 border-[#808080] p-3 h-64 overflow-y-auto mb-4 font-mono text-xs leading-relaxed custom-scrollbar">
              <pre className="whitespace-pre-wrap">{EULA_TEXT}</pre>
            </div>

            <p className="text-sm mb-4">
              Do you accept all the terms of the preceding license agreement?
            </p>

            {/* 버튼 */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white font-bold text-sm min-w-[100px]"
              >
                Cancel
              </button>
              <button
                onClick={handleAgree}
                className="px-6 py-2 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white font-bold text-sm min-w-[100px]"
              >
                I Agree
              </button>
            </div>
          </div>
        </div>

        {/* 하단 안내 */}
        <div className="mt-4 text-white text-center text-xs font-mono">
          <p>Press ESC to cancel • Press ENTER to agree</p>
        </div>
      </div>
    </div>
  );
}
