/**
 * Dropdown(select) 컴포넌트
 * 
 * - 기본 드롭다운(정렬 기능 등) 제공
 */

'use client';

import { useState, useRef, useEffect, useContext, createContext, ReactNode, ElementType, HTMLAttributes, isValidElement, cloneElement, Children, ReactElement, } from 'react';

// 상태 공유를 위한 Context 생성
interface DropdownContextProps {
    isOpen: boolean;
    toggle: () => void;
    close: () => void;
}

const DropdownContext = createContext<DropdownContextProps | undefined>(undefined);

export const useDropdown = () => {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error('Dropdown components must be used within a Dropdown');
    }
    return context;
};

// 메인 Dropdown 컴포넌트
export interface DropdownProps {
    children: ReactNode;
    className?: string;
    onClose?: () => void;
}

function DropdownRoot({ children, className = '', onClose }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggle = () => setIsOpen((prev) => !prev);

    const close = () => {
        setIsOpen(false);
        onClose?.();
    };

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                close();
            }
        };

        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                close();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen]);

    return (
        <DropdownContext.Provider value={{ isOpen, toggle, close }}>
            <div
                ref={containerRef}
                className={`relative inline-block text-left ${className}`}
            >
                {children}
            </div>
        </DropdownContext.Provider>
    );
}

// 드롭다운 트리거 버튼 (클릭 시 메뉴 열림)
export interface DropdownTriggerProps {
    children: ReactNode;
    as?: ElementType;
    className?: string;
    disabled?: boolean;
}

function DropdownTrigger({ children, as: Component = 'div', className = '', disabled = false, ...props }: DropdownTriggerProps) {
    const { toggle } = useDropdown();

    return (
        <Component
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                if (disabled) return;
                toggle();
            }}
            className={`cursor-pointer ${className}`}
            aria-haspopup="menu"
            disabled={disabled}
            {...props}
        >
            {children}
        </Component>
    );
}

// 드롭다운 메뉴 컨테이너 (펼쳐지는 박스 역할)
export interface DropdownMenuProps {
    children: ReactNode;
    align?: 'left' | 'right';
    className?: string;
}

export function DropdownMenu({ children, align = 'left', className = '' }: DropdownMenuProps) {
    const { isOpen } = useDropdown();

    if (!isOpen) return null;

    return (
        <div
            className={`
                absolute top-full mt-1 z-[50]
                ${align === 'right' ? 'right-0' : 'left-0'}
                min-w-[160px] py-[2px]
                bg-gray-200 
                border-2 border-t-white border-l-white border-r-black border-b-black
                shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)]
                ${className}
            `}
            role="menu"
        >
            {children}
        </div>
    );
}

// 드롭다운 메뉴 아이템 (메뉴 항목 역할)
interface DropdownItemProps extends HTMLAttributes<HTMLButtonElement> {
    label?: string;
    icon?: ReactNode;       // 현재 선택한 항목에 표시
    shortcut?: string;      // 단축키 표시
    disabled?: boolean;
    onClick?: () => void;
    checked?: boolean;
    showArrow?: boolean;    // 화살표 아이콘 표시 (서브메뉴용)
}

function DropdownItem({
    label,
    icon,
    shortcut,
    disabled = false,
    onClick,
    checked = false,
    showArrow = false,
    className = '',
    children,
    ...props
}: DropdownItemProps) {
    const { close } = useDropdown();

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (disabled) return;
        onClick?.();
        close();
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            role="menuitem"
            className={`
                group flex items-center w-full px-4 py-1.5
                text-sm font-pixel leading-none text-left select-none
              bg-gray-200 text-gray-900
                hover:bg-brand-retro-navy hover:text-white
              disabled:text-gray-400 disabled:hover:bg-gray-200 disabled:cursor-not-allowed
                ${className}
            `}
            {...props}
        >
            <span className="w-5 flex items-center justify-center mr-2 shrink-0">
                {checked ? <span className="text-[10px] group-hover:text-white">✔</span> : <span className="text-sm group-hover:text-white">{icon}</span>}
            </span>
            <span className="flex-1 truncate pt-[2px]">{children || label}</span>
            {shortcut && <span className="ml-4 text-[10px] text-gray-500 group-hover:text-white pt-[2px]">{shortcut}</span>}
            {/* 단순 화살표 표시 */}
            {showArrow && <span className="ml-2 text-[8px] group-hover:text-white">▶</span>}
        </button>
    );
}

// 드롭다운 구분선
function DropdownDivider({ className = '' }: { className?: string }) {
    return (
        <div className={`my-1 px-1 ${className}`}>
            <div className="h-[2px] border-t border-gray-400 border-b border-white" />
        </div>
    );
}

// 서브메뉴용 컨테이너
function DropdownSub({ children, className = '' }: { children: ReactNode; className?: string }) {
    const [isSubOpen, setIsSubOpen] = useState(false);

    return (
        <div
            className={`relative w-full ${className}`}
            onMouseEnter={() => setIsSubOpen(true)}
            onMouseLeave={() => setIsSubOpen(false)}
        >
            {Children.map(children, (child) => {
                if (isValidElement(child)) {
                    return cloneElement(child as ReactElement<{ isOpen?: boolean }>, {
                        isOpen: isSubOpen,
                    });
                }
                return child;
            })}
        </div>
    );
}

// 서브메뉴 트리거
function DropdownSubTrigger({
    children,
    icon,
    className = '',
    isOpen = false,
}: {
    children: ReactNode;
    icon?: ReactNode;
    className?: string;
    isOpen?: boolean;
}) {
    return (
        <div
            className={`
                group flex items-center w-full px-4 py-1.5
                text-sm font-pixel leading-none text-left select-none cursor-default
                ${isOpen ? 'bg-brand-retro-navy text-white' : 'bg-gray-200 text-gray-900'}
                hover:bg-brand-retro-navy hover:text-white
                ${className}
            `}
        >
            <span className="w-5 flex items-center justify-center mr-2 shrink-0">
                <span className={`text-sm ${isOpen ? 'text-white' : ''} group-hover:text-white`}>{icon}</span>
            </span>
            <span className="flex-1 truncate pt-[2px]">{children}</span>
            {/* 서브메뉴 화살표 (항상 표시) */}
            <span className={`ml-2 text-[8px] ${isOpen ? 'text-white' : 'text-black'} group-hover:text-white`}>▶</span>
        </div>
    );
}

function DropdownSubContent({ children, isOpen = false, className = '' }: { children: ReactNode; isOpen?: boolean; className?: string }) {
    if (!isOpen) return null;

    return (
        <div
            className={`
        absolute left-full top-[-4px] ml-[-3px] z-[60]
        min-w-[160px] py-[2px]
        bg-gray-200 
        border-2 border-t-white border-l-white border-r-black border-b-black
        shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]
        ${className}
      `}
        >
            {children}
        </div>
    );
}

// export
const Dropdown = Object.assign(DropdownRoot, {
    Trigger: DropdownTrigger,
    Menu: DropdownMenu,
    Item: DropdownItem,
    Divider: DropdownDivider,

    Sub: DropdownSub,
    SubTrigger: DropdownSubTrigger,
    SubMenu: DropdownSubContent,
});

export default Dropdown;