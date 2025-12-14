/**
 * Wichu Tamagotchi Widget 컴포넌트
 * 
 * - 다마고치 스타일의 위젯
 * - 이후 픽셀 아트 위츄 캐릭터를 이용한 인터랙티브 기능 추가 예정
 */

'use client';

import Image from 'next/image';

export default function WichuTamagotchiWidget() {
  return (
    // 전체 컨테이너 (크기 및 그림자 설정)
    <div className="relative w-[260px] h-[380px] flex justify-center filter drop-shadow-2xl">
      
      {/* ------------------------------------------------------ */}
      {/* Layer 1: 배경 구름 (Clouds) - 가장 뒤 */}
      {/* ------------------------------------------------------ */}
      {/* 왼쪽 구름 */}
      <div className="absolute right-[150px] top-[90px] w-[110px] h-[90px] z-0 opacity-90 ">
        <Image 
          src="/images/widgets/WichuTamagotchi/UnionLeft.svg" 
          alt="cloud background left" 
          fill 
          className="object-contain"
        />
      </div>
      {/* 오른쪽 구름 */}
      <div className="absolute left-[150px] top-[90px] w-[110px] h-[90px] z-0 opacity-90 ">
        <Image 
          src="/images/widgets/WichuTamagotchi/UnionRight.svg" 
          alt="cloud background right" 
          fill 
          className="object-contain"
        />
      </div>

      {/* ------------------------------------------------------ */}
      {/* Layer 2: 체인 (Chain) - 구름 앞, 몸통 뒤 */}
      {/* ------------------------------------------------------ */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70px] h-[120px] z-10">
        <Image 
          src="/images/widgets/WichuTamagotchi/Keyring.svg"
          alt="chain" 
          fill 
          className="object-contain"
        />
      </div>

      {/* ------------------------------------------------------ */}
      {/* Layer 3: 다마고치 메인 몸통 (Star Body) */}
      {/* ------------------------------------------------------ */}
      <div className="relative z-20 w-[240px] h-[240px] mt-[75px]">
        {/* 별 모양 몸통 이미지 */}
        <Image 
          src="/images/widgets/WichuTamagotchi/Star.svg" 
          alt="Wichu Tamagotchi Body" 
          fill 
          className="object-contain"
          priority // 중요 이미지 우선 로딩
        />

        {/* ------------------------------------------------------ */}
        {/* Layer 4: 스크린 (Screen) - 몸통 위에 배치 */}
        {/* ------------------------------------------------------ */}
        <div className="
          absolute top-[60px] left-1/2 -translate-x-1/2
          w-[110px] h-[100px]
          bg-[#6B6B6B] /* 스크린 회색 */
          border-[5px] border-[#A3E292] /* 몸통과 비슷한 연두색 테두리 */
          rounded-lg
          flex items-center justify-center
          overflow-hidden
          shadow-inner
        ">

           {/* TODO: <PixelWichu /> */}
           <div className="font-pixel text-white/50 text-xs">WICHU OS</div>
        </div>

        {/* ------------------------------------------------------ */}
        {/* Layer 5: 버튼 (Buttons) - 몸통 위, 스크린 아래 */}
        {/* ------------------------------------------------------ */}
        <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 w-[90px] h-[35px]">
          <Image 
            src="/images/widgets/WichuTamagotchi/Button.svg" 
            alt="buttons" 
            fill 
            className="object-contain"
          />
        </div>
      </div>

    </div>
  );
}