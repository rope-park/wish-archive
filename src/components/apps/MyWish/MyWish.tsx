/**
 * APP: MY_WISH (내 컴퓨터 / 프로필)
 * 
 * - 그룹 소개 및 멤버 정보 표시
 * - 장치 관리자 스타일의 멤버 정보 탭
 * - 위시 에너지 모니터 (통계 기반 성능 그래프)
 */

'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import Draggable from 'react-draggable';
import { Group, Member, ExternalLink } from '@prisma/client';
import { Tabs, Button, Card, Divider, Spinner } from '@/components/ui';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import { Globe, Youtube, Twitter, Instagram, Network, Server, HardDrive, Minimize2, Star } from 'lucide-react';

// ----------------------------------------------------------------------
// Constants & Data
// ----------------------------------------------------------------------

// 멤버별 가상 능력치 데이터 (재미 요소)
interface MemberStat {
    subject: string;
    A: number;
    fullMark: number;
}

const MEMBER_STATS: Record<string, MemberStat[]> = {
    'sion': [
        { subject: 'Vocal', A: 90, fullMark: 100 },
        { subject: 'Dance', A: 95, fullMark: 100 },
        { subject: 'Leader', A: 100, fullMark: 100 },
        { subject: 'Visual', A: 90, fullMark: 100 },
        { subject: 'Funny', A: 85, fullMark: 100 },
        { subject: 'Passion', A: 98, fullMark: 100 },
    ],
    'riku': [
        { subject: 'Vocal', A: 88, fullMark: 100 },
        { subject: 'Rap', A: 95, fullMark: 100 },
        { subject: 'Cool', A: 90, fullMark: 100 },
        { subject: 'Cute', A: 92, fullMark: 100 },
        { subject: 'Game', A: 80, fullMark: 100 },
        { subject: 'Dance', A: 92, fullMark: 100 },
    ],
    'yushi': [
        { subject: 'Vocal', A: 92, fullMark: 100 },
        { subject: 'Dance', A: 96, fullMark: 100 },
        { subject: 'Shy', A: 85, fullMark: 100 },
        { subject: 'Artist', A: 90, fullMark: 100 },
        { subject: 'Face', A: 95, fullMark: 100 },
        { subject: 'Tone', A: 98, fullMark: 100 },
    ],
    'jaehee': [
        { subject: 'Vocal', A: 98, fullMark: 100 },
        { subject: 'Piano', A: 90, fullMark: 100 },
        { subject: 'Kind', A: 95, fullMark: 100 },
        { subject: 'Tree', A: 100, fullMark: 100 },
        { subject: 'Clean', A: 88, fullMark: 100 },
        { subject: 'Smile', A: 92, fullMark: 100 },
    ],
    'ryo': [
        { subject: 'Vocal', A: 85, fullMark: 100 },
        { subject: 'Energy', A: 95, fullMark: 100 },
        { subject: 'NCTzen', A: 100, fullMark: 100 },
        { subject: 'Talk', A: 90, fullMark: 100 },
        { subject: 'Cute', A: 95, fullMark: 100 },
        { subject: 'Wit', A: 88, fullMark: 100 },
    ],
    'sakuya': [
        { subject: 'Rap', A: 92, fullMark: 100 },
        { subject: 'Bread', A: 100, fullMark: 100 },
        { subject: 'Maknae', A: 100, fullMark: 100 },
        { subject: 'Cute', A: 98, fullMark: 100 },
        { subject: 'Growth', A: 90, fullMark: 100 },
        { subject: 'Smile', A: 95, fullMark: 100 },
    ],
};

// 멤버별 상태 메시지 (Status Message)
const MEMBER_STATUS_MESSAGES: Record<string, string> = {
    'sion': "System overheating due to excessive passion. 🔥",
    'riku': "Scanning for takoyaki... 🐙 Found 0.",
    'yushi': "Silent mode activated. (Shy) ☁️",
    'jaehee': "Operating environment is clean and green. 🌳",
    'ryo': "Downloading NCT sunbaenim's data... 100% (Success)",
    'sakuya': "Device is hungry. Needs bread immediately. 🥐",
};

// 위츄(Wichu) 멘트
const WICHU_MESSAGES: Record<string, string> = {
    'general': "안녕? 난 위츄야! 우리 위시의 기본 정보를 여기서 확인해봐 츄! 💚",
    'members': "멤버를 클릭하면 내가 숨겨진 능력치를 분석해줄게! (삐빅-)",
    'perf': "열심히 활동한 기록들을 조각 모음 중이야... 블록이 꽉 찼어!",
};

// ----------------------------------------------------------------------
// Types & Utils
// ----------------------------------------------------------------------

interface GroupWithLinks extends Group {
    externalLinks: ExternalLink[];
}

interface SystemStats {
    albums: number;
    tracks: number;
    events: number;
    contents: number;
    awards: number;
    recentLogs: {
        id: string;
        name: string;
        date: string;
        type: string;
        memUsage: number;
    }[];
}

// 날짜 포맷 유틸리티
const formatDate = (dateString: Date | string | null) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

// 날짜 차이 계산 유틸리티
const getUptime = (debutDate: Date | string | null) => {
    if (!debutDate) return { days: 0, hours: 0 };
    const start = new Date(debutDate);
    const now = new Date();
    const diff = now.getTime() - start.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    return { days, hours };
};

// 나이 계산 유틸리티
const calculateAge = (birthDate: Date | string | null) => {
    if (!birthDate) return 0;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

// ----------------------------------------------------------------------
// Component: Wichu Assistant (시스템 도우미)
// ----------------------------------------------------------------------
function WichuAssistant({ currentTab }: { currentTab: string }) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const message = WICHU_MESSAGES[currentTab] || "WISH for Our WISH!";

    const nodeRef = useRef<HTMLDivElement>(null);

    // 터치 디바이스 감지
    useEffect(() => {
        const checkTouchDevice = () => {
            const hasTouchScreen = 'ontouchstart' in window ||
                navigator.maxTouchPoints > 0;
            setIsTouchDevice(hasTouchScreen || window.innerWidth < 768);
        };

        checkTouchDevice();
        window.addEventListener('resize', checkTouchDevice);
        window.addEventListener('orientationchange', checkTouchDevice);

        return () => {
            window.removeEventListener('resize', checkTouchDevice);
            window.removeEventListener('orientationchange', checkTouchDevice);
        };
    }, []);

    const handleClick = () => {
        if (isTouchDevice && !isMinimized) {
            setIsMinimized(true);
            return;
        }

        if (isMinimized) {
            setIsMinimized(false);
        } else {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 1000);
        }
    };

    return (
        <Draggable bounds="parent" defaultPosition={{ x: 20, y: 380 }} nodeRef={nodeRef as React.RefObject<HTMLDivElement>}>
            <div
                ref={nodeRef}
                className="absolute z-50 cursor-pointer group flex flex-col items-center transition-all duration-300"
                onClick={handleClick}
            >
                {/* 1. 활성화 상태 (캐릭터 + 말풍선) */}
                {!isMinimized ? (
                    <div className="relative flex flex-col items-center w-32 group">
                        {/* 최소화 버튼 (호버 시 등장) */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // 클릭 이벤트 전파 방지 (애니메이션 실행 안 함)
                                setIsMinimized(true);
                            }}
                            className="absolute -top-2 -right-2 z-50 w-6 h-6 bg-white border border-gray-400 rounded-full flex items-center justify-center text-gray-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 hover:text-red-500"
                            title="Minimize Wichu"
                        >
                            <Minimize2 size={12} />
                        </button>

                        {/* 말풍선 */}
                        <div className="bg-[#ffffe1] border border-black px-2 py-1.5 rounded-sm mb-2 text-xs font-pixel shadow-[2px_2px_0px_rgba(0,0,0,0.2)] text-black relative break-keep text-center animate-fade-in-up">
                            {message}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#ffffe1] border-r border-b border-black rotate-45"></div>
                        </div>

                        {/* 위츄 캐릭터 */}
                        <div className={`text-5xl transition-transform duration-200 ${isAnimating ? 'animate-bounce' : 'hover:scale-110'}`}>
                            <Image
                                src="/content/etc/wichu.png"
                                alt="Wichu"
                                width={150}
                                height={150}
                                className="w-[120px] h-[150px] object-contain drop-shadow-md"
                                draggable={false}
                            />
                        </div>
                        <div className="bg-black/20 w-10 h-2 rounded-[50%] blur-[2px] mt-1" />
                    </div>
                ) : (
                    // 2. 최소화 상태 (작은 아이콘)
                    <div className="flex items-center justify-center gap-2 bg-white/90 backdrop-blur-sm border-2 border-wish-green rounded-full px-3 py-1.5 shadow-lg hover:scale-105 transition-transform">
                        <Star size={16} className="text-wish-green animate-pulse" />
                        <span className="text-xs font-pixel font-bold text-gray-700">Wichu</span>
                    </div>
                )}
            </div>
        </Draggable>
    );
}

// ----------------------------------------------------------------------
// Tab 1: General (그룹 소개 + 네트워크)
// ----------------------------------------------------------------------
function GeneralTab({ group }: { group: GroupWithLinks | null }) {
    if (!group) return <div className="h-full flex items-center justify-center"><Spinner /></div>;

    const socialLinks = [
        { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/nctwish_official', color: '#E1306C' },
        { name: 'Twitter (X)', icon: Twitter, url: 'https://x.com/nctwishofficial', color: '#1DA1F2' },
        { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@NCTWISH', color: '#FF0000' },
        { name: 'Official Site', icon: Globe, url: 'https://nct-jp.net/', color: '#2b2b2b' },
    ];

    return (
        <div className="h-full overflow-y-auto custom-scrollbar p-4 md:p-6 bg-[#f0f0f0] flex flex-col gap-6">
            {/* 시스템 요약 섹션 */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* 로고 */}
                <div className="shrink-0 flex flex-col items-center gap-2">
                    <div className="w-32 h-28 relative bg-gray-200 border-2 border-gray-400 border-b-gray-600 border-r-gray-600 shadow-inner p-2 flex items-center justify-center">
                        <div className="w-full h-full bg-white border border-gray-300 flex items-center justify-center relative overflow-hidden">
                            {group.logoUrl ? (
                                <img src={group.logoUrl} alt="Logo" className="object-contain max-w-full max-h-full" />
                            ) : (
                                <span className="text-4xl">💫</span>
                            )}
                        </div>
                    </div>
                    <span className="text-xs text-gray-500 font-pixel">WISH OS v1.0</span>
                </div>

                {/* 텍스트 정보 */}
                <div className="flex-1 flex flex-col gap-4 text-sm text-gray-800">
                    <div>
                        <h3 className="font-bold mb-1 text-black">System:</h3>
                        <ul className="ml-4 space-y-0.5 list-square marker:text-[#808080]">
                            <li>Microsoft Windows WISH</li>
                            <li>{group.name} Edition (Debut {formatDate(group.debutDate)})</li>
                            <li>Agency: {group.agency}</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-1 text-black">User:</h3>
                        <ul className="ml-4 space-y-0.5 list-square marker:text-wish-green">
                            <li>{group.fandomName || 'WIZENY'} (Active)</li>
                            <li className="flex items-center gap-2">
                                Color Profile:
                                <div className="flex items-center gap-1 border border-gray-400 bg-white px-1 py-0.5 rounded-sm">
                                    <div
                                        className="w-3 h-3 rounded-full border border-gray-300 shadow-sm"
                                        style={{ backgroundColor: group.officialColor || '#BBE309' }}
                                    />
                                    <span className="text-xs font-mono">{group.officialColor}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 네트워크 환경 (Network Neighborhood) */}
            <fieldset className="border border-gray-400 p-3 rounded-sm relative bg-gray-100">
                <legend className="text-xs px-1 text-black bg-[#f0f0f0] absolute -top-2 left-2 flex items-center gap-1 font-bold">
                    <Network size={12} /> Network Neighborhood
                </legend>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-1 p-2 hover:bg-blue-100 border border-transparent hover:border-blue-300 hover:border-dotted rounded cursor-pointer transition-all"
                        >
                            <div className="relative">
                                <link.icon size={32} color={link.color} className="drop-shadow-sm group-hover:scale-110 transition-transform" />
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" title="Connected" />
                            </div>
                            <span className="text-xs text-gray-700 font-pixel mt-1 group-hover:underline">{link.name}</span>
                            <span className="text-[9px] text-gray-400 font-mono">100Mbps</span>
                        </a>
                    ))}
                </div>
            </fieldset>

            {/* 소개 멘트 */}
            <fieldset className="border border-gray-400 p-3 rounded-sm bg-white">
                <legend className="text-xs px-1 text-blue-600 font-bold">Description.txt</legend>
                <div className="text-xs md:text-sm text-gray-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: group.description || '' }}
                />
            </fieldset>
        </div>
    );
}

// ----------------------------------------------------------------------
// Tab 2: Members (장치 관리자 + 레이더 차트)
// ----------------------------------------------------------------------
function MembersTab({ members }: { members: Member[] }) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // 초기 선택 (첫 번째 멤버)
    useEffect(() => {
        if (!selectedId && members.length > 0) {
            //eslint-disable-next-line react-hooks/exhaustive-deps
            setSelectedId(members[0].id);
        }
    }, [members, selectedId]);

    const selectedMember = members.find(m => m.id === selectedId);

    // 이름 매칭 (데이터에 따라 stageName이나 nameEn을 key로 사용)
    const memberKey = selectedMember?.nameEn?.toLowerCase().split(' ')[0] || '';
    const statsData = MEMBER_STATS[memberKey] || MEMBER_STATS['sion']; // fallback
    const statusMsg = MEMBER_STATUS_MESSAGES[memberKey] || "Device working properly.";

    // 정렬
    const sortedMembers = [...members].sort((a, b) => new Date(a.birthDate || '').getTime() - new Date(b.birthDate || '').getTime());
    const hyungLine = sortedMembers.slice(0, 3);
    const maknaeLine = sortedMembers.slice(3);

    const TreeItem = ({ member }: { member: Member }) => (
        <li
            onClick={() => setSelectedId(member.id)}
            className={`
                pl-6 py-1 pr-2 cursor-pointer flex items-center gap-2 text-sm select-none border border-transparent
                ${selectedId === member.id ? 'bg-[#000080] text-white border-dotted border-gray-200' : 'text-gray-800 hover:bg-gray-200'}
            `}
        >
            <span className="text-xs">{selectedId === member.id ? '👤' : '💿'}</span>
            <span className={selectedId === member.id ? 'font-bold' : ''}>{member.stageName}</span>
        </li>
    );

    return (
        <div className="flex flex-col md:flex-row h-full gap-2 p-2 bg-[#f0f0f0]">
            {/* 좌측: 멤버 리스트 트리 */}
            <div className="flex-1 bg-white border-2 border-inset border-gray-400 overflow-y-auto custom-scrollbar h-[35%] md:h-full min-w-[180px]">
                <div className="p-2 font-pixel">
                    <div className="flex items-center gap-1.5 font-bold text-sm mb-2 px-1">
                        <span className="text-base">🖥️</span> NCT WISH Desktop
                    </div>
                    <ul className="flex flex-col gap-1">
                        <li>
                            <div className="flex items-center gap-1 px-2 py-0.5 text-xs text-gray-500 font-bold">
                                <span className="text-[10px]">▼</span> Processors (Hyung Line)
                            </div>
                            <ul className="flex flex-col mt-0.5">{hyungLine.map(m => <TreeItem key={m.id} member={m} />)}</ul>
                        </li>
                        <li className="mt-2">
                            <div className="flex items-center gap-1 px-2 py-0.5 text-xs text-gray-500 font-bold">
                                <span className="text-[10px]">▼</span> Graphics (Maknae Line)
                            </div>
                            <ul className="flex flex-col mt-0.5">{maknaeLine.map(m => <TreeItem key={m.id} member={m} />)}</ul>
                        </li>
                    </ul>
                </div>
            </div>

            {/* 우측: 멤버 상세 정보 */}
            <div className="flex-[2] bg-[#f0f0f0] border-2 border-gray-300 rounded-sm p-1 flex flex-col h-[65%] md:h-full">
                {selectedMember ? (
                    <div className="h-full flex flex-col border border-gray-400 bg-white shadow-sm p-3 overflow-y-auto custom-scrollbar">

                        {/* 헤더: 사진 및 기본 정보 */}
                        <div className="flex gap-4 mb-4">
                            <div className="w-20 h-20 shrink-0 bg-gray-200 border border-gray-400 overflow-hidden shadow-md">
                                {selectedMember.profileImageUrl ? (
                                    <img src={selectedMember.profileImageUrl} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-3xl bg-white">{selectedMember.emoji}</div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-lg">{selectedMember.stageName} <span className="text-xs font-normal text-gray-500">({selectedMember.nameEn})</span></h3>
                                <div className="mt-1 flex items-center gap-2">
                                    <span className="px-1.5 py-0.5 bg-[#000080] text-white text-[10px] rounded-sm font-pixel">
                                        Active
                                    </span>
                                    <span className="text-xs text-gray-500">{formatDate(selectedMember.birthDate)}</span>
                                </div>
                                {/* 재미있는 상태 메시지 */}
                                <div className="mt-2 p-1.5 bg-yellow-50 border border-yellow-200 text-xs text-orange-800 font-pixel rounded break-keep">
                                    Status: {statusMsg}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            {/* 좌측: 텍스트 정보 */}
                            <div className="flex-1 space-y-3 text-xs md:text-sm">
                                <section>
                                    <h4 className="font-bold border-b border-gray-300 mb-1 pb-0.5 text-gray-600">Properties</h4>
                                    <div className="grid grid-cols-[60px_1fr] gap-y-1">
                                        <span className="text-gray-500 text-right pr-2">MBTI:</span><span className="font-mono">{selectedMember.mbti}</span>
                                        <span className="text-gray-500 text-right pr-2">Pos:</span><span>{selectedMember.positions}</span>
                                        <span className="text-gray-500 text-right pr-2">Age:</span><span>{calculateAge(selectedMember.birthDate)}</span>
                                    </div>
                                </section>
                                <section>
                                    <h4 className="font-bold border-b border-gray-300 mb-1 pb-0.5 text-gray-600">Details</h4>
                                    <div
                                        className="text-gray-800 leading-snug"
                                        dangerouslySetInnerHTML={{ __html: selectedMember.description || '' }}
                                    />
                                </section>
                            </div>

                            {/* 우측: 레이더 차트 (육각형 능력치) */}
                            <div className="w-full md:w-48 shrink-0 flex flex-col items-center">
                                <div className="w-full h-48 bg-gray-50 border border-gray-200 relative">
                                    <div className="absolute top-1 left-1 text-[9px] text-gray-400 font-pixel">Stats.exe</div>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={statsData}>
                                            <PolarGrid stroke="#e5e7eb" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#666' }} />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                            <Radar
                                                name={selectedMember.stageName}
                                                dataKey="A"
                                                stroke="#86efac"
                                                fill="#86efac"
                                                fillOpacity={0.6}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-[#e0e0e0] border border-gray-400 border-dashed">
                        <span className="text-2xl mb-2">🖱️</span>
                        <p className="text-xs text-center">Select a device from the list</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// Tab 3: Performance (디스크 조각 모음 시각화)
// ----------------------------------------------------------------------

// 디스크 블록 컴포넌트
function DefragBlock({ type, delay }: { type: 'system' | 'album' | 'empty', delay: number }) {
    const getColor = () => {
        if (type === 'system') return 'bg-blue-500';
        if (type === 'album') return 'bg-brand-[wichu-green]'; // 엔시티 색상
        return 'bg-white';
    };

    return (
        <div
            className={`w-full h-full border border-gray-100 shadow-sm ${type === 'empty' ? 'bg-white' : ''}`}
        >
            {type !== 'empty' && (
                <div
                    className={`w-full h-full ${getColor()} animate-scale-in`}
                    style={{ animationDelay: `${delay}ms` }}
                />
            )}
        </div>
    );
}

function PerformanceTab({ group, stats }: { group: GroupWithLinks | null, stats: SystemStats | null }) {
    const uptime = getUptime(group?.debutDate || null);

    // 블록 그리드 생성 로직 (10x10 = 100개 블록 예시)
    // 실제 데이터 비율에 맞춰 블록 타입 결정
    const totalBlocks = 140; // 14x10 grid
    const blocks = Array.from({ length: totalBlocks }, (_, i) => {
        // 앞부분은 시스템 파일(파랑), 중간은 데이터(초록), 나머지는 빈 공간(흰색)
        if (i < 5) return 'system';
        // stats가 있으면 그에 비례해서 초록색 채우기 (최대 70%까지)
        const fillLimit = stats ? Math.min(Math.floor((stats.tracks * 2) + 10), 100) : 20;
        if (i < fillLimit + 5) return 'album';
        return 'empty';
    });

    return (
        <div className="flex flex-col h-full bg-[#e8e8e8] p-3 gap-3 overflow-y-auto custom-scrollbar text-xs font-sans">

            {/* 상단 통계 바 */}
            <div className="flex flex-wrap gap-2">
                <div className="flex-1 min-w-[150px] bg-white border border-gray-400 px-2 py-1 shadow-sm flex justify-between items-center">
                    <span className="text-gray-600">System Uptime</span>
                    <span className="font-pixel font-bold text-[#000080]">
                        {uptime.days} Days
                    </span>
                </div>
                <div className="flex-1 min-w-[150px] bg-white border border-gray-400 px-2 py-1 shadow-sm flex justify-between items-center">
                    <span className="text-gray-600">Memory (Love)</span>
                    <span className="font-pixel font-bold text-wish-green">100% Full</span>
                </div>
            </div>

            {/* 디스크 조각 모음 시각화 (Disk Defrag) */}
            <div className="border border-gray-500 bg-[#f0f0f0] p-1 shadow-sm">
                <div className="flex justify-between mb-1 px-1 font-bold text-gray-700">
                    <div className="flex items-center gap-2">
                        <HardDrive size={14} />
                        <span>Disk Defragmenter (C: WISH_DRIVE)</span>
                    </div>
                    <span className="text-[10px] font-normal text-gray-500">Writing...</span>
                </div>

                {/* 그리드 */}
                <div className="border border-gray-600 border-b-white border-r-white bg-white h-48 relative overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(12px,1fr))] grid-rows-[repeat(auto-fill,minmax(12px,1fr))] gap-[1px] content-start p-[1px]">
                        {blocks.map((type, idx) => (
                            <DefragBlock key={idx} type={type as 'system' | 'album' | 'empty'} delay={idx * 10} />
                        ))}
                    </div>
                </div>

                {/* 범례 */}
                <div className="flex gap-4 mt-2 px-1 text-[10px] text-gray-600">
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 border border-gray-400"></div> System</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-wish-green border border-gray-400"></div> WISH Data</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-white border border-gray-400"></div> Free Space</div>
                </div>
            </div>

            {/* 하단 프로세스 로그 */}
            <fieldset className="border border-gray-400 p-2 flex-1 flex flex-col min-h-0">
                <legend className="px-1 text-gray-500 flex items-center gap-1">
                    <Server size={12} /> Recent Activities
                </legend>
                <div className="flex-1 bg-white border border-gray-400 overflow-y-auto custom-scrollbar font-mono text-[10px] p-1">
                    {stats?.recentLogs.map((log) => (
                        <div key={log.id} className="flex gap-2 hover:bg-blue-100 cursor-default">
                            <span className="text-gray-400">[{new Date(log.date).toLocaleDateString()}]</span>
                            <span className="text-blue-800 font-bold">{log.type.toUpperCase()}</span>
                            <span className="text-black truncate">{log.name}</span>
                        </div>
                    ))}
                    <div className="animate-pulse text-green-600 mt-1">_ Waiting for next comeback...</div>
                </div>
            </fieldset>

        </div>
    );
}

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

interface MyWishProps {
    onClose: () => void;
}

export default function MyWish({ onClose }: MyWishProps) {
    const [group, setGroup] = useState<GroupWithLinks | null>(null);
    const [members, setMembers] = useState<Member[]>([]);
    const [stats, setStats] = useState<SystemStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('general'); // 위츄 멘트용

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [groupRes, membersRes, statsRes] = await Promise.all([
                    fetch('/api/group'),
                    fetch('/api/members'),
                    fetch('/api/stats')
                ]);

                if (groupRes.ok) setGroup(await groupRes.json());
                if (membersRes.ok) setMembers(await membersRes.json());
                if (statsRes.ok) setStats(await statsRes.json());
            } catch (error) {
                console.error("Failed to load data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const tabItems = [
        { id: 'general', label: '일반', content: <GeneralTab group={group} /> },
        { id: 'members', label: '하드웨어', content: <MembersTab members={members} /> },
        { id: 'perf', label: '성능', content: <PerformanceTab group={group} stats={stats} /> },
    ];

    return (
        <div className="flex flex-col h-full w-full p-1 relative bg-gray-200">

            {/* 위츄 시스템 도우미 */}
            <WichuAssistant currentTab={activeTab} />

            {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-200/80 backdrop-blur-sm">
                    <Spinner size="lg" />
                </div>
            )}

            <Tabs
                items={tabItems}
                activeTab={activeTab}
                className="flex-1"
                onChange={(id) => setActiveTab(id)} // 탭 변경 감지
            />
        </div>
    );
}