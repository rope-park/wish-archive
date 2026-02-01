/**
 * APP: README (Help & Support)
 * 
 * - WISH OS 사용 가이드 및 도움말
 * - 레트로 컴퓨터 매뉴얼 컨셉
 */

'use client';

import { useState } from 'react';
import { Book, Cpu, Gamepad2, Code, Sparkles, Users } from 'lucide-react';

type TabType = 'readme' | 'privacy' | 'rules';

export default function README() {
  const [activeTab, setActiveTab] = useState<TabType>('readme');

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 탭 헤더 */}
      <div className="flex border-b-2 border-gray-300 bg-gray-100">
        <TabButton
          active={activeTab === 'readme'}
          onClick={() => setActiveTab('readme')}
          label="📄 README.txt"
        />
        <TabButton
          active={activeTab === 'privacy'}
          onClick={() => setActiveTab('privacy')}
          label="🔒 Privacy.txt"
        />
        <TabButton
          active={activeTab === 'rules'}
          onClick={() => setActiveTab('rules')}
          label="⚠️ Rules.txt"
        />
      </div>

      {/* 탭 내용 */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
        {activeTab === 'readme' && <ReadmeContent />}
        {activeTab === 'privacy' && <PrivacyContent />}
        {activeTab === 'rules' && <RulesContent />}
      </div>
    </div>
  );
}

// 탭 버튼 컴포넌트
function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-pixel text-xs md:text-sm border-r border-gray-300 transition-colors ${
        active
          ? 'bg-white border-b-2 border-b-white -mb-[2px] font-bold'
          : 'bg-gray-100 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
}

// README 탭 내용
function ReadmeContent() {
  return (
    <>
      {/* 헤더 */}
      <div className="border-4 border-double border-gray-800 p-4 mb-6 bg-gray-50">
        <pre className="font-pixel text-xs md:text-sm text-center overflow-x-auto">
{`
 _       ___________ __  __   ____  _____
| |     / /  _/ ___// / / /  / __ \/ ___/
| | /| / // / \__ \/ /_/ /  / / / /\__ \ 
| |/ |/ // / ___/ / __  /  / /_/ /___/ / 
|__/|__/___//____/_/ /_/   \____//____/  
                                         
`}
        </pre>
        <h1 className="text-center font-pixel text-xl md:text-2xl font-bold mt-2">
          System Manual v1.0.0
        </h1>
        <p className="text-center text-xs text-gray-600 mt-1">
          Build 20240221 | Service Pack 2
        </p>
      </div>

      {/* 시스템 소개 */}
      <Section icon={<Book size={20} />} title="📂 System Manual (소개)">
        <p className="leading-relaxed">
          <strong>WISH OS</strong>는 위즈니들을 위한 NCT WISH 컨셉의 가상의 운영체제입니다.<br />
          90년대 레트로 감성의 데스크톱 환경에서 NCT WISH의 사진, 영상, 스케줄을 탐험하고 함께 추억을 기록해보세요.
        </p>
      </Section>

      {/* 설치된 프로그램 */}
      <Section icon={<Cpu size={20} />} title="💿 Installed Programs (주요 기능)">
        <ProgramItem
          name="WISH_ARCHIVE.exe"
          icon="📅"
          description="NCT WISH의 모든 활동을 타임라인으로 기록합니다. 데뷔부터 현재까지의 스케줄, 음악 방송, 팬미팅 등을 날짜별로 탐색할 수 있습니다."
        />
        <ProgramItem
          name="WISH_GALLERY.exe"
          icon="🖼️"
          description="트위터(X), 인스타그램의 고화질 사진을 자동 수집합니다. 달력 모드와 폴더 모드로 과거 떡밥을 쉽게 찾아볼 수 있습니다."
        />
        <ProgramItem
          name="TO_WISH.exe"
          icon="💌"
          description="멤버들에게 전하고 싶은 말을 남겨보세요. WISH Jar 위젯을 통해 종이학을 접어 유리병에 보관할 수 있습니다."
        />
        <ProgramItem
          name="WICHU_TAMAGOTCHI.exe"
          icon="🐣"
          description="나만의 파트너 위시돌을 입양하세요! 6종의 캐릭터 중 선택하여 함께 인터랙션할 수 있습니다."
        />
        <ProgramItem
          name="MY_WISH.exe"
          icon="💚"
          description="NCT WISH 그룹 정보, 멤버 프로필, 통계 등을 확인할 수 있는 시스템 정보 창입니다."
        />
        <ProgramItem
          name="DISCOGRAPHY.exe"
          icon="💿"
          description="NCT WISH의 모든 음악과 앨범을 감상하고 관리합니다. 영상 조회 시 YouTube 조회수에 집계됩니다."
        />
        <ProgramItem
          name="SETTINGS.exe"
          icon="⚙️"
          description="커서, 위시돌 파트너 등을 취향대로 꾸며보세요."
        />
      </Section>

      {/* 사용자 가이드 */}
      <Section icon={<Gamepad2 size={20} />} title="🕹️ User Guide (사용법)">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400 text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-400 px-3 py-2 text-left font-pixel">단축키/동작</th>
                <th className="border border-gray-400 px-3 py-2 text-left font-pixel">기능</th>
              </tr>
            </thead>
            <tbody className="font-mono text-xs">
              <tr>
                <td className="border border-gray-400 px-3 py-2"><strong>Double Click</strong></td>
                <td className="border border-gray-400 px-3 py-2">바탕화면의 아이콘을 실행합니다.</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-400 px-3 py-2"><strong>Drag & Drop</strong></td>
                <td className="border border-gray-400 px-3 py-2">윈도우 창을 이동하거나 위젯을 이동합니다.</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2"><strong>Start Menu</strong></td>
                <td className="border border-gray-400 px-3 py-2">화면 좌측 하단 버튼을 눌러 숨겨진 메뉴를 확인하세요.</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-400 px-3 py-2"><strong>Right Click</strong></td>
                <td className="border border-gray-400 px-3 py-2">컨텍스트 메뉴를 엽니다 (일부 요소).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400">
          <p className="text-sm">
            <strong>💡 Tip:</strong> 위시돌을 클릭하면 특별한 반응을 보여줍니다!
            바탕화면의 WISH Jar를 열어 팬들이 남긴 소원을 확인해보세요.
          </p>
        </div>
      </Section>

      {/* 시스템 사양 */}
      <Section icon={<Code size={20} />} title="🛠️ System Specs (기술 스택)">
        <p className="mb-3 text-sm text-gray-700">이 시스템은 최신 웹 기술로 구동됩니다.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <SpecItem label="Framework" value="Next.js" />
          <SpecItem label="Language" value="TypeScript" />
          <SpecItem label="Style" value="Tailwind CSS" />
          <SpecItem label="Database" value="Supabase (PostgreSQL)" />
          <SpecItem label="State" value="Zustand" />
          <SpecItem label="Deployment" value="Vercel" />
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-sm">
          <p className="text-xs text-gray-700">
            <strong>패러디 사양:</strong>
          </p>
          <ul className="text-xs mt-2 space-y-1 font-mono">
            <li>• CPU: NCT WISH 6-Core Processor</li>
            <li>• RAM: Infinite Love Memory</li>
            <li>• GPU: Neo Pearl Champagne Gold Graphics</li>
            <li>• Storage: Eternal Memories Drive</li>
          </ul>
        </div>
      </Section>

      {/* 치트키 & 팁 */}
      <Section icon={<Sparkles size={20} />} title="✨ Hidden Features (숨겨진 기능)">
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-brand-primary font-bold">→</span>
            <span>위시돌 캐릭터는 6종류! 나만의 파트너를 선택해보세요.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-primary font-bold">→</span>
            <span>WISH Archive에서 특정 날짜를 클릭하면 상세 정보를 볼 수 있습니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-primary font-bold">→</span>
            <span>To WISH에서 소원을 남기면 WISH Jar 위젯에 종이학이 추가됩니다.</span>
          </li>
        </ul>
      </Section>

      {/* 개발자 정보 */}
      <Section icon={<Users size={20} />} title="👨‍💻 System Operators (개발자)">
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-300 rounded-sm">
            <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-2xl">
              💚
            </div>
            <div>
              <p className="font-bold">Main Developer</p>
              <p className="text-xs text-gray-600">rope_park</p>
            </div>
            <div>
              <p className="font-bold">Thanks To</p>
              <p className="text-xs text-gray-600">💚얼음(@ddaeng0E)</p>
            </div>
          </div>

          <div className="p-3 bg-gray-50 border border-gray-300 rounded-sm text-xs">
            <p className="text-gray-700">
              <strong>⚠️ 면책 사항:</strong><br />
              이 프로젝트는 팬 메이드 사이트이며, 공식 소속사(SM Entertainment)와 무관합니다.<br />
              모든 콘텐츠는 공개된 자료를 기반으로 제작되었으며, 상업적 목적이 없습니다.
            </p>
          </div>
        </div>
      </Section>

      {/* 개인정보 처리방침 및 이용약관 */}
      <Section icon={<Book size={20} />} title="📄 LICENSE.txt (개인정보 및 이용약관)">
        <div className="space-y-4">
          {/* 개인정보 수집 */}
          <div className="border border-gray-400 rounded-sm overflow-hidden">
            <div className="bg-gray-200 px-3 py-2 border-b border-gray-400">
              <h3 className="font-pixel text-sm font-bold">📋 Privacy.txt - 개인정보 처리방침</h3>
            </div>
            <div className="p-3 bg-white text-xs space-y-2 font-mono">
              <p><strong>수집 항목:</strong></p>
              <ul className="ml-4 space-y-1 list-disc">
                <li>방명록 작성 시: 닉네임, 작성 내용, (필요시) IP 주소 일부</li>
              </ul>
              
              <p className="mt-3"><strong>쿠키/저장소 사용:</strong></p>
              <p className="ml-4">
                사용자의 편의(위시돌 상태 저장, 테마 설정 등)를 위해 브라우저의 localStorage 및 Cookies를 사용합니다.
              </p>

              <p className="mt-3"><strong>데이터 출처:</strong></p>
              <ul className="ml-4 space-y-1 list-disc">
                <li>공식 자료: NCT WISH Official Twitter / Instagram / Weverse</li>
                <li>트위터 데이터: 본 사이트는 Twitter(X)의 게시물을 임베딩하거나 링크를 저장하는 방식으로, 원본 데이터는 트위터 서버에서 불러옵니다.</li>
              </ul>
            </div>
          </div>

          {/* 이용 규칙 */}
          <div className="border border-gray-400 rounded-sm overflow-hidden">
            <div className="bg-gray-200 px-3 py-2 border-b border-gray-400">
              <h3 className="font-pixel text-sm font-bold">⚠️ Rules.txt - 이용 규칙</h3>
            </div>
            <div className="p-3 bg-white text-xs space-y-2 font-mono">
              <p className="text-red-600 font-bold">[ 금지 행위 - SYSTEM ERROR 발생 ]</p>
              <ul className="ml-4 space-y-1 list-disc">
                <li>멤버 비방, 욕설, 루머 유포, 도배성 글은 무통보 삭제될 수 있습니다.</li>
                <li>타인의 개인정보를 유출하거나 불쾌감을 주는 닉네임은 차단됩니다.</li>
              </ul>

              <div className="mt-3 p-2 bg-blue-900 text-white rounded">
                <p className="font-bold">💡 WISH OS 사용 팁:</p>
                <p className="mt-1">예쁜 말과 따뜻한 응원만 남겨주세요! 💚</p>
              </div>
            </div>
          </div>

          {/* EULA 안내 */}
          <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 text-xs">
            <p className="font-bold mb-1">📜 EULA (최종 사용자 라이선스 동의)</p>
            <p className="text-gray-700">
              WISH OS를 처음 방문하시면 윈도우 98 스타일의 설치 화면이 나타납니다.
              약관에 동의하시면 시스템을 사용하실 수 있습니다.
            </p>
          </div>
        </div>
      </Section>

      {/* 패치 노트 */}
      {/* <Section icon={<Book size={20} />} title="📜 Patch Notes (업데이트 기록)">
        <div className="space-y-3 text-sm font-mono">
          <PatchNote
            version="v1.0.0"
            date="2024-02-21"
            changes={[
              "WISH OS 시스템 최초 릴리즈",
              "WISH Archive, Gallery, To WISH 기능 추가",
              "위시돌 다마고치 위젯 구현",
              "Settings 앱 추가 (커서, 파트너 설정)"
            ]}
          />
        </div>
      </Section>

      {/* 푸터 */}
      <div className="mt-8 pt-6 border-t-2 border-gray-300 text-center">
        <p className="text-xs text-gray-500 font-pixel">
          © 2026 WISH OS. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Powered by 💚 WISHZEN Love.
        </p>
      </div>
    </>
  );
}

// Privacy 탭 내용
function PrivacyContent() {
  return (
    <div className="space-y-6">
      <div className="border-4 border-double border-gray-800 p-4 bg-gray-50">
        <h2 className="font-pixel text-lg md:text-xl font-bold text-center">
          🔒 개인정보 처리방침
        </h2>
        <p className="text-center text-xs text-gray-600 mt-1">
          Privacy Policy
        </p>
      </div>

      <Section icon={<Book size={20} />} title="📋 수집 항목">
        <div className="space-y-2 text-sm">
          <p><strong>방명록 작성 시:</strong></p>
          <ul className="ml-6 space-y-1 list-disc">
            <li>닉네임 (선택)</li>
            <li>작성 내용</li>
            <li>IP 주소 일부 (필요시, 악용 방지 목적)</li>
          </ul>
        </div>
      </Section>

      <Section icon={<Book size={20} />} title="🍪 쿠키 및 저장소 사용">
        <div className="space-y-2 text-sm">
          <p>사용자의 편의를 위해 다음 정보를 브라우저에 저장합니다:</p>
          <ul className="ml-6 space-y-1 list-disc">
            <li>위시돌 상태 (성장 단계, 마지막 상호작용 시간)</li>
            <li>테마 설정 (배경화면, 커서)</li>
            <li>EULA 동의 여부</li>
            <li>방명록 작성 기록 (중복 방지)</li>
          </ul>
          <p className="mt-3 text-xs text-gray-600">
            ℹ️ 이 정보는 귀하의 브라우저에만 저장되며, 서버로 전송되지 않습니다.
          </p>
        </div>
      </Section>

      <Section icon={<Book size={20} />} title="📊 데이터 출처">
        <div className="space-y-2 text-sm">
          <p><strong>공식 자료:</strong></p>
          <ul className="ml-6 space-y-1 list-disc">
            <li>NCT WISH Official Twitter (@NCTsmtown_WISH)</li>
            <li>NCT WISH Official Instagram (@nctwish_official)</li>
            <li>Weverse (NCT WISH 공식 커뮤니티)</li>
          </ul>
          <p className="mt-3"><strong>트위터 데이터:</strong></p>
          <p className="ml-6 text-xs text-gray-700">
            본 사이트는 Twitter(X)의 게시물을 임베딩하거나 링크를 저장하는 방식으로 콘텐츠를 제공합니다. 
            원본 데이터는 트위터 서버에서 불러옵니다.
          </p>
        </div>
      </Section>

      <Section icon={<Book size={20} />} title="🗑️ 데이터 보관 및 삭제">
        <div className="space-y-2 text-sm">
          <p><strong>방명록 데이터:</strong></p>
          <ul className="ml-6 space-y-1 list-disc">
            <li>작성일로부터 1년간 보관</li>
            <li>사용자 요청 시 즉시 삭제</li>
          </ul>
          <p className="mt-3"><strong>브라우저 저장 데이터:</strong></p>
          <ul className="ml-6 space-y-1 list-disc">
            <li>브라우저 캐시 삭제 시 함께 삭제</li>
            <li>언제든지 수동으로 삭제 가능</li>
          </ul>
        </div>
      </Section>

      <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 text-sm">
        <p className="font-bold">📧 문의</p>
        <p className="mt-1 text-gray-700">
          개인정보 처리와 관련한 문의사항은 GitHub Issues를 통해 연락 주시기 바랍니다.
        </p>
      </div>

      <div className="text-center text-xs text-gray-500 mt-6">
        마지막 업데이트: 2024년 2월 1일
      </div>
    </div>
  );
}

// Rules 탭 내용
function RulesContent() {
  return (
    <div className="space-y-6">
      <div className="border-4 border-double border-gray-800 p-4 bg-gray-50">
        <h2 className="font-pixel text-lg md:text-xl font-bold text-center">
          ⚠️ 이용 규칙
        </h2>
        <p className="text-center text-xs text-gray-600 mt-1">
          Community Rules
        </p>
      </div>

      <Section icon={<Book size={20} />} title="🚫 금지 행위">
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-red-50 border-l-4 border-red-500">
            <p className="font-bold text-red-700">위반 시 무통보 삭제</p>
          </div>

          <div>
            <p className="font-bold mb-2">1. 멤버 비방 및 악의적 댓글</p>
            <ul className="ml-6 space-y-1 list-disc text-gray-700">
              <li>NCT WISH 멤버에 대한 비방, 욕설, 루머 유포</li>
              <li>멤버 간 우열 비교 및 차별적 발언</li>
              <li>악의적인 의도의 비판</li>
            </ul>
          </div>

          <div>
            <p className="font-bold mb-2">2. 도배 및 스팸</p>
            <ul className="ml-6 space-y-1 list-disc text-gray-700">
              <li>동일하거나 유사한 내용의 반복 작성</li>
              <li>광고성 게시물</li>
              <li>의미 없는 문자 나열</li>
            </ul>
          </div>

          <div>
            <p className="font-bold mb-2">3. 개인정보 침해</p>
            <ul className="ml-6 space-y-1 list-disc text-gray-700">
              <li>타인의 개인정보 무단 게시</li>
              <li>사생활 침해 콘텐츠</li>
              <li>불쾌감을 주는 닉네임 사용</li>
            </ul>
          </div>

          <div>
            <p className="font-bold mb-2">4. 저작권 침해</p>
            <ul className="ml-6 space-y-1 list-disc text-gray-700">
              <li>무단 도용 및 재배포</li>
              <li>출처 표기 없는 2차 창작물 게시</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section icon={<Sparkles size={20} />} title="💚 WISH OS 사용 팁">
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-green-50 border-l-4 border-green-500">
            <p className="font-bold text-green-700">예쁜 말과 따뜻한 응원만 남겨주세요!</p>
          </div>

          <div>
            <p className="font-bold mb-2">✨ 추천 메시지:</p>
            <ul className="ml-6 space-y-1 list-disc text-gray-700">
              <li>&ldquo;오늘도 수고했어요 💚&rdquo;</li>
              <li>&ldquo;항상 응원합니다!&rdquo;</li>
              <li>&ldquo;위시 사랑해!&rdquo;</li>
            </ul>
          </div>

          <div>
            <p className="font-bold mb-2">🎯 함께 만드는 건강한 커뮤니티:</p>
            <ul className="ml-6 space-y-1 list-disc text-gray-700">
              <li>서로 배려하는 마음</li>
              <li>공감과 소통</li>
              <li>함께 성장하는 팬덤</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section icon={<Users size={20} />} title="📢 신고 및 문의">
        <div className="space-y-2 text-sm">
          <p><strong>부적절한 콘텐츠 발견 시:</strong></p>
          <ul className="ml-6 space-y-1 list-disc text-gray-700">
            <li>GitHub Issues를 통해 신고</li>
            <li>관리자가 확인 후 조치</li>
          </ul>
          <p className="mt-3"><strong>건의사항:</strong></p>
          <ul className="ml-6 space-y-1 list-disc text-gray-700">
            <li>기능 개선 제안 환영</li>
            <li>버그 리포트 감사합니다</li>
          </ul>
        </div>
      </Section>

      <div className="mt-6 p-4 bg-linear-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded text-center">
        <p className="font-pixel font-bold text-lg">함께 만드는 건강한 팬 커뮤니티</p>
        <p className="text-2xl mt-2">WISH OS 💚</p>
      </div>

      <div className="text-center text-xs text-gray-500 mt-6">
        마지막 업데이트: 2024년 2월 1일
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 서브 컴포넌트
// ----------------------------------------------------------------------

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <h2 className="flex items-center gap-2 font-pixel text-lg font-bold mb-3 pb-2 border-b-2 border-gray-300">
        {icon}
        {title}
      </h2>
      <div className="pl-2">
        {children}
      </div>
    </section>
  );
}

function ProgramItem({ name, icon, description }: { name: string; icon: string; description: string }) {
  return (
    <div className="mb-3 p-3 bg-gray-50 border border-gray-300 rounded-sm hover:bg-gray-100 transition-colors">
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-pixel text-sm font-bold text-blue-600 mb-1">{name}</h3>
          <p className="text-xs text-gray-700 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center p-2 bg-gray-50 border border-gray-300 rounded-sm">
      <span className="font-bold text-gray-600">{label}:</span>
      <span className="font-mono text-xs">{value}</span>
    </div>
  );
}

function PatchNote({ version, date, changes }: { version: string; date: string; changes: string[] }) {
  return (
    <div className="border-l-4 border-brand-primary pl-4 py-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-bold text-brand-primary">{version}</span>
        <span className="text-xs text-gray-500">({date})</span>
      </div>
      <ul className="space-y-1 text-xs">
        {changes.map((change, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-brand-primary">•</span>
            <span>{change}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
