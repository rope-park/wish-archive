/**
 * APP: RECYCLE_BIN (휴지통 / B컷 저장소)
 * * - 팬들을 위한 시크릿 콘텐츠 (B컷, 엽사, 미공개 짤) 제공
 * - 윈도우 탐색기 스타일의 UI
 * - '복원' 시도 시 재미있는 에러 메시지 출력
 */

'use client';

import { useState } from 'react';
import { Modal, Button } from '@/components/ui';
import { AppHeader } from '@/components/ui/AppHeader';
import { Trash2, FileImage, RefreshCcw, AlertTriangle } from 'lucide-react';

// B컷 데이터 타입 정의
interface BCutItem {
  id: string;
  filename: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  size: string;
}

// [데이터] B컷 아이템 리스트 (추후 DB나 API로 분리 가능)
const TRASH_ITEMS: BCutItem[] = [
  {
    id: '1',
    filename: 'riku_sleep.jpg',
    title: 'RIKU_SLEEPING_MODE.exe',
    description: '대기실에서 기절한 리쿠. 깨우면 쿨타임 5분.',
    imageUrl: '/content/bcuts/riku_sleep.jpg', // 실제 이미지 경로로 수정 필요
    date: '2024-02-21',
    size: '1.2 MB'
  },
  {
    id: '2',
    filename: 'ryo_bread_theft.png',
    title: 'evidence_case_04.png',
    description: '사쿠야의 빵을 노리는 료의 손길이 포착됨.',
    imageUrl: '/content/bcuts/ryo_bread.jpg',
    date: '2024-03-04',
    size: '845 KB'
  },
  {
    id: '3',
    filename: 'sion_visual_err.sys',
    title: 'SION_FACE_BUG.sys',
    description: '너무 잘생겨서 시스템이 처리하지 못하고 튕긴 사진.',
    imageUrl: '/content/bcuts/sion_visual.jpg',
    date: '2024-01-15',
    size: '4.5 MB'
  },
  {
    id: '4',
    filename: 'yushi_shy.log',
    title: 'YUSHI_SHY_LOG.txt',
    description: '카메라와 눈이 마주치자 급격히 수줍어하는 유우시.',
    imageUrl: '/content/bcuts/yushi_shy.jpg',
    date: '2024-04-01',
    size: '12 KB'
  }
];

// RecycleBin Props 타입 정의
interface RecycleBinProps {
  onClose?: () => void;
}

export default function RecycleBin({ onClose }: RecycleBinProps) {
  const [selectedItem, setSelectedItem] = useState<BCutItem | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);

  // [이벤트] 복원 버튼 클릭 시 (재미 요소)
  const handleRestore = () => {
    if (!selectedItem) return;
    setIsRestoring(true);
    
    // 복원하는 척 딜레이 후 에러 메시지
    setTimeout(() => {
      alert(`[System Error]\n\n파일 '${selectedItem.filename}'을(를) 복원할 수 없습니다.\n\n사유: 이미지가 너무 귀여워서 시스템 허용 용량을 초과했습니다. (Error Code: CUTE_OVERLOAD)`);
      setIsRestoring(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans text-black select-none">
      
      {/* 통일된 헤더 컴포넌트 */}
      <AppHeader
        menuItems={[
          {
            label: 'File',
            items: [
              { label: 'Empty Recycle Bin', onClick: () => alert('휴지통 비우기'), shortcut: 'Ctrl+D' },
              { divider: true },
              { label: 'Close', onClick: () => onClose?.(), shortcut: 'Alt+F4' }
            ]
          },
          {
            label: 'Edit',
            items: [
              { label: 'Select All', onClick: () => console.log('Select all'), shortcut: 'Ctrl+A' },
              { divider: true },
              { label: 'Restore', onClick: handleRestore, disabled: !selectedItem }
            ]
          },
          {
            label: 'View',
            items: [
              { label: 'Refresh', onClick: () => window.location.reload(), shortcut: 'F5' },
              { divider: true },
              { label: 'Icon View', onClick: () => {} },
              { label: 'List View', onClick: () => {}, disabled: true }
            ]
          },
          {
            label: 'Tools',
            items: [
              { label: 'Restore All Items', onClick: () => alert('복원 실패: B컷은 영원합니다 💖') }
            ]
          },
          {
            label: 'Help',
            items: [
              { label: 'About Recycle Bin', onClick: () => alert('WISH Recycle Bin v1.0\nB-Cut Archive System') }
            ]
          }
        ]}
        toolbarButtons={[
          {
            icon: <Trash2 size={18} />,
            label: 'Empty',
            onClick: () => alert('휴지통 비우기')
          },
          {
            icon: <RefreshCcw size={18} />,
            label: 'Restore',
            onClick: handleRestore,
            disabled: !selectedItem
          }
        ]}
        addressBar={{
          value: 'C:\\Recycle Bin',
          readOnly: true,
          placeholder: 'Path'
        }}
        actionButtons={[
          {
            icon: <AlertTriangle size={18} className="text-orange-500" />,
            label: 'Info',
            onClick: () => alert(`${TRASH_ITEMS.length} items in Recycle Bin`)
          }
        ]}
      />

      {/* 3. 메인 콘텐츠 (아이콘 그리드) */}
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        
        {/* 파일 개수 표시 */}
        <div className="w-full bg-yellow-50 border border-yellow-200 p-2 mb-4 text-xs text-gray-700 flex items-start gap-2 shadow-sm">
            <AlertTriangle size={14} className="text-orange-500 mt-0.5" />
            <div>
                <span className="font-bold">시스템 경고:</span> 이 폴더에는 삭제된 파일들이 보관되어 있습니다.
                <br/>하지만 시즈니의 데이터는 소중하므로 실제 삭제는 되지 않았습니다. (B-Cut Archive)
            </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {TRASH_ITEMS.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedItem(item)}
              onDoubleClick={() => setSelectedItem(item)}
              className="group flex flex-col items-center gap-1 cursor-pointer p-2 rounded hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-colors"
            >
              {/* 아이콘: 구겨진 종이 느낌 */}
              <div className="relative w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-105">
                <FileImage size={40} className="text-gray-400 drop-shadow-md" strokeWidth={1.5} />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow">
                    <Trash2 size={12} className="text-red-500" />
                </div>
              </div>
              
              {/* 파일명 */}
              <span className="text-[11px] text-center leading-tight px-1 rounded group-hover:bg-blue-100 group-hover:text-blue-800 break-all line-clamp-2 w-full">
                {item.filename}
              </span>
              <span className="text-[9px] text-gray-400">{item.size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. 하단 상태바 */}
      <div className="bg-gray-100 border-t border-gray-300 px-3 py-1 text-[10px] text-gray-500 flex justify-between items-center">
        <span>{TRASH_ITEMS.length} items</span>
        <span>Click to view details</span>
      </div>

      {/* 5. [모달] 상세 보기 (B컷 공개) */}
      {selectedItem && (
        <Modal
            isOpen={!!selectedItem}
            onClose={() => setSelectedItem(null)}
            title={selectedItem.title}
            variant="info"
            className="w-[90vw] max-w-[450px]"
        >
            <div className="flex flex-col gap-4">
                {/* 이미지 영역 */}
                <div className="relative w-full aspect-4/3 bg-black border-2 border-gray-300 shadow-inner flex items-center justify-center overflow-hidden bg-[url('/system/checkerboard.png')]">
                    {/* Next/Image 사용 (실제 경로가 있다면 주석 해제) */}
                    {/* <Image src={selectedItem.imageUrl} alt={selectedItem.title} fill className="object-contain" /> */}
                    
                    {/* 이미지가 없을 때 대체 UI */}
                    <div className="text-center text-gray-500">
                        <span className="text-4xl block mb-2">🖼️</span>
                        <span className="text-xs">Image Preview<br/>({selectedItem.filename})</span>
                    </div>
                </div>

                {/* 설명 영역 */}
                <div className="bg-gray-50 border border-gray-300 p-3 rounded text-sm shadow-sm">
                    <div className="flex justify-between items-center mb-1 border-b border-gray-200 pb-1">
                        <span className="font-bold text-blue-600">File Info</span>
                        <span className="text-[10px] text-gray-400">{selectedItem.date}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                        {selectedItem.description}
                    </p>
                </div>

                {/* 버튼 그룹 */}
                <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
                    <Button 
                        variant="default" 
                        onClick={handleRestore}
                        disabled={isRestoring}
                        className="bg-green-600 hover:bg-green-700 text-white border-green-800"
                    >
                        {isRestoring ? '복원 중...' : '♻️ 복원하기'}
                    </Button>
                    <Button variant="ghost" onClick={() => setSelectedItem(null)}>
                        닫기
                    </Button>
                </div>
            </div>
        </Modal>
      )}
    </div>
  );
}