
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';
import { useWishStore, WishMessage } from '@/app/stores/useWishStore';

interface WishFormProps {
    onSuccess: () => void;
}

const CRANE_COLORS_DATA = [
    { value: '#FFB6C1', label: 'Pink' },
    { value: '#F0E68C', label: 'Yellow' },
    { value: '#98FB98', label: 'Green' },
    { value: '#87CEFA', label: 'Blue' },
    { value: '#DDA0DD', label: 'Purple' },
    { value: '#FF6B6B', label: 'Red' }
];

// ...

 export const WishForm = ({ onSuccess }: WishFormProps) => {
    const [loading, setLoading] = useState(false);
    const { formData, setFormData, resetFormData, fetchWishes } = useWishStore();

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
            
            // Server fetch as requested by user
            await fetchWishes(true);

            resetFormData();
            onSuccess();
        } catch (error) {
            console.error(error);
            alert('메시지 전송에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full bg-[#d4d4d4] border-2 border-white border-r-gray-500 border-b-gray-500 shadow-xl flex flex-col">


            {/* Content Area */}
            <div className="flex-1 p-4 md:p-6 flex flex-col items-center gap-4 md:gap-6 overflow-y-auto">
                
                {/* Color Palette */}
                <div className="w-full flex flex-col items-start gap-2">
                    <span className="text-gray-600 font-bold text-sm">색종이 색상 선택</span>
                    <div className="flex gap-2 flex-wrap">
                        {CRANE_COLORS_DATA.map((color) => (
                            <button
                                key={color.value}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, craneColor: color.value }))}
                                className={`w-8 h-8 rounded-md border-2 shadow-sm transition-transform hover:scale-110 active:scale-95 ${
                                    formData.craneColor === color.value 
                                        ? 'border-gray-800 ring-2 ring-gray-400 ring-offset-1 z-10 scale-110' 
                                        : 'border-transparent'
                                }`}
                                style={{ backgroundColor: color.value }}
                                title={color.label}
                            />
                        ))}
                    </div>
                </div>

                {/* Note Paper Form */}
                <form id="wish-form" onSubmit={handleSubmit} className="w-full bg-[#fdfbf7] border border-gray-400 shadow-inner overflow-hidden flex flex-col">
                    <textarea 
                        className="w-full h-[200px] md:h-[300px] bg-transparent border-none resize-none focus:outline-none text-gray-800 text-lg md:text-xl leading-[32px] p-[0px_16px]"
                        style={{
                            fontFamily: 'var(--font-hand), cursive', // Force font
                            backgroundImage: 'linear-gradient(transparent, transparent 31px, #e5e5e5 31px, #e5e5e5 32px)',
                            backgroundSize: '100% 32px',
                            backgroundAttachment: 'local',
                            paddingTop: '6px'
                        }}
                        placeholder="이곳에 소원을 적어주세요. (종이학으로 접어서 보관됩니다)"
                        value={formData.message}
                        onChange={(e) => {
                            if (e.target.value.length <= 300) {
                                setFormData(prev => ({ ...prev, message: e.target.value }));
                            }
                        }}
                    />
                    
                    {/* Bottom Controls */}
                    <div className="flex items-center justify-between p-3 border-t border-gray-200 bg-[#f9f9f9]/80 backdrop-blur-sm">
                        <div className="w-full h-[1px] bg-gray-300 absolute top-0 left-0" /> {/* decorative line */}
                        <label className="text-xs text-gray-500 cursor-pointer flex items-center gap-1 select-none">
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
                                className="bg-transparent border-b border-gray-400 text-xs text-right w-20 focus:outline-none focus:border-pink-500 text-black placeholder:text-gray-400"
                                maxLength={10}
                            />
                        )}
                    </div>
                </form>

                {/* Submit Button */}
                <Button 
                    form="wish-form"
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
