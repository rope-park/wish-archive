/**
 * Wichu Tamagotchi Widget 컴포넌트
 * 
 * - 다마고치 스타일의 위젯
 * - 이후 픽셀 아트 위츄 캐릭터를 이용한 인터랙티브 기능 추가 예정
 */

'use client';

import Image from 'next/image';

export default function WichuTamagotchiWidget({ scale = 1 }: { scale?: number }) {
  const baseWidth = 260;
  const baseHeight = 330;
  const containerWidth = baseWidth * scale;
  const containerHeight = baseHeight * scale;

  return (
    // 전체 컨테이너 (크기 및 그림자 설정)
    <div 
      className="relative flex justify-center filter drop-shadow-2xl"
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
      }}
    >
      
      {/* ------------------------------------------------------ */}
      {/* Layer 1: 배경 구름 (Clouds) - 가장 뒤 */}
      {/* ------------------------------------------------------ */}
      {/* 왼쪽 구름 */}
      <div 
        className="absolute z-0 opacity-90"
        style={{
          right: `${150 * scale}px`,
          top: `${90 * scale}px`,
          width: `${110 * scale}px`,
          height: `${90 * scale}px`,
        }}
      >
        <Image 
          src="/system/widgets/WichuTamagotchi/UnionLeft.svg" 
          alt="cloud background left" 
          fill 
          className="object-contain"
        />
      </div>
      {/* 오른쪽 구름 */}
      <div 
        className="absolute z-0 opacity-90"
        style={{
          left: `${150 * scale}px`,
          top: `${90 * scale}px`,
          width: `${110 * scale}px`,
          height: `${90 * scale}px`,
        }}
      >
        <Image 
          src="/system/widgets/WichuTamagotchi/UnionRight.svg" 
          alt="cloud background right" 
          fill 
          className="object-contain"
        />
      </div>

      {/* ------------------------------------------------------ */}
      {/* Layer 2: 체인 (Chain) - 구름 앞, 몸통 뒤 */}
      {/* ------------------------------------------------------ */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
        style={{
          width: `${70 * scale}px`,
          height: `${120 * scale}px`,
        }}
      >
        <Image 
          src="/system/widgets/WichuTamagotchi/Keyring.svg"
          alt="chain" 
          fill 
          className="object-contain"
        />
      </div>

      {/* ------------------------------------------------------ */}
      {/* Layer 3: 다마고치 메인 몸통 (Star Body) */}
      {/* ------------------------------------------------------ */}
      <div 
        className="relative z-20"
        style={{
          width: `${240 * scale}px`,
          height: `${240 * scale}px`,
          marginTop: `${75 * scale}px`,
        }}
      >
        {/* 별 모양 몸통 이미지 */}
        <Image 
          src="/system/widgets/WichuTamagotchi/Body.svg" 
          alt="Wichu Tamagotchi Body" 
          fill 
          className="object-contain"
          priority // 중요 이미지 우선 로딩
        />

        {/* ------------------------------------------------------ */}
        {/* Layer 4: 스크린 (Screen) - 몸통 위에 배치 */}
        {/* ------------------------------------------------------ */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 bg-[#6B6B6B] border-[#A3E292] flex items-center justify-center overflow-hidden shadow-inner"
          style={{
            top: `${60 * scale}px`,
            width: `${110 * scale}px`,
            height: `${100 * scale}px`,
            borderWidth: `${5 * scale}px`,
            borderRadius: `${8 * scale}px`,
          }}
        >

           {/* TODO: <PixelWichu /> */}
           <div 
             className="font-pixel text-white/50"
             style={{ fontSize: `${12 * scale}px` }}
           >
             WICHU OS
           </div>
        </div>

        {/* ------------------------------------------------------ */}
        {/* Layer 5: 버튼 (Buttons) - 몸통 위, 스크린 아래 */}
        {/* ------------------------------------------------------ */}
        <div 
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: `${40 * scale}px`,
            width: `${90 * scale}px`,
            height: `${35 * scale}px`,
          }}
        >
          <Image 
            src="/system/widgets/WichuTamagotchi/Button.svg" 
            alt="buttons" 
            fill 
            className="object-contain"
          />
        </div>
      </div>

    </div>
  );
}