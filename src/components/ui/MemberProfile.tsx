/**
 * MemberProfile 컴포넌트
 * 
 * - 멤버 프로필 파일 불러오기
 * - 멤버 영문 이름 받아서 API로 해당 멤버 태그가 달린 사진 자동 호출
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

export interface MemberProfileProps {
  memberEnName: string; // 예: 'sion', 'riku'
  alt?: string;
  className?: string;
}

export default function MemberProfile({ memberEnName, alt, className }: MemberProfileProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!memberEnName) return;
      
      setLoading(true);
      try {
        // "system-profile 태그가 있고, 멤버 이름 태그도 있는 사진 줘"
        const res = await fetch(
          `/api/gallery?mode=tag&tag=system-profile&subTag=${memberEnName.toLowerCase()}`
        );
        const data = await res.json();

        if (data.items && data.items.length > 0) {
          // 가장 최신 사진(0번) 사용
          setSrc(data.items[0].src);
        } else {
          setSrc(null); // 사진이 없으면 null
        }
      } catch (e) {
        console.error('Profile fetch error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [memberEnName]);

  // 스타일 클래스 병합
  const containerClass = `relative overflow-hidden bg-gray-100 flex items-center justify-center ${className || ''}`;

  if (loading || !src) {
    return (
      <div className={containerClass}>
        <User className="text-gray-400 w-1/2 h-1/2" />
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <Image
        src={src}
        alt={alt || memberEnName}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 200px"
      />
    </div>
  );
}