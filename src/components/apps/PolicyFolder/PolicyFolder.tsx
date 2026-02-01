/**
 * Policy Folder - 바탕화면 Policy 폴더
 * Privacy.txt, Rules.txt 파일 목록 표시
 */

'use client';

import { useState } from 'react';
import Notepad from '../Notepad/Notepad';

const PRIVACY_CONTENT = `WISH OS 개인정보 처리방침
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. 수집 항목

방명록 작성 시:
  • 닉네임 (선택)
  • 작성 내용
  • IP 주소 일부 (필요시, 악용 방지 목적)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2. 쿠키 및 저장소 사용

사용자의 편의를 위해 다음 정보를 브라우저에 저장합니다:
  • 위시돌 상태 (성장 단계, 마지막 상호작용 시간)
  • 테마 설정 (배경화면, 커서)
  • EULA 동의 여부
  • 방명록 작성 기록 (중복 방지)

이 정보는 귀하의 브라우저에만 저장되며, 서버로 전송되지 않습니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3. 데이터 출처

공식 자료:
  • NCT WISH Official Twitter (@NCTsmtown_WISH)
  • NCT WISH Official Instagram (@nctwish_official)
  • Weverse (NCT WISH 공식 커뮤니티)

트위터 데이터:
  본 사이트는 Twitter(X)의 게시물을 임베딩하거나 링크를 저장하는 방식으로 
  콘텐츠를 제공합니다. 원본 데이터는 트위터 서버에서 불러옵니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4. 데이터 보관 및 삭제

방명록 데이터:
  • 작성일로부터 1년간 보관
  • 사용자 요청 시 즉시 삭제

브라우저 저장 데이터:
  • 브라우저 캐시 삭제 시 함께 삭제
  • 언제든지 수동으로 삭제 가능

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5. 문의

개인정보 처리와 관련한 문의사항은 GitHub Issues를 통해 연락 주시기 바랍니다.

마지막 업데이트: 2024년 2월 1일
`;

const RULES_CONTENT = `WISH OS 이용 규칙
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ 금지 행위 (위반 시 무통보 삭제)

1. 멤버 비방 및 악의적 댓글
   • NCT WISH 멤버에 대한 비방, 욕설, 루머 유포
   • 멤버 간 우열 비교 및 차별적 발언
   • 악의적인 의도의 비판

2. 도배 및 스팸
   • 동일하거나 유사한 내용의 반복 작성
   • 광고성 게시물
   • 의미 없는 문자 나열

3. 개인정보 침해
   • 타인의 개인정보 무단 게시
   • 사생활 침해 콘텐츠
   • 불쾌감을 주는 닉네임 사용

4. 저작권 침해
   • 무단 도용 및 재배포
   • 출처 표기 없는 2차 창작물 게시

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💚 WISH OS 사용 팁

1. 예쁜 말과 따뜻한 응원만 남겨주세요!
   • "오늘도 수고했어요 💚"
   • "항상 응원합니다!"
   • "위시 사랑해!"

2. 멤버들의 노력을 존중해주세요
   • 긍정적인 피드백
   • 건설적인 의견
   • 진심 어린 응원

3. 다른 팬들과 함께 즐거운 공간을 만들어요
   • 서로 배려하는 마음
   • 공감과 소통
   • 함께 성장하는 팬덤

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📢 신고 및 문의

부적절한 콘텐츠 발견 시:
  • GitHub Issues를 통해 신고
  • 관리자가 확인 후 조치

건의사항:
  • 기능 개선 제안 환영
  • 버그 리포트 감사합니다

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

함께 만드는 건강한 팬 커뮤니티, WISH OS 💚

마지막 업데이트: 2024년 2월 1일
`;

interface PolicyFolderProps {
  onClose: () => void;
}

export default function PolicyFolder({ onClose }: PolicyFolderProps) {
  const [openFile, setOpenFile] = useState<'privacy' | 'rules' | null>(null);

  const files = [
    { id: 'privacy' as const, name: 'Privacy.txt', icon: '📄', content: PRIVACY_CONTENT },
    { id: 'rules' as const, name: 'Rules.txt', icon: '📄', content: RULES_CONTENT },
  ];

  return (
    <>
      {/* 폴더 창 */}
      <div className="fixed inset-0 z-[998] bg-black/30 flex items-center justify-center p-4">
        <div className="bg-[#c0c0c0] border-2 border-white shadow-lg w-full max-w-md">
          {/* 타이틀 바 */}
          <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">📁</span>
              <span className="font-bold text-sm">Policy</span>
            </div>
            <button
              onClick={onClose}
              className="w-6 h-6 bg-[#c0c0c0] border border-white hover:bg-[#d0d0d0] flex items-center justify-center font-bold text-black"
            >
              ×
            </button>
          </div>

          {/* 메뉴 바 */}
          <div className="bg-[#c0c0c0] border-b border-gray-400 px-2 py-1 text-xs">
            <span className="px-2">File</span>
            <span className="px-2">Edit</span>
            <span className="px-2">View</span>
            <span className="px-2">Help</span>
          </div>

          {/* 파일 목록 */}
          <div className="bg-white p-4 min-h-[200px]">
            <div className="grid grid-cols-2 gap-4">
              {files.map((file) => (
                <button
                  key={file.id}
                  onDoubleClick={() => setOpenFile(file.id)}
                  className="flex flex-col items-center gap-2 p-3 hover:bg-blue-100 rounded transition-colors"
                >
                  <span className="text-4xl">{file.icon}</span>
                  <span className="text-xs text-center">{file.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 상태 표시줄 */}
          <div className="bg-[#c0c0c0] border-t border-gray-400 px-2 py-1 text-xs">
            <span>{files.length} object(s)</span>
          </div>
        </div>
      </div>

      {/* 메모장 */}
      {openFile && (
        <Notepad
          title={files.find((f) => f.id === openFile)?.name || ''}
          content={files.find((f) => f.id === openFile)?.content || ''}
          onClose={() => setOpenFile(null)}
        />
      )}
    </>
  );
}
