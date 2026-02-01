/**
 * APP: SETTINGS (설정)
 * 
 * - WISH OS 설정 관리
 * - 디스플레이, 파트너, 시스템 정보 탭
 */

'use client';

import { useState } from 'react';
import { Tabs, Button } from '@/components/ui';
import { useSettingsStore, type WichuCharacter, type NotificationFrequency, type CursorType } from '@/app/stores/useSettingsStore';
import { useWindowStore } from '@/app/stores/useWindowStore';
import { Monitor, User, Info } from 'lucide-react';

// ----------------------------------------------------------------------
// 멤버 정보 (위시돌 캐릭터)
// ----------------------------------------------------------------------
const WICHU_CHARACTERS: { id: WichuCharacter; name: string; emoji: string; color: string }[] = [
  { id: 'sion', name: 'SION', emoji: '🌷', color: '#FF6B6B' },
  { id: 'riku', name: 'RIKU', emoji: '🐿️', color: '#4ECDC4' },
  { id: 'yushi', name: 'YUSHI', emoji: '⭐', color: '#95E1D3' },
  { id: 'jaehee', name: 'JAEHEE', emoji: '🌳', color: '#38A169' },
  { id: 'ryo', name: 'RYO', emoji: '🦭', color: '#F6E05E' },
  { id: 'sakuya', name: 'SAKUYA', emoji: '🥐', color: '#ED8936' },
];

// 커서 옵션
const CURSOR_OPTIONS: { id: CursorType; name: string; icon: string }[] = [
  { id: 'none', name: 'None', icon: ' ' },
  { id: 'magic-wand', name: 'Magic Wand', icon: '🪄' },
  { id: 'wichu', name: 'Wichu', icon: '🌟' },
];

// ----------------------------------------------------------------------
// Tab 1: Display Settings
// ----------------------------------------------------------------------
function DisplayTab() {
  const { cursor, setCursor } = useSettingsStore();
  const [selectedCursor, setSelectedCursor] = useState(cursor);

  const handleApplyCursor = () => {
    setCursor(selectedCursor);
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-4 bg-[#f0f0f0] flex flex-col gap-6">
      {/* 커서 설정 */}
      <fieldset className="border border-gray-400 p-4 rounded-sm bg-white">
        <legend className="text-sm px-2 font-bold text-gray-700">Mouse Cursor</legend>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CURSOR_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedCursor(option.id)}
              className={`
                flex flex-col items-center gap-2 p-3 border-2 rounded-sm transition-all
                ${selectedCursor === option.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 bg-white hover:bg-gray-50'}
              `}
            >
              <span className="text-3xl">{option.icon}</span>
              <span className="text-xs font-pixel text-center">{option.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-3">
          <Button onClick={handleApplyCursor} variant="primary" size="sm">
            적용
          </Button>
        </div>
      </fieldset>
    </div>
  );
}

// ----------------------------------------------------------------------
// Tab 2: Partner Settings
// ----------------------------------------------------------------------
function PartnerTab() {
  const { wichuPartner, notificationFrequency, setWichuPartner, setNotificationFrequency } = useSettingsStore();

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-4 bg-[#f0f0f0] flex flex-col gap-6">
      {/* 위시돌 선택 */}
      <fieldset className="border border-gray-400 p-4 rounded-sm bg-white">
        <legend className="text-sm px-2 font-bold text-gray-700 flex items-center gap-2">
          <User size={16} /> Select Your Partner
        </legend>

        <p className="text-xs text-gray-600 mb-3">
          위츄 다마고치에 표시할 위시돌을 선택하세요.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {WICHU_CHARACTERS.map((character) => (
            <button
              key={character.id}
              onClick={() => setWichuPartner(character.id)}
              className={`
                flex flex-col items-center gap-2 p-4 border-2 rounded-sm transition-all
                ${wichuPartner === character.id 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-300 bg-white hover:bg-gray-50'}
              `}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-4xl"
                style={{ backgroundColor: `${character.color}20` }}
              >
                {character.emoji}
              </div>
              <span className="text-sm font-pixel font-bold">{character.name}</span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* 알림 설정 */}
      <fieldset className="border border-gray-400 p-4 rounded-sm bg-white">
        <legend className="text-sm px-2 font-bold text-gray-700">Notification Settings</legend>

        <p className="text-xs text-gray-600 mb-3">
          위시돌의 활동 빈도를 조절하세요.
        </p>

        <div className="space-y-2">
          {[
            { id: 'active' as NotificationFrequency, label: '활발함 (Active)', desc: '자주 인터랙션' },
            { id: 'calm' as NotificationFrequency, label: '얌전함 (Calm)', desc: '가끔 인터랙션' },
            { id: 'locked' as NotificationFrequency, label: '잠김 (Locked)', desc: '인터랙션 비활성화' },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setNotificationFrequency(option.id)}
              className={`
                w-full flex items-center gap-3 p-3 border-2 rounded-sm transition-all text-left
                ${notificationFrequency === option.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 bg-white hover:bg-gray-50'}
              `}
            >
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${notificationFrequency === option.id ? 'border-blue-500' : 'border-gray-400'}
              `}>
                {notificationFrequency === option.id && (
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm font-pixel font-bold">{option.label}</div>
                <div className="text-xs text-gray-500">{option.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

// ----------------------------------------------------------------------
// Tab 3: System Info
// ----------------------------------------------------------------------
function SystemTab() {
  const { userNickname, setUserNickname } = useSettingsStore();
  const [editingNickname, setEditingNickname] = useState(false);
  const [tempNickname, setTempNickname] = useState(userNickname);

  const handleSaveNickname = () => {
    setUserNickname(tempNickname);
    setEditingNickname(false);
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-4 bg-[#f0f0f0] flex flex-col gap-6">
      {/* OS 버전 정보 */}
      <fieldset className="border border-gray-400 p-4 rounded-sm bg-white">
        <legend className="text-sm px-2 font-bold text-gray-700 flex items-center gap-2">
          <Info size={16} /> OS Version
        </legend>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-6xl">🍀</span>
            <div>
              <div className="font-bold text-lg">WISH OS 2024</div>
              <div className="text-xs text-gray-500">Service Pack 2 (Build 20240221)</div>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-3 space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">Version:</span>
              <span className="font-mono">2024.02.21</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Registered to:</span>
              {editingNickname ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempNickname}
                    onChange={(e) => setTempNickname(e.target.value)}
                    className="px-2 py-1 border border-gray-400 rounded-sm text-sm w-32"
                    maxLength={20}
                  />
                  <Button onClick={handleSaveNickname} size="sm" variant="primary">
                    저장
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => setEditingNickname(true)}
                  className="font-bold hover:text-blue-600 transition-colors"
                >
                  {userNickname} ✏️
                </button>
              )}
            </div>
          </div>
        </div>
      </fieldset>

      {/* 컴퓨터 사양 (패러디) */}
      <fieldset className="border border-gray-400 p-4 rounded-sm bg-white">
        <legend className="text-sm px-2 font-bold text-gray-700">Computer Specifications</legend>

        <div className="space-y-2 text-sm font-mono">
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span className="text-gray-600">CPU:</span>
            <span className="font-bold">NCT WISH 6-Core Processor</span>
          </div>
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span className="text-gray-600">RAM:</span>
            <span className="font-bold">Infinite Love Memory</span>
          </div>
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span className="text-gray-600">GPU:</span>
            <span className="font-bold">Neo Pearl Champagne Gold Graphics</span>
          </div>
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span className="text-gray-600">Storage:</span>
            <span className="font-bold">Eternal Memories Drive</span>
          </div>
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span className="text-gray-600">Network:</span>
            <span className="font-bold">WISH Global Connection</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-sm">
          <p className="text-xs text-gray-700">
            💡 <strong>Fun Fact:</strong> 이 시스템은 윗사맥 상태로 24시간 365일 작동합니다! 💚
          </p>
        </div>
      </fieldset>
    </div>
  );
}

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------
export default function Settings() {
  const [activeTab, setActiveTab] = useState('display');

  const tabItems = [
    { id: 'display', label: 'Display', content: <DisplayTab /> },
    { id: 'partner', label: 'Partner', content: <PartnerTab /> },
    { id: 'system', label: 'System', content: <SystemTab /> },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-gray-200">
      <Tabs
        items={tabItems}
        activeTab={activeTab}
        className="flex-1"
        onChange={(id) => setActiveTab(id)}
      />
    </div>
  );
}
