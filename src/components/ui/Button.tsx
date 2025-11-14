import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "hover" | "pressed" | "loading" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    children: ReactNode;
}

export default function Button({
    variant = "primary",
    size = "md",
    loading = false,
    leftIcon,
    rightIcon,
    disabled,
    children,
    className = "",
    ...props
}: ButtonProps) {
    const variantClasses = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100",
        hover: "bg-white text-gray-800 hover:bg-gray-100 disabled:bg-gray-50",
        pressed: "bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:bg-gray-200",
        loading: "bg-gray-100 text-gray-400 cursor-not-allowed",
        ghost: "bg-transparent text-gray-800 hover:bg-gray-100 disabled:bg-gray-50",
        danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400",
    }

    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
    }

      return (
    <button
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  )
}

// 미니 스피너
function Spinner({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const sizeMap = { sm: 'h-4 w-4', md: 'h-6 w-6' }
  return (
    <svg className={`animate-spin ${sizeMap[size]}`} viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  )
}