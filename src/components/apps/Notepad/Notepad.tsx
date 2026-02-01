/**
 * Notepad - 윈도우 98 스타일 메모장
 * Policy 파일 (Privacy.txt, Rules.txt) 표시용
 */

'use client';

interface NotepadProps {
  title: string;
  content: string;
  onClose: () => void;
}

export default function Notepad({ title, content, onClose }: NotepadProps) {
  return (
    <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-[#c0c0c0] border-2 border-white shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* 타이틀 바 */}
        <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">📄</span>
            <span className="font-bold text-sm">{title}</span>
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

        {/* 내용 영역 */}
        <div className="flex-1 bg-white p-4 overflow-y-auto font-mono text-sm leading-relaxed custom-scrollbar">
          <pre className="whitespace-pre-wrap">{content}</pre>
        </div>

        {/* 상태 표시줄 */}
        <div className="bg-[#c0c0c0] border-t border-gray-400 px-2 py-1 text-xs flex items-center justify-between">
          <span>Read-only</span>
          <span>Ln 1, Col 1</span>
        </div>
      </div>
    </div>
  );
}
