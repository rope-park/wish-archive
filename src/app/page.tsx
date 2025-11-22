import DesktopIcon from '@/components/os/DesktopIcon';
import ProfileWidget from '@/components/os/ProfileWidget';

export default function Desktop() {
  // 바탕화면 아이콘 목록 정의
  const icons = [
    { name: '멤버', icon: '👥', href: '/members' },
    { name: '앨범', icon: '💿', href: '/releases' },
    { name: '타임라인', icon: '📅', href: '/timeline' },
    { name: '공연/방송', icon: '🎤', href: '/performances' },
    // 외부 링크
    { name: 'Instagram', icon: '📸', href: 'https://instagram.com/nctwish_official', isExternal: true },
    { name: 'YouTube', icon: '📺', href: 'https://youtube.com/@NCTWISH', isExternal: true },
  ];

  return (
    <div className="relative w-full h-full p-4 md:p-8">
      
      {/* [1] 아이콘 그리드 (왼쪽 정렬, 세로 방향 우선 채움) */}
      <div className="flex flex-col flex-wrap content-start gap-4 h-[80vh] w-full max-w-2xl">
        {icons.map((icon) => (
          <DesktopIcon key={icon.name} {...icon} />
        ))}
      </div>

      {/* [2] 위젯 영역 (오른쪽 고정) */}
      <div className="fixed top-12 right-8 hidden lg:block">
        <ProfileWidget />
        
        {/* 추가 위젯 (달력 등)이 들어갈 자리 */}
        <div className="mt-6 bg-wish-lemon/40 backdrop-blur-md p-4 rounded-2xl border-2 border-white/50 shadow-hard text-center transform rotate-2 hover:rotate-0 transition-transform">
          <p className="font-bagel-fat-one text-2xl text-wish-pink">D-DAY</p>
          <p className="font-jua text-gray-700">컴백까지 D-??</p>
        </div>
      </div>

    </div>
  );
}