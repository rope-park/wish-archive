
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Loader2, X, Minus } from 'lucide-react';

interface WishFormProps {
    onSuccess: () => void;
}

const CRANE_COLORS = [
    '#FFB6C1', // Pink
    '#F0E68C', // Yellow
    '#98FB98', // Green
    '#87CEFA', // Blue
    '#DDA0DD', // Purple
    '#FF6B6B'  // Red
];

export const WishForm = ({ onSuccess }: WishFormProps) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        message: '',
        authorName: '',
        isAnonymous: false,
        targetMember: 'ALL',
        craneColor: CRANE_COLORS[0]
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/wishes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error('Failed to submit wish');
            
            setFormData({
                message: '',
                authorName: '',
                isAnonymous: false,
                targetMember: 'ALL',
                craneColor: CRANE_COLORS[0]
            });
            onSuccess();
        } catch (error) {
            console.error(error);
            alert('메시지 전송에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-[#d4d4d4] border-2 border-white border-r-gray-500 border-b-gray-500 shadow-xl flex flex-col">
            {/* Retro Window Header */}
            <div className="bg-linear-to-r from-[#ff69b4] to-[#db7093] px-2 py-1 flex justify-between items-center border-b border-gray-500">
                <span className="text-white font-bold text-sm tracking-wide drop-shadow-md">Make_a_Wish.exe</span>
                <div className="flex gap-1">
                     <button className="w-4 h-4 bg-[#c0c0c0] border border-white border-r-black border-b-black flex items-center justify-center hover:bg-white/50 active:border-t-black active:border-l-black active:border-r-white active:border-b-white">
                        <Minus size={10} className="text-black" />
                    </button>
                    <button className="w-4 h-4 bg-[#c0c0c0] border border-white border-r-black border-b-black flex items-center justify-center hover:bg-red-400 active:border-t-black active:border-l-black active:border-r-white active:border-b-white">
                        <X size={10} className="text-black" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col items-center gap-6">
                
                {/* Color Palette */}
                <div className="w-full flex items-center justify-center gap-4">
                    <span className="text-gray-600 font-bold text-sm">색종이 색상 선택</span>
                    <div className="flex gap-2">
                         {CRANE_COLORS.map(color => (
                            <button
                                type="button"
                                key={color}
                                className={`w-8 h-8 rounded-md border-2 shadow-sm transition-transform active:scale-95 ${formData.craneColor === color ? 'border-black scale-110 ring-1 ring-black/20' : 'border-gray-400 hover:border-gray-600'}`}
                                style={{ backgroundColor: color }}
                                onClick={() => setFormData({...formData, craneColor: color})}
                            />
                        ))}
                    </div>
                </div>

                {/* Note Paper Form */}
                <form onSubmit={handleSubmit} className="w-full bg-[#fdfbf7] border border-gray-400 p-4 shadow-inner relative"
                      style={{
                          backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px)',
                          backgroundSize: '100% 24px',
                          lineHeight: '24px'
                      }}
                >
                    <textarea 
                        className="w-full bg-transparent border-none resize-none focus:outline-none text-gray-700 font-hand text-sm leading-[24px]"
                        placeholder="이곳에 소원을 적어주세요. (종이학으로 접어서 보관됩니다)"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        required
                        maxLength={300}
                        rows={8}
                    />

                    <div className="mt-4 flex gap-2 items-center justify-end border-t border-gray-300 pt-2">
                        <label className="text-xs text-gray-500 cursor-pointer flex items-center gap-1">
                             <input 
                                type="checkbox" 
                                checked={formData.isAnonymous}
                                onChange={(e) => setFormData({...formData, isAnonymous: e.target.checked})}
                                className="accent-pink-500"
                            />
                            익명
                        </label>
                         {!formData.isAnonymous && (
                             <input 
                                type="text"
                                placeholder="닉네임"
                                value={formData.authorName}
                                onChange={(e) => setFormData({...formData, authorName: e.target.value})}
                                className="bg-transparent border-b border-gray-400 text-xs text-right w-20 focus:outline-none focus:border-pink-500"
                                maxLength={10}
                            />
                        )}
                    </div>
                </form>

                {/* Submit Button */}
                <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#90EE90] hover:bg-[#98FB98] text-black font-bold border-2 border-white border-r-[#5dbb5d] border-b-[#5dbb5d] shadow-md active:translate-y-0.5 active:shadow-none py-3 text-lg flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" /> : '📜'}
                    종이학 접기 ★
                </Button>

            </div>
        </div>
    );
};
