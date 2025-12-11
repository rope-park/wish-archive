/**
 * Dropdown(select) 컴포넌트
 * 
 * - 기본 드롭다운(정렬 기능 등) 제공
 * 
 */

'use client';

import { useState, useRef, useEffect, ReactNode, ReactElement, isValidElement, cloneElement } from 'react';

export interface DropdownProps {
    children: ReactNode;
    className?: string;
}

function DropdownComponent({ children, className = '' }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative inline-block text-left ${className}`}
            // 자식 컴포넌트들에게 상태 전달 (CloneElement 활용)
            onClick={(e) => e.stopPropagation()}
        >

            {Array.isArray(children)
                ? children.map((child: ReactNode, index: number) => {
                    if (!isValidElement(child)) return null;
                    const element = child as ReactElement;
                    if (element.type === DropdownTrigger) {
                        return cloneElement(element, { 
                            key: `trigger-${index}`, 
                            isOpen, 
                            onClick: () => setIsOpen(!isOpen) 
                        } as Partial<DropdownTriggerProps>);
                    }
                    return isOpen ? cloneElement(element, { key: `menu-${index}` }) : null;
                })
                : children
            }
        </div>
    );
}

// 드롭다운 트리거 역할
export interface DropdownTriggerProps {
    children: ReactNode;
    isOpen?: boolean;   // 부모로부터 주입받음
    onClick?: () => void;
}

export function DropdownTrigger({ children, onClick }: DropdownTriggerProps) {
    return (
        <div onClick={onClick} className="cursor-pointer inline-block">
            {children}
        </div>
    );
}

// 드롭다운 메뉴 컨테이너 (펼쳐지는 박스 역할)
export interface DropdownMenuProps {
    children: ReactNode;
    align?: 'left' | 'right';
    className?: string;
}

export function DropdownMenu({ children, align = 'left', className = '' }: DropdownMenuProps) {
    return (
        <div
            className={`
                absolute top-full mt-1 z-50
                ${align === 'right' ? 'right-0' : 'left-0'}
                min-w-40 p-0.5
        
                bg-gray-200 
                border border-white/50
                shadow-outset        
                outline-1 outline-black
        
                ${className}
                `}
        >
            {children}
        </div>
    );
}

// 드롭다운 메뉴 아이템 (메뉴 항목 역할)
export interface DropdownItemProps {
    label: string;
    onClick?: () => void;
    icon?: ReactNode;       // 현재 선택한 항목에 표시
    showArrow?: boolean;    // 화살표 아이콘 표시 여부 (세부적인 Menu 표시 필요 시)
    disabled?: boolean;
    className?: string;
}

export function DropdownItem({
    label,
    onClick,
    icon,
    showArrow = false,
    disabled = false,
    className = '',
}: DropdownItemProps) {
    return (
        <button
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={`
                group flex items-center justify-between
                w-full px-4 py-1.5
                text-sm font-pixel leading-none
                select-none text-left
        
                /* --- 평소 상태 (Default) --- */
                bg-transparent text-gray-900
        
                /* --- 호버 상태 (Active - 파란 배경) --- */
                hover:bg-brand-deep hover:text-white
        
                /* --- 비활성 상태 --- */
             disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed
        
            ${className}
        `}
        >
            {/* 왼쪽: 아이콘 + 라벨 */}
            <div className="flex items-center gap-2">
                {/* 아이콘 (있으면 표시, 없으면 공간만 차지하게 할 수도 있음) */}
                <span className="w-3 flex justify-center text-[10px] group-hover:text-white">
                    {icon}
                </span>

                <span>{label}</span>
            </div>

            {/* 오른쪽: 서브메뉴 화살표 */}
            {showArrow && (
                <span className="text-[8px] ml-4 text-black group-hover:text-white">
                    ▶
                </span>
            )}
        </button>
    );
}

const Dropdown = Object.assign(DropdownComponent, {
    Trigger: DropdownTrigger,
    Menu: DropdownMenu,
    Item: DropdownItem,
});

export default Dropdown;